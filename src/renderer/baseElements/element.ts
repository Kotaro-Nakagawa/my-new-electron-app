class AppElement {
  #element
  constructor(element: HTMLDivElement) {
    this.#element = element
  }
  get element() {
    return this.#element
  }
}

export default AppElement