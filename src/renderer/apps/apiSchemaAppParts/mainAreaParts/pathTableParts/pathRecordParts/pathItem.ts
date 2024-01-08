const elementId = 'path-item'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class PathItem {
  #element
  constructor(path: string) {
    this.#element = element()
    this.#element.innerText = path
  }
  get element() {
    return this.#element
  }

  update(path: string) {
    this.#element.innerText = path
  }

}

export default PathItem