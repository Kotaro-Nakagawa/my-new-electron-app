import TextBox from "./itemParts/textbox"

const element = () => {
  const ret = document.createElement('div')
  return ret
}

class ParameterInItem {
  #content
  #element
  constructor(value: string) {
    this.#content = new TextBox(value)
    this.#element = element()
    this.#element.appendChild(this.#content.element)
  }
  get element() {
    return this.#element
  }
}

export default ParameterInItem
