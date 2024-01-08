import ServerVariable from "./serverParts/serverVariable"

interface Server {
  url: string
  description?: string
  variables?: Map<string, ServerVariable>
}

export default Server
