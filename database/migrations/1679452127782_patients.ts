import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('regist_by').references('employees.id').onUpdate('cascade').onDelete('cascade')
      table.enum('status', ['menikah', 'lajang'])
      table.enum('gender', ['M', 'F'])
      table.text('address')
      table.text('phone')
      table.date('birthday')
      table.string('email')
      table.string('name')
      table.string('username')
      table.string('password')
      table.timestamp('register_date')
      table.string('nik')
      table.boolean('is_verified')

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
