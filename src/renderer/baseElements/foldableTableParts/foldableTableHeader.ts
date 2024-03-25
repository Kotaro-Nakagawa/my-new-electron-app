import AppElement from "@ElementBase/element"
import AppLabel from "@ElementBase/label"
import FoldableTableLineNames from "./foldableTableLineNames"

const DIV = 'div'

const boxElement = (start: string, end: string, child: HTMLDivElement) => {
  const elem = document.createElement(DIV)
  elem.style.gridColumnStart = start
  elem.style.gridColumnEnd = end
  elem.appendChild(child)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'grid'
  elem.style.gridTemplateColumns = 'subgrid'
  const { start, end } = FoldableTableLineNames.getFullRange()
  elem.style.gridColumnStart = start
  elem.style.gridColumnEnd = end
  return elem
}

class AppFoldableTableHeader<T = { [key: string]: AppElement }> extends AppElement {
  #contents: T
  constructor(keyOrder: (keyof T)[], labelStringFunc?: (key: string) => string) {
    super(baseElement())
    const contents = Object.fromEntries(keyOrder.map(k => { return [k, new AppLabel(labelStringFunc ? labelStringFunc(k as string) : k as string)] }))

    this.#contents = contents as unknown as T
    keyOrder.forEach((c, i) => {
      const { start, end } = FoldableTableLineNames.getRangeOfColumn(0, i)
      this.element.appendChild(boxElement(start, end, (this.#contents[c] as unknown as AppElement).element))
    })
  }
}

export default AppFoldableTableHeader