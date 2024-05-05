import AppElement from "@ElementBase/element"
import AppLabel from "@ElementBase/label"

const DIV = 'div'

const boxElement = (child: HTMLDivElement) => {
  const elem = document.createElement(DIV)
  elem.appendChild(child)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'grid'
  elem.id = 'foldable-table-header'
  return elem
}

class AppFoldableTableHeader<T = { [key: string]: AppElement }> extends AppElement {
  #contents: T
  #foldButtonAreaElement
  #indentElement
  constructor(keyOrder: (keyof T)[], labelStringFunc?: (key: string) => string) {
    super(baseElement())
    const contents = Object.fromEntries(keyOrder.map(k => { return [k, new AppLabel(labelStringFunc ? labelStringFunc(k as string) : k as string)] }))

    this.#contents = contents as unknown as T
    this.#foldButtonAreaElement = boxElement(document.createElement(DIV))
    this.element.appendChild(this.#foldButtonAreaElement)
    this.#indentElement = boxElement(document.createElement(DIV))
    this.element.appendChild(this.#indentElement)
    keyOrder.forEach((c, i) => {
      this.element.appendChild(boxElement((this.#contents[c] as unknown as AppElement).element))
    })
  }

  updateColumnWidth(percentages: number[], depth: number) {
    const successor = percentages.slice(1)
    this.setGridTemplate(`2% ${depth}% auto ${successor.join('% ')}%`)
  }

  setGridTemplate(template: string) {
    this.element.style.gridTemplateColumns = template
  }
}

export default AppFoldableTableHeader