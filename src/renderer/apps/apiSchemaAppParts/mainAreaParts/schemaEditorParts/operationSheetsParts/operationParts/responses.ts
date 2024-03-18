import AppSection from "@ElementBase/section"
import SchemaValues from "./requestBodyParts/parameterInterface"
import AppResponse from "./responsesParts/response"
import AppElement from "@ElementBase/element"

const elementId = 'response-body'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class Responses extends AppElement {
  #response

  constructor() {
    super(element())
    this.#response = new AppResponse()
    this.element.appendChild(this.#response.element)
  }
  loadData(data: SchemaValues) {
    this.#response.loadData(data)
  }
}

class ResponsesSection extends AppSection<Responses> {
  constructor() {
    super('Responses', new Responses())
  }
  loadData(data: SchemaValues) {
    this.content.loadData(data)
  }
}

export default ResponsesSection
