import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    clinic_queue_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    medical_record_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    total_cost: schema.number(),
    status: schema.enum(["paid", "unpaid"]),
  });

  public messages: CustomMessages = {};
}
