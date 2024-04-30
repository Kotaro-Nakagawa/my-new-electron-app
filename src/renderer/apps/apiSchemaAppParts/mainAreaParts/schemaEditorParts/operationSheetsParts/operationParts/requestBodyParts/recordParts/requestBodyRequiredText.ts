import AppTextBox from "@ElementBase/textbox";

class RequestBodyRequiredText extends AppTextBox {
  constructor(value: boolean) {
    super(value ? '✓' : '')
  }
  get isRequired(): boolean {
    return this.value === '✓'
  }
}

export default RequestBodyRequiredText
