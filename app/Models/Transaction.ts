import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ClinicQueue from './ClinicQueue'
import MedicalRecord from './MedicalRecord'
import TransactionDetail from './TransactionDetail'
import { v4 as uuidv4 } from "uuid";

export default class Transaction extends BaseModel {
  public serializeExtras() {
    return {
      total_transaction_detail: this.$extras.td_count
    }
  }

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

  @hasMany(() => TransactionDetail)
  public transactionDetail: HasMany<typeof TransactionDetail>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async newId(transaction: Transaction) {
    transaction.id = uuidv4()
  }
}
