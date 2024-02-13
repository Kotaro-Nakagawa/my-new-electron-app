import KeyValueList from "@ElementBase/foldableKeyValueParts/keyValueList";
import KeyValueRecord from "@ElementBase/foldableKeyValueParts/keyValueRecord";
import AppLabel from "@ElementBase/label";
import AppTextBox from "@ElementBase/textbox";

class ExtractedPathParams extends KeyValueList {
  constructor() {
    super()
    this.element.id = 'pathParams'
  }
  putData(samples: { paramName: string, value: string }[]) {
    this.clear()
    this.pushMany(samples.map(s => new KeyValueRecord(new AppLabel(s.paramName), new AppTextBox(s.value))))
  }
}

export default ExtractedPathParams