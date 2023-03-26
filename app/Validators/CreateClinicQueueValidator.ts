import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateClinicQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    registration_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.unique({ table: "clinic_queues", column: "registration_id" }),
    ]),
    // clinic_id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    patient_id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    status: schema.enum(["new", "registered", "bail"]),
  });

  public messages: CustomMessages = {};
}
