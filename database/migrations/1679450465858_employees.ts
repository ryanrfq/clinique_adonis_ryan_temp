import BaseSchema from "@ioc:Adonis/Lucid/Schema"
import { Gender, EmployeeRole } from "Contracts/enums"

export default class extends BaseSchema {
  protected tableName = "employees"

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().notNullable()
      table.string("name", 50)
      // table.string("username").unique()
      // table.string("password")
      table.string("nik", 16).unique()
      table.enum("role", Object.values(EmployeeRole))
      table.date("join_date")
      table.string("phone_number", 16)
      table.text("address")
      // table.string("email").unique()
      table.string("specialization")
      table.enum("gender", Object.values(Gender))

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
