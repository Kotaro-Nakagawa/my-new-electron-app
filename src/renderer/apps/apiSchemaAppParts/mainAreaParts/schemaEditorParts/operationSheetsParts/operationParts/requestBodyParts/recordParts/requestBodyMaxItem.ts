import NumberBox from "./itemParts/numberbox"

class RequestBodyMaxItem extends NumberBox {
  constructor(value: number) {
    super(value)
  }
  get maxNumber() {
    const number = Number.parseFloat(this.element.innerText)
    return !isNaN(number) ? number : undefined
  }
}

export default RequestBodyMaxItem
