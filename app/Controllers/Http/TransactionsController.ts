import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/Transaction";
import CreateTransactionValidator from "App/Validators/CreateTransactionValidator";
import UpdateTransactionValidator from "App/Validators/UpdateTransactionValidator";
import { v4 as uuidv4 } from "uuid";

export default class TransactionsController {
  public async index({ response }: HttpContextContract) {
    const data = await Transaction.query()
      .preload("medicalRecord", (mdQuery) =>
        mdQuery.preload("patient")
      )
      .preload("clinicQueue")
      .preload("transactionDetail")

    response.ok({
      message: "Berhasil mengambil data semua transaksi",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateTransactionValidator);

    const newRecord = await Transaction.create({
      id: uuidv4(),
      ...payload,
    });

    response.created({
      message: "Berhasil menyimpan data transaksi",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await Transaction.query()
      .where("id", id)
      .preload("medicalRecord", (mdQuery) => mdQuery.preload("patient"))
      .preload("clinicQueue")
      .preload("transactionDetail")
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data transaksi",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateTransactionValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await Transaction.findOrFail(id);
    data.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data transaksi",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Transaction.findOrFail(id);
    await data.delete();

    response.ok({
      message: "Berhasil menghapus data transaksi",
      data: {},
    });
  }
}
