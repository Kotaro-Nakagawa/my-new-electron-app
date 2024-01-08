import Reference from "../../../reference"
import MediaType from "../../commonParts/mediaType"
import Parameter from "../../parameter"
import Link from "./responseParts/link"

interface Response {
  description: string
  headers?: Map<string, (Parameter | Reference)>
  content?: Map<string, MediaType>
  links?: Map<string, (Link | Reference)>
}

export default Response