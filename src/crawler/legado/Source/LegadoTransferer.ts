import fs from 'fs/promises'
import path from 'path'
import IBaseBook from '../Base/IBaseBook'
import IBaseSource from '../Base/IBaseSource'

export const sources: BaseSource[] = []

export abstract class BaseSource implements IBaseSource {
  abstract name: string
  abstract searchByBookName (name: string, page: number): Promise<IBaseBook[]>
  abstract searchByArtistName (name: string, page: number): Promise<IBaseBook[]>
  abstract listDiscoverCategory (): Promise<string[]>
  abstract discoverByCategory (name: string, page: number): Promise<IBaseBook[]>
  abstract getBowserRequirement (): boolean
}

await fs.readdir('.').then((value) => {
  value.forEach(source => {
    import(path.join('.', source)).then((value) => {
      sources.push(new (class source extends BaseSource {
        name = value.bookSourceName
        async searchByBookName (_name: string, _page: number): Promise<IBaseBook[]> {
          // TODO: implement searchByBookName wrapper
          return await new Promise((_resolve, reject) => {
            reject(new Error('not implement'))
          })
        }

        async searchByArtistName (_name: string, _page: number): Promise<IBaseBook[]> {
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

        async discoverByCategory (_name: string, _page: number): Promise<IBaseBook[]> {
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
