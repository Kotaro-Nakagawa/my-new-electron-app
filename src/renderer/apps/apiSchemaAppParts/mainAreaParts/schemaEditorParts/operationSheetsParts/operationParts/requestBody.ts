import AppSection from "@ElementBase/section"
import BodySchema from "./requestBodyParts/parameterInterface"
import AppFoldableTable from "@ElementBase/foldableTable"
import { RequestBodyRecordType } from "./requestBodyParts/requestBodyRecordType"
import RequestBodyNameText from "./requestBodyParts/recordParts/requestBodyNameText"
import RequestBodyDescriptionText from "./requestBodyParts/recordParts/requestBodyDescriptionText"
import RequestBodyRequiredText from "./requestBodyParts/recordParts/requestBodyRequiredText"
import RequestBodyTypeText from "./requestBodyParts/recordParts/requestBodyTypeText"
import RequestBodyFormatText from "./requestBodyParts/recordParts/requestBodyFormatText"
import RequestBodyEnumText from "./requestBodyParts/recordParts/requestBodyEnumText"
import RequestBodyPatternText from "./requestBodyParts/recordParts/requestBodyPatternText"
import RequestBodyMinItem from "./requestBodyParts/recordParts/requestBodyMinItem"
import RequestBodyMaxItem from "./requestBodyParts/recordParts/requestBodyMaxItem"
import RequestBodyLimitMayExclusiveSelect from "./requestBodyParts/recordParts/requestBodyLimitMayExclusiveSelect"
import RequestBodyExampleText from "./requestBodyParts/recordParts/requestBodyExampleText"
import SchemaValues from "./requestBodyParts/parameterInterface"
import { nestedElementForFoldableTable } from "@ElementBase/foldableTableParts/nestedElementForFoldableTableType"

const columns = {
  name: 1,
  description: 3,
  required: 1,
  type: 1,
  format: 1,
  enum: 1,
  pattern: 1,
  min: 1,
  isMinExclusive: 0.5,
  isMaxExclusive: 0.5,
  max: 1,
  example: 3,
}

const keyToColumnTitle = (key: string) => {
  return {
    name: '名前',
    description: '詳細',
    required: '必須',
    type: 'データ型',
    format: '形式',
    enum: '列挙',
    pattern: 'パターン',
    min: '最小',
    isMinExclusive: '<?',
    isMaxExclusive: '<?',
    max: '最大',
    example: 'サンプル',
  }[key]
}

const elementId = 'request-body'

class RequestBody extends AppFoldableTable<RequestBodyRecordType> {
  constructor() {
    super(Array.from(Object.keys(columns)), Array.from(Object.values(columns)), keyToColumnTitle)
  }
  putData(data: SchemaValues) {
    this.appendContent(elementsFromData(data))

    function elementsFromData(data: SchemaValues): nestedElementForFoldableTable<RequestBodyRecordType> {
      if (data.type === "object" || data.type === "array") {
        return {
          subroot: {
            name: new RequestBodyNameText(data.name),
            description: new RequestBodyDescriptionText(data.description),
            required: new RequestBodyRequiredText(data.required),
            type: new RequestBodyTypeText(data.type),
            format: new RequestBodyFormatText(data.format),
            enum: new RequestBodyEnumText(data.enum),
            pattern: new RequestBodyPatternText(data.pattern),
            min: new RequestBodyMinItem(data.min),
            max: new RequestBodyMaxItem(data.max),
            isMinExclusive: new RequestBodyLimitMayExclusiveSelect(data.isMinExclusive),
            isMaxExclusive: new RequestBodyLimitMayExclusiveSelect(data.isMaxExclusive),
            example: new RequestBodyExampleText(data.example)
          },
          children: data.children.map(c => elementsFromData(c))
        }
      }
      return {
        record: {
          name: new RequestBodyNameText(data.name),
          description: new RequestBodyDescriptionText(data.description),
          required: new RequestBodyRequiredText(data.required),
          type: new RequestBodyTypeText(data.type),
          format: new RequestBodyFormatText(data.format),
          enum: new RequestBodyEnumText(data.enum),
          pattern: new RequestBodyPatternText(data.pattern),
          min: new RequestBodyMinItem(data.min),
          max: new RequestBodyMaxItem(data.max),
          isMinExclusive: new RequestBodyLimitMayExclusiveSelect(data.isMinExclusive),
          isMaxExclusive: new RequestBodyLimitMayExclusiveSelect(data.isMaxExclusive),
          example: new RequestBodyExampleText(data.example)
        }
      }
    }
  }
}

class RequestBodySection extends AppSection<RequestBody> {
  constructor() {
    super('Request Body', new RequestBody())
    this.element.id = elementId
  }
  loadData(data: BodySchema) {
    this.content.putData(data)
  }
}

export default RequestBodySection
