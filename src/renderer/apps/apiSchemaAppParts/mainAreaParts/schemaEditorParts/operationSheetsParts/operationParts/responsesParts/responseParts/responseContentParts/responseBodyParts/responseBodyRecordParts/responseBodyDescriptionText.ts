import AppTextBox from "@ElementBase/textbox";

class responseBodyDescriptionText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyDescriptionText
