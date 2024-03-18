import AppTextBox from "@ElementBase/textbox";

class responseBodyMaxText extends AppTextBox {
  constructor(value: number) {
    super(value ? value.toString() : "?")
  }
}

export default responseBodyMaxText
