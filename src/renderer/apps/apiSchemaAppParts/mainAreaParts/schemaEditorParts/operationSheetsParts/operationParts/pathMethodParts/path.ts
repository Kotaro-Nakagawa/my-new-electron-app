const elementId = 'path'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class Path {
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
}

export default Path