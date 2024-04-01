import AppElement from "@ElementBase/element"
import AppFoldableSubTable from "./foldableSubTable"
import AppFoldableTableRecord from "./foldableTableRecord"
import FoldableTableLineNames from "./foldableTableLineNames"

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'grid'
  elem.style.gridTemplateColumns = 'subgrid'
  const { start, end } = FoldableTableLineNames.getFullRange()
  elem.style.gridColumnStart = start
  elem.style.gridColumnEnd = end
  return elem
}

class AppFoldableTableRecordList<T extends { [key: string]: AppElement }> extends AppElement {
  #contents
  constructor(contents: (AppFoldableTableRecord<T> | AppFoldableSubTable<T>)[]) {
    super(baseElement())
    this.#contents = contents
    this.element.append(...this.#contents.map(c => c.element))
    // contents.forEach((c) => {
    //   this.element.appendChild(c.element)
    // })
  }

  appendContent(newElement: (AppFoldableTableRecord<T> | AppFoldableSubTable<T>)) {
    this.#contents.push(newElement)
    this.element.append(newElement.element)
  }

  getContents(): (AppFoldableTableRecord<T> | AppFoldableSubTable<T>)[] {
    return this.#contents
  }
}

export default AppFoldableTableRecordList

