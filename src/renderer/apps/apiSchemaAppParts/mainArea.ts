import AppDirEnt from "@Structure/fileSysstem/dirEnt"
import OpenAPI from "../../../structure/openAPI/openAPI"
import ApiSchemaConverter from "./apiSchemaConverter"
import InfoTable from "./mainAreaParts/infoTable"
import OperationSheets from "./mainAreaParts/operationSheets"
import PathTable from "./mainAreaParts/pathTable"
import StartPage from "./mainAreaParts/startPage"

const elementId = 'main-area'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class MainArea {
  #startPage: StartPage
  #infoTable: InfoTable
  #pathLists: PathTable
  #operationSheets: OperationSheets

  #element
  constructor(onFolderOpenButtonClick: () => Promise<void>) {
    this.#element = element()
    this.#startPage = new StartPage(onFolderOpenButtonClick)
    this.#element.appendChild(this.#startPage.element)
  }
  get element() {
    return this.#element
  }

  loadData(apiSchema: OpenAPI) {
    const { info, path, operations } = ApiSchemaConverter.schemaToViewJson(apiSchema)
    this.#infoTable = new InfoTable(info)
    this.#pathLists = new PathTable()
    this.#operationSheets = new OperationSheets()

    this.#pathLists.loadData(path, (v: string) => { this.#operationSheets.updatePathValue(v, undefined) })
    this.#operationSheets.loadData(operations)

    this.#element.innerHTML = ''
    this.#element.appendChild(this.#infoTable.element)
    this.#element.appendChild(this.#pathLists.element)
    this.#element.appendChild(this.#operationSheets.element)

  }
}

export default MainArea