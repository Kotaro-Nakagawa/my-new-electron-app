import AppElement from "./element"

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class ListElement<T extends AppElement> extends AppElement {
  constructor(items: T[]) {
    super(baseElement())
    items.forEach(i => { this.element.appendChild(i.element) })
  }
}

export default ListElement