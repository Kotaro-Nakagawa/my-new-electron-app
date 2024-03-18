import AppFoldableTable from "@ElementBase/foldableTable";
import { ResponseBodyRecordType } from "./responseBodyParts/responseBodyRecordType";
import SchemaValues from "../../../requestBodyParts/parameterInterface";
import { nestedElementForFoldableTable } from "@ElementBase/foldableTableParts/nestedElementForFoldableTableType";
import responseBodyNameText from "./responseBodyParts/responseBodyRecordParts/responseBodyNameText";
import responseBodyDescriptionText from "./responseBodyParts/responseBodyRecordParts/responseBodyDescriptionText";
import responseBodyRequiredText from "./responseBodyParts/responseBodyRecordParts/responseBodyRequiredText";
import responseBodyTypeText from "./responseBodyParts/responseBodyRecordParts/responseBodyTypeText";
import responseBodyFormatText from "./responseBodyParts/responseBodyRecordParts/responseBodyFormatText";
import responseBodyEnumText from "./responseBodyParts/responseBodyRecordParts/responseBodyEnumText";
import responseBodyPatternText from "./responseBodyParts/responseBodyRecordParts/responseBodyPatternText";
import responseBodyMinText from "./responseBodyParts/responseBodyRecordParts/responseBodyMinText";
import responseBodyMaxText from "./responseBodyParts/responseBodyRecordParts/responseBodyMaxText";
import ResponseBodyLimitMayExclusiveSelect from "./responseBodyParts/responseBodyRecordParts/responseBodyLimitMayExclusiveSelect";
import responseBodyExampleText from "./responseBodyParts/responseBodyRecordParts/responseBodyExampleText";

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
    type: '型',
    format: 'フォーマット',
    enum: '列挙',
    pattern: 'パターン',
    min: '最小',
    isMinExclusive: '<?',
    isMaxExclusive: '<?',
    max: '最大',
    example: 'サンプル',
  }[key]
}

class ResponseBody extends AppFoldableTable<ResponseBodyRecordType> {
  constructor() {
    super(Array.from(Object.keys(columns)), Array.from(Object.values(columns)), keyToColumnTitle)
  }

  putData(data: SchemaValues) {
    this.appendContent(elementsFromData(data))

    function elementsFromData(data: SchemaValues): nestedElementForFoldableTable<ResponseBodyRecordType> {
      if (data.type === "object" || data.type === "array") {
        return {
          subroot: {
            name: new responseBodyNameText(data.name),
            description: new responseBodyDescriptionText(data.description),
            required: new responseBodyRequiredText(data.required),
            type: new responseBodyTypeText(data.type),
            format: new responseBodyFormatText(data.format),
            enum: new responseBodyEnumText(data.enum),
            pattern: new responseBodyPatternText(data.pattern),
            min: new responseBodyMinText(data.min),
            max: new responseBodyMaxText(data.max),
            isMinExclusive: new ResponseBodyLimitMayExclusiveSelect(data.isMinExclusive),
            isMaxExclusive: new ResponseBodyLimitMayExclusiveSelect(data.isMaxExclusive),
            example: new responseBodyExampleText(data.example)
          },
          children: data.children.map(c => elementsFromData(c))
        }
      }
      return {
        record: {
          name: new responseBodyNameText(data.name),
          description: new responseBodyDescriptionText(data.description),
          required: new responseBodyRequiredText(data.required),
          type: new responseBodyTypeText(data.type),
          format: new responseBodyFormatText(data.format),
          enum: new responseBodyEnumText(data.enum),
          pattern: new responseBodyPatternText(data.pattern),
          min: new responseBodyMinText(data.min),
          max: new responseBodyMaxText(data.max),
          isMinExclusive: new ResponseBodyLimitMayExclusiveSelect(data.isMinExclusive),
          isMaxExclusive: new ResponseBodyLimitMayExclusiveSelect(data.isMaxExclusive),
          example: new responseBodyExampleText(data.example)
        }
      }
    }
  }
}

export default ResponseBody
