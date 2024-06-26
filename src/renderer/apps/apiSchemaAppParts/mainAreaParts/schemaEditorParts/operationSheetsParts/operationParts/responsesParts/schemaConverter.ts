import Schema from "@Structure/openAPI/schema"
import SchemaValues from "../requestBodyParts/parameterInterface";

const schemaValuesFromSchema = (name: string, schema: Schema, required: boolean): SchemaValues => {
  const exampleToExampleStr = (example: any) => {
    if (example === undefined) return ''
    const toStrIfObject = (value: any) => {
      if (typeof value === 'object') return JSON.stringify(value)
      return value
    }

    if (Array.isArray(example)) return example.map(e => toStrIfObject(e)).join('\n')
    return example
  }
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
    example: exampleToExampleStr(schema.examples),
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

class SchemaConverter {
  static schemaValuesFromSchema(name: string, schema: Schema, required: boolean): SchemaValues {
    return schemaValuesFromSchema(name, schema, required)
  }
}

export default SchemaConverter
