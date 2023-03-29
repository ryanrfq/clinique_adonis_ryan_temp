import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ClinicQueueStatus } from "Contracts/enums";

export default class UpdateClinicQueueValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    registration_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.unique({ table: "clinic_queues", column: "registration_id" }),
      rules.exists({ table: "registration_queues", column: "id" }),
    ]),
    // clinic_id: schema.string.optional({ trim: true }, [rules.uuid({ version: 4 })]),
    patient_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "patients", column: "id" }),
    ]),
    status: schema.enum.optional(Object.values(ClinicQueueStatus)),
  });

  public messages: CustomMessages = {};
}
