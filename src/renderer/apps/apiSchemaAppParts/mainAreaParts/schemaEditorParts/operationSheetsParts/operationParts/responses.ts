import AppSection from "@ElementBase/section"
import SchemaValues from "./requestBodyParts/parameterInterface"
import AppResponse from "./responsesParts/response"
import AppElement from "@ElementBase/element"
import AppSwitchView from "@ElementBase/appSwitchView"
import Schema from "@Structure/openAPI/schema"
import Responses from "@Structure/openAPI/openAPIParts/pathitemParts/operationParts/responses"

const elementId = 'response-body'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class AppResponses extends AppSwitchView<AppResponse> {
  constructor() {
    super()
  }
  loadData(data: Record<string, SchemaValues>) {
    const tabs = Object.entries(data).map(([k, v]) => {
      const response = new AppResponse()
      response.loadData(v)
      return {
        tabName: k,
        content: response
      }
    })
    this.reloadTabs(tabs)
  }
  get value(): Responses {
    const contents = this.getTabs()
    return Object.fromEntries(contents.map(c => [c.tabName, c.content.value]))
  }
}

class ResponsesSection extends AppSection<AppResponses> {
  constructor() {
    super('Responses', new AppResponses())
  }
  loadData(data: Record<string, SchemaValues>) {
    this.content.loadData(data)
  }
  get value(): Responses {
    return this.content.value
  }
}

export default ResponsesSection
