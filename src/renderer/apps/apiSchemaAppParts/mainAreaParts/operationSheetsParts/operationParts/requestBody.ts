import BodySchema from "./requestBodyParts/parameterInterface"
import RequestBodyRecord from "./requestBodyParts/requestBodyRecord"

const elementId = 'request-body'

const columns = ['1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr']

const titleElement = () => {
  const ret = document.createElement('div')
  ret.innerText = "Request Body"
  ret.classList.add('region-title')
  return ret
}

const headerElement = () => {
  const ret = document.createElement('div')
  ret.style.display = 'gris'
  ret.style.gridTemplateColumns = columns.join(' ')
  return ret
}

const listElement = () => {
  const ret = document.createElement('div')
  return ret
}

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class RequestBody {
  #content?: RequestBodyRecord
  #element
  #listElement
  constructor() {
    this.#element = element()
    this.#element.appendChild(titleElement())
    this.#element.appendChild(headerElement())
    this.#listElement = listElement()
  }
  get element() {
    return this.#element
  }
  loadData(data: BodySchema) {
    this.#content = new RequestBodyRecord(data, columns, 0)
    this.updateElement()
  }
  updateElement() {
    this.#listElement.innerHTML = ''
    this.#listElement.appendChild(this.#content.element)
  }
}

export default RequestBody