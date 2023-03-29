import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Transaction from './Transaction'
import { v4 as uuidv4 } from "uuid";

export default class TransactionDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public transactionId: string

  @belongsTo(() => Transaction)
  public transaction: BelongsTo<typeof Transaction>

  @column()
  public item: string

  @column()
  public cost: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async newId(td: TransactionDetail) {
    td.id = uuidv4()
  }
}
