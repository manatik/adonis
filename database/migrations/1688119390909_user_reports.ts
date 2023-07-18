import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserReportEntity from 'App/Enums/User-report-entity'

export default class extends BaseSchema {
  protected tableName = 'user_reports'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
      table
        .uuid('municipality_id')
        .references('municipalities.id')
        .notNullable()
        .onDelete('CASCADE')

      table.string('name').notNullable().unique()
      table.string('filename').notNullable().unique()
      table.string('url').notNullable()
      table
        .enum('entity', [UserReportEntity.GRAVE, UserReportEntity.PLACE], {
          useNative: true,
          enumName: 'object_type',
        })
        .notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "object_type"')
    this.schema.dropTable(this.tableName)
  }
}
