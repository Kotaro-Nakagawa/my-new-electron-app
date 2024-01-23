import AppElement from "./element";

const DIV = 'div'

const baseElement = (value: string) => {
  const elem = document.createElement(DIV)
  elem.innerText = value
  return elem
}

class AppButton extends AppElement {
  constructor(value: string, onclick: () => void) {
    super(baseElement(value))
    this.element.onclick = onclick
  }
  get value() {
    return this.element.innerText
  }
}

export default AppButton
