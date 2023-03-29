import { DateTime } from "luxon";
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import RegistrationQueue from "./RegistrationQueue";
import Clinic from "./Clinic";
import Patient from "./Patient";
import { v4 as uuidv4 } from "uuid";

export default class ClinicQueue extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public registrationId: string;

  @belongsTo(() => RegistrationQueue, {
    foreignKey: "registrationId"
  })
  public registrationQueue: BelongsTo<typeof RegistrationQueue>;

  @column()
  public clinicId: string;

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>;

  @column()
  public patientId: string;

  @belongsTo(() => Patient)
  public patient: BelongsTo<typeof Patient>;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async newId(cq: ClinicQueue) {
    cq.id = uuidv4()
  }
}
