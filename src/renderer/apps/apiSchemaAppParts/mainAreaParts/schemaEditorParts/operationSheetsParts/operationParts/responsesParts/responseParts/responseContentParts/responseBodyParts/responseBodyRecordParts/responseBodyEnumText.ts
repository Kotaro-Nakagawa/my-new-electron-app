import AppTextBox from "@ElementBase/textbox";

class responseBodyEnumText extends AppTextBox {
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyEnumText
