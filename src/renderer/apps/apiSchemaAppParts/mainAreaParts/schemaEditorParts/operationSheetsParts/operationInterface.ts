import Responses from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/responses"
import ParameterValues from "./operationParts/parametersParts/parameterInterface"
import SchemaValues from "./operationParts/requestBodyParts/parameterInterface"
import RequestBody from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/requestBody"
import Reference from "@Structure/openAPI/openAPIParts/reference"
import Parameter from "@Structure/openAPI/openAPIParts/pathitemParts/parameter"

interface OperationData {
  path: string
  method: string
  summary?: string
  description?: string
  operationId?: string
  parameters?: Parameter[]
  requestBody?: RequestBody | Reference
  responses?: Responses
}

export default OperationData
