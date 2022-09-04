import {
  sendUnaryData, ServerUnaryCall, ServerWritableStream
} from '@grpc/grpc-js'

import { isMainThread, Worker } from 'worker_threads'
import path from 'path'
import fs from 'fs'

import { Empty } from '../proto/google/protobuf/Empty'

import { Book } from '../proto/crawler/Book'
import { BookContentReply } from '../proto/crawler/BookContentReply'
import { BooksHandlers } from '../proto/crawler/Books'
import { BookStatusReply } from '../proto/crawler/BookStatusReply'
import { CrawlerVer } from '../proto/crawler/CrawlerVer'
import { GetCrawlerVerHandlers } from '../proto/crawler/GetCrawlerVer'
import { RequestCacheBookReply } from '../proto/crawler/RequestCacheBookReply'
import { getBook, hasBook } from './db'
import { GetBookReply } from '../proto/crawler/GetBookReply'
import { BookStatus } from '../proto/crawler/BookStatus'

let worker: Worker
let isCrawlerReady = false
if (isMainThread) {
  worker = new Worker(path.join(__dirname, 'crawler.js'))
  worker.addListener('ready', () => {
    isCrawlerReady = true
  })
  worker.addListener('exit', () => {
    isCrawlerReady = false
  })
} else {
  throw new Error('isMainThread should be true')
}

export const BooksServer: BooksHandlers = {
  GetBook (call: ServerUnaryCall<Book, GetBookReply>, callback: sendUnaryData<GetBookReply>): void {
    // TODO: fuzzy search
    const book = getBook(call.request)
    if (book !== undefined) {
      callback(null, {
        books: [book]
      })
    }
  },

  GetBookStatus (call: ServerUnaryCall<Book, BookStatusReply>, callback: sendUnaryData<BookStatusReply>): void {
    if (hasBook(call.request)) {
      callback(null, {
        status: getBook(call.request)?.status
      })
    } else {
      callback(null, {
        status: BookStatus.UNCACHED
      })
    }
  },

  GetBookContent (call: ServerWritableStream<Book, BookContentReply>): void {
    const book = call.request
    if (book.id == null || book.oriId == null || book.oriSource == null) {
      call.write({
        code: 1,
        content: 'fail to fetch book'
      })
      call.end()
      return
    }
    if (hasBook(book) && fs.existsSync(path.join(__dirname, `download/${book.id}-${book.oriId}-${book.oriSource},json`))) {
      call.write({
        code: 0,
        content: fs.readFileSync(path.join(__dirname, `download/${book.id}-${book.oriId}-${book.oriSource},json`)).toString()
      })
      call.end()
    } else {
      call.write({
        code: 1,
        content: 'fail to fetch book'
      })
      call.end()
    }
  },

  RequestCacheBook (call: ServerUnaryCall<Book, RequestCacheBookReply>, callback: sendUnaryData<RequestCacheBookReply>): void {
    if (isCrawlerReady) {
      worker.emit('requestCache', call.request)
      callback(null, {
        code: 0,
        message: 'request has been accepted'
      })
    } else {
      callback(null, {
        code: 1,
        message: 'crawler is not ready'
      })
    }
  }
}

export const CrawlerVerServer: GetCrawlerVerHandlers = {
  GetCrawlerVer (call: ServerUnaryCall<Empty, CrawlerVer>, callback: sendUnaryData<CrawlerVer>): void {
    // TODO: implement GetCrawlerVer
  }
}
