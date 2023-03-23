import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'

export default class ClinicsController {
  public async index({ response }: HttpContextContract) {
    const data = await Database
      .from("clinics")
      .join('doctors', 'doctors.id', '=', 'clinics.doctor_id')
      .join('employees', 'doctors.employee_id', '=', 'employees.id')
      .select(
        'clinics.id','clinics.name'
        ,'doctors.id as doctor_id', 'employees.name as doctor_name'
        ,'clinics.daily_quota'
      )

    response.ok({
      message: "Berhasil mengambil data semua klinik",
      data: data,
    });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const objClinic = request.body();

    const newRecord = await Database.table("clinics")
      .returning("*")
      .insert({ id: uuidv4(), ...objClinic });

    response.created({
      message: "Berhasil menyimpan data klinik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const clinicData = await Database
      .from("clinics")
      .join('doctors', 'doctors.id', '=', 'clinics.doctor_id')
      .join('employees', 'doctors.employee_id', '=', 'employees.id')
      .select(
        'clinics.id','clinics.name'
        ,'doctors.id as doctor_id', 'employees.name as doctor_name'
        ,'clinics.daily_quota'
      )
      .where("clinics.id", id);

    response.ok({
      message: "Berhasil mengambil data klinik",
      data: clinicData,
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const newClinicData = request.body();

    const updatedData = await Database.from("clinics")
      .where("id", id)
      .update(newClinicData, "*");

    if (updatedData.length <= 0) {
      response.notFound({
        message: "Gagal update: data klinik tidak ditemukan",
      });
    } else {
      response.ok({
        message: "Berhasil mengubah data klinik",
        data: updatedData,
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const deletedRowsCount = await Database.from("clinics")
      .where("id", id)
      .delete();

    response.ok({
      message: "Berhasil menghapus data klinik",
      data: {
        deletedRowsCount,
      },
    });
  }
}
