import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdatePatientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    regist_by: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "employees", column: "id" }),
    ]),
    status: schema.enum.optional(["menikah", "lajang"]),
    gender: schema.enum.optional(["M", "F"]),
    address: schema.string.optional({ trim: true, escape: true }),
    phone: schema.string.optional({ trim: true }, [
      rules.regex(new RegExp("^[0-9]+$")),
      rules.minLength(10),
      rules.maxLength(16),
    ]),
    birthday: schema.date.optional({ format: "yyyy-MM-dd" }),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: "patients", column: "email" }),
    ]),
    name: schema.string.optional({ trim: true, escape: true }, [
      rules.alphaNum({ allow: ["space"] }),
      rules.maxLength(50),
    ]),
    username: schema.string.optional({ trim: true, escape: true }, [
      rules.alphaNum({
        allow: ["underscore"],
      }),
      rules.unique({ table: "patients", column: "username" }),
    ]),
    password: schema.string.optional({ trim: true }, [rules.confirmed()]),
    register_date: schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }),
    nik: schema.string.optional({ trim: true }, [
      rules.regex(new RegExp("^[0-9]+$")),
      rules.minLength(16),
      rules.maxLength(16),
      rules.unique({ table: "patients", column: "nik" }),
    ]),
    is_verified: schema.boolean.optional(),
  });

  public messages: CustomMessages = {};
}
