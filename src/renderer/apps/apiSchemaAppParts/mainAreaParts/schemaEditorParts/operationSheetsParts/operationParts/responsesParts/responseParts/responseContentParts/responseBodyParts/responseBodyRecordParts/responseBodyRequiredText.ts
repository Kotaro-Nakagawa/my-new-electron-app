import AppTextBox from "@ElementBase/textbox";

class responseBodyRequiredText extends AppTextBox {
  constructor(value: boolean) {
    super(value ? '✓' : '')
  }
  get isRequired(): boolean {
    return this.value === '✓'
  }
}

export default responseBodyRequiredText
