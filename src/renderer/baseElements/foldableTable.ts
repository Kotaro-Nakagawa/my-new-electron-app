import AppElement from "./element";
import AppFoldableSubTable from "./foldableTableParts/foldableSubTable";
import AppFoldableTableHeader from "./foldableTableParts/foldableTableHeader";
import FoldableTableLineNames from "./foldableTableParts/foldableTableLineNames";
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
    this.element.style.gridTemplateColumns = FoldableTableLineNames.getTemplate(0, columnWeights)
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
    console.log(FoldableTableLineNames.getTemplate(this.#manager.getMaxDepth(), this.#columnWeights))
    this.element.style.gridTemplateColumns = FoldableTableLineNames.getTemplate(this.#manager.getMaxDepth(), this.#columnWeights)
  }

  getContents(): nestedElementForFoldableTable<T> {
    return {
      subroot: undefined,
      children: this.#list.getContents().map(c => {
        return (c instanceof AppFoldableTableRecord) ? { record: c.getContents() } : c.getContents()
      })
    }
  }
}

export default AppFoldableTable
