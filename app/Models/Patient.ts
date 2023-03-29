import { DateTime } from "luxon";
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Employee from "./Employee";
import MedicalRecord from "./MedicalRecord";
import { v4 as uuidv4 } from "uuid";

export default class Patient extends BaseModel {
  public serializeExtras() {
    return {
      total_medical_records: this.$extras.mr_count
    }
  }

  @column({ isPrimary: true })
  public id: string;

  @column()
  public registBy: string;

  @belongsTo(() => Employee, {
    foreignKey: "registBy"
  })
  public employee: BelongsTo<typeof Employee>;

  @column()
  public status: string;

  @column()
  public gender: string;

  @column()
  public address: string;

  @column()
  public phone: string;

  @column.date()
  public birthday: DateTime;

  @column()
  public email: string;

  @column()
  public name: string;

  @column()
  public username: string;

  @column()
  public password: string;

  @column.dateTime()
  public registerDate: DateTime;

  @column()
  public nik: string;

  @column()
  public isVerified: boolean;

  @hasMany(() => MedicalRecord)
  public medicalRecord: HasMany<typeof MedicalRecord>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async newId(patient: Patient) {
    patient.id = uuidv4()
  }
}
