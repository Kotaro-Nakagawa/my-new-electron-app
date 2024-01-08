const element = () => {
  const ret = document.createElement('div')
  return ret
}

class Label {
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

export default Label