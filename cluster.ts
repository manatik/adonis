import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import process from 'node:process'

const numCPUs = availableParallelism()

export class Cluster {
  public static register(workers: Number, callback: Function): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`)

      let cpus = numCPUs - 1

      if (workers > cpus) cpus = numCPUs - 1

      for (let i = 0; i < cpus; i++) {
        cluster.fork()
      }

      cluster.on('online', function (worker) {
        console.log('Worker %s is online', worker.process.pid)
      })

      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`)
      })
    } else {
      callback()
    }
  }
}
