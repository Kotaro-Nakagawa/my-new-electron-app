const element = () => {
  const ret = document.createElement('div')
  ret.classList.add('editable') // editable では無いが、行を表現するために必要
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