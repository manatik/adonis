import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('note', 'NotesController')
}).middleware([])
