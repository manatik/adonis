import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table
        .uuid('municipality_id')
        .references('municipalities.id')
        .notNullable()
        .onDelete('SET NULL')

      table.string('email').unique().notNullable().checkLength('<=', 12)
      table.string('firstname').notNullable()
      table.string('lastname').nullable()
      table.string('patronymic').nullable()
      table.string('password').notNullable()
      table.string('link').nullable().unique()
      table.string('remember_me_token').nullable()

      table.timestamp('dob', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamp('activated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName)
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
