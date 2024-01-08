import Label from "./itemParts/label"

const element = () => {
  const ret = document.createElement('div')
  return ret
}

class ParameterValueOrLengthItem {
  #content
  #element
  constructor(value: string) {
    this.#content = new Label(value)
    this.#element = element()
    this.#element.appendChild(this.#content.element)
  }
  get element() {
    return this.#element
  }
}

export default ParameterValueOrLengthItem
