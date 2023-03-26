import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateTransactionDetailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // transaction_id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    item: schema.string({ trim: true, escape: true }, [
      rules.alphaNum({
        allow: ["underscore", "dash", "space"],
      }),
    ]),
    cost: schema.number(),
  });

  public messages: CustomMessages = {};
}
