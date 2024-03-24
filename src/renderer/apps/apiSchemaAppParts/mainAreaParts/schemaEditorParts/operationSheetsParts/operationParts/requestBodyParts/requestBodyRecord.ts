import SchemaValues from "./parameterInterface"
import ParameterDescriptionItem from "./recordParts/parameterDescriptionItem"
import ParameterExampleItem from "./recordParts/parameterExampleItem"
import RequestBodyMaxItem from "./recordParts/requestBodyMaxItem"
import RequestBodyMinItem from "./recordParts/requestBodyMinItem"
import ParameterNameItem from "./recordParts/parameterNameItem"
import ParameterTypeItem from "./recordParts/parameterTypeItem"
import ParameterValueOrLengthItem from "./recordParts/parameterValueOrLengthItem"

const childrenElement = () => {
  const ret = document.createElement('div')
  return ret
}

const myRecord = (columnWidthes: string[]) => {
  const ret = document.createElement('div')
  ret.style.display = 'grid'
  ret.style.gridTemplateColumns = columnWidthes.join(' ')
  return ret
}

const element = () => {
  const ret = document.createElement('div')
  return ret
}

class RequestBodyRecord {
  #values
  #children?
  #depth
  #name
  #type
  #min
  #valueorlength
  #max
  #description
  #example

  #element
  #myRecordElement
  #childrenElement

  constructor(values: SchemaValues, columnWidthes: string[], depth: number) {
    this.#values = values
    this.#children = values.children ? values.children.map(c => new RequestBodyRecord(c, columnWidthes, depth + 1)) : []
    this.#depth = depth
    this.#name = new ParameterNameItem(values.name)
    this.#type = new ParameterTypeItem(values.type)
    this.#min = new RequestBodyMinItem(values.min)
    this.#valueorlength = new ParameterValueOrLengthItem(values.type === "string" ? "length" : "value")
    this.#max = new RequestBodyMaxItem(values.max)
    this.#description = new ParameterDescriptionItem(values.description)
    this.#example = new ParameterExampleItem(values.example)

    this.#element = element()
    this.#myRecordElement = myRecord(columnWidthes)
    this.#element.appendChild(this.#myRecordElement)
    this.#myRecordElement.appendChild(this.#name.element)
    this.#myRecordElement.appendChild(this.#type.element)
    this.#myRecordElement.appendChild(this.#min.element)
    this.#myRecordElement.appendChild(this.#valueorlength.element)
    this.#myRecordElement.appendChild(this.#max.element)
    this.#myRecordElement.appendChild(this.#description.element)
    this.#myRecordElement.appendChild(this.#example.element)
    this.#childrenElement = childrenElement()
    this.#element.appendChild(this.#childrenElement)
    this.#children.forEach(c => this.#childrenElement.appendChild(c.element))
  }

  get element() {
    return this.#element
  }
}

export default RequestBodyRecord