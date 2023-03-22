import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'

export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    const data = await Database.from("clinic_queues");

    response.ok({
      message: "Berhasil mengambil data semua antrian klinik",
      data: data,
    });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const reqBody = request.body();

    const newRecord = await Database.table("clinic_queues")
      .returning("*")
      .insert({ id: uuidv4(), ...reqBody });

    response.created({
      message: "Berhasil menyimpan data antrian klinik",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const selectedData = await Database.from("clinic_queues").where("id", id);

    response.ok({
      message: "Berhasil mengambil data antrian klinik",
      data: selectedData,
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const newData = request.body();

    const updatedData = await Database.from("clinic_queues")
      .where("id", id)
      .update(newData, "*");

    if (updatedData.length <= 0) {
      response.notFound({
        message: "Gagal update: data antrian klinik tidak ditemukan",
      });
    } else {
      response.ok({
        message: "Berhasil mengubah data antrian klinik",
        data: updatedData,
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const deletedRowsCount = await Database.from("clinic_queues")
      .where("id", id)
      .delete();

    response.ok({
      message: "Berhasil menghapus data antrian klinik",
      data: {
        deletedRowsCount,
      },
    });
  }
}
