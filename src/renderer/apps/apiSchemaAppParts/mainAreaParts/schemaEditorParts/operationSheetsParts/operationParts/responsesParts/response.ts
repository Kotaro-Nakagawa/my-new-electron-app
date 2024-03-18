import AppElement from "@ElementBase/element";
import SchemaValues from "../requestBodyParts/parameterInterface";
import ResponseContent from "./responseParts/responseContent";

const element = () => {
  const ret = document.createElement('div')
  return ret
}

class AppResponse extends AppElement {
  #responseContent
  constructor() {
    super(element())
    this.#responseContent = new ResponseContent()
    this.element.appendChild(this.#responseContent.element)
  }
  loadData(data: SchemaValues) {
    this.#responseContent.loadData(data)
  }
}

export default AppResponse