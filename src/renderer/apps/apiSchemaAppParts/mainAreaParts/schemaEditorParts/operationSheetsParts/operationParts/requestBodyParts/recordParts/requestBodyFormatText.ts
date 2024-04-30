import AppTextBox from "@ElementBase/textbox";

class RequestBodyFormatText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default RequestBodyFormatText
