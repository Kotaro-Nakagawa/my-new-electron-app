import Method from "./pathMethodParts/method"
import Path from "./pathMethodParts/path"

const elementId = 'path-method'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  ret.style.display = 'grid'
  ret.style.gridTemplateColumns = '5em 1fr'
  return ret
}

class PathAndMethod {
  #path
  #method
  #element
  constructor() {
    this.#method = new Method()
    this.#path = new Path()

    this.#element = element()
    this.#element.appendChild(this.#method.element)
    this.#element.appendChild(this.#path.element)
  }
  get element() {
    return this.#element
  }
  loadData(path: string, method: string) {
    this.#method.setValue(method)
    this.#path.setValue(path)
  }
  get value() {
    return {
      path: this.#path.value,
      method: this.#method.value
    }
  }
}

export default PathAndMethod