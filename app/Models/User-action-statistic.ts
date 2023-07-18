import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import UserActionObject from 'App/Enums/User-action-object'
import User from 'App/Models/User'
import Municipality from 'App/Models/Municipality'

export default class UserActionStatistic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public municipalityId: string

  @column()
  public actionObject: UserActionObject

  @column()
  public changesDescription: Record<string, any> | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => Municipality)
  public municipality: HasOne<typeof Municipality>

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
