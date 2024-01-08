import Schema from "../../../schema"
import Reference from "../../reference"
import SpecificationExtensions from "../../specificationExtensions"
import Example from "./example"
import Encoding from "./mediaTypeParts/encoding"

interface MediaType {
  schema?: Schema
  example?: "string"
  examples?: Map<string, (Example | Reference)>
  encoding?: Map<string, Encoding>
  extensions?: SpecificationExtensions
}
export default MediaType
