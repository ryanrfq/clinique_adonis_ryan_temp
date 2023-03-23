import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction';
import { v4 as uuidv4 } from 'uuid'

export default class TransactionsController {
  public async index({ response }: HttpContextContract) {
    const data = await Transaction.all();

    response.ok({
      message: "Berhasil mengambil data semua transaksi",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await Transaction.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data transaksi",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await Transaction.findOrFail(id);

    response.ok({
      message: "Berhasil mengambil data transaksi",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await Transaction.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data transaksi",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Transaction.findOrFail(id)
    await data.delete()

    response.ok({
      message: "Berhasil menghapus data transaksi",
      data: {},
    });
  }
}
