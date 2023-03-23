import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import RegistrationQueue from 'App/Models/RegistrationQueue';
import { v4 as uuidv4 } from 'uuid'

export default class RegistrationQueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await RegistrationQueue.all()

    response.ok({
      message: "Berhasil mengambil data semua antrian registrasi",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await RegistrationQueue.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data antrian registrasi",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await RegistrationQueue.findOrFail(id)

    response.ok({
      message: "Berhasil mengambil data antrian registrasi",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await RegistrationQueue.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data antrian registrasi",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await RegistrationQueue.findOrFail(id)
    await data.delete()

    response.ok({
      message: "Berhasil menghapus data antrian registrasi",
      data: {},
    });
  }
}
