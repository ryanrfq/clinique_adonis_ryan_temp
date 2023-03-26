import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateMedicalRecordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doctor_id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    // patient_id: schema.string({ trim: true }, [
    //   rules.uuid({ version: 4 }),
    //   rules.unique({ table: "medical_records", column: "patient_id" }),
    // ]),
    complaint: schema.string({ trim: true, escape: true }),
    diagnosis: schema.string({ trim: true, escape: true }),
    time: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    treatment: schema.string({ trim: true, escape: true }),
    weight: schema.number(),
    blood_pressure: schema.string({ trim: true }),
    notes: schema.string({ trim: true, escape: true }),
    prescription: schema.string({ trim: true, escape: true }),
  });

  public messages: CustomMessages = {};
}
