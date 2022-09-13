import { sources, LegadoBaseSource } from './Source/LegadoTransferer'

export class Legado {
  getSource (name: string): LegadoBaseSource | undefined {
    sources.forEach((value) => {
      if (value.name === name) {
        return value
      }
    })
    return undefined
  }
}
