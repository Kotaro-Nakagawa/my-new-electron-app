import AppTextBox from "@ElementBase/textbox";

class RequestBodyTypeText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default RequestBodyTypeText
