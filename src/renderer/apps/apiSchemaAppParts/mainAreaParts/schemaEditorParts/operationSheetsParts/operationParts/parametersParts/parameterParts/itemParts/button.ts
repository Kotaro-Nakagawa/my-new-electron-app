
const element = () => {
  const ret = document.createElement('div')
  return ret
}

class Switch {
  #values: inequaliryType[] = ["larger", "orEqual", "undefined"]
  #currentValue
  #element
  constructor(initialValue: inequaliryType) {
    this.#currentValue = initialValue
    this.#element = element()
  }
  onclick() {
    const currentIndex = this.#values.indexOf(this.#currentValue)
    this.#currentValue = this.#values[(currentIndex + 1) % this.#values.length]
    this.#elementUpdate()
  }
  #elementUpdate() {
    switch (this.#currentValue) {
      case "larger":
        this.#element.innerText = "<"
        break
      case "orEqual":
        this.#element.innerText = "≦"
        break
      default:
        this.#element.innerText = "?"
    }
  }
  get element() {
    return this.#element
  }
}

export default Switch