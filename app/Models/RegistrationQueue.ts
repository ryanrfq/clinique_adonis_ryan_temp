import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Clinic from './Clinic'
import { v4 as uuidv4 } from "uuid";

export default class RegistrationQueue extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public clinicId: string

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>

  @column()
  public queueNumber: number

  @column.dateTime()
  public time: DateTime

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async newId(rq: RegistrationQueue) {
    rq.id = uuidv4()
  }
}
