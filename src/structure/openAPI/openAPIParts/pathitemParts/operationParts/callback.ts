import PathItem from "../../pathItem"
import Reference from "../../reference"

interface CallBack {
  [key: string]: PathItem | Reference
}

export default CallBack