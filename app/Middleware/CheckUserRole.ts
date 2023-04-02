import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class CheckUserRole {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>, roles?: string[]) {
    const user = await User.query()
      .where('id', auth.user!.id)
      .firstOrFail()

    // TODO: coba tambah rule: or roles === undefined
    if (!(roles?.includes(user.role))) {
      return response.unauthorized({
        message: "Tidak diizinkan melakukan operasi ini"
      })
    }

    await next()
  }
}
