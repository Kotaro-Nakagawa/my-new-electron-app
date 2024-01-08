const elementId = 'path-item'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class MethodItem {
  #value?: boolean
  #element
  constructor(value?: boolean) {
    this.#element = element()
    this.update(value)
  }
  get element() {
    return this.#element
  }

  update(value?: boolean) {
    this.#value = value
    this.#updateElement()
  }

  #updateElement() {
    if (!this.#value) this.#element.innerText = '-'
    this.#element.innerText = this.#value ? '✓' : '×'
  }

}

export default MethodItem