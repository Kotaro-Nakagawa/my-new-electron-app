import Schema from "../../schema"
import Reference from "../reference"
import Example from "./commonParts/example"
import MediaType from "./commonParts/mediaType"

interface Parameter {
  name: string
  in: "query" | "header" | "path" | "cookie"
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  style?: "matrix" | "label" | "form" | "simple" | "spaceDelimited" | "pipeDelimited" | "deepObject"
  explode?: boolean
  allowReserved?: boolean
  schema?: Schema
  example?: string
  examples?: Map<string, (Example | Reference)>
  content?: Map<string, MediaType>
}

export default Parameter