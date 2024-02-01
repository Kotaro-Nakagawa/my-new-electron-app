import ParameterValues from "./operationParts/parametersParts/parameterInterface"
import SchemaValues from "./operationParts/requestBodyParts/parameterInterface"

interface OperationData {
  path: string
  method: string
  summary?: string
  description?: string
  operationId?: string
  parameters?: ParameterValues[]
  requestBody?: SchemaValues
  responses?: SchemaValues
}

export default OperationData
