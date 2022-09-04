import BaseBook from './BaseBook'
import BaseChapter from './BaseChapter'

export default interface BaseSource<T extends BaseBook<K>, K extends BaseChapter> {
  searchByBookName: (name: string, page: number) => T[]
  searchByArtistName: (name: string, page: number) => T[]
  listDiscoverCategory: () => string[]
  discoverByCategory: (page: number) => T[]
}
