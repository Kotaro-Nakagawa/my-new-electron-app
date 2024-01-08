import NumberBox from "./itemParts/numberbox"

const element = () => {
  const ret = document.createElement('div')
  return ret
}

class ParameterMinItem {
  #content
  #element
  constructor(value: number) {
    this.#content = new NumberBox(value)
    this.#element = element()
    this.#element.appendChild(this.#content.element)
  }
  get element() {
    return this.#element
  }
}

export default ParameterMinItem
