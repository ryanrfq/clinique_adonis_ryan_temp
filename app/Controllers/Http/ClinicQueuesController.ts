import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Clinic from "App/Models/Clinic";
import ClinicQueue from "App/Models/ClinicQueue";
import CreateClinicQueueValidator from "App/Validators/CreateClinicQueueValidator";
import UpdateClinicQueueValidator from "App/Validators/UpdateClinicQueueValidator";
export default class ClinicQueuesController {
  public async index({ response, params }: HttpContextContract) {
    const { clinic_id } = params;
    const data = await Clinic.query()
      .preload('clinicQueues', cq => {
        cq.preload("registrationQueue")
          .preload("patient")
      })
      .where('id', clinic_id)
      .firstOrFail()

    response.ok({
      message: "Berhasil mengambil data semua antrian klinik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response, params }: HttpContextContract) {
    const { clinic_id } = params;
    await Clinic.findOrFail(clinic_id)

    const clinic = await Clinic.query()
      .withCount('clinicQueues', (query) => {
        query.as('total_queue_today')
        query.whereRaw('created_at::date = CURRENT_DATE')
      })
      .where('id', clinic_id)
      .firstOrFail()

    if (clinic.$extras.total_queue_today >= clinic.dailyQuota) {
      return response.badRequest({ message: "Daily quota exceeded" })
    }

    const payload = await request.validate(CreateClinicQueueValidator);

    const newRecord = await ClinicQueue.create({
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
      .preload("patient")
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
