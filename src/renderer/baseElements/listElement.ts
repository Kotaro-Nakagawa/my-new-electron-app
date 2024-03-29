import AppElement from "./element"

const DIV = 'div'

const mainElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class ListElement<T extends AppElement> extends AppElement {
  #mainElement
  constructor(items: T[], suffix?: AppElement) {
    super(baseElement())
    this.#mainElement = mainElement()
    this.element.appendChild(this.#mainElement)
    items.forEach(i => { this.#mainElement.appendChild(i.element) })
    if (suffix) {
      this.element.appendChild(suffix.element)
    }
  }

  push(newItem: T) {

  }
}

export default ListElement