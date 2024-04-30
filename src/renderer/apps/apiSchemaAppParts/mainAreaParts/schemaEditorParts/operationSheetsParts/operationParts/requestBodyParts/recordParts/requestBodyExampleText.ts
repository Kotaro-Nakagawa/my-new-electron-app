import AppTextBox from "@ElementBase/textbox";
import RequestBodyNameText from "./requestBodyNameText";
import RequestBodyDescriptionText from "./requestBodyDescriptionText";

class RequestBodyExampleText extends AppTextBox {
  name: RequestBodyNameText;
  description: RequestBodyDescriptionText;
  constructor(value: string) {
    super((value !== undefined) ? value : '')
  }
}

export default RequestBodyExampleText
