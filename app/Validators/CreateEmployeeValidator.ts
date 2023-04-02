import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Gender, EmployeeRole } from "Contracts/enums";

export default class CreateEmployeeValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    user_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.unique({ table: "doctors", column: "employee_id" }),
      rules.exists({ table: "users", column: "id" }),
    ]),
    name: schema.string({ trim: true, escape: true }, [
      rules.alphaNum({ allow: ["space"] }),
      rules.maxLength(50),
    ]),
    // username: schema.string({ trim: true, escape: true }, [
    //   rules.alphaNum({
    //     allow: ["underscore"],
    //   }),
    //   rules.unique({ table: "employees", column: "username" }),
    // ]),
    // password: schema.string({ trim: true, escape: true }, [rules.confirmed()]),
    nik: schema.string({ trim: true, escape: true }, [
      rules.regex(new RegExp("^[0-9]+$")),
      rules.minLength(16),
      rules.maxLength(16),
      rules.unique({ table: "employees", column: "nik" }),
    ]),
    role: schema.enum(Object.values(EmployeeRole)),
    join_date: schema.date({ format: "yyyy-MM-dd" }),
    phone_number: schema.string({ trim: true }, [
      rules.regex(new RegExp("^[0-9]+$")),
      rules.minLength(10),
      rules.maxLength(16),
    ]),
    address: schema.string({ escape: true, trim: true }),
    // email: schema.string({ escape: true, trim: true }, [
    //   rules.email(),
    //   rules.unique({ table: "employees", column: "email" }),
    // ]),
    specialization: schema.string.nullableAndOptional({ trim: true }),
    gender: schema.enum(Object.values(Gender)),
  });

  public messages: CustomMessages = {};
}
