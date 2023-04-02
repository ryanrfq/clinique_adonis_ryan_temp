import { DateTime } from "luxon";
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Employee from "./Employee";
import MedicalRecord from "./MedicalRecord";
import { v4 as uuidv4 } from "uuid";
import User from "./User";

export default class Patient extends BaseModel {
  public serializeExtras() {
    return {
      total_medical_records: this.$extras.mr_count
    }
  }

  @column({ isPrimary: true })
  public id: string;

  @column()
  public userId: string;

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

  // @column()
  // public email: string;

  @column()
  public name: string;

  // @column()
  // public username: string;

  // @column()
  // public password: string;

  @column.dateTime()
  public registerDate: DateTime;

  @column()
  public nik: string;

  @column()
  public isVerified: boolean;

  @column()
  public imageId: string;

  @hasMany(() => MedicalRecord)
  public medicalRecord: HasMany<typeof MedicalRecord>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async newId(patient: Patient) {
    if (!(patient.id)) {
      patient.id = uuidv4()
    }
  }

  @beforeCreate()
  public static async setRegisterDate(patient: Patient) {
    patient.registerDate = DateTime.now()
  }
}
