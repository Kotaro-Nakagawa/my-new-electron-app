const elementId = 'method'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class Method {
  #element
  constructor() {
    this.#element = element()
  }
  get element() {
    return this.#element
  }
  setValue(value: string) {
    this.#element.innerText = value
  }
  get value(): string {
    return this.#element.innerText
  }
}

export default Method