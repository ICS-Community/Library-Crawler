import { Book } from './proto/crawler/Book'
import { BookStatus } from './proto/crawler/BookStatus'

export const books: Book[] = [
  { id: 1, title: 'AAA', status: BookStatus.CACHED },
  { id: 2, title: 'BBB', status: BookStatus.UPDATING }
]
