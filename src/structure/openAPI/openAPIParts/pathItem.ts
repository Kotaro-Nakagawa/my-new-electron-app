import Operation from "./pathitemParts/operation"

interface PathItem {
  ref?: string
  summary?: string
  description?: string
  get?: Operation
  put?: Operation
  post?: Operation
  delete?: Operation
  options?: Operation
  head?: Operation
  patch?: Operation
  trace?: Operation
  servers?: Operation
}

export default PathItem