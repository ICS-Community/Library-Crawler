import IBaseChapter from './IBaseChapter'

export default interface IBaseBook {
  getBookName: () => string
  getArtistName: () => string
  getBookIntro: () => string
  getUpdateTime: () => Date
  getIndex: () => IBaseChapter[]
  getAlbumUrl: () => string
}
