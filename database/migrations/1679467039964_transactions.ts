import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('clinic_queue_id').references('clinic_queues.id').onUpdate('cascade').onDelete('cascade')
      table.uuid('medical_record_id').references('medical_records.id').onUpdate('cascade').onDelete('cascade')
      table.float('total_cost')
      table.enum('status', ['paid', 'unpaid'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
