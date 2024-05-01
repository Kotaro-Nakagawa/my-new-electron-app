import AppElement from "@ElementBase/element";
import SchemaValues from "../../requestBodyParts/parameterInterface";
import ResponseBody from "./responseContentParts/responseBody";
import MediaType from "@Structure/openAPI/openAPIParts/pathitemParts/commonParts/mediaType";

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
  get value(): Record<string, MediaType> {
    return {
      'application/json': { schema: this.#responseBody.value }
    }
  }
}

export default ResponseContent