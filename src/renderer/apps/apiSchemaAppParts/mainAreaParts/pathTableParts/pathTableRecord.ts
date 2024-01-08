import MethodItem from "./pathRecordParts/methodItem"
import PathItem from "./pathRecordParts/pathItem"
import PathSchemaCompleteness from "./pathSchemaCompleteness"

const elementId = 'path-item'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  ret.classList.add('path-item')
  return ret
}

class PathTableRecord {
  #path
  #methods: Map<method, MethodItem>

  #onPathUpdate

  #element
  constructor(path: string, values: PathSchemaCompleteness, onPathUpdate: (newValue: string) => void) {
    this.#path = new PathItem(path)
    this.#methods = new Map()
    this.#methods.set('get', new MethodItem(values.get))
    this.#methods.set('put', new MethodItem(values.put))
    this.#methods.set('post', new MethodItem(values.post))
    this.#methods.set('delete', new MethodItem(values.delete))
    this.#methods.set('patch', new MethodItem(values.patch))

    this.#onPathUpdate = onPathUpdate

    this.#element = element()
    this.#element.appendChild(this.#path.element)
    this.#element.appendChild(this.#methods.get('get').element)
    this.#element.appendChild(this.#methods.get('put').element)
    this.#element.appendChild(this.#methods.get('post').element)
    this.#element.appendChild(this.#methods.get('delete').element)
    this.#element.appendChild(this.#methods.get('patch').element)
  }
  get element() {
    return this.#element
  }

  updateCompleteness(method: method, newValue: boolean) {
    this.#methods.get(method).update(newValue)
  }

  removeMethod(method: method) {
    this.#methods.get(method).update(undefined)
  }
}

export default PathTableRecord