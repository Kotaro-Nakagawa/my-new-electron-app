import AppElement from "@ElementBase/element"

const element = () => {
  const ret = document.createElement('div')
  ret.classList.add('editable')
  return ret
}

class NumberBox extends AppElement {
  constructor(initialValue: number) {
    super(element())
    this.element.innerText = initialValue ? initialValue.toString() : ''
  }
  get value() {
    const value = Number.parseFloat(this.element.innerText)
    return isNaN(value) ? undefined : value
  }
}

export default NumberBox