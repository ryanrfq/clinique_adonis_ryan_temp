import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class CheckEmployeeRole {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>, employeeRoles?: string[]) {
    const user = await User.query()
      .where('id', auth.user!.id)
      .preload('employee')
      .firstOrFail()

    if (!(employeeRoles?.includes(user.employee.role))) {
      return response.unauthorized({
        message: "Tidak diizinkan melakukan operasi ini"
      })
    }

    await next()
  }
}
