import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Employee from "App/Models/Employee"
import CreateEmployeeValidator from "App/Validators/CreateEmployeeValidator"
import UpdateEmployeeValidator from "App/Validators/UpdateEmployeeValidator"
import Drive from '@ioc:Adonis/Core/Drive'
import UploadImageEmployeeValidator from "App/Validators/UploadImageEmployeeValidator"

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Employee.query().select(
        "id", "name", "nik", "role", "join_date", "phone_number",
        "address", "specialization", "gender"
      )

      return response.ok({
        message: "Berhasil mengambil data karyawan",
        data: data,
      })
    } catch (error) {
      return response.internalServerError({
        message: "CO_EMP-11: Gagal mengambil data seluruh karyawan",
        error
      })
    }
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateEmployeeValidator)

    try {
      const newRecord = await Employee.create(payload)

      response.created({
        message: "Berhasil menyimpan data karyawan",
        data: newRecord,
      })
    } catch (error) {
      return response.internalServerError({
        message: "CO_EMP-34: Gagal menyimpan data karyawan baru",
        error
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const employeeData = await Employee.query()
        .where("id", id)
        .select(
          "id", "name", "nik", "role", "join_date",
          "phone_number", "address", "specialization", "gender"
        )
        .firstOrFail()

      return response.ok({
        message: "Berhasil mengambil data karyawan",
        data: employeeData,
      })
    } catch (error) {
      return response.badRequest({
        message: "CO_EMP-52: Gagal mengambil data karyawan",
        error
      })
    }

  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const payload = await request.validate(UpdateEmployeeValidator)

    if (JSON.stringify(payload) === "{}") {
      return response.badRequest({
        message: "CO_EMP-79: Request body tidak boleh kosong",
      })
    }

    try {
      const employee = await Employee.findOrFail(id)
      await employee.merge(payload).save()

      response.ok({
        message: "Berhasil mengubah data karyawan",
        data: employee,
      })
    } catch (error) {
      return response.badRequest({
        message: "CO_EMP-95: Gagal update data karyawan",
        error
      })
    }
  }

  public async imageUpload({ request, response, params }: HttpContextContract) {
    const { id } = params
    const payload = await request.validate(UploadImageEmployeeValidator)

    try {
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
    } catch (error) {
      return response.badRequest({
        message: "CO_EMP-106: Gagal upload image karyawan",
        error
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const employee = await Employee.findOrFail(id)
      await employee.delete()

      response.ok({ message: `Berhasil menghapus data karyawan ${employee.name}` })
    } catch (error) {
      return response.badRequest({
        message: "CO_EMP-133: Gagal hapus data karyawan",
        error
      })
    }
  }
}
