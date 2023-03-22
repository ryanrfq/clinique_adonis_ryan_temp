import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medical_records'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('doctor_id').references('doctors.id').onUpdate('cascade').onDelete('cascade')
      table.uuid('patient_id').references('patients.id').onUpdate('cascade').onDelete('cascade')
      table.text('complaint')
      table.text('diagnosis')
      table.timestamp('time')
      table.text('treatment')
      table.float('weight')
      table.string('blood_pressure')
      table.string('notes')
      table.string('prescription')


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
