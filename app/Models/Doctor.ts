import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public employeeId: string
  
  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>

  @column()
  public licenseNumber: string

  @column()
  public specialization: string

  @column()
  public fee: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
