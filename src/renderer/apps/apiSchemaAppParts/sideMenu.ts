const elementId = 'side-menu'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class SideMenu {
  #element
  constructor() {
    this.#element = element()
  }
  get element() {
    return this.#element
  }
}

export default SideMenu