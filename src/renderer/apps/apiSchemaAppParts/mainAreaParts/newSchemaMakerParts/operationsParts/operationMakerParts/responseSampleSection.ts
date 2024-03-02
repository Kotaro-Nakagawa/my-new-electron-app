import AppRestrictedTextBox from "@ElementBase/restrictedTextBox";
import AppSection from "@ElementBase/section";
import Responses from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/responses";
import Response from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/responsesParts/response";
import jsonSampleToJsonSchema from "./jsonUtil"

const responseSampleValidation = (string: string, onEnsureValid: (value: object) => void) => {
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

const jsonSampleToResponse = (sample: object): Response => {
  return {
    description: '',
    content: {
      "application/json": {
        schema: jsonSampleToJsonSchema(sample)
      }
    }
  }
}

class ResponseSampleBox extends AppRestrictedTextBox {
  #responseSchema: Response
  constructor() {
    super('', () => { }, (value: string) => {
      return responseSampleValidation(value, (validSample: object) => {
        this.#responseSchema = jsonSampleToResponse(validSample)
      })
    })
    this.textBox.element.style.whiteSpace = 'pre-wrap'
  }
  get responseSchema() {
    return this.#responseSchema
  }
}

class ResponseSampleSection extends AppSection<ResponseSampleBox>{
  constructor() {
    super('Response Body', new ResponseSampleBox())
  }
  get responseSchema(): Responses {
    return { "200": this.content.responseSchema }
  }
}

export default ResponseSampleSection