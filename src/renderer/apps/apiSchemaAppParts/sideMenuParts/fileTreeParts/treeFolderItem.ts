import TreeFileItem from "./treeFileItem"

const element = (fileName: string) => {
  const ret = document.createElement('div')
  ret.classList.add('treefile')
  ret.innerText = fileName
  return ret
}

class TreeFolderItem {
  #children: (TreeFolderItem | TreeFileItem)[]
  #element: HTMLDivElement
  constructor(fileName: string, children: (TreeFolderItem | TreeFileItem)[]) {
    this.#children = children
    this.#element = element(fileName)
    this.#children.forEach((c) => this.#element.appendChild(c.element))
  }
  get element() {
    return this.#element
  }
}

export default TreeFolderItem
