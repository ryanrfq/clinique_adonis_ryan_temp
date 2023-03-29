import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Doctor from './Doctor'
import Patient from './Patient'
import { v4 as uuidv4 } from "uuid";

export default class MedicalRecord extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public doctorId: string

  @belongsTo(() => Doctor)
  public doctor: BelongsTo<typeof Doctor>

  @column()
  public patientId: string

  @belongsTo(() => Patient)
  public patient: BelongsTo<typeof Patient>

  @column()
  public complaint: string

  @column()
  public diagnosis: string

  @column.dateTime()
  public time: DateTime

  @column()
  public treatment: string

  @column()
  public weight: number

  @column()
  public bloodPressure: string

  @column()
  public notes: string

  @column()
  public prescription: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async newId(medRec: MedicalRecord) {
    medRec.id = uuidv4()
  }
}