import Parameter from "./parametersParts/parameter"
import ParameterValues from "./parametersParts/parameterInterface"

type ParameterValuesList = ParameterValues[]

const elementId = 'parameters'

const titleElement = () => {
  const ret = document.createElement('div')
  ret.classList.add('region-title')
  return ret
}

const headerElement = () => {
  const ret = document.createElement('div')
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

class Parameters {
  #parameters: Parameter[]

  #element
  #titleElement
  #headerElement
  #listElement
  constructor() {
    this.#element = element()
    this.#titleElement = titleElement()
    this.#titleElement.innerText = 'Parameters'
    this.#element.appendChild(this.#titleElement)
    this.#headerElement = headerElement()
    this.#element.appendChild(this.#headerElement)
    this.#listElement = listElement()
    this.#element.appendChild(this.#listElement)
  }

  loadData(data: ParameterValuesList) {
    this.#parameters = data.map(d => new Parameter(d))
    this.#updateElement()
  }
  #updateElement() {
    console.log(JSON.stringify(this.#parameters))
    this.#listElement.innerHTML = ""
    this.#parameters.forEach(p => {
      this.#listElement.appendChild(p.element)
    })
  }
  get element() {
    return this.#element
  }
}

export default Parameters