import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Patient from "App/Models/Patient";
import CreatePatientValidator from "App/Validators/CreatePatientValidator";
import UpdatePatientValidator from "App/Validators/UpdatePatientValidator";
import UploadImagePatientValidator from "App/Validators/UploadImagePatientValidator";
import Drive from '@ioc:Adonis/Core/Drive'

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
