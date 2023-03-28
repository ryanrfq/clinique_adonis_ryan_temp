import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Employee from "./Employee";

export default class Patient extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
