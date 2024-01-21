import OpenAPI from "../../../structure/openAPI/openAPI"
import ApiSchemaConverter from "./apiSchemaConverter"
import InfoTable from "./mainAreaParts/infoTable"
import OperationSheets from "./mainAreaParts/operationSheets"
import PathTable from "./mainAreaParts/pathTable"

const elementId = 'main-area'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class MainArea {
  #infoTable
  #pathLists
  #operationSheets

  #element
  constructor() {
    this.#infoTable = new InfoTable()
    this.#pathLists = new PathTable()
    this.#operationSheets = new OperationSheets()

    this.#element = element()
    this.#element.appendChild(this.#infoTable.element)
    this.#element.appendChild(this.#pathLists.element)
    this.#element.appendChild(this.#operationSheets.element)
  }
  get element() {
    return this.#element
  }

  loadData(apiSchema: OpenAPI) {
    const { info, path, operations } = ApiSchemaConverter.schemaToViewJson(apiSchema)
    this.#infoTable.loadData(info)
    this.#pathLists.loadData(path, (v: string) => { this.#operationSheets.updatePathValue(v, undefined) })
    this.#operationSheets.loadData(operations)
  }
}

export default MainArea