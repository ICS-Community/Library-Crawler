import IBaseChapter from './IBaseChapter'

export default interface IBaseBook {
  getBookName: () => string | Promise<string>
  getArtistName: () => string | Promise<string>
  getBookIntro: () => string | Promise<string>
  getUpdateTime: () => Date | Promise<Date>
  getIndex: () => Promise<IBaseChapter[]>
  getAlbumUrl: () => string | Promise<string>
}
