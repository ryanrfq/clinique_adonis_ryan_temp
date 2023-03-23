import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee';
import { v4 as uuidv4 } from 'uuid'

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {
    const data = await Employee.all();

    response.ok({
      message: "Berhasil mengambil data karyawan",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const objEmployee = request.body();

    const newRecord = await Employee.create({
      id: uuidv4(),
      ...objEmployee,
    });

    response.created({
      message: "Berhasil menyimpan data karyawan",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const employeeData = await Employee.findOrFail(id);

    response.ok({
      message: "Berhasil mengambil data karyawan",
      data: employeeData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const newEmployeeData = request.body();
    const employee = await Employee.findOrFail(id);
    employee.merge(newEmployeeData).save();

    response.ok({
      message: "Berhasil mengubah data karyawan",
      data: employee
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const employee = await Employee.findOrFail(id);
    await employee.delete();

    response.ok({
      message: `Berhasil menghapus data karyawan ${employee.name}`,
      data: {},
    });
  }
}
