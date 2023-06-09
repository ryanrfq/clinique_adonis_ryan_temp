import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegistrationQueue from "App/Models/RegistrationQueue";
import CreateRegistrationQueueValidator from "App/Validators/CreateRegistrationQueueValidator";
import UpdateRegistrationQueueValidator from "App/Validators/UpdateRegistrationQueueValidator";

export default class RegistrationQueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await RegistrationQueue.query().preload("clinic");

    response.ok({
      message: "Berhasil mengambil data semua antrian registrasi",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    // TODO: buat logika auto increment untuk nomor antrian
    const payload = await request.validate(CreateRegistrationQueueValidator);
    const newRecord = await RegistrationQueue.create({
      queueNumber: 1, // ... sementara seperti ini
      ...payload,
    });

    response.created({
      message: "Berhasil menyimpan data antrian registrasi",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await RegistrationQueue.query()
      .where("id", id)
      .preload("clinic")
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data antrian registrasi",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    // TODO: validasi supaya tidak menerima request body berupa nomor antrian
    // jika terjadi kesalahan dalam antrian dsb, silakan ambil nomor antrian baru trims
    const { id } = params;
    const payload = await request.validate(UpdateRegistrationQueueValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await RegistrationQueue.findOrFail(id);
    data.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data antrian registrasi",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await RegistrationQueue.findOrFail(id);
    await data.delete();

    response.ok({
      message: "Berhasil menghapus data antrian registrasi"
    });
  }
}
