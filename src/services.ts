import {
  ServerUnaryCall,
  sendUnaryData,
  ServerWritableStream
} from '@grpc/grpc-js'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'

import { BooksHandlers } from './proto/crawler/Books'
import { Book } from './proto/crawler/Book'
import { BookRequest } from './proto/crawler/BookRequest'
import { BookStatusReply } from './proto/crawler/BookStatusReply'
import { BookContentReply } from './proto/crawler/BookContentReply'

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
