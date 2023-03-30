import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UploadImagePatientValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    image: schema.file({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'gif', 'png']
    })
  })

  public messages: CustomMessages = {}
}
