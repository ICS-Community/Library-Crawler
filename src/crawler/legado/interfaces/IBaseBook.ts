import IBaseChapter from './IBaseChapter'

import { Book } from '../../../proto/crawler/Book'

export default interface IBaseBook extends Book {
  getBookName: () => string | Promise<string>
  getArtistName: () => string | Promise<string>
  getBookIntro: () => string | Promise<string>
  getUpdateTime: () => Date | Promise<Date>
  getIndex: () => Promise<IBaseChapter[]>
  getAlbumUrl: () => string | Promise<string>
}
