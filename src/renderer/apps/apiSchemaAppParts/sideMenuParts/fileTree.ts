const elementId = 'file-tree'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class FileTree {
  #element
  constructor() {
    this.#element = element()
  }
  get element() {
    return this.#element
  }
  loadTree() {
    // do something
  }
}

export default FileTree
