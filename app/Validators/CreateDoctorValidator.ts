import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateDoctorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    employee_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.unique({ table: "doctors", column: "employee_id" }),
    ]),
    license_number: schema.string({ trim: true }, [
      rules.unique({ table: "doctors", column: "license_number" }),
    ]),
    specialization: schema.string({ trim: true, escape: true }, [
      rules.alpha({
        allow: ["space", "dash", "underscore"],
      }),
    ]),
    fee: schema.number(),
  });

  public messages: CustomMessages = {};
}
