import OperationSheetTab from "./tabsParts/tab"

const elementId = 'operation-sheet-tabs'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class OperationSheetTabs {
  #onSelectMethodDelegate
  #tabs: OperationSheetTab[]
  #selectingTab: OperationSheetTab | undefined
  #element
  constructor(onSelectMethod: (method: string) => void) {
    this.#onSelectMethodDelegate = onSelectMethod
    this.#element = element()
  }
  get element() {
    return this.#element
  }
  loadData(data: string[]) {
    this.#tabs = data.map(t => new OperationSheetTab(t, (tab) => {
      if (this.#selectingTab) {
        this.#selectingTab.deactivate()
      }
      this.#selectingTab = tab
      tab.activate()
      this.#onSelectMethodDelegate(tab.value)
    }))
    this.updateElement()
  }
  updateElement() {
    this.#element.innerHTML = ''
    this.#tabs.forEach(t => this.#element.appendChild(t.element))
  }
}

export default OperationSheetTabs