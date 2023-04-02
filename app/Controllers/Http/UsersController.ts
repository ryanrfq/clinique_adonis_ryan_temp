import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class UsersController {
  // TODO: buat middleware untuk membatasi role. Hanya employee yg bisa akses..
  // ..tiap route dibatasi juga sesuai rolenya 

  // admin only; 
  public async index({ response }: HttpContextContract) {
    const data = await User.query().select('id', 'email', 'role')

    response.ok({
      message: "Berhasil mengambil data semua user",
      data: data,
    });
  }

  // public async create({}: HttpContextContract) {}

  // admin
  // seharusnya doctor bisa input data,
  // tapi hanya input user dengan role patient. (Masih nyari solusi)
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const newRecord = await User.create(payload);

    response.created({
      message: "Berhasil menyimpan data user",
      data: newRecord,
    });
  }

  // admin only
  // public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  // admin only
  // public async update({}: HttpContextContract) {}

  // admin only
  // public async destroy({}: HttpContextContract) {}
}
