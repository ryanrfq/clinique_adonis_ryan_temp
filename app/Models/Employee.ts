import { DateTime } from "luxon";
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4 } from "uuid";
import User from "./User";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public userId: string;

  @column()
  public name: string;

  @column()
  public nik: string;

  @column()
  public role: string;

  @column.date()
  public joinDate: DateTime;

  @column()
  public phoneNumber: string;

  @column()
  public address: string;


  @column()
  public specialization: string | null;

  @column()
  public gender: string

  @column()
  public imageId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async newId(employee: Employee) {
    if (!(employee.id)) {
      employee.id = uuidv4()
    }
  }
}
