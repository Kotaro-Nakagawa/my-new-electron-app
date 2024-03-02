import AppRestrictedTextBox from "@ElementBase/restrictedTextBox";
import AppSection from "@ElementBase/section";
import RequestBody from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/requestBody";
import jsonSampleToJsonSchema from "./jsonUtil"

const requestSampleValidation = (string: string, onEnsureValid: (value: object) => void) => {
  let isValid = false
  let value

  try {
    value = JSON.parse(string)

    onEnsureValid(value)
    isValid = true
  } catch (e) {
    console.log(e)
  }
  return {
    isValid: isValid,
    message: isValid ? 'json is valid' : 'json の形式が不正です'
  }
}

const jsonSampleToRequest = (sample: object): RequestBody => {
  return {
    description: '',
    content: {
      "application/json": {
        schema: jsonSampleToJsonSchema(sample)
      }
    }
  }
}

class BodySampleBox extends AppRestrictedTextBox {
  #requestBodySchema: RequestBody
  constructor() {
    super('', () => { }, (value: string) => {
      return requestSampleValidation(value, (validSample: object) => {
        this.#requestBodySchema = jsonSampleToRequest(validSample)
      })
    })
    this.textBox.element.style.whiteSpace = 'pre-wrap'
  }
  get requestBodySchema() {
    return this.#requestBodySchema
  }
}

class BodySampleSection extends AppSection<BodySampleBox>{
  constructor() {
    super('Request Body', new BodySampleBox())
  }
  get requestBodySchema() {
    return this.content.requestBodySchema
  }
}

export default BodySampleSection
