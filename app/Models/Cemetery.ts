import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Municipality from 'App/Models/Municipality'

export default class Cemetery extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public municipalityId: string

  @column()
  public name: string

  @column()
  public rgis_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @hasOne(() => Municipality)
  public municipality: HasOne<typeof Municipality>
}
