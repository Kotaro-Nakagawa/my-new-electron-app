const element = () => {
  const ret = document.createElement('div')
  return ret
}

class Responses {
  #element

  constructor() {
    this.#element = element()
  }
  get element() {
    return this.#element
  }

}

export default Responses