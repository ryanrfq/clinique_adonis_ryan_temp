import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePatientValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    regist_by: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "employees", column: "id" }),
    ]),
    user_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "users", column: "id" }),
      rules.unique({ table: "patients", column: "id" }),
    ]),
    status: schema.enum(["menikah", "lajang"]),
    gender: schema.enum(["M", "F"]),
    address: schema.string({ trim: true, escape: true }),
    phone: schema.string({ trim: true }, [
      rules.regex(new RegExp("^[0-9]+$")),
      rules.minLength(10),
      rules.maxLength(16),
    ]),
    birthday: schema.date({ format: "yyyy-MM-dd" }),
    // email: schema.string({ trim: true }, [
    //   rules.email(),
    //   rules.unique({ table: "patients", column: "email" }),
    // ]),
    name: schema.string({ trim: true, escape: true }, [
      rules.alphaNum({ allow: ["space"] }),
      rules.maxLength(50),
    ]),
    // username: schema.string({ trim: true, escape: true }, [
    //   rules.alphaNum({
    //     allow: ["underscore"],
    //   }),
    //   rules.unique({ table: "patients", column: "username" }),
    // ]),
    // password: schema.string({ trim: true }, [rules.confirmed()]),
    // register_date: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    nik: schema.string({ trim: true }, [
      rules.regex(new RegExp("^[0-9]+$")),
      rules.minLength(16),
      rules.maxLength(16),
      rules.unique({ table: "patients", column: "nik" }),
    ]),
    is_verified: schema.boolean(),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {};
}
