import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";
import CreateEmployeeValidator from "App/Validators/CreateEmployeeValidator";
import UpdateEmployeeValidator from "App/Validators/UpdateEmployeeValidator";
import Drive from '@ioc:Adonis/Core/Drive'
import UploadImageEmployeeValidator from "App/Validators/UploadImageEmployeeValidator";

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {
    const data = await Employee.query().select(
      "id", "name", "nik", "role", "join_date", "phone_number",
      "address", "specialization", "gender"
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
        "id", "name", "nik", "role", "join_date",
        "phone_number", "address", "specialization", "gender"
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

  public async imageUpload({ request, response, params }: HttpContextContract) {
    const { id } = params
    const payload = await request.validate(UploadImageEmployeeValidator)
    const data = await Employee.findOrFail(id)
    const imageName = `employee_${id}.${payload.image.extname}`

    await payload.image.moveToDisk('employees', { name: imageName, overwrite: true })

    const beHost = "localhost:3333"
    const imageUrl = beHost + await Drive.getUrl('employees/' + imageName)

    await data.merge({ imageId: imageName }).save()

    response.ok({
      message: "Upload Success",
      data,
      image_url: imageUrl
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const employee = await Employee.findOrFail(id);
    await employee.delete();

    response.ok({ message: `Berhasil menghapus data karyawan ${employee.name}` })
  }
}
