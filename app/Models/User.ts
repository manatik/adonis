import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from 'App/Models/Role'
import Municipality from 'App/Models/Municipality'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'municipality_id' })
  public municipalityId: string

  @column()
  public email: string

  @column()
  public firstname: string

  @column()
  public lastname: string | null

  @column({ serializeAs: null })
  public password: string

  @column({ columnName: 'remember_me_token' })
  public rememberMeToken: string | null

  @column.dateTime()
  public dob: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime | null

  @column.dateTime()
  public deletedAt: DateTime | null

  @column.dateTime()
  public activatedAt: DateTime | null

  @manyToMany(() => Role, {
    pivotTable: 'users_roles',
  })
  public roles: ManyToMany<typeof Role>

  @hasOne(() => Municipality)
  public municipality: HasOne<typeof Municipality>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
