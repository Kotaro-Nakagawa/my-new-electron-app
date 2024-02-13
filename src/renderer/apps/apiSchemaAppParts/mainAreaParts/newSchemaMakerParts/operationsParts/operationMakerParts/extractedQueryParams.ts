import KeyValueList from "@ElementBase/foldableKeyValueParts/keyValueList";
import KeyValueRecord from "@ElementBase/foldableKeyValueParts/keyValueRecord";
import AppLabel from "@ElementBase/label";
import AppTextBox from "@ElementBase/textbox";

class QueryParamName extends AppLabel {
  constructor(value: string) {
    super(value)
  }
}

class QuerySampleValue extends AppTextBox {
  constructor(value: string) {
    super(value)
  }
}

class QueryParamRecord extends KeyValueRecord {
  constructor(paramName: string, sampleValue: string) {
    super(new QueryParamName(paramName), new QuerySampleValue(sampleValue))
  }
}

class ExtractedQueryParams extends KeyValueList {
  constructor() {
    super()
    this.element.id = 'query-params'
  }

  putData(queries: { paramName: string, value: string }[]) {
    this.clear()
    this.pushMany(queries.map(q => new QueryParamRecord(q.paramName, q.value)))
  }
}

export default ExtractedQueryParams