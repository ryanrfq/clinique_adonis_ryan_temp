import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    employee_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "employees", column: "id" }),
      rules.unique({ table: "users", column: "employee_id" }),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [rules.confirmed()])
  })

  public messages: CustomMessages = {}
}
