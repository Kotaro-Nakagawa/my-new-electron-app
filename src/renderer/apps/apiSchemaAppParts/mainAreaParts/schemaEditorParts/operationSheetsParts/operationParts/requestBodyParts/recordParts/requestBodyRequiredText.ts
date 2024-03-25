import AppTextBox from "@ElementBase/textbox";

class RequestBodyRequiredText extends AppTextBox {
  constructor(value: boolean) {
    super(value ? '✓' : '')
  }
}

export default RequestBodyRequiredText
