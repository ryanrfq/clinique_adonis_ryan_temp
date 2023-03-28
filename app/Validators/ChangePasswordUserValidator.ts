import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "users", column: "id" }),
      // rules.unique({ table: "users", column: "employee_id" }),
    ]),
    password_new: schema.string({ trim: true }, [rules.confirmed()])
  })

  public messages: CustomMessages = {}
}
