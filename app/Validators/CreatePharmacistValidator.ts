import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePharmacistValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    employee_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.unique({ table: "pharmacists", column: "employee_id" }),
      rules.exists({ table: "employees", column: "id" }),
    ]),
    license_number: schema.string({ trim: true }, [
      rules.unique({ table: "pharmacists", column: "license_number" }),
    ]),
  });

  public messages: CustomMessages = {};
}
