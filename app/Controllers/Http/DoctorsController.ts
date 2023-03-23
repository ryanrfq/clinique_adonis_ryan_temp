import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doctor from 'App/Models/Doctor';
import { v4 as uuidv4 } from 'uuid'

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
    const doctorObj = request.body();

    const newRecord = await Doctor.create({
      id: uuidv4(),
      ...doctorObj,
    });

    response.ok({
      message: "berhasil menyimpan data semua dokter",
      data: newRecord,
    });
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
    const reqBody = request.body();

    const doctor = await Doctor.findOrFail(id);
    doctor.merge(reqBody).save();

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
