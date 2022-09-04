import BaseChapter from './BaseChapter'

export default interface BaseBook<T extends BaseChapter> {
  getBookName: () => string
  getArtistName: () => string
  getBookIntro: () => string
  getUpdateTime: () => Date
  getIndex: () => T[]
  getAlbumUrl: () => string
}
