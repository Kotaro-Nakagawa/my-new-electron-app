const element = () => {
  const ret = document.createElement('div')
  ret.classList.add('editable')
  return ret
}

class TextBox {
  #value
  #element
  constructor(initialValue: string) {
    this.#value = initialValue
    this.#element = element()
    this.#element.innerText = this.#value
  }
  get element() {
    return this.#element
  }
}

export default TextBox