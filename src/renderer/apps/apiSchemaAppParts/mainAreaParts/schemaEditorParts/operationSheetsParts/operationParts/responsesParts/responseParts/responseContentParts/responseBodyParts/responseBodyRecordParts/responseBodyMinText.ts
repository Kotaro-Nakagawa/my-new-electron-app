import AppTextBox from "@ElementBase/textbox";

class responseBodyMinText extends AppTextBox {
  constructor(value: number) {
    super(value ? value.toString() : "?")
  }
}

export default responseBodyMinText
