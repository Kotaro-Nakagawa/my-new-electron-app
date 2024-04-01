import AppElement from "./element"

const DIV = 'div'

const tabElement = (title: string, onclick: (e: MouseEvent) => void) => {
  const elem = document.createElement(DIV)
  elem.innerText = title
  elem.onclick = onclick
  elem.classList.add('switch')
  elem.classList.add('switch-off')
  elem.classList.add('button')
  return elem
}

const tabListBase = () => {
  const elem = document.createElement(DIV)
  elem.style.display = 'flex'
  return elem
}

const boxElement = (child: HTMLDivElement) => {
  const elem = document.createElement(DIV)
  elem.appendChild(child)
  elem.style.display = 'none'
  return elem
}

const mainArea = () => {
  const elem = document.createElement(DIV)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class AppSwitchView<T extends AppElement> extends AppElement {
  #contents: T[]
  #tabAreaElement: HTMLDivElement
  #tabElements: HTMLDivElement[] // タブを切り替えたときに強調表示するために参照が必要
  #mainAreaElement: HTMLDivElement
  #boxElements: HTMLDivElement[]
  constructor() {
    super(baseElement())
    this.#contents = []
    this.#tabAreaElement = tabListBase()
    this.element.appendChild(this.#tabAreaElement)
    this.#tabElements = []
    this.#mainAreaElement = mainArea()
    this.element.appendChild(this.#mainAreaElement)
    this.#boxElements = []
  }
  getContent(i: number): T {
    return this.#contents[i];
  }
  showContent(i: number): void {
    this.#tabElements.forEach((e, i) => { e.classList.remove('switch-on'); e.classList.add('switch-off') })
    this.#tabElements[i].classList.add('switch-on')
    this.#tabElements[i].classList.remove('switch-off')
    this.#boxElements.forEach((e, i) => e.style.display = 'none')
    this.#boxElements[i].style.display = 'block'
  }
  reloadTabs(tabs: { tabName: string; content: T }[]) {
    this.clear()
    const keys = tabs.map(t => t.tabName)
    const contents = tabs.map(t => t.content)
    this.#contents = contents
    this.#tabElements = keys.map((k, i) => {
      const elem = tabElement(k, (e) => {
        this.showContent(i)
      })
      this.#tabAreaElement.appendChild(elem)
      return elem
    })
    keys.forEach((k, i) => {
      const newBox = boxElement(contents[i].element)
      this.#mainAreaElement.appendChild(newBox)
      this.#boxElements[i] = newBox
    })
  }
  clear() {
    this.#tabElements.length = 0
    this.#contents.length = 0
    this.#tabAreaElement.innerHTML = ''
    this.#mainAreaElement.innerHTML = ''
  }
  getTabs(): { tabName: string; content: T }[] {
    const tabNames = this.#tabElements.map(e => e.innerText)
    return tabNames.map((t, i) => {
      return {
        tabName: t,
        content: this.#contents[i]
      }
    })
  }
}

export default AppSwitchView
