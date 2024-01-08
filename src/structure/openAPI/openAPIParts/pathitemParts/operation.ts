import ExternalDocumentation from "../externalDocumentation"
import Reference from "../reference"
import SecurityRequirement from "../securityRequirement"
import Server from "../server"
import CallBack from "./operationParts/callback"
import RequestBody from "./operationParts/requestBody"
import Responses from "./operationParts/responses"
import Parameter from "./parameter"

interface Operation {
  tags?: string[]
  summary?: string
  description?: string
  externalDocs?: ExternalDocumentation
  operationId?: string
  parameters?: (Parameter | Reference)[]
  requestBody?: RequestBody | Reference
  responses?: Responses
  callbacks?: Map<string, (CallBack | Reference)>
  deprecated?: boolean
  security?: SecurityRequirement
  servers?: [Server]
}

export default Operation
