import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class PlaceDecodeInterval extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public schema: string

  @column()
  public offset: number

  @column()
  public count: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => User)
  public user: HasOne<typeof User>
}