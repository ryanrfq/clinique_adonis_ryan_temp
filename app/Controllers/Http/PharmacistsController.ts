import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pharmacist from 'App/Models/Pharmacist';
import { v4 as uuidv4 } from 'uuid'

export default class PharmacistsController {
  public async index({ response }: HttpContextContract) {
    const data = await Pharmacist.query().preload(
      "employee",
      (employeeQuery) => {
        employeeQuery.select("name", "email", "phone_number");
      }
    );

    response.ok({
      message: "Berhasil mengambil data semua apoteker",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await Pharmacist.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data apoteker",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Pharmacist.query()
      .where("id", id)
      .preload("employee", (employeeQuery) => {
        employeeQuery.select("name", "email", "phone_number");
      })
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data apoteker",
      data: data,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await Pharmacist.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data apoteker",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const pharm = await Pharmacist.query()
      .where("id", id)
      .preload("employee", (employee) => employee.select("name"))
      .firstOrFail();
    await pharm.delete();

    response.ok({
      message: `Berhasil menghapus data ${pharm.employee.name}`,
      data: {},
    });
  }
}
