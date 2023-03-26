import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateRegistrationQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    clinic_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    time: schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }),
    status: schema.enum.optional(["new", "registered", "bail"]),
  });

  public messages: CustomMessages = {};
}
