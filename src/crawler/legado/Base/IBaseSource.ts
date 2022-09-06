import IBaseBook from './IBaseBook'

export default interface IBaseSource {
  searchByBookName: (name: string, page: number) => Promise<IBaseBook[]>
  searchByArtistName: (name: string, page: number) => Promise<IBaseBook[]>
  listDiscoverCategory: () => Promise<string[]>
  discoverByCategory: (name: string, page: number) => Promise<IBaseBook[]>
  getBowserRequirement: () => boolean
}
