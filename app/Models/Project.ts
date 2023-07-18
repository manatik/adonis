import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Cemetery from 'App/Models/Cemetery'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public cemeteryId: string

  @column()
  public name: string

  @column()
  public schema: string

  @column()
  public imageFolder: string

  @column()
  public hostingUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => Cemetery)
  public cemetery: HasOne<typeof Cemetery>
}
