import AppDirEnt from "@Structure/fileSysstem/dirEnt"
import OpenAPI from "../structure/openAPI/openAPI"
import ApiSchemaApp from "./apps/apiSchemaApp"
import { IAPISchemaService } from "../types/process/app"

const elementId = 'dock'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class Dock {
  #apiSchemaApp
  #element

  constructor(services: IAPISchemaService) {
    this.#apiSchemaApp = new ApiSchemaApp(services)
    this.#element = element()
    this.#element.appendChild(this.#apiSchemaApp.element)
  }

  get element() {
    return this.#element
  }

  loadAPISchema(data: OpenAPI) {
    this.#apiSchemaApp.loadData(data)
  }

  loadDirectoryTree(data: AppDirEnt) {
    this.#apiSchemaApp.loadDirTree(data)
  }
}

export default Dock