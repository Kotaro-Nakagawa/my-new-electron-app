import OpenAPI from "@Structure/openAPI/openAPI"
import MainArea from "./apiSchemaAppParts/mainArea"
import SideMenu from "./apiSchemaAppParts/sideMenu"
import AppDirEnt from "@Structure/fileSysstem/dirEnt"
import { IAPISchemaService } from "../../types/process/app"

const elementId = 'api-schema-app'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class ApiSchemaApp {
  #sideMenu
  #mainArea
  #service

  #element
  constructor(service: IAPISchemaService) {
    this.#service = service
    this.#sideMenu = new SideMenu((path => { this.#fetchSchemaFromServer(path) }), (path: string) => { this.loadNewSchemaPage(path) })
    this.#mainArea = new MainArea(async () => {
      const result = await service.openYamlDir()
      if (result !== '') {
        this.loadDirTree(result)
      }
    })

    this.#element = element()
    this.#element.appendChild(this.#sideMenu.element)
    this.#element.appendChild(this.#mainArea.element)
  }
  get element() {
    return this.#element
  }
  async #fetchSchemaFromServer(path: string) {
    const fetched = await this.#service.loadYaml(path)
    if (fetched === '') return
    this.loadData(fetched)
  }
  loadData(apiSchema: OpenAPI) {
    this.#mainArea.loadData(apiSchema)
  }
  loadDirTree(dirent: AppDirEnt) {
    this.#sideMenu.loadData(dirent)
  }
  loadNewSchemaPage(filePath: string) {
    this.#mainArea.loadNewSchemaPage(filePath)
  }
}

export default ApiSchemaApp