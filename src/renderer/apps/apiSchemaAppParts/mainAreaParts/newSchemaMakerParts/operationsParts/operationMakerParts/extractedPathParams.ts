import KeyValueList from "@ElementBase/foldableKeyValueParts/keyValueList";
import KeyValueRecord from "@ElementBase/foldableKeyValueParts/keyValueRecord";
import AppLabel from "@ElementBase/label";
import AppTextBox from "@ElementBase/textbox";

class ExtractedPathParams extends KeyValueList {
  constructor() {
    super()
  }
  loadData(samples: [string, string][]) {
    this.clear()
    this.pushMany(samples.map(s => new KeyValueRecord(new AppLabel(s[0]), new AppTextBox(s[1]))))
  }
}

export default ExtractedPathParams