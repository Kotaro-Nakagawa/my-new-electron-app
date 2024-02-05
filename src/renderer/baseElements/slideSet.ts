import AppElement from "./element";

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class AppSlideSet<T extends AppElement[]> extends AppElement {
  protected contents: [...T]
  constructor(contents: [...T]) {
    super(baseElement())
    this.contents = contents
    this.switchTo(0)
  }
  protected switchTo(index: number) {
    this.element.innerHTML = ''
    this.element.appendChild(this.contents[index].element)
  }
}

export default AppSlideSet
