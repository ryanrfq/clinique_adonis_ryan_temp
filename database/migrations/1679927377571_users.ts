import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserRole } from 'Contracts/enums';

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.enum('role', Object.values(UserRole)).defaultTo(UserRole.PATIENT)
      table.string('remember_me_token').nullable()
      table.boolean('is_verified').defaultTo(false)
      table.string('token')
      table.timestamp('token_expiry')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
      // table.timestamp('created_at', { useTz: true }).notNullable()
      // table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
