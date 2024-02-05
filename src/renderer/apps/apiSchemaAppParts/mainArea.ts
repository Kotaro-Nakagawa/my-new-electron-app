import OpenAPI from "../../../structure/openAPI/openAPI"
import ApiSchemaConverter from "./mainAreaParts/apiSchemaConverter"
import NewSchemaMaker from "./mainAreaParts/newSchemaMaker"
import SchemaEditor from "./mainAreaParts/schemaEditor"
import StartPage from "./mainAreaParts/startPage"

const elementId = 'main-area'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class MainArea {
  #startPage: StartPage
  #schemaEditor: SchemaEditor
  #newSchemaMaker: NewSchemaMaker

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
    this.#schemaEditor = new SchemaEditor(apiSchema)
    this.#element.innerHTML = ''
    this.#element.appendChild(this.#schemaEditor.element)
  }

  loadNewSchemaPage(filePath: string) {
    this.#newSchemaMaker = new NewSchemaMaker(filePath)
    this.#element.innerHTML = ''
    this.#element.appendChild(this.#newSchemaMaker.element)
  }
}

export default MainArea