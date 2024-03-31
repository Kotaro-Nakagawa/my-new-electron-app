import AppSection from "@ElementBase/section"
import SchemaValues from "./requestBodyParts/parameterInterface"
import AppResponse from "./responsesParts/response"
import AppElement from "@ElementBase/element"
import AppSwitchView from "@ElementBase/appSwitchView"

const elementId = 'response-body'

const element = () => {
  const ret = document.createElement('div')
  ret.id = elementId
  return ret
}

class Responses extends AppSwitchView<AppResponse> {
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
}

class ResponsesSection extends AppSection<Responses> {
  constructor() {
    super('Responses', new Responses())
  }
  loadData(data: Record<string, SchemaValues>) {
    this.content.loadData(data)
  }
}

export default ResponsesSection
