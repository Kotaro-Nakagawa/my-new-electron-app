import AppTextBox from "@ElementBase/textbox";

class responseBodyNameText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyNameText
