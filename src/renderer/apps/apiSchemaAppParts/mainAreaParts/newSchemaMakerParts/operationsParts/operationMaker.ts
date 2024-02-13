import AppVStack from "@ElementBase/vStack";
import PathSampleBox from "./operationMakerParts/pathSampleBox";
import ExtractedPathParams from "./operationMakerParts/extractedPathParams";
import ExtractedQueryParams from "./operationMakerParts/extractedQueryParams";
import BodySampleBox from "./operationMakerParts/bodySampleBox";
import AppButton from "@ElementBase/button";
import Operation from "@Structure/openAPI/openAPIParts/pathitemParts/operation";
import Parameter from "@Structure/openAPI/openAPIParts/pathitemParts/parameter";
import AppElement from "@ElementBase/element";

class Buttons extends AppElement {
  static element = () => {
    const elem = document.createElement('div')
    elem.style.display = 'grid'
    elem.style.gridTemplateColumns = '20% 80%'
    return elem
  }
  constructor(button1: AppButton, button2: AppButton) {
    super(Buttons.element())
    this.element.appendChild(button1.element)
    this.element.appendChild(button2.element)
  }
}

class OperationMaker extends AppVStack<[PathSampleBox, ExtractedPathParams, ExtractedQueryParams, BodySampleBox, Buttons]> {
  static PATH_PARAMS = 1
  static QUERY_PARAMS = 2
  #path: string
  #method: method
  constructor(path: string, method: method, nextButton: AppButton, backButton: AppButton) {
    super([
      new PathSampleBox((path) => { this.#extractParams(path) }),
      new ExtractedPathParams(),
      new ExtractedQueryParams(),
      new BodySampleBox(),
      new Buttons(backButton, nextButton)
    ])
    this.#path = path
    this.#method = method
    this.element.id = 'OperationMaker'
  }

  #extractParams(samplePath: string) {
    const pathParts = samplePath.split('?')
    this.pathParams.putData(this.#extractPathValues(pathParts.shift()))
    this.queryParams.putData(this.#extractQueryValues(pathParts.join('?')))
  }

  #extractPathValues(samplePath: string): { paramName: string, value: string }[] {
    const samplePathParts = samplePath.split('/')
    const abstractPathParts = this.#path.split('/')

    return []
  }

  #extractQueryValues(samplePath: string): { paramName: string, value: string }[] {
    return []
  }

  get pathParams() {
    return this.contents[OperationMaker.PATH_PARAMS] as ExtractedPathParams
  }

  get queryParams() {
    return this.contents[OperationMaker.QUERY_PARAMS] as ExtractedQueryParams
  }

  updateQueries() {

  }

  updastePathParams() {

  }

  get path() {
    return this.#path
  }
  get method() {
    return this.#method
  }

  get value(): Operation {
    const pathParams = this.pathParams.value.map<Parameter>(kv => { return { name: kv.key, in: 'path', example: kv.value as string } })
    const queryParams = this.queryParams.value.map<Parameter>(kv => { return { name: kv.key, in: 'path', example: kv.value as string } })
    return {
      parameters: pathParams.concat(queryParams),
      // requestBody: { content: new Map() },
      responses: {}
    }
  }
}

export default OperationMaker