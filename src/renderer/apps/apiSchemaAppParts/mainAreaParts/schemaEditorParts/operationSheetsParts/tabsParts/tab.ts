const elementClass = 'operation-sheet-tab'
const inactiveClassName = `${elementClass}-inactive`
const activeClassName = `${elementClass}-active`

const element = (method: string) => {
  const ret = document.createElement('div')
  ret.id = `${elementClass}-${method}`
  ret.innerText = method
  ret.classList.add(elementClass)
  ret.classList.add(inactiveClassName)
  return ret
}

class OperationSheetTab {
  #onClick
  #element
  constructor(method: string, onClick: (tab: OperationSheetTab) => void) {
    this.#onClick = onClick
    this.#element = element(method)
    this.#element.onclick = () => {
      this.#onClick(this)
    }
  }
  get element() {
    return this.#element
  }
  activate() {
    this.#element.classList.remove(inactiveClassName)
    this.#element.classList.add(activeClassName)
  }
  deactivate() {
    this.#element.classList.remove(activeClassName)
    this.#element.classList.add(inactiveClassName)
  }
  get value() {
    return this.#element.innerText
  }
}

export default OperationSheetTab
