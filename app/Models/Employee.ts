import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public password: string

  @column()
  public nik: string

  @column()
  public role: string

  @column.date()
  public joinDate: DateTime

  @column()
  public phoneNumber: string

  @column()
  public address: string

  @column()
  public email: string

  @column()
  public specialization: string

  @column()
  public gender: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
