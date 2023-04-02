import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Doctor from './Doctor'
import { v4 as uuidv4 } from "uuid";
import ClinicQueue from './ClinicQueue'

export default class Clinic extends BaseModel {
  public serializeExtras() {
    return {
      total_queues: this.$extras.cq_count
    }
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public doctorId: string

  @belongsTo(() => Doctor)
  public doctor: BelongsTo<typeof Doctor>

  @hasMany(() => ClinicQueue)
  public clinicQueues: HasMany<typeof ClinicQueue>

  @column()
  public name: string

  @column()
  public room: string

  @column()
  public dailyQuota: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async newId(clinic: Clinic) {
    if (!(clinic.id)) {
      clinic.id = uuidv4()
    }
  }
}
