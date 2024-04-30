import AppTextBox from "@ElementBase/textbox";

class RequestBodyPatternText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default RequestBodyPatternText
