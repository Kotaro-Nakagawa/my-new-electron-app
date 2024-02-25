import Reference from "../../../reference"
import MediaType from "../../commonParts/mediaType"
import Parameter from "../../parameter"
import Link from "./responseParts/link"

interface Response {
  description: string
  headers?: Record<string, (Parameter | Reference)>
  content?: Record<string, MediaType>
  links?: Record<string, (Link | Reference)>
}

export default Response