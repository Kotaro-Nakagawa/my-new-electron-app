import AppTextBox from "@ElementBase/textbox";

class responseBodyMaxText extends AppTextBox {
  constructor(value: number) {
    super(value ? value.toString() : "?")
  }
  get maxNumber() {
    const number = Number.parseFloat(this.element.innerText)
    return !isNaN(number) ? number : undefined
  }
}

export default responseBodyMaxText
