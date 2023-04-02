import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    password_new: schema.string({ trim: true }, [rules.confirmed()])
  })

  public messages: CustomMessages = {}
}
