import AppTextBox from "@ElementBase/textbox";

class RequestBodyNameText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default RequestBodyNameText
