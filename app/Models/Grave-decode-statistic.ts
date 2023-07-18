import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class GraveDecodeStatistic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public graveUuid: string

  @column()
  public schema: string | null

  @column()
  public updatedFields: Record<string, any> | null

  @column()
  public secondsSpent: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
