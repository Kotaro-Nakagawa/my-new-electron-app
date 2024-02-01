const elementId = 'path-list-header'

const columns = [
  'path',
  'GET',
  'PUT',
  'POST',
  'DELETE',
  'PATCH'
]

const labelElement = (value: string) => {
  const ret = document.createElement('div')
  ret.innerText = value
  return ret
}

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  ret.classList.add('path-item')
  return ret
}

class Header {
  #element
  constructor() {
    this.#element = element()
    columns.map(h => labelElement(h)).forEach(e => this.#element.appendChild(e))
  }
  get element() {
    return this.#element
  }
}

export default Header