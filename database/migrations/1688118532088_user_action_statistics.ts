import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserActionObject from 'App/Enums/User-action-object'

export default class extends BaseSchema {
  protected tableName = 'user_action_statistics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
      table
        .uuid('municipality_id')
        .references('municipalities.id')
        .notNullable()
        .onDelete('CASCADE')
      table.string('schema').references('projects.schema').notNullable().onDelete('CASCADE')

      table
        .enum(
          'action_object',
          [
            UserActionObject.ALGORITHM,
            UserActionObject.PROJECT,
            UserActionObject.USER,
            UserActionObject.GRAVE,
            UserActionObject.CEMETERY,
            UserActionObject.PLACE,
            UserActionObject.MUNICIPALITY,
            UserActionObject.PLANNED_PLACE,
          ],
          { useNative: true, enumName: 'user_action_type' }
        )
        .defaultTo(UserActionObject.PROJECT)
        .notNullable()
      table.jsonb('changes_description')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "user_action_type"')
    this.schema.dropTable(this.tableName)
  }
}
