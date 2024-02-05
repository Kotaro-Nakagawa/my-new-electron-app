import AppElement from "@ElementBase/element";
import KeyValueRecord from "./keyValueRecord";

const DIV = 'div'

const baseElement = () => {
  const element = document.createElement(DIV)
  return element
}

class KeyValueList extends AppElement {
  #keyValueList: KeyValueRecord[]
  constructor() {
    super(baseElement())
    this.#keyValueList = []
  }
  push(record: KeyValueRecord) {
    this.#keyValueList.push(record)
    this.element.appendChild(record.element)
  }
  pushMany(records: KeyValueRecord[]) {
    records.forEach(r => {
      this.push(r)
    })
  }
  value() {
    return this.#keyValueList.map(kv => kv.value)
  }
  clear() {
    this.#keyValueList = []
    this.element.innerHTML = ''
  }
}

export default KeyValueList