import AppElement from "./element";

const DIV = 'div'

const baseElement = (value: string) => {
  const elem = document.createElement(DIV)
  elem.innerText = value
  return elem
}

class AppLabel extends AppElement {
  constructor(value: string) {
    super(baseElement(value))
  }
  get value() {
    return this.element.innerText
  }
}

export default AppLabel
