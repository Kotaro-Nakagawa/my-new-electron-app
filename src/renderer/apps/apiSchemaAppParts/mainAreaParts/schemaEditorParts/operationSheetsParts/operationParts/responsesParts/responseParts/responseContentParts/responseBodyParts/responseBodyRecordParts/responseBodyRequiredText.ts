import AppTextBox from "@ElementBase/textbox";

class responseBodyRequiredText extends AppTextBox {
  constructor(value: boolean) {
    super(value ? '✓' : '')
  }
}

export default responseBodyRequiredText
