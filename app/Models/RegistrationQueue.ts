import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Clinic from './Clinic'

export default class RegistrationQueue extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public clinicId: string

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>

  @column.dateTime()
  public time: DateTime

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
