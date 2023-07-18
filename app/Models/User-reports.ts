import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Municipality from 'App/Models/Municipality'
import User from 'App/Models/User'
import UserReportEntity from 'App/Enums/User-report-entity'

export default class UserReports extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public municipalityId: string

  @column()
  public name: string

  @column()
  public filename: string

  @column()
  public url: string

  @column()
  public entity: UserReportEntity

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