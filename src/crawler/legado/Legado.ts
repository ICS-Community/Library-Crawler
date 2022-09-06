import { sources, BaseSource } from './Source/LegadoTransferer'

export class Legado {
  getSource (name: string): BaseSource | undefined {
    sources.forEach((value) => {
      if (value.name === name) {
        return value
      }
    })
    return undefined
  }
}
