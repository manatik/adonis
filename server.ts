/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import { Cluster } from './cluster'

sourceMapSupport.install({ handleUncaughtExceptions: false })

async function bootstrap() {
  await new Ignitor(__dirname).httpServer().start()
}

Cluster.register(Number(2), bootstrap)
