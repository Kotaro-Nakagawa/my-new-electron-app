import Reference from "../../reference"
import Response from "./responsesParts/response"

interface Responses {
  [key: string]: (Response | Reference)
}

export default Responses