import NumberBox from "./itemParts/numberbox"

class RequestBodyMinItem extends NumberBox {
  constructor(value: number) {
    super(value)
  }
  get minNumber() {
    const number = Number.parseFloat(this.element.innerText)
    return !isNaN(number) ? number : undefined
  }
}

export default RequestBodyMinItem
