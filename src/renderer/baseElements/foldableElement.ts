import AppElement from "./element"

const DIV = 'div'

const titleElement = (value: string) => {
  const elem = document.createElement(DIV)
  elem.innerText = value
  return elem
}

const mainElement = () => {
  return document.createElement(DIV)
}

const baseElement = () => {
  return document.createElement(DIV)
}

class FolderbleElement extends AppElement {
  #isFolding
  #titleElement
  #mainElement
  constructor(title: string, content: AppElement) {
    super(baseElement())
    this.#isFolding = false
    this.#titleElement = titleElement(title)
    this.#titleElement.onclick = () => {
      this.#isFolding ? this.open() : this.fold()
    }
    this.#mainElement = mainElement()
    this.element.appendChild(this.#titleElement)
    this.element.appendChild(this.#mainElement)
    this.#mainElement.appendChild(content.element)
  }

  fold() {
    this.#isFolding = true
    this.#mainElement.style.display = 'none'
  }
  open() {
    this.#isFolding = false
    this.#mainElement.style.display = 'block'
  }
}

export default FolderbleElement