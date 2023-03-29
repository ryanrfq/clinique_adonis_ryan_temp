import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { TransactionStatus } from "Contracts/enums";

export default class CreateTransactionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    clinic_queue_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "clinic_queues", column: "id" }),
    ]),
    medical_record_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "medical_records", column: "id" }),
    ]),
    total_cost: schema.number(),
    status: schema.enum(Object.values(TransactionStatus)),
  });

  public messages: CustomMessages = {};
}
