import OpenAPI from "../../structure/openAPI/openAPI"
import MainArea from "./apiSchemaAppParts/mainArea"
import SideMenu from "./apiSchemaAppParts/sideMenu"

const elementId = 'api-schema-app'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class ApiSchemaApp {
  #sideMenu
  #mainArea

  #element
  constructor() {
    this.#sideMenu = new SideMenu()
    this.#mainArea = new MainArea()

    this.#element = element()
    this.#element.appendChild(this.#sideMenu.element)
    this.#element.appendChild(this.#mainArea.element)
  }
  get element() {
    return this.#element
  }
  loadData(apiSchema: OpenAPI) {
    this.#mainArea.loadData(apiSchema)
  }
}

export default ApiSchemaApp