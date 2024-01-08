import Components from "./openAPIParts/components"
import ExternalDocumentation from "./openAPIParts/externalDocumentation"
import Info from "./openAPIParts/info"
import PathItem from "./openAPIParts/pathItem"
import Paths from "./openAPIParts/paths"
import Reference from "./openAPIParts/reference"
import SecurityRequirement from "./openAPIParts/securityRequirement"
import Server from "./openAPIParts/server"
import Tag from "./openAPIParts/tag"

interface OpenAPI {
  openapi: string
  info: Info
  jsonSchemaDialect?: string
  servers?: Server[]
  paths?: Paths
  webhooks?: Map<string, PathItem | Reference>
  components?: Components
  security?: SecurityRequirement
  tags?: Tag[]
  externalDocs: ExternalDocumentation
}

export default OpenAPI

// key が可変のものは entries() を使いたい
// responses の key が数字から始まる
// 等の理由から、type ではなく class で定義している
