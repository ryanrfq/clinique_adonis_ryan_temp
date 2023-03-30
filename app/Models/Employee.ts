import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4 } from "uuid";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public username: string;

  @column()
  public password: string;

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
  public email: string;

  @column()
  public specialization: string | null;

  @column()
  public gender: string

  @column()
  public imageId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async newId(employee: Employee) {
    employee.id = uuidv4()
  }
}
