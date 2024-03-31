import AppElement from "@ElementBase/element";
import SchemaValues from "../../requestBodyParts/parameterInterface";
import ResponseBody from "./responseContentParts/responseBody";

const element = () => {
  const ret = document.createElement('div')
  return ret
}

class ResponseContent extends AppElement {
  #responseBody
  constructor() {
    super(element())
    this.#responseBody = new ResponseBody()
    this.element.appendChild(this.#responseBody.element)
  }
  loadData(data: SchemaValues) {
    if (data) this.#responseBody.putData(data)
  }
}

export default ResponseContent