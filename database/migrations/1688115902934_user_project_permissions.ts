import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_project_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('project_id').references('projects.id').notNullable().onDelete('CASCADE')
      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
      table.unique(['project_id', 'user_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
