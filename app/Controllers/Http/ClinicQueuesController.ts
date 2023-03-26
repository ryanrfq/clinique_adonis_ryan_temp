import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ClinicQueue from "App/Models/ClinicQueue";
import CreateClinicQueueValidator from "App/Validators/CreateClinicQueueValidator";
import UpdateClinicQueueValidator from "App/Validators/UpdateClinicQueueValidator";
import { v4 as uuidv4 } from "uuid";

export default class PatientsController {
  public async index({ response, params }: HttpContextContract) {
    const { clinic_id } = params;
    const data = await ClinicQueue.query()
      .where("clinic_id", clinic_id)
      .preload("registrationQueue")
      .preload("clinic");

    response.ok({
      message: "Berhasil mengambil data semua antrian klinik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response, params }: HttpContextContract) {
    const { clinic_id } = params;
    const payload = await request.validate(CreateClinicQueueValidator);

    const newRecord = await ClinicQueue.create({
      id: uuidv4(),
      clinicId: clinic_id,
      ...payload,
    });

    response.created({
      message: "Berhasil menyimpan data antrian klinik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await ClinicQueue.query()
      .where("id", id)
      .preload("registrationQueue")
      .preload("clinic")
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data antrian klinik",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateClinicQueueValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await ClinicQueue.findOrFail(id);
    data.merge(payload).save();
    response.ok({
      message: "Berhasil mengubah data antrian klinik",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await ClinicQueue.findOrFail(id);
    await data.delete();

    response.ok({
      message: "Berhasil menghapus data antrian klinik",
      data: {},
    });
  }
}
