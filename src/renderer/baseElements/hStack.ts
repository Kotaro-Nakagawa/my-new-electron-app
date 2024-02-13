import AppElement from "./element";

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'flex'
  return elem
}

class AppHStack<T extends AppElement[]> extends AppElement {
  protected contents: [...T]
  constructor(contents: [...T]) {
    super(baseElement())
    this.contents = contents
    contents.forEach((c) => {
      this.element.appendChild(c.element)
    })
  }
}

export default AppHStack