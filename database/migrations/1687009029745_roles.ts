import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('name').notNullable().unique()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([{ name: 'user' }, { name: 'admin' }])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
