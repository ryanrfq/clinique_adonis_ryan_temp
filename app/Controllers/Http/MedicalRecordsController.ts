import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MedicalRecord from 'App/Models/MedicalRecord';
import { v4 as uuidv4 } from 'uuid'

export default class MedicalRecordsController {
  public async index({ response }: HttpContextContract) {
    const data = await MedicalRecord.all();

    response.ok({
      message: "Berhasil mengambil data semua rekam medik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await MedicalRecord.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data rekam medik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await MedicalRecord.findOrFail(id);

    response.ok({
      message: "Berhasil mengambil data rekam medik",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await MedicalRecord.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data rekam medik",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await MedicalRecord.findOrFail(id)
    await data.delete()

    response.ok({
      message: "Berhasil menghapus data rekam medik",
      data: {},
    });
  }
}
