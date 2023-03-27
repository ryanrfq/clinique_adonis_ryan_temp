import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateDoctorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    employee_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "employees", column: "id" }),
    ]),
    license_number: schema.string.optional({ trim: true }, [
      rules.unique({ table: "doctors", column: "license_number" }),
    ]),
    specialization: schema.string.optional({ trim: true, escape: true }, [
      rules.alpha({
        allow: ["space", "dash", "underscore"],
      }),
    ]),
    fee: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}
