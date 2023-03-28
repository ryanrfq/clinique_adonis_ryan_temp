import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'

export default class CheckRole {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, roles?: string[]) {

    const employee = await Employee.query()
      .where('id', auth.user!.employeeId)
      .firstOrFail()

    if (!(roles?.includes(employee.role))) {
      return response.unauthorized({
        message: "Tidak diizinkan melakukan operasi ini"
      })
    }

    await next()
  }
}
