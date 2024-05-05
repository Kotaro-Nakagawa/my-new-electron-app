import AppElement from "@ElementBase/element"
import FoldableTableManager from "./foldableTableManager"

const DIV = 'div'

const boxElement = (child: HTMLDivElement) => {
  const elem = document.createElement(DIV)
  elem.appendChild(child)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'grid'
  return elem
}

class AppFoldableTableRecord<T extends { [key: string]: AppElement }> extends AppElement {
  #contents
  #keyOrder
  #manager

  #foldButtonAreaElement
  #indentElement
  constructor(contents: T, keyOrder: (keyof T)[], depth: number, manager: FoldableTableManager) {
    super(baseElement())
    this.#contents = contents
    this.#keyOrder = keyOrder
    this.#manager = manager
    this.#manager.reportNewDepth(depth)
    this.#foldButtonAreaElement = boxElement(document.createElement(DIV))
    this.element.appendChild(this.#foldButtonAreaElement)
    this.#indentElement = boxElement(document.createElement(DIV))
    this.element.appendChild(this.#indentElement)
    keyOrder.forEach((k, i) => {
      this.element.appendChild(boxElement(contents[k].element))
    })
  }
  getContent<K extends keyof T>(key: K): T[K] {
    return this.#contents[key];
  }
  getContents(): T {
    return this.#contents
  }

  get maxDepth() {
    return 1
  }

  updateColumnWidth(percentages: number[], depth: number) {
    const successor = percentages.slice(1)
    this.setGridTemplate(`2% ${depth}% auto ${successor.join('% ')}%`)
  }

  setGridTemplate(template: string) {
    this.element.style.gridTemplateColumns = template
  }
}

export default AppFoldableTableRecord