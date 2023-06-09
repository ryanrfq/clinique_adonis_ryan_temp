import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { RegQueueStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'registration_queues'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('clinic_id').references('clinics.id').onUpdate('cascade').onDelete('cascade')
      table.integer('queue_number')
      table.timestamp('time')
      table.enum('status', Object.values(RegQueueStatus))

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
