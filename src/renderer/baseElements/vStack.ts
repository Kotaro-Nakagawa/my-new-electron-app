import AppElement from "./element";

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class AppVStack<T extends AppElement[]> extends AppElement {
  protected contents: [...T]
  constructor(contents: [...T]) {
    super(baseElement())
    this.contents = contents
    contents.forEach((c) => {
      this.element.appendChild(c.element)
    })
  }
}

export default AppVStack