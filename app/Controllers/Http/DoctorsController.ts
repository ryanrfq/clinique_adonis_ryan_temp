import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'

export default class DoctorsController {
  public async index({ response }: HttpContextContract) {
    const allDoctors = await Database
      .from('doctors')
      
      response.ok({
        message: "Berhasil mengambil data seluruh dokter",
        data: allDoctors
      })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const doctorObj = request.body()
    
    // todo(optional): handling response untuk case duplicate foreign key
    const newRecord = await Database
      .table("doctors")
      .returning('*')
      .insert({ id: uuidv4(), ...doctorObj})

    response.ok({
      message: "berhasil menyimpan data semua dokter",
      data: newRecord
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    
    const doctorData = await Database
      .from('doctors')
      .where('id', id)
      
    // todo: handle response saat data tidak ditemukan
    response.ok({
      message: "Berhasil mengambil data dokter",
      data: doctorData
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const reqBody = request.body()
    
    const updatedData = await Database
      .from('doctors')
      .where('id', id)
      .update(reqBody, '*')
      
    if (updatedData.length <= 0) {
      response.notFound({
        message: "Gagal update: data dokter tidak ditemukan",
      });
    } else {
      response.ok({
        message: "Berhasil mengubah data dokter",
        data: updatedData,
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    
    const deletedRowsCount = await Database
      .from("doctors")
      .where("id", id)
      .delete();

    response.ok({
      message: "Berhasil menghapus data",
      data: {
        deletedRowsCount
      }
    })
  }
}
