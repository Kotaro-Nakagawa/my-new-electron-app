import PathSchemaCompleteness from "./pathSchemaCompleteness"
import PathTableRecord from "./pathTableRecord"

const elementId = 'path-list'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class PathList {
  #records: PathTableRecord[]

  #element
  constructor() {
    this.#element = element()
  }
  get element() {
    return this.#element
  }

  loadData(paths: string[], completenss: PathSchemaCompleteness[], onPathUpdates: ((newValue: string, index: number) => void)) {
    this.#records = paths.map((p, i) => new PathTableRecord(p, completenss[i], (p) => { onPathUpdates(p, i) }))
    this.#element.innerHTML = ''
    this.#records.forEach(r => this.#element.appendChild(r.element))
  }
}

export default PathList