import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { RegQueueStatus } from "Contracts/enums";

export default class CreateRegistrationQueueValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    clinic_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "clinics", column: "id" }),
    ]),
    // queueNumber: schema.number(),
    time: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    status: schema.enum(Object.values(RegQueueStatus)),
  });

  public messages: CustomMessages = {};
}
