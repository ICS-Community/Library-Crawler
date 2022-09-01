import { Book } from './proto/crawler/Book'
import { BookStatus } from './proto/crawler/BookStatus'

const books: Book[] = [
  { id: 1, title: 'AAA', status: BookStatus.CACHED },
  { id: 2, title: 'BBB', status: BookStatus.UPDATING }
]

export function getBook (book: Book): Book | undefined {
  for (const abook of books) {
    if (abook.id === book.id &&
      abook.oriId === book.oriId &&
      abook.oriSource === book.oriSource
    ) {
      return abook
    }
  }
}

export function hasBook (book: Book): boolean {
  return getBook(book) !== undefined
}
