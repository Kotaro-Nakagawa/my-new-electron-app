import OperationData from "./operationInterface"
import OperationId from "./operationParts/operationId"
import Parameters from "./operationParts/parameters"
import PathAndMethod from "./operationParts/pathMethod"
import RequestBody from "./operationParts/requestBody"
import Responses from "./operationParts/responses"

const elementId = 'operation-sheet-main'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class OperationSheetMain {
  #operationId
  #pathAndMethod
  #parameters
  #requestBody
  #responses

  #element
  constructor() {
    this.#operationId = new OperationId()
    this.#pathAndMethod = new PathAndMethod()
    this.#parameters = new Parameters()
    this.#requestBody = new RequestBody()
    this.#responses = new Responses()

    this.#element = element()
    this.#element.appendChild(this.#operationId.element)
    this.#element.appendChild(this.#pathAndMethod.element)
    this.#element.appendChild(this.#parameters.element)
    this.#element.appendChild(this.#requestBody.element)
    this.#element.appendChild(this.#responses.element)
  }
  get element() {
    return this.#element
  }

  loadData(data: OperationData) {
    this.#operationId.loadData(data.operationId)
    this.#pathAndMethod.loadData(data.path, data.method)
    if (data.parameters) this.#parameters.loadData(data.parameters)
    if (data.requestBody) this.#requestBody.loadData(data.requestBody)
    if (data.responses) this.#responses.loadData(data.responses)
  }
}

export default OperationSheetMain