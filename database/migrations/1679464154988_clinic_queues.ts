import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clinic_queues'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('registration_id').references('registration_queues.id').onUpdate('cascade').onDelete('cascade')
      table.uuid('clinic_id').references('clinics.id').onUpdate('cascade').onDelete('cascade')
      table.uuid('patient_id').references('patients.id').onUpdate('cascade').onDelete('cascade')
      table.enum('status', ['registered', 'done', 'bail'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
