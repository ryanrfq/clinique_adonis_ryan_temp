import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdatePharmacistValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    employee_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    license_number: schema.string.optional({ trim: true }, [
      rules.unique({ table: "pharmacists", column: "license_number" }),
    ]),
  });

  public messages: CustomMessages = {};
}
