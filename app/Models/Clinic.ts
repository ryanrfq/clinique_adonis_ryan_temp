import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Doctor from './Doctor'

export default class Clinic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public doctorId: string
  
  @belongsTo(() => Doctor)
  public doctor: BelongsTo<typeof Doctor>
  
  @column()
  public name: string
  
  @column()
  public room: string
  
  @column()
  public daily_quota: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
