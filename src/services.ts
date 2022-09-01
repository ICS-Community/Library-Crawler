import {
  sendUnaryData, ServerUnaryCall, ServerWritableStream
} from '@grpc/grpc-js'
import { Empty } from './proto/google/protobuf/Empty'

import { Book } from './proto/crawler/Book'
import { BookContentReply } from './proto/crawler/BookContentReply'
import { BookRequest } from './proto/crawler/BookRequest'
import { BooksHandlers } from './proto/crawler/Books'
import { BookStatusReply } from './proto/crawler/BookStatusReply'
import { CrawlerVer } from './proto/crawler/CrawlerVer'
import { GetCrawlerVerHandlers } from './proto/crawler/GetCrawlerVer'

export const BooksServer: BooksHandlers = {
  GetBook (call: ServerUnaryCall<BookRequest, Book>, callback: sendUnaryData<Book>): void {
    // TODO: implement getBook
  },

  GetBookStatus (call: ServerUnaryCall<BookRequest, BookStatusReply>, callback: sendUnaryData<BookStatusReply>): void {
    // TODO: implement getBook
  },

  GetBookContent (call: ServerWritableStream<BookRequest, BookContentReply>): void {
    // TODO: implement getBook
  },

  RequestCacheBook (call: ServerUnaryCall<Book, Empty>, callback: sendUnaryData<Empty>): void {
    // TODO: implement RequestCacheBook
  }
}

export const CrawlerVerServer: GetCrawlerVerHandlers = {
  GetCrawlerVer (call: ServerUnaryCall<Empty, CrawlerVer>, callback: sendUnaryData<CrawlerVer>): void {
    // TODO: implement GetCrawlerVer
  }
}
