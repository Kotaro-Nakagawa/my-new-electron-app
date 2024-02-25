import AppSection from "@ElementBase/section";
import AppTextBox from "@ElementBase/textbox";

class BodySampleBox extends AppTextBox {
  constructor() {
    super('')
  }
}

class BodySampleSection extends AppSection<BodySampleBox>{
  constructor() {
    super('Request Body', new BodySampleBox())
  }
}

export default BodySampleSection