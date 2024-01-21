import AppElement from "./element";

const DIV = 'div'

const baseElement = (value: string) => {
  const elem = document.createElement(DIV)
  elem.contentEditable = 'true'
  elem.innerText = value
  elem.classList.add('editable')
  return elem
}


class AppTextBox extends AppElement {
  constructor(value: string) {
    super(baseElement(value))
  }
  get value() {
    return this.element.innerText
  }
}

export default AppTextBox
