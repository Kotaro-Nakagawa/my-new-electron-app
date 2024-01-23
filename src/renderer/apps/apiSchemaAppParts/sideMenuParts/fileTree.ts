import AppDirEnt from "@Structure/fileSysstem/dirEnt"
import DirEntList from "./fileTreeParts/direntList"

const elementId = 'file-tree'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class FileTree {
  #dirEntList: DirEntList
  #onFileSelect: (path: string) => void
  #element
  constructor(onFileSelect: (path: string) => void) {
    this.#onFileSelect = onFileSelect
    this.#element = element()
  }
  get element() {
    return this.#element
  }
  loadTree(data: AppDirEnt) {
    this.#dirEntList = new DirEntList(data, (path: string) => { this.#onFileSelect(path) })
    this.#element.appendChild(this.#dirEntList.element)
  }
}

export default FileTree
