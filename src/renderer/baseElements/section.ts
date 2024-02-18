import AppElement from "./element";

const DIV = 'div'

const titleElement = (title: string) => {
  const elem = document.createElement(DIV)
  elem.style.fontSize = 'medium'
  elem.style.paddingTop = '1em'
  elem.innerText = title
  return elem
}

const mainElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class AppSection<T extends AppElement> extends AppElement {
  protected content: T
  #titleElement
  #mainElement
  constructor(title: string, content: T) {
    super(baseElement())
    this.content = content
    this.#titleElement = titleElement(title)
    this.#mainElement = mainElement()
    this.element.appendChild(this.#titleElement)
    this.element.appendChild(this.#mainElement)
    this.#mainElement.appendChild(content.element)
  }
}

export default AppSection