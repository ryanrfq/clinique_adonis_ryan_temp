import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    // role: schema.enum(Object.values(UserRole)),
    password: schema.string({ trim: true }, [rules.confirmed()]),
    isVerified: schema.boolean.optional()
  })

  public messages: CustomMessages = {}
}
