import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from "uuid";
import Employee from './Employee';
import Patient from './Patient';
import MyHelper from 'App/Helpers/MyHelper';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(() => Employee)
  public employee: HasOne<typeof Employee>

  @hasOne(() => Patient)
  public patient: HasOne<typeof Patient>

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column()
  public rememberMeToken: string | null

  @column()
  public isVerified: boolean

  @column()
  public token: string

  @column()
  public tokenExpiry: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async newId(user: User) {
    if (!(user.id)) {
      user.id = uuidv4()
    }
  }

  @beforeCreate()
  public static async generateToken(user: User) {
    if (!(user.isVerified)) {
      user.token = MyHelper.generateToken(15)
    }
  }

  @beforeCreate()
  public static async setTokenExpiry(user: User) {
    if (!(user.isVerified)) {
      user.tokenExpiry = DateTime.now().plus({ hours: 4 })
    }
  }
}
