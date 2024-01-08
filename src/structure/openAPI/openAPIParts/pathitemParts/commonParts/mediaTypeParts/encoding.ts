import Reference from "../../../reference"
import SpecificationExtensions from "../../../specificationExtensions"
import Parameter from "../../parameter"

interface Encoding {
  contentType?: string
  headers?: Map<string, (Parameter | Reference)>
  style?: string
  explode?: string
  allowReserved?: string
  extensions?: SpecificationExtensions
}

export default Encoding