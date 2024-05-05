import AppElement from "@ElementBase/element"
import AppFoldableSubTable from "./foldableSubTable"
import AppFoldableTableRecord from "./foldableTableRecord"

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
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

  get maxDepth(): number {
    return Math.max(...this.#contents.map(c => c.maxDepth), 0)
  }

  updateColumnWidth(percentages: number[], depth: number) {
    this.#contents.forEach(c => c.updateColumnWidth(percentages, depth + 1))
  }
}

export default AppFoldableTableRecordList

