import { isMainThread, parentPort } from 'node:worker_threads'
import { Book } from '../proto/crawler/Book'
import { Legado } from './legado/Legado'

const legado = new Legado()

if (isMainThread) {
  console.log('This program is not tended to run directly.')
} else {
  try {
    parentPort?.emit('ready')
    parentPort?.on('cache', (book: Book) => {
      if (book.oriSource == null) return
      const source = legado.getSource(book.oriSource)
      if (source != null) {
        if (book.title != null) {
          source.searchByBookName(book.title, 0).then((value) => {
            // TODO: implement download book info
          }).catch((reason) => {
            console.log(reason)
          })
        }
        // TODO: search book with artist name
      }
    })
  } catch (e) {
    parentPort?.emit('exit', e)
  }
}
