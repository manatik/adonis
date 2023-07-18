import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class SignController {
  public async login({ request, response, auth, session }: HttpContextContract) {
    try {
      const dto = schema.create({
        email: schema.string({}, [rules.email(), rules.trim()]),
        password: schema.string({}, [rules.minLength(6)]),
      })

      const { email, password } = await request.validate({ schema: dto })

      const a = await auth.use('web').attempt(email, password, true)
      const b = await auth.use('api').attempt(email, password, { expiresIn: 60 * 1000 })
      return response.send({ ok: 'ok', kek: a, lol: b })
    } catch (e) {
      session.flash('errors', 'Bad payload')
      console.log(e)
      return response.badRequest({ error: e })
    }
  }

  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const dto = schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(6)]),
        firstname: schema.string({}),
      })

      const { email, password, firstname } = await request.validate({ schema: dto })

      await User.create({ email, password, firstname })

      const a = await auth.use('web').attempt(email, password)
      const b = await auth.use('api').attempt(email, password, { expiresIn: 60 * 1000 })

      return response.send({ ok: 'ok', kek: a, lol: b })
    } catch (e) {
      console.log(e)
      return response.badRequest({ error: e })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    await auth.use('api').logout()
    response.send({ success: true })
  }
}
