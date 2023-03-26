import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TransactionDetail from "App/Models/TransactionDetail";
import CreateTransactionDetailValidator from "App/Validators/CreateTransactionDetailValidator";
import UpdateTransactionDetailValidator from "App/Validators/UpdateTransactionDetailValidator";
import { v4 as uuidv4 } from "uuid";

export default class TransactionDetailsController {
  public async index({ response, params }: HttpContextContract) {
    const { transaction_id } = params;
    const data = await TransactionDetail.query()
      .where("transaction_id", transaction_id)
      .preload("transaction", (transactionQuery) =>
        transactionQuery.preload("medicalRecord")
      );

    // ambigu, tidak ditemukan bisa berarti:
    // 1. belum ada data detailnya,
    // 2. tidak ada record utk transaction_id tsb
    if (data.length <= 0) {
      return response.badRequest({
        message: "Data detail tidak ditemukan",
      });
    }

    response.ok({
      message: "Berhasil mengambil data semua detail transaksi",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response, params }: HttpContextContract) {
    const { transaction_id } = params;
    const payload = await request.validate(CreateTransactionDetailValidator);

    const newRecord = await TransactionDetail.create({
      id: uuidv4(),
      transactionId: transaction_id,
      ...payload,
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
      .preload("transaction", (transactionQuery) =>
        transactionQuery.preload("medicalRecord")
      );

    response.ok({
      message: "Berhasil mengambil data detail transaksi",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateTransactionDetailValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await TransactionDetail.findOrFail(id);
    data.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data detail transaksi",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await TransactionDetail.findOrFail(id);
    await data.delete();

    response.ok({
      message: "Berhasil menghapus data detail transaksi",
      data: {},
    });
  }
}
