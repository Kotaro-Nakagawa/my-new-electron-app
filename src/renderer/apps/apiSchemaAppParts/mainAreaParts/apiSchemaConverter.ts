import Paths from "@Structure/openAPI/openAPIParts/paths";
import OpenAPI from "@Structure/openAPI/openAPI";
import SchemaViewJson from "../openAPIInterface";
import OperationSheetsData from "./schemaEditorParts/operationSheetsInterface";
import PathTableInterface from "./schemaEditorParts/pathTableInterface";
import PathSchemaCompleteness from "./schemaEditorParts/pathTableParts/pathSchemaCompleteness";
import OperationData from "./schemaEditorParts/operationSheetsParts/operationInterface";
import Operation from "@Structure/openAPI/openAPIParts/pathitemParts/operation";
import Parameter from "@Structure/openAPI/openAPIParts/pathitemParts/parameter";
import RequestBody from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/requestBody";
import Reference from "@Structure/openAPI/openAPIParts/reference";
import ParameterValues from "./schemaEditorParts/operationSheetsParts/operationParts/parametersParts/parameterInterface";
import SchemaValues from "./schemaEditorParts/operationSheetsParts/operationParts/requestBodyParts/parameterInterface";
import Schema from "@Structure/openAPI/schema";
import Info from "@Structure/openAPI/openAPIParts/info";
import InfoTableInterface from "./schemaEditorParts/infoTableInterface";
import Contact from "@Structure/openAPI/openAPIParts/infoParts/contact";
import License from "@Structure/openAPI/openAPIParts/infoParts/license";
import Responses from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/responses";
import Response from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/responsesParts/response";
import MediaType from "@Structure/openAPI/openAPIParts/pathitemParts/commonParts/mediaType";
import PathItem from "@Structure/openAPI/openAPIParts/pathItem";

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

const infoSchemaFromJson = (json: InfoTableInterface): Info => {
  const title = json.find(e => e.key === 'title')
  const summary = json.find(e => e.key === 'summary')
  const description = json.find(e => e.key === 'description')
  const termsOfService = json.find(e => e.key === 'termsOfService')
  const Contact = json.find(e => e.key === 'Contact')
  const ContactName = Contact ? typeof Contact.value === 'object' ? Contact.value.find(e => e.key === 'name') : { value: '' } : { value: '' }
  const ContactUrl = Contact ? typeof Contact.value === 'object' ? Contact.value.find(e => e.key === 'url') : { value: '' } : { value: '' }
  const ContactEmail = Contact ? typeof Contact.value === 'object' ? Contact.value.find(e => e.key === 'email') : { value: '' } : { value: '' }
  const license = json.find(e => e.key === 'license')
  const licenseName = license ? typeof license.value === 'object' ? license.value.find(e => e.key === 'name') : { value: '' } : { value: '' }
  const licenseIdentifier = license ? typeof license.value === 'object' ? license.value.find(e => e.key === 'identifier') : { value: '' } : { value: '' }
  const licenseUrl = license ? typeof license.value === 'object' ? license.value.find(e => e.key === 'url') : { value: '' } : { value: '' }
  const version = json.find(e => e.key === 'version')
  const contactBody = {
    name: typeof ContactName.value === 'string' ? ContactName.value : '',
    url: typeof ContactUrl.value === 'string' ? ContactUrl.value : '',
    email: typeof ContactEmail.value === 'string' ? ContactEmail.value : ''
  }
  const licenseBody = {
    name: typeof licenseName.value === 'string' ? licenseName.value : '',
    identifier: typeof licenseIdentifier.value === 'string' ? licenseIdentifier.value : '',
    url: typeof licenseUrl.value === 'string' ? licenseUrl.value : '',
  }
  return {
    title: typeof title.value === 'string' ? title.value : '',
    summary: summary ? typeof summary.value === 'string' ? summary.value : '' : '',
    description: description ? typeof description.value === 'string' ? description.value : '' : '',
    termsOfService: termsOfService ? typeof termsOfService.value === 'string' ? termsOfService.value : '' : '',
    Contact: contactBody,
    license: licenseBody,
    version: version ? typeof version.value === 'string' ? version.value : '' : '',
  }
}

const parametersJsonFromSchema = (parameters: (Parameter | Reference)[]): ParameterValues[] => {
  const ret = parameters.map(p => {
    return {
      name: "name" in p ? p.name : "ref",
      in: "in" in p ? p.in : "query",
      description: "description" in p ? p.description : undefined,
      required: "required" in p ? p.required : undefined,
      deprecated: "deprecated" in p ? p.deprecated : undefined,
      allowEmptyValue: "allowEmptyValue" in p ? p.allowEmptyValue : undefined,
      schema: "schema" in p ? p.schema : undefined,
      example: "example" in p ? p.example : undefined
    }
  })
  return ret
}

const requestBodyJsonFromSchema = (body: RequestBody | Reference): SchemaValues => {
  if (!("content" in body)) return undefined
  const contents = Object.entries(body.content)
  const firstMedia = contents[0][1]
  return schemaValuesFromSchema('<root>', firstMedia.schema, true)
}

const responseBodyJsonFromSchema = (body: Responses | Reference): Record<string, SchemaValues> => {
  if ("$ref" in body) return undefined
  return Object.fromEntries(Object.entries(body).map(([k, r]) => {
    return [k, ("content" in r) ? schemaValuesFromSchema('<root>', r.content["application/json"].schema, true) : undefined]
  }))
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
    requestBody: operation.requestBody ? operation.requestBody : undefined,
    responses: operation.responses ? operation.responses : undefined
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

const ParameterSchemaFromParameterValues = (json: ParameterValues[]): Parameter[] => {
  return json.map(p => {
    return {
      name: p.name,
      in: p.in,
      description: p.description,
      required: p.required,
      deprecated: p.deprecated,
      allowEmptyValue: p.allowEmptyValue,
      style: undefined,
      explode: undefined,
      allowReserved: undefined,
      schema: undefined,
      example: p.example,
      examples: undefined,
      content: undefined
    }
  })
}

const operationSchemaFromOperationSheet = (sheet: OperationData): Operation => {
  const ret: Operation = {}
  ret.operationId = sheet.operationId
  ret.parameters = ParameterSchemaFromParameterValues(sheet.parameters)
  ret.requestBody = sheet.requestBody
  ret.responses = sheet.responses
  return ret
}

const pathItemFromOperationSheets = (sheets: OperationSheetsData): PathItem => {
  const ret: PathItem = {}
  const methods = ["get", "put", "post", "delete", "patch", "head"] as const
  methods.forEach((m) => {
    const getOperation = sheets.find(s => s.method === m)
    ret[m] = getOperation ? operationSchemaFromOperationSheet(getOperation) : undefined
  })
  return ret
}

const pathsSchemaFromJson = (sheets: OperationSheetsData): Paths => {
  const pathStrs = sheets.map(s => s.path)
  const ret: Paths = {}
  pathStrs.forEach((p) => {
    ret[p] = pathItemFromOperationSheets(sheets.filter(s => s.path === p))
  })
  return ret
}

class ApiSchemaConverter {
  static schemaToViewJson(openAPI: OpenAPI): SchemaViewJson {
    return {
      info: intoJsonFromSchema(openAPI.info),
      operations: operationsJsonFromSchema(openAPI.paths),
      path: pathJsonFromSchema(openAPI.paths)
    }
  }

  static viewJsonToSchema(info: InfoTableInterface, operations: OperationSheetsData): OpenAPI {
    return {
      openapi: '3.1.0',
      info: infoSchemaFromJson(info),
      paths: pathsSchemaFromJson(operations)
    }
  }
}

export default ApiSchemaConverter