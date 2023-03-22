import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {

    const data = await Database.from("employees")

    response.ok({
      message: "Berhasil mengambil data karyawan",
      data: data
    });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const objEmployee = request.body();
    
    const newRecord = await Database
      .table('employees')
      .returning('*')
      .insert({ id: uuidv4(), ...objEmployee})

    response.created({
      message: "Berhasil menyimpan data karyawan",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    
    const employeeData = await Database
      .from('employees')
      .select('name', 'nik', 'role', 'join_date', 'email')
      .where('id', id)
    
    response.ok({
      message: "Berhasil mengambil data karyawan",
      data: employeeData
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const newEmployeeData = request.body()

    const updatedData = await Database
      .from('employees')
      .where('id', id)
      .update(newEmployeeData, '*')
    
    if (updatedData.length <= 0) {
      response.notFound({
        message: "Gagal update: data karyawan tidak ditemukan",
      });
    } else {
      response.ok({
        message: "Berhasil mengubah data karyawan",
        data: updatedData,
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const deletedRowsCount = await Database
    .from('employees')
    .where('id', id)
    .delete()

    response.ok({
      message: "Berhasil menghapus data",
      data: {
        deletedRowsCount
      }
    })
  }
}
