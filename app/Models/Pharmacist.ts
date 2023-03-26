import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Employee from "./Employee";

export default class Pharmacist extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public employeeId: string;

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>;

  @column()
  public licenseNumber: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
