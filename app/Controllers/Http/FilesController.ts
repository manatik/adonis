import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from "node:path";
import { parseRange } from "App/Utils/parseRange";

export default class FilesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { range } = request.headers()
      const { name } = request.qs()

      if (!range) {
        return response.status(400);
      }

      const pathToVideo = path.join(Application.tmpPath('videos'), name);
      const stats = await fsp.stat(pathToVideo);

      const { start = 0, end } = parseRange(range);

      console.log('range', range, start, end);
      const chunkSize = 10 ** 6;
      const stream = fs.createReadStream(pathToVideo, { start, end });

      let resRange = `bytes ${start}-${end || start + chunkSize}/${stats.size}`;

      console.log(resRange);

      response.header('content-type', 'video/mp4')
      response.header("Accept-Ranges", "bytes")
      response.header("Content-Range", resRange)
      response.header("Content-Length", stats.size);

      return response.status(206).stream(stream)
    } catch (e) {
      return response.send(e);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const videoFile = request.file('video');

    const imageFiles = request.files('images')

    if (videoFile) {
      await videoFile.move(Application.tmpPath('videos'))
    }

    if (imageFiles.length) {
      for (const file of request.files('images')) {
        await file.move(Application.tmpPath('uploads'))
      }
    }

    return response.send('ok vse');
  }

  public async show({}: HttpContextContract) {
  }

  public async edit({}: HttpContextContract) {
  }

  public async update({}: HttpContextContract) {
  }

  public async destroy({}: HttpContextContract) {
  }
}
