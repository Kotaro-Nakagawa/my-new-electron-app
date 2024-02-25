import AppDirEnt from "@Structure/fileSysstem/dirEnt"
import FileTree from "./sideMenuParts/fileTree"

const elementId = 'side-menu'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class SideMenu {
  #fileTree
  #onFileSelect
  #onNewSchemaButton: (filePath: string) => void
  #element
  constructor(onFileSelect: (path: string) => void, onNewSchemaButton: (filePath: string) => void) {
    this.#onFileSelect = onFileSelect
    this.#onNewSchemaButton = onNewSchemaButton
    this.#fileTree = new FileTree((path) => { this.#onFileSelect(path) }, (filePath) => { this.#onNewSchemaButton(filePath) })
    this.#element = element()
    this.#element.appendChild(this.#fileTree.element)
  }
  get element() {
    return this.#element
  }
  loadData(data: AppDirEnt) {
    this.#fileTree.loadTree(data)
  }
}

export default SideMenu