import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'

export default class PharmacistsController {
  public async index({ response }: HttpContextContract) {

    const data = await Database.from("pharmacists")

    response.ok({
      message: "Berhasil mengambil data semua apoteker",
      data: data
    });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const objPharmacists = request.body();
    
    // todo: join with employees
    const newRecord = await Database
      .table('pharmacists')
      .returning('*')
      .insert({ id: uuidv4(), ...objPharmacists})

    response.created({
      message: "Berhasil menyimpan data apoteker",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    
    const pharmacistData = await Database
      .from('pharmacists')
      .select('*')
      .where('id', id)
    
    response.ok({
      message: "Berhasil mengambil data apoteker",
      data: pharmacistData
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const newPharmacistData = request.body()

    const updatedData = await Database
      .from('pharmacists')
      .where('id', id)
      .update(newPharmacistData, '*')
    
    if (updatedData.length <= 0) {
      response.notFound({
        message: "Gagal update: data apoteker tidak ditemukan",
      });
    } else {
      response.ok({
        message: "Berhasil mengubah data apoteker",
        data: updatedData,
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const deletedRowsCount = await Database
    .from('pharmacists')
    .where('id', id)
    .delete()

    response.ok({
      message: "Berhasil menghapus data apoteker",
      data: {
        deletedRowsCount
      }
    })
  }
}
