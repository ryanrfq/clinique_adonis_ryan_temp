import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateRegistrationQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    clinic_id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    time: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    status: schema.enum(["new", "registered", "bail"]),
  });

  public messages: CustomMessages = {};
}
