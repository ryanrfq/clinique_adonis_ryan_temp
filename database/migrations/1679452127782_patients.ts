import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { Gender, PatientStatus } from "Contracts/enums";

export default class extends BaseSchema {
  protected tableName = "patients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().notNullable();
      table
        .uuid("regist_by")
        .references("employees.id")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.enum("status", Object.values(PatientStatus));
      table.enum("gender", Object.values(Gender));
      table.text("address");
      table.text("phone");
      table.date("birthday");
      table.string("email");
      table.string("name");
      table.string("username");
      table.string("password");
      table.timestamp("register_date");
      table.string("nik").unique();
      table.boolean("is_verified");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
