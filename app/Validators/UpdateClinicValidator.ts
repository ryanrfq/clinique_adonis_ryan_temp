import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateClinicValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doctor_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.unique({ table: "clinics", column: "doctor_id" }),
    ]),
    name: schema.string.optional({ trim: true }, [
      rules.alphaNum({ allow: ["space", "dash", "underscore"] }),
    ]),
    room: schema.string.optional({ trim: true }, [
      rules.alphaNum({ allow: ["space", "dash", "underscore"] }),
    ]),
    daily_quota: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}
