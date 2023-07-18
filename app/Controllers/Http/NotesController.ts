import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserNoteTask from 'App/Models/User-note-task'
import UserNoteTaskEnum from 'App/Enums/User-note-task-enum'
import Database from '@ioc:Adonis/Lucid/Database'

export default class NotesController {
  public async index({}: HttpContextContract) {
    console.log(Database)
    await UserNoteTask.create({
      description: 'kekv',
      projectId: '',
      geometry: 'Point(0,0)',
      userId: '',
      type: UserNoteTaskEnum.TASK,
    })
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
