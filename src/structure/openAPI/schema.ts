interface Schema {
  type?: JsonType | JsonType[]
  format?: string
  enum?: string
  pattern?: string
  minlength?: number
  maxlength?: number
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number
  exclusiveMaximum?: number
  properties?: Record<string, Schema>
  required?: string[]
  items?: Schema
  prefixItems?: Schema[]
  description?: string,
  examples?: unknown[], // この unknown を回避するためには、type の値別の interface を作る必要がある？
  default: unknown
}

export default Schema
