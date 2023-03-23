import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionDetail from 'App/Models/TransactionDetail';
import { v4 as uuidv4 } from 'uuid'

export default class TransactionDetailsController {
  public async index({ response }: HttpContextContract) {
    const data = await TransactionDetail.query().preload("transaction");

    response.ok({
      message: "Berhasil mengambil data semua detail transaksi",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const newObj = request.body();

    const newRecord = await TransactionDetail.create({
      id: uuidv4(),
      ...newObj,
    });

    response.created({
      message: "Berhasil menyimpan data detail transaksi",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await TransactionDetail.query()
      .where("id", id)
      .preload("transaction")
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data detail transaksi",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const reqBody = request.body();

    const data = await TransactionDetail.findOrFail(id);
    data.merge(reqBody).save();

    response.ok({
      message: "Berhasil mengubah data detail transaksi",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await TransactionDetail.findOrFail(id)
    await data.delete()

    response.ok({
      message: "Berhasil menghapus data detail transaksi",
      data: {},
    });
  }
}
