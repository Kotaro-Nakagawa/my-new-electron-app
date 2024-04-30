import AppTextBox from "@ElementBase/textbox";

class responseBodyMinText extends AppTextBox {
  constructor(value: number) {
    super(value ? value.toString() : "?")
  }
  get minNumber() {
    const number = Number.parseFloat(this.element.innerText)
    return !isNaN(number) ? number : undefined
  }
}

export default responseBodyMinText
