import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ClinicQueue from './ClinicQueue'
import MedicalRecord from './MedicalRecord'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public clinicQueueId: string

  @belongsTo(() => ClinicQueue)
  public clinicQueue: BelongsTo<typeof ClinicQueue>

  @column()
  public medicalRecordId: string

  @belongsTo(() => MedicalRecord)
  public medicalRecord: BelongsTo<typeof MedicalRecord>
  
  @column()
  public totalCost: number

  @column()
  public status: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
