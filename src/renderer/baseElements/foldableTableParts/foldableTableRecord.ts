import AppElement from "@ElementBase/element"
import FoldableTableLineNames from "./foldableTableLineNames"
import FoldableTableManager from "./foldableTableManager"

const DIV = 'div'

const boxElement = ({ start, end }: { start: string, end: string }, child: HTMLDivElement) => {
  const elem = document.createElement(DIV)
  elem.style.gridColumnStart = start
  elem.style.gridColumnEnd = end
  elem.appendChild(child)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'grid'
  elem.style.gridTemplateColumns = 'subgrid'
  const { start, end } = FoldableTableLineNames.getFullRange()
  elem.style.gridColumnStart = start
  elem.style.gridColumnEnd = end
  return elem
}

class AppFoldableTableRecord<T extends { [key: string]: AppElement }> extends AppElement {
  #contents
  #keyOrder
  #manager
  constructor(contents: T, keyOrder: (keyof T)[], depth: number, manager: FoldableTableManager) {
    super(baseElement())
    this.#contents = contents
    this.#keyOrder = keyOrder
    this.#manager = manager
    this.#manager.reportNewDepth(depth)
    keyOrder.forEach((k, i) => {
      this.element.appendChild(boxElement(FoldableTableLineNames.getRangeOfColumn(depth, i), contents[k].element))
    })
  }
  getContent<K extends keyof T>(key: K): T[K] {
    return this.#contents[key];
  }
  getContents(): T {
    return this.#contents
  }
}

export default AppFoldableTableRecord