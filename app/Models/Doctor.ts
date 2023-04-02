import { DateTime } from "luxon";
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4 } from "uuid";
import Employee from "./Employee";

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public employeeId: string;

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>;

  @column()
  public licenseNumber: string;

  @column()
  public specialization: string;

  @column()
  public fee: number;

  @column()
  public imageId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async newId(doctor: Doctor) {
    if (!(doctor.id)) {
      doctor.id = uuidv4()
    }
  }
}
