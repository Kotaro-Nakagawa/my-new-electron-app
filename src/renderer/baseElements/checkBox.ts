import AppElement from "./element";

const DIV = 'div'
const MARK_EMPTY = '☐'
const MARK_CHECKED = '✓'

const markElement = () => {
  const elem = document.createElement(DIV)
  elem.innerText = MARK_EMPTY
  return elem
}

const labelElement = (label: string) => {
  const elem = document.createElement(DIV)
  elem.innerText = label
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'flex'
  return elem
}

class AppCheckBox extends AppElement {
  #markElement: HTMLDivElement
  #labelElement: HTMLDivElement
  constructor(label: string) {
    super(baseElement())
    this.#markElement = markElement()
    this.#labelElement = labelElement(label)
    this.element.appendChild(this.#markElement)
    this.element.appendChild(this.#labelElement)
    this.element.onclick = () => {
      this.switch()
    }
  }
  switch() {
    if (this.#markElement.innerText === MARK_EMPTY) {
      this.#markElement.innerText = MARK_CHECKED
    } else {
      this.#markElement.innerText = MARK_EMPTY
    }
  }
  isChecked() {
    return this.#markElement.innerText === MARK_CHECKED
  }
}

export default AppCheckBox