import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid("user_id").references("users.id").onUpdate("cascade").onDelete("cascade").after('id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("user_id")
    })
  }
}
