import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class Role {
  public async handle(
    { response, auth }: HttpContextContract,
    next: () => Promise<void>,
    guards: string[]
  ) {
    const roles = guards.map((guard) => Roles[guard.toUpperCase()])

    const user = await User.query()
      .where('email', auth.user?.email || '')
      .preload('roles')
      .first()

    if (!user?.roles?.some((role) => roles.includes(role.name))) {
      return response.unauthorized({ error: `This is restricted to ${guards.join(', ')} users` })
    }

    await next()
  }
}
