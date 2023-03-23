import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient';
import { v4 as uuidv4 } from 'uuid'

export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    // const data = await Database.from("patients");
    const data = await Patient.all();

    response.ok({
      message: "Berhasil mengambil data semua pasien",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await Patient.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data pasien",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    // const selectedData = await Database.from("patients").where("id", id);
    const selectedData = await Patient.findOrFail(id);

    response.ok({
      message: "Berhasil mengambil data pasien",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await Patient.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data pasien",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Patient.findOrFail(id)
    await data.delete()

    response.ok({
      message: `Berhasil menghapus data pasien ${data.id}`,
      data: {},
    });
  }
}
