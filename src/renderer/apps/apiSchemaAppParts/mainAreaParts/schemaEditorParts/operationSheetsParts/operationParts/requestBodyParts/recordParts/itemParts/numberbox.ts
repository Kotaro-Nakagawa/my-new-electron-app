import AppElement from "@ElementBase/element"

const element = () => {
  const ret = document.createElement('div')
  ret.classList.add('editable')
  return ret
}

class NumberBox extends AppElement {
  #value
  constructor(initialValue: number) {
    super(element())
    this.#value = initialValue
    this.element.innerText = this.#value ? this.#value.toString() : ''
  }
}

export default NumberBox