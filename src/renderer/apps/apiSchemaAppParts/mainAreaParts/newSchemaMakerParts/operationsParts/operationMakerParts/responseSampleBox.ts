import AppSection from "@ElementBase/section";
import AppTextBox from "@ElementBase/textbox";

class ResponseSampleBox extends AppTextBox {
  constructor() {
    super('')
  }
}

class ResponseSampleSection extends AppSection<ResponseSampleBox>{
  constructor() {
    super('Response Body', new ResponseSampleBox())
  }
}

export default ResponseSampleSection