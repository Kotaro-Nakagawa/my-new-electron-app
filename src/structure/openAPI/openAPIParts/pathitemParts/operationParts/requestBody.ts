import SpecificationExtensions from "../../specificationExtensions"
import MediaType from "../commonParts/mediaType"

interface RequestBody {
  description?: string
  content: Map<string, MediaType>
  required?: boolean
  extentions?: SpecificationExtensions
}

export default RequestBody