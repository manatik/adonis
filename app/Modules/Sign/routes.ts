import Route from '@ioc:Adonis/Core/Route'
import SignController from 'App/Controllers/Http/SignController'

const Controller = new SignController()

Route.group(() => {
  Route.post('register', Controller.register)
  Route.get('login', Controller.login)
  Route.get('logout', Controller.logout)
}).prefix('sign')
