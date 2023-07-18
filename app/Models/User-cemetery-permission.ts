import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Cemetery from 'App/Models/Cemetery'
import User from 'App/Models/User'

export default class UserCemeteryPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public cemeteryId: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => Cemetery)
  public cemetery: HasOne<typeof Cemetery>

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
