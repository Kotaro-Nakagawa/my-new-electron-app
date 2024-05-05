import AppElement from "@ElementBase/element"
import AppFoldableTableRecordList from "./foldableTableRecordList"
import AppFoldableTableRecord from "./foldableTableRecord"
import { nestedElementForFoldableTable } from "./nestedElementForFoldableTableType"
import FoldableTableManager from "./foldableTableManager"

const DIV = 'div'
const INDENT_SIZE = 8
const FOLDING_BUTTON_AREA_SIZE = 16

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

const foldButtonArea = () => {
  const elem = document.createElement(DIV)
  elem.style.gridArea = 'side'
  return elem
}

class AppFoldableSubTable<T extends { [key: string]: AppElement }> extends AppElement {
  #topRecord
  #list
  #keyOrder
  #depth
  #manager
  constructor(topRecord: T, keyOrder: (keyof T)[], depth: number, manager: FoldableTableManager) {
    super(baseElement())
    this.#topRecord = new AppFoldableTableRecord<T>(topRecord, keyOrder, depth, manager)
    this.#list = new AppFoldableTableRecordList<T>([])
    this.#keyOrder = keyOrder
    this.#depth = depth
    this.#manager = manager
    this.element.appendChild(foldButtonArea())
    this.element.appendChild(this.#topRecord.element)
    this.element.appendChild(this.#list.element)
  }

  appendRecord(record: T) {
    const newRecord = new AppFoldableTableRecord(record, this.#keyOrder, this.#depth + 1, this.#manager)
    this.#list.appendContent(newRecord)
  }

  appendSubTable(mainRecord: T, children: nestedElementForFoldableTable<T>[]) {
    const subTable = new AppFoldableSubTable<T>(mainRecord, this.#keyOrder, this.#depth + 1, this.#manager)
    this.#list.appendContent(subTable)
    children.forEach(d => {
      subTable.appendContent(d)
    })
  }

  appendContent(d: nestedElementForFoldableTable<T>) {
    if ('record' in d) {
      this.appendRecord(d.record)
    }
    if ('subroot' in d) {
      this.appendSubTable(d.subroot, d.children)
    }
  }

  getContents(): nestedElementForFoldableTable<T> {
    return {
      subroot: this.#topRecord.getContents(),
      children: this.#list.getContents().map(c => {
        return (c instanceof AppFoldableTableRecord) ? { record: c.getContents() } : c.getContents()
      })
    }
  }

  get maxDepth(): number {
    return this.#list.maxDepth + 1
  }

  updateColumnWidth(percentages: number[], depth: number) {
    this.#list.updateColumnWidth(percentages, depth)
    this.#topRecord.updateColumnWidth(percentages, depth)
  }
}

export default AppFoldableSubTable