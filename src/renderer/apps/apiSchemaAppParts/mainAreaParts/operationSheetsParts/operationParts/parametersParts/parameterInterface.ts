interface ParameterValues {
  name: string
  in: "query" | "header" | "path" | "cookie"
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  type?: "string" | "number" | "integer" | "boolean"
  format?: string
  enum?: string
  pattern?: string
  min?: number
  max?: number
  isMinExclusive?: boolean
  isMaxExclusive?: boolean
  example?: string
}

export default ParameterValues
