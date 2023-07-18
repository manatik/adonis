import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserNoteTaskEnum from 'App/Enums/User-note-task-enum'

export default class extends BaseSchema {
  protected tableName = 'notes_and_tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().notNullable().primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
      table.uuid('project_id').references('projects.id').notNullable().onDelete('CASCADE')

      table
        .enum('type', [UserNoteTaskEnum.NOTE, UserNoteTaskEnum.TASK], {
          useNative: true,
          enumName: 'work_type',
        })
        .notNullable()
      table.string('description').notNullable()
      table.geometry('geometry').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
      table.timestamp('complete_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
