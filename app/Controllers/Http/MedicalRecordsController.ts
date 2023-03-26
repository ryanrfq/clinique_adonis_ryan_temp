import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MedicalRecord from "App/Models/MedicalRecord";
import CreateMedicalRecordValidator from "App/Validators/CreateMedicalRecordValidator";
import UpdateMedicalRecordValidator from "App/Validators/UpdateMedicalRecordValidator";
import { v4 as uuidv4 } from "uuid";

export default class MedicalRecordsController {
  public async index({ response, params }: HttpContextContract) {
    const { patient_id } = params;
    const data = await MedicalRecord.query()
      .where("patient_id", patient_id)
      .preload("patient", (patientQuery) => {
        patientQuery.select(
          "id",
          "regist_by",
          "status",
          "gender",
          "address",
          "phone",
          "birthday",
          "email",
          "name",
          "register_date",
          "nik",
          "is_verified"
        );
      });

    response.ok({
      message: "Berhasil mengambil data semua rekam medik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response, params }: HttpContextContract) {
    const { patient_id } = params; // <- apakah ini perlu di validasi?
    const payload = await request.validate(CreateMedicalRecordValidator);
    const newRecord = await MedicalRecord.create({
      id: uuidv4(),
      patientId: patient_id,
      ...payload,
    });

    response.created({
      message: "Berhasil menyimpan data rekam medik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await MedicalRecord.query()
      .where("id", id)
      .preload("patient", (patientQuery) => {
        patientQuery.select(
          "id",
          "regist_by",
          "status",
          "gender",
          "address",
          "phone",
          "birthday",
          "email",
          "name",
          "register_date",
          "nik",
          "is_verified"
        );
      })
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data rekam medik",
      data: selectedData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateMedicalRecordValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const data = await MedicalRecord.findOrFail(id);
    data.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data rekam medik",
      data: data,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const data = await MedicalRecord.findOrFail(id);
    await data.delete();

    response.ok({
      message: "Berhasil menghapus data rekam medik",
      data: {},
    });
  }
}
