import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Project from 'App/Models/Project'

export default class UserProjectPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public projectId: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @hasOne(() => Project)
  public project: HasOne<typeof Project>
}