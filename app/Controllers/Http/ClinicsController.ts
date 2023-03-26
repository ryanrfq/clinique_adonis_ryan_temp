import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Clinic from "App/Models/Clinic";
import CreateClinicValidator from "App/Validators/CreateClinicValidator";
import UpdateClinicValidator from "App/Validators/UpdateClinicValidator";
import { v4 as uuidv4 } from "uuid";

export default class ClinicsController {
  public async index({ response }: HttpContextContract) {
    const data = await Clinic.query().preload("doctor", (doctorQuery) => {
      doctorQuery.preload("employee", (employeeQuery) => {
        employeeQuery.select("name");
      });
    });

    response.ok({
      message: "Berhasil mengambil data semua klinik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClinicValidator);

    const newRecord = await Clinic.create({
      id: uuidv4(),
      ...payload,
    });

    response.created({
      message: "Berhasil menyimpan data klinik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Clinic.query()
      .where("id", id)
      .preload("doctor", (doctorQuery) => {
        doctorQuery.preload("employee", (employeeQuery) => {
          employeeQuery.select("name");
        });
      })
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data klinik",
      data: data,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateClinicValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await Clinic.findOrFail(id);
    data.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data klinik",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await Clinic.findOrFail(id);
    await data.delete();

    response.ok({
      message: "Berhasil menghapus data klinik",
      data: {},
    });
  }
}
