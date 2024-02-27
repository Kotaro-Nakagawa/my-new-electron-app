import AppRestrictedTextBox from "@ElementBase/restrictedTextBox";
import AppSection from "@ElementBase/section";
import RequestBody from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/requestBody";
import Schema from "@Structure/openAPI/schema";

const requestSampleValidation = (string: string, onEnsureValid: (value: object) => void) => {
  let isValid = false
  let value

  try {
    value = JSON.parse(string)

    onEnsureValid(value)
    isValid = true
  } catch (e) {
    console.log(e)
  }
  return {
    isValid: isValid,
    message: isValid ? 'json is valid' : 'json の形式が不正です'
  }
}

const jsonTypeOf = (value: any): JsonType => {
  const jsType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" = typeof value
  switch (jsType) {
    case "string": return "string"
    case "number": return "number"
    case "bigint": return "number"
    case "boolean": return "boolean"
    case "symbol": return "string"
    case "undefined": return "null"
    case "object": return Array.isArray(value) ? "array" : "object"
    case "function": return "null"
  }
}

const jsonSampleToJsonSchema = (sample: object): Schema => {
  const jsonType = jsonTypeOf(sample)
  return {
    type: jsonType,
    examples: (typeof sample === "object") ? [] : [sample],
    properties: (jsonType === "object") ? Object.fromEntries(Object.entries(sample).map(([key, value]) => [key, jsonSampleToJsonSchema(value)])) : undefined,
    items: (jsonType === "array" && (sample as Array<any>).length > 0) ? jsonSampleToJsonSchema((sample as Array<any>)[0]) : undefined,
    default: (typeof sample === "object") ? "" : sample
  }
}

const jsonSampleToRequest = (sample: object): RequestBody => {
  return {
    description: '',
    content: {
      "application/json": {
        schema: jsonSampleToJsonSchema(sample)
      }
    }
  }
}

class BodySampleBox extends AppRestrictedTextBox {
  #requestBodySchema: RequestBody
  constructor() {
    super('', () => { }, (value: string) => {
      return requestSampleValidation(value, (validSample: object) => {
        this.#requestBodySchema = jsonSampleToRequest(validSample)
      })
    })
    this.textBox.element.style.whiteSpace = 'pre-wrap'
  }
  get requestBodySchema() {
    return this.#requestBodySchema
  }
}

class BodySampleSection extends AppSection<BodySampleBox>{
  constructor() {
    super('Request Body', new BodySampleBox())
  }
  get requestBodySchema() {
    return this.content.requestBodySchema
  }
}

export default BodySampleSection
