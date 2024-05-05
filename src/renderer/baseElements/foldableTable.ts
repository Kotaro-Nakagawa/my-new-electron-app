import AppElement from "./element";
import AppFoldableSubTable from "./foldableTableParts/foldableSubTable";
import AppFoldableTableHeader from "./foldableTableParts/foldableTableHeader";
import FoldableTableManager from "./foldableTableParts/foldableTableManager";
import AppFoldableTableRecord from "./foldableTableParts/foldableTableRecord";
import AppFoldableTableRecordList from "./foldableTableParts/foldableTableRecordList";
import { nestedElementForFoldableTable } from "./foldableTableParts/nestedElementForFoldableTableType";

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'grid'
  elem.id = 'for-debug'
  return elem
}

const columnsWidthFromWeights = (columnWeights: number[], maxDepth: number) => {
  const foldAreaPercentage = 2
  const indentPercentage = 1
  const totalWeight = columnWeights.reduce((ttl, val) => ttl + val, 0)
  const sideAreaPercentage = foldAreaPercentage + maxDepth * indentPercentage
  const mainAreaPercentage = 100 - sideAreaPercentage
  const columnPercentages = columnWeights.map(c => Math.round(c * mainAreaPercentage / totalWeight))
  const roundingError = mainAreaPercentage - columnPercentages.reduce((sum, val) => sum + val, 0)
  columnPercentages[0] += roundingError
  return columnPercentages
}

class AppFoldableTable<T extends { [key: string]: AppElement }> extends AppElement {
  #header
  #keyOrder
  #list
  #manager
  #columnWeights
  constructor(keyOrder: string[], columnWeights: number[], labelStringFunc?: (key: string) => string) {
    super(baseElement())
    this.#manager = new FoldableTableManager()
    this.#header = new AppFoldableTableHeader<T>(keyOrder, labelStringFunc)
    this.#list = new AppFoldableTableRecordList<T>([])
    this.#keyOrder = keyOrder
    this.#columnWeights = columnWeights
    this.updateColumnWidth()
    this.element.appendChild(this.#header.element)
    this.element.appendChild(this.#list.element)
  }

  #appendRecord(record: T) {
    const newRecord = new AppFoldableTableRecord(record, this.#keyOrder, 0, this.#manager)
    this.#list.appendContent(newRecord)
  }

  #appendSubTable(mainRecord: T, children: nestedElementForFoldableTable<T>[]) {
    const subTable = new AppFoldableSubTable<T>(mainRecord, this.#keyOrder, 0, this.#manager)
    this.#list.appendContent(subTable)
    children.forEach(d => {
      subTable.appendContent(d)
    })
  }

  appendContent(d: nestedElementForFoldableTable<T>) {
    if ('record' in d) {
      this.#appendRecord(d.record)
    }
    if ('subroot' in d) {
      this.#appendSubTable(d.subroot, d.children)
    }
    this.updateColumnWidth()
  }

  getContents(): nestedElementForFoldableTable<T> {
    return {
      subroot: undefined,
      children: this.#list.getContents().map(c => {
        return (c instanceof AppFoldableTableRecord) ? { record: c.getContents() } : c.getContents()
      })
    }
  }

  get maxDepth() {
    return this.#list.maxDepth
  }

  updateColumnWidth() {
    const maxDepth = this.maxDepth
    const percentages = columnsWidthFromWeights(this.#columnWeights, maxDepth)
    this.#list.updateColumnWidth(percentages, 0)
    this.#header.updateColumnWidth(percentages, 0)
  }
}

export default AppFoldableTable
