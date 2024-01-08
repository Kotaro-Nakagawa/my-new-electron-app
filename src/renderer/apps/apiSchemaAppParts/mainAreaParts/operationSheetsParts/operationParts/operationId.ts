const elementId = 'operation-id'

const textBpx = () => {
  const ret = document.createElement('div')
  ret.contentEditable = 'true'
  ret.classList.add('editable')
  ret.classList.add('region-title')
  return ret
}

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class OperationId {
  #element
  #textBoxElement
  constructor() {
    this.#element = element()
    this.#textBoxElement = textBpx()
    this.#element.appendChild(this.#textBoxElement)
  }
  get element() {
    return this.#element
  }
  loadData(value: string) {
    this.#textBoxElement.innerText = value
  }
}

export default OperationId