import OpenAPI from "../structure/openAPI/openAPI"
import ApiSchemaApp from "./apps/apiSchemaApp"

const elementId = 'dock'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class Dock {
  #apiSchemaApp
  #element

  constructor() {
    this.#apiSchemaApp = new ApiSchemaApp()
    this.#element = element()
    this.#element.appendChild(this.#apiSchemaApp.element)
  }

  get element() {
    return this.#element
  }

  loadAPISchema(data: OpenAPI) {
    this.#apiSchemaApp.loadData(data)
  }
}

export default Dock