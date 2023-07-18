import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Project from 'App/Models/Project'
import UserNoteTaskEnum from 'App/Enums/User-note-task-enum'

export default class UserNoteTask extends BaseModel {
  public static table = 'notes_and_tasks'

  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public projectId: string

  @column()
  public type: UserNoteTaskEnum

  @column()
  public description: string

  @column()
  public geometry: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @column.dateTime()
  public completeAt: DateTime | null

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @hasOne(() => Project)
  public project: HasOne<typeof Project>
}
