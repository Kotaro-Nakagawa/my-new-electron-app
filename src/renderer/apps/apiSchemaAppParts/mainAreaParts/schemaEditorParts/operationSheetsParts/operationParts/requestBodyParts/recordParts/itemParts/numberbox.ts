const element = () => {
  const ret = document.createElement('div')
  ret.classList.add('editable')
  return ret
}

class NumberBox {
  #value
  #element
  constructor(initialValue: number) {
    this.#value = initialValue
    this.#element = element()
    this.#element.innerText = this.#value ? this.#value.toString() : ''
  }
  get element() {
    return this.#element
  }
}

export default NumberBox