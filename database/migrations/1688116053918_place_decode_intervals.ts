import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'place_decode_intervals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')

      table.string('schema').notNullable()
      table.integer('offset').notNullable()
      table.string('count').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
