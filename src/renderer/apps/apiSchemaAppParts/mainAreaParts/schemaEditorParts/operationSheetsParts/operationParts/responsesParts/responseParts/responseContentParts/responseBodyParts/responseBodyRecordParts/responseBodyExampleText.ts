import AppTextBox from "@ElementBase/textbox";
import responseBodyNameText from "./responseBodyNameText";
import responseBodyDescriptionText from "./responseBodyDescriptionText";

class responseBodyExampleText extends AppTextBox {
  name: responseBodyNameText;
  description: responseBodyDescriptionText;
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default responseBodyExampleText
