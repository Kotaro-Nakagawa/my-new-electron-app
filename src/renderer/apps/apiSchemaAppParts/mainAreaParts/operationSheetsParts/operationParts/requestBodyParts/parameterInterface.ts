interface SchemaValues {
  name: string
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  type?: JsonType
  format?: string
  enum?: string
  pattern?: string
  min?: number
  max?: number
  isMinExclusive?: boolean
  isMaxExclusive?: boolean
  example?: string
  children?: SchemaValues[]
}

export default SchemaValues
