import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateMedicalRecordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doctor_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "doctors", column: "id" }),
    ]),
    // patient_id: schema.string.optional({ trim: true }, [
    //   rules.uuid({ version: 4 }),
    //   rules.unique({ table: "medical_records", column: "patient_id" }),
    // ]),
    complaint: schema.string.optional({ trim: true, escape: true }),
    diagnosis: schema.string.optional({ trim: true, escape: true }),
    time: schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }),
    treatment: schema.string.optional({ trim: true, escape: true }),
    weight: schema.number.optional(),
    blood_pressure: schema.string.optional({ trim: true }),
    notes: schema.string.optional({ trim: true, escape: true }),
    prescription: schema.string.optional({ trim: true, escape: true }),
  });

  public messages: CustomMessages = {};
}
