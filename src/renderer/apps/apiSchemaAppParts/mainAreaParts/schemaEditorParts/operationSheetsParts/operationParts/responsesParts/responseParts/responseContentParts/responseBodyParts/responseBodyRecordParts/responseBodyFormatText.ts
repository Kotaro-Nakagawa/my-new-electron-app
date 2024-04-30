import AppTextBox from "@ElementBase/textbox";

class responseBodyFormatText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyFormatText
