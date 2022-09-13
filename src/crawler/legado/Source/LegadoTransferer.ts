import fs from 'fs/promises'
import path from 'path'
import IBaseBook from '../interfaces/IBaseBook'
import IBaseChapter from '../interfaces/IBaseChapter'
import IBaseSource from '../interfaces/IBaseSource'

export const sources: LegadoBaseSource[] = []

export abstract class LegadoBaseSource implements IBaseSource {
  abstract name: string
  abstract searchByBookName (name: string, page: number): Promise<LegadoBaseBook[]>
  abstract searchByArtistName (name: string, page: number): Promise<LegadoBaseBook[]>
  abstract listDiscoverCategory (): Promise<string[]>
  abstract discoverByCategory (name: string, page: number): Promise<LegadoBaseBook[]>
  abstract getBowserRequirement (): boolean
}

export abstract class LegadoBaseBook implements IBaseBook {
  abstract name: string
  abstract getBookName (): string | Promise<string>
  abstract getArtistName (): string | Promise<string>
  abstract getBookIntro (): string | Promise<string>
  abstract getUpdateTime (): Date | Promise<Date>
  abstract getIndex (): Promise<LegadoBaseChapter[]>
  abstract getAlbumUrl (): string | Promise<string>
}

export abstract class LegadoBaseChapter implements IBaseChapter {
  abstract name: string
  abstract getName (): string
  abstract getPublishTime (): Date | Promise<Date>
  abstract getContent (): string | Promise<string>
}

await fs.readdir('.').then((value) => {
  value.forEach(source => {
    import(path.join('.', source)).then((value) => {
      sources.push(new (class source extends LegadoBaseSource {
        constructor () {
          super()
          // TODO: implement book and chapter wrapper
          this.bookClass = new (class book extends LegadoBaseBook {
            name = value.bookSourceName
            getBookName (): string | Promise<string> {
              throw new Error('Method not implemented.')
            }

            getArtistName (): string | Promise<string> {
              throw new Error('Method not implemented.')
            }

            getBookIntro (): string | Promise<string> {
              throw new Error('Method not implemented.')
            }

            getUpdateTime (): Date | Promise<Date> {
              throw new Error('Method not implemented.')
            }

            async getIndex (): Promise<LegadoBaseChapter[]> {
              throw new Error('Method not implemented.')
            }

            getAlbumUrl (): string | Promise<string> {
              throw new Error('Method not implemented.')
            }
          })()
          this.chapterClass = new (class chapter extends LegadoBaseChapter {
            name = value.bookSourceName
            getName (): string {
              throw new Error('Method not implemented.')
            }

            getPublishTime (): Date | Promise<Date> {
              throw new Error('Method not implemented.')
            }

            getContent (): string | Promise<string> {
              throw new Error('Method not implemented.')
            }
          })()
        }

        name = value.bookSourceName
        bookClass: LegadoBaseBook
        chapterClass: LegadoBaseChapter
        async searchByBookName (_name: string, _page: number): Promise<LegadoBaseBook[]> {
          // TODO: implement searchByBookName wrapper
          return await new Promise((_resolve, reject) => {
            reject(new Error('not implement'))
          })
        }

        async searchByArtistName (_name: string, _page: number): Promise<LegadoBaseBook[]> {
          // TODO: implement searchByArtistName wrapper
          return await new Promise((_resolve, reject) => {
            reject(new Error('not implement'))
          })
        }

        async listDiscoverCategory (): Promise<string[]> {
          // TODO: implement listDiscoverCategory wrapper
          return await new Promise((_resolve, reject) => {
            reject(new Error('not implement'))
          })
        }

        async discoverByCategory (_name: string, _page: number): Promise<LegadoBaseBook[]> {
          // TODO: implement discoverByCategory wrapper
          return await new Promise((_resolve, reject) => {
            reject(new Error('not implement'))
          })
        }

        getBowserRequirement (): boolean {
          return false
        }
      })())
    }).catch((reason) => {
      throw new Error(reason)
    })
  })
})
