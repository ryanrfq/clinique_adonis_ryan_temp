import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";
import CreateEmployeeValidator from "App/Validators/CreateEmployeeValidator";
import UpdateEmployeeValidator from "App/Validators/UpdateEmployeeValidator";

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {
    const data = await Employee.query().select(
      "id",
      "name",
      "username",
      "nik",
      "role",
      "join_date",
      "phone_number",
      "address",
      "email",
      "specialization",
      "gender"
    );

    response.ok({
      message: "Berhasil mengambil data karyawan",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateEmployeeValidator);
    const newRecord = await Employee.create(payload);

    response.created({
      message: "Berhasil menyimpan data karyawan",
      data: newRecord,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const employeeData = await Employee.query()
      .where("id", id)
      .select(
        "id",
        "name",
        "username",
        "nik",
        "role",
        "join_date",
        "phone_number",
        "address",
        "email",
        "specialization",
        "gender"
      )
      .firstOrFail();

    response.ok({
      message: "Berhasil mengambil data karyawan",
      data: employeeData,
    });
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateEmployeeValidator);

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "Request body tidak boleh kosong",
      });
    }

    const employee = await Employee.findOrFail(id);
    employee.merge(payload).save();

    response.ok({
      message: "Berhasil mengubah data karyawan",
      data: employee,
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
