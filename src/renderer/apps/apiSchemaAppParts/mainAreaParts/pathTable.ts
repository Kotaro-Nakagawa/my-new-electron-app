import PathTableInterface from "./pathTableInterface"
import Header from "./pathTableParts/header"
import PathList from "./pathTableParts/pathList"

const elementId = 'path-table'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class PathTable {
  #header
  #list

  #element
  constructor() {
    this.#header = new Header()
    this.#list = new PathList()

    this.#element = element()
    this.#element.appendChild(this.#header.element)
    this.#element.appendChild(this.#list.element)
  }

  get element() {
    return this.#element
  }

  loadData(data: PathTableInterface, onPathUpdates: ((newValue: string, index: number) => void)) {
    this.#list.loadData(data.paths, data.completenss, onPathUpdates)
  }
}

export default PathTable