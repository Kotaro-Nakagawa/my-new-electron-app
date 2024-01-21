import AppElement from "./element";
import KeyValueRecord from "./foldableKeyValueParts/keyValueRecord";

const DIV = 'div'

const titleElement = () => {
  return document.createElement(DIV)
}

const mainElement = () => {
  return document.createElement(DIV)
}

const baseElement = () => {
  return document.createElement(DIV)
}

class FoldableKeyValue extends AppElement {
  protected content: KeyValueRecord[]
  #isFolding

  #titleElement
  #mainElement
  constructor(title: string) {
    super(baseElement())
    this.content = []
    this.#isFolding = false
    this.#titleElement = titleElement()
    this.#titleElement.innerText = title
    this.#titleElement.onclick = () => {
      this.#isFolding ? this.open() : this.fold()
    }
    this.#titleElement.style.cursor = 'pointer'
    this.#mainElement = mainElement()
    this.element.appendChild(this.#titleElement)
    this.element.appendChild(this.#mainElement)
  }
  fold() {
    this.#isFolding = true
    this.#mainElement.style.display = 'none'
  }
  open() {
    this.#isFolding = false
    this.#mainElement.style.display = 'block'
  }

  protected updateElement() {
    this.#mainElement.innerHTML = ''
    this.content.forEach(r => {
      this.#mainElement.appendChild(r.element)
    })
  }
}

export default FoldableKeyValue