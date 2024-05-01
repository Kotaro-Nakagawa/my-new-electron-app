import AppTextBox from "@ElementBase/textbox";

class responseBodyTypeText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyTypeText
