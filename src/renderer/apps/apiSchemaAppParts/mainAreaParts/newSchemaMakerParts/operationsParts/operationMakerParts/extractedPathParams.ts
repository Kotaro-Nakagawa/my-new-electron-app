import KeyValueList from "@ElementBase/foldableKeyValueParts/keyValueList";
import KeyValueRecord from "@ElementBase/foldableKeyValueParts/keyValueRecord";
import AppLabel from "@ElementBase/label";
import AppTextBox from "@ElementBase/textbox";
import AppSection from "@ElementBase/section";

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

class PathParamSection extends AppSection<ExtractedPathParams>{
  constructor() {
    super('PathParameter', new ExtractedPathParams())
  }
  putData(samples: { paramName: string, value: string }[]) {
    this.content.putData(samples)
  }
  get value() {
    return this.content.value
  }
}

export default PathParamSection