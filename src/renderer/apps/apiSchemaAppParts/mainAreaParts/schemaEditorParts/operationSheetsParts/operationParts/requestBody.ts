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
import Schema from "@Structure/openAPI/schema"
import RequestBody from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/requestBody"
import Reference from "@Structure/openAPI/openAPIParts/reference"
import SchemaConverter from "./requestBodyParts/schemaConverter"

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

class AppRequestBody extends AppFoldableTable<RequestBodyRecordType> {
  constructor() {
    super(Array.from(Object.keys(columns)), Array.from(Object.values(columns)), keyToColumnTitle)
  }
  putData(data: RequestBody) {
    if (!("content" in data)) return
    const contents = Object.entries(data.content)
    const firstMedia = contents[0][1]
    const schemaValues = SchemaConverter.schemaValuesFromSchema('<root>', firstMedia.schema, true)
    this.appendContent(elementsFromData(schemaValues))

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
  get value(): Schema {
    const contents = this.getContents()
    if (!('children' in contents)) return undefined
    if (contents.children.length === 0) return undefined
    const SchemaValues = valuesFromElement(contents.children[0])
    return schemaFromSchemaValues(SchemaValues)

    function valuesFromElement(elem: nestedElementForFoldableTable<RequestBodyRecordType>): SchemaValues {
      console.log(elem)
      if ('record' in elem) {
        const record = elem.record
        return {
          name: record.name.value,
          description: record.description.value,
          required: record.required.isRequired,
          deprecated: undefined,
          allowEmptyValue: undefined,
          type: jsonTypeFromString(record.type.value),
          format: record.format.value,
          enum: record.enum.value,
          pattern: record.pattern.value,
          min: record.min.minNumber,
          max: record.max.maxNumber,
          isMinExclusive: record.isMinExclusive.isExclusive,
          isMaxExclusive: record.isMaxExclusive.isExclusive,
          example: record.example.value,
          children: undefined
        }
      } else {
        const record = elem.subroot
        const children = elem.children
        return {
          name: record.name.value,
          description: record.description.value,
          required: record.required.isRequired,
          deprecated: undefined,
          allowEmptyValue: undefined,
          type: jsonTypeFromString(record.type.value),
          format: record.format.value,
          enum: record.enum.value,
          pattern: record.pattern.value,
          min: record.min.minNumber,
          max: record.max.maxNumber,
          isMinExclusive: record.isMinExclusive.isExclusive,
          isMaxExclusive: record.isMaxExclusive.isExclusive,
          example: record.example.value,
          children: children.map(c => valuesFromElement(c))
        }
      }

      function jsonTypeFromString(str: string): JsonType {
        if (str === 'string') return str
        if (str === 'number') return str
        if (str === 'boolean') return str
        if (str === 'object') return str
        if (str === 'integer') return str
        if (str === 'array') return str
        if (str === 'null') return str
        return undefined
      }
    }

    function schemaFromSchemaValues(schemaValues: SchemaValues): Schema {
      const schema: Schema = {
        description: schemaValues.description,
        type: schemaValues.type,
        format: schemaValues.format,
        enum: schemaValues.enum,
        pattern: schemaValues.pattern,
        exclusiveMinimum: schemaValues.isMinExclusive ? schemaValues.min : undefined,
        minimum: schemaValues.isMinExclusive ? undefined : schemaValues.min,
        exclusiveMaximum: schemaValues.isMaxExclusive ? schemaValues.max : undefined,
        maximum: schemaValues.isMaxExclusive ? undefined : schemaValues.max,
        minlength: schemaValues.min,
        maxlength: schemaValues.max,
        examples: schemaValues.example ? schemaValues.example.split('\n') : undefined,
        properties: {},
        required: [],
        default: schemaValues.example ? schemaValues.example.split('\n')[0] : '',
      };

      if (schemaValues.children) {
        schema.properties = {};
        schemaValues.children.forEach(child => {
          schema.properties[child.name] = schemaFromSchemaValues(child);
          if (child.required) {
            schema.required.push(child.name);
          }
        });
      }

      return schema;
    }
  }
}

class RequestBodySection extends AppSection<AppRequestBody> {
  constructor() {
    super('Request Body', new AppRequestBody())
    this.element.id = elementId
  }
  loadData(data: RequestBody | Reference) {
    if ('content' in data) {
      this.content.putData(data)
    }
  }
  get value(): RequestBody {
    const schema = this.content.value
    if (schema === undefined) return undefined
    return {
      description: '',
      content: {
        'application/json': { schema: schema }
      }
    }
  }
}

export default RequestBodySection
