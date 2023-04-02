import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class CheckIsVerified {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    const user = await User.query()
      .where('id', auth.user!.id)
      .firstOrFail()

    if (!(user.isVerified)) {
      return response.unauthorized({
        message: "Tidak diizinkan melakukan operasi ini"
      })
    }

    await next()
  }
}
