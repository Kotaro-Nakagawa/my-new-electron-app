import Schema from "@Structure/openAPI/schema";

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

export default jsonSampleToJsonSchema