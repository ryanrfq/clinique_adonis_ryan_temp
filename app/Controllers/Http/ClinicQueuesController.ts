import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ClinicQueue from 'App/Models/ClinicQueue';
import { v4 as uuidv4 } from 'uuid'

export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    const data = await ClinicQueue.all()

    response.ok({
      message: "Berhasil mengambil data semua antrian klinik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await ClinicQueue.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data antrian klinik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    // const selectedData = await Database.from("clinic_queues").where("id", id);
    const selectedData = await ClinicQueue.findOrFail(id)

    response.ok({
      message: "Berhasil mengambil data antrian klinik",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await ClinicQueue.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data antrian klinik",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await ClinicQueue.findOrFail(id)
    await data.delete()

    response.ok({
      message: "Berhasil menghapus data antrian klinik",
      data: {},
    });
  }
}
