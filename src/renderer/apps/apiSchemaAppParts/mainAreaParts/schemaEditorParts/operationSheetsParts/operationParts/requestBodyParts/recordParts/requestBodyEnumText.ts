import AppTextBox from "@ElementBase/textbox";

class RequestBodyEnumText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default RequestBodyEnumText
