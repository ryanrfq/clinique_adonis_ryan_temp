import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('name', 50)
      table.string('username')
      table.string('password')
      table.string('nik', 16)
      table.enum('role', ['doctor', 'employee', 'pharmacy', 'admin'])
      table.date('join_date')
      table.string('phone_number', 16)
      table.text('address')
      table.string('email')
      table.string('specialization')
      table.enum('gender', ['M', 'F'])

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
