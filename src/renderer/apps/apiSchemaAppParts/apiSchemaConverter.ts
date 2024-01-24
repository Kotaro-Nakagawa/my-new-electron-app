import Paths from "../../../structure/openAPI/openAPIParts/paths";
import OpenAPI from "../../../structure/openAPI/openAPI";
import SchemaViewJson from "./openAPIInterface";
import OperationSheetsData from "./mainAreaParts/operationSheetsInterface";
import PathTableInterface from "./mainAreaParts/pathTableInterface";
import PathSchemaCompleteness from "./mainAreaParts/pathTableParts/pathSchemaCompleteness";
import OperationData from "./mainAreaParts/operationSheetsParts/operationInterface";
import Operation from "../../../structure/openAPI/openAPIParts/pathitemParts/operation";
import Parameter from "../../../structure/openAPI/openAPIParts/pathitemParts/parameter";
import RequestBody from "../../../structure/openAPI/openAPIParts/pathitemParts/operationParts/requestBody";
import Reference from "../../../structure/openAPI/openAPIParts/reference";
import ParameterValues from "./mainAreaParts/operationSheetsParts/operationParts/parametersParts/parameterInterface";
import SchemaValues from "./mainAreaParts/operationSheetsParts/operationParts/requestBodyParts/parameterInterface";
import Schema from "../../../structure/openAPI/schema";
import Info from "@Structure/openAPI/openAPIParts/info";
import InfoTableInterface from "./mainAreaParts/infoTableInterface";
import Contact from "@Structure/openAPI/openAPIParts/infoParts/contact";
import License from "@Structure/openAPI/openAPIParts/infoParts/license";

const intoJsonFromSchema = (info: Info): InfoTableInterface => {
  const valueConverter = (key: string, value: string | Contact | License): string | InfoTableInterface => {
    if (typeof value === 'string') {
      return value
    }
    if (typeof value === 'object') {
      return Object.entries(value).map(([k, v]) => {
        return { key: k, value: v }
      })
    }
    return 'ERROR'
  }
  return Object.entries(info).map(([k, v]) => { return { key: k, value: valueConverter(k, v) } })
}

const parametersJsonFromSchema = (parameters: (Parameter | Reference)[]): ParameterValues[] => {
  const ret = parameters.map(p => {
    // p が reference 型だった場合の処理をここに入れる
    const guardToSimpleType = (t: (JsonType | JsonType[])): "string" | "number" | "integer" | "boolean" => {
      const tt = (Array.isArray(t)) ? t[0] : t
      if (["string", "number", "integer", "boolean"].includes(tt)) return tt as "string" | "number" | "integer" | "boolean"
      return undefined
    }
    return {
      name: "name" in p ? p.name : "ref",
      in: "in" in p ? p.in : "query",
      description: "description" in p ? p.description : undefined,
      required: "required" in p ? p.required : undefined,
      deprecated: "deprecated" in p ? p.deprecated : undefined,
      allowEmptyValue: "allowEmptyValue" in p ? p.allowEmptyValue : undefined,
      type: "schema" in p ? guardToSimpleType(p.schema.type) : undefined,
    }
  })
  return ret
}

const requestBodyJsonFromSchema = (body: RequestBody | Reference): SchemaValues => {
  if (!("content" in body)) return undefined
  const contents = Object.entries(body.content)
  // const [firstMediaKey] = body.content.keys()
  // const firstMedia = body.content.get(firstMediaKey)
  const firstMedia = contents[0][1]
  const schemaValuesFromSchema = (name: string, schema: Schema, required: boolean): SchemaValues => {
    return {
      name: name,
      description: schema.description,
      required: required,
      type: Array.isArray(schema.type) ? schema.type[0] : schema.type,
      format: schema.format,
      enum: schema.enum,
      pattern: schema.pattern,
      min: schema.exclusiveMinimum || schema.minimum || schema.minlength,
      max: schema.exclusiveMaximum || schema.maximum || schema.maxlength,
      isMinExclusive: "exclusiveMinimum" in schema ? true : false,
      isMaxExclusive: "exclusiveMaximum" in schema ? true : false,
      example: schema.examples ? schema.examples.join('\n') : '',
      children: (() => {
        if (schema.properties) {
          return Array.from(Object.entries(schema.properties)).map(([k, v]) => {
            return schemaValuesFromSchema(k, v, schema.required ? schema.required.includes(k) : false)
          })
        }
        if (schema.items) {
          return [schemaValuesFromSchema('<item>', schema.items, undefined)]
        }
      })()
    }
  }
  return schemaValuesFromSchema('<root>', firstMedia.schema, true)
}

const operationJsonFromSchema = (path: string, method: string, operation: Operation): OperationData | undefined => {
  if (operation === undefined) return undefined
  const ret: OperationData = {
    path: path,
    method: method,
    summary: operation.summary,
    description: operation.description,
    operationId: operation.operationId,
    parameters: operation.parameters ? parametersJsonFromSchema(operation.parameters) : [],
    requestBody: operation.requestBody ? requestBodyJsonFromSchema(operation.requestBody) : undefined,
    responses: undefined // To be implemented
  }
  return ret
}

const operationsJsonFromSchema = (paths: Paths): OperationSheetsData => {
  return Object.entries(paths).flatMap(([path, operations]) => {
    const ret = []
    if (operations.get) ret.push(operationJsonFromSchema(path, 'get', operations.get))
    if (operations.put) ret.push(operationJsonFromSchema(path, 'put', operations.put))
    if (operations.post) ret.push(operationJsonFromSchema(path, 'post', operations.post))
    if (operations.delete) ret.push(operationJsonFromSchema(path, 'delete', operations.delete))
    if (operations.patch) ret.push(operationJsonFromSchema(path, 'patch', operations.patch))
    return ret
  })
}

const pathJsonFromSchema = (paths: Paths): PathTableInterface => {
  return {
    paths: Object.entries(paths).map(kv => kv[0]),
    completenss: Object.entries(paths).map(kv => kv[1]).map(v => {
      const ret: PathSchemaCompleteness = {}
      if (v.get !== undefined) ret.get = true
      if (v.put !== undefined) ret.put = true
      if (v.post !== undefined) ret.post = true
      if (v.delete !== undefined) ret.delete = true
      if (v.patch !== undefined) ret.patch = true
      return ret
    })
  }
}

class ApiSchemaConverter {
  static schemaToViewJson(openAPI: OpenAPI): SchemaViewJson {
    return {
      info: intoJsonFromSchema(openAPI.info),
      operations: operationsJsonFromSchema(openAPI.paths),
      path: pathJsonFromSchema(openAPI.paths)
    }
  }

  static viewJsonToSchema() {
    // tobeImplemented
  }
}

export default ApiSchemaConverter