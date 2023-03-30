import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Doctor from "App/Models/Doctor";
import CreateDoctorValidator from "App/Validators/CreateDoctorValidator";
import UpdateDoctorValidator from "App/Validators/UpdateDoctorValidator";
import UploadImageDoctorValidator from "App/Validators/UploadImageDoctorValidator";
import Drive from '@ioc:Adonis/Core/Drive'
export default class DoctorsController {
  public async index({ response }: HttpContextContract) {
    const data = await Doctor.query().preload("employee", (employeeQuery) => {
      employeeQuery.select("name", "email", "phone_number");
    });

    response.ok({
      message: "Berhasil mengambil data seluruh dokter",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateDoctorValidator);
    const newRecord = await Doctor.create(payload)

    response.ok({
      message: "berhasil menyimpan data dokter",
      data: newRecord,
    });
  }

  public async imageUpload({ request, response, params }: HttpContextContract) {
    const { id } = params
    const payload = await request.validate(UploadImageDoctorValidator)
    const data = await Doctor.findOrFail(id)
    const imageName = `doctor_${id}.${payload.image.extname}`

    await payload.image.moveToDisk('doctors', { name: imageName, overwrite: true })

    const beHost = "localhost:3333"
    const imageUrl = beHost + await Drive.getUrl('doctors/' + imageName)

    await data.merge({ imageId: imageName }).save()

    response.ok({
      message: "Upload Success",
      data,
      image_url: imageUrl
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Doctor.query()
      .where("id", id)
      .preload("employee", (employeeQuery) => {
        employeeQuery.select("name", "email", "phone_number");
      })
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data dokter",
      data: data,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateDoctorValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const doctor = await Doctor.findOrFail(id);
    doctor.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data dokter",
      data: doctor,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const doctor = await Doctor.query()
      .where("id", id)
      .preload("employee", (employee) => employee.select("name"))
      .firstOrFail();
    await doctor.delete();

    response.ok({
      message: `Berhasil menghapus data ${doctor.employee.name}`,
      data: {},
    });
  }
}
