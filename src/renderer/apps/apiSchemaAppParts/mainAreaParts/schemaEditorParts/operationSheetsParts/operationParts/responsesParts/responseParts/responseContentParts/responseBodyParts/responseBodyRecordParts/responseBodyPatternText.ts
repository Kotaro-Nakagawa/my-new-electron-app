import AppTextBox from "@ElementBase/textbox";

class responseBodyPatternText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyPatternText
