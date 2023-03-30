import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MedicalRecord from "App/Models/MedicalRecord";
import Patient from "App/Models/Patient";
import CreateMedicalRecordValidator from "App/Validators/CreateMedicalRecordValidator";
import UpdateMedicalRecordValidator from "App/Validators/UpdateMedicalRecordValidator";

export default class MedicalRecordsController {
  public async index({ response, params }: HttpContextContract) {
    const { patient_id } = params;
    const data = await Patient.query()
      .select(
        "id", "regist_by", "status", "gender", "address", "phone",
        "birthday", "email", "name", "register_date", "nik", "is_verified"
      )
      .preload('medicalRecord', mrq => {
        mrq.preload('doctor')
      })
      .where('id', patient_id)
      .firstOrFail()

    response.ok({
      message: "Berhasil mengambil data semua rekam medik",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response, params }: HttpContextContract) {
    const { patient_id } = params;
    await Patient.findOrFail(patient_id)

    const payload = await request.validate(CreateMedicalRecordValidator);

    const newRecord = await MedicalRecord.create({
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
        )
      })
      .preload("doctor")
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
