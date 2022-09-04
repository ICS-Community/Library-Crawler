import { isMainThread, parentPort } from 'node:worker_threads'

if (isMainThread) {
  console.log('This program is not tended to run directly.')
} else {
  try {
    parentPort?.emit('ready')
    parentPort?.on('cache', (book) => {
      // TODO: implement requestcachebook
    })
  } catch (e) {
    parentPort?.emit('exit', e)
  }
}
