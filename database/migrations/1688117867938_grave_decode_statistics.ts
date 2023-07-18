import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'grave_decode_statistics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')

      table.uuid('grave_uuid').notNullable()
      table.string('schema')
      table.jsonb('updated_fields')
      table.integer('seconds_spent').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
