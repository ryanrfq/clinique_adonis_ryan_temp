import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Patient from "App/Models/Patient";
import CreatePatientValidator from "App/Validators/CreatePatientValidator";
import UpdatePatientValidator from "App/Validators/UpdatePatientValidator";
import UploadImagePatientValidator from "App/Validators/UploadImagePatientValidator";
import Drive from '@ioc:Adonis/Core/Drive'
import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";
import { DateTime } from "luxon";
import MyHelper from "App/Helpers/MyHelper";

export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    const data = await Patient.query()
      .preload("employee")
      .preload("medicalRecord")
      .withAggregate('medicalRecord', mr => {
        mr.count('*').as('mr_count')
      })

    response.ok({
      message: "Berhasil mengambil data semua pasien",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePatientValidator);
    const newRecord = await Patient.create(payload)

    response.created({
      message: "Berhasil menyimpan data pasien",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await Patient.query()
      .where("id", id)
      .preload("employee")
      .preload("medicalRecord")
      .withAggregate('medicalRecord', mr => {
        mr.count('*').as('mr_count')
      })
      .firstOrFail()

    response.ok({
      message: "Berhasil mengambil data pasien",
      data: selectedData,
    });
  }

  public async showLoggedIn({ response, auth }: HttpContextContract) {
    const patient = await User.query()
      .where('id', auth.user!.id)
      .preload('patient', pq => {
        pq.preload('employee')
          .preload('medicalRecord')
          .withAggregate('medicalRecord', mr => {
            mr.count('*').as('mr_count')
          })
      })
      .firstOrFail()

    response.ok({
      message: "Berhasil mengambil data pasien",
      data: patient,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdatePatientValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await Patient.findOrFail(id);
    data.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data pasien",
      data: data,
    });
  }

  public async imageUpload({ request, response, params }: HttpContextContract) {
    const { id } = params
    const payload = await request.validate(UploadImagePatientValidator)
    const data = await Patient.findOrFail(id)
    const imageName = `patient_${id}.${payload.image.extname}`

    await payload.image.moveToDisk('patients', { name: imageName, overwrite: true })

    const beHost = "localhost:3333"
    const imageUrl = beHost + await Drive.getUrl('patients/' + imageName)

    await data.merge({ imageId: imageName }).save()

    response.ok({
      message: "Upload Success",
      data,
      image_url: imageUrl
    })
  }

  public async requestNewVerification({ response, auth }: HttpContextContract) {
    // OPTIONAL: request hanya dapat dilakukan satu menit setelah dibuat token terakhir...
    // ...untuk menghindari abuse

    const user = await User.query()
      .where('id', auth.user!.id)
      .preload('patient', pq => pq.firstOrFail())
      .firstOrFail()

    if (user.isVerified) {
      console.log("bad request: user already verified")
      return response.badRequest({
        message: "Error: User sudah terverifikasi"
      })
    }

    await user.merge({
      token: MyHelper.generateToken(15),
      tokenExpiry: DateTime.now().plus({ hours: 4 })
    }).save()

    // kemudian send email berisi token verifikasi
    // OPTIONAL: hash token di db
    await Mail.sendLater((message) => {
      message
        // todo: setelah berhasil kirim lewat gmail..
        // ubah value .from dengan real value, 
        // cek apakah tetap terkirim
        .from('info@example.com')
        .to(user.email)
        .subject('Verifikasi Akun Anda')
        .htmlView('emails/patient/verify_request', {
          email: user.email,
          action_url: `http://localhost:3333/verify-patient`,
          token: user.token
        })
    })

    response.ok({
      message: "Berhasil request verifikasi baru",
      user
    })
  }

  public async verifyToken({ request, response }: HttpContextContract) {
    const { email, token } = request.body()

    const user = await User.query()
      .where('email', email)
      .preload('patient', pq => pq.firstOrFail())
      .firstOrFail()

    if (user.isVerified) {
      console.log("bad request: user already verified")
      return response.badRequest({
        message: "Error: User sudah terverifikasi"
      })
    }

    if (DateTime.now().setZone('UTC+7') >= user.tokenExpiry) {
      return response.badRequest({
        message: "Token sudah expired"
      })
    }

    if (user.token === token) {
      await user.merge({ isVerified: true }).save()

      await Mail.sendLater((message) => {
        message
          // todo: setelah berhasil kirim lewat gmail..
          // ubah value .from dengan real value, 
          // cek apakah tetap terkirim
          .from('info@example.com')
          .to(user.email)
          .subject('Verifikasi Berhasil')
          .htmlView('emails/patient/verify_success', { email: user.email })
      })
    }

    response.ok({
      message: "Verifikasi user pasien berhasil"
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Patient.findOrFail(id);
    await data.delete();

    response.ok({
      message: `Berhasil menghapus data pasien ${data.id}`,
      data: {},
    });
  }
}
