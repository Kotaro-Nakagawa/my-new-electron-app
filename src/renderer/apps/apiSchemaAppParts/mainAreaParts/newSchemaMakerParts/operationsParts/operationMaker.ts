import AppVStack from "@ElementBase/vStack";
import PathSampleSection from "./operationMakerParts/pathSampleBox";
import ExtractedPathParams from "./operationMakerParts/extractedPathParams";
import ExtractedQueryParams from "./operationMakerParts/extractedQueryParams";
import BodySampleSection from "./operationMakerParts/bodySampleSection";
import ResponseSampleSection from "./operationMakerParts/responseSampleSection";
import AppButton from "@ElementBase/button";
import Operation from "@Structure/openAPI/openAPIParts/pathitemParts/operation";
import Parameter from "@Structure/openAPI/openAPIParts/pathitemParts/parameter";
import AppElement from "@ElementBase/element";
import AppLabel from "@ElementBase/label";

const isValidPathForm = (string: string) => {
  if (!string.startsWith('/')) {
    return {
      isValid: false,
      message: 'path は / から始めてください'
    }
  }
  return {
    isValid: true,
    message: 'good'
  }
}

const pathSampleToPathAndQuery = (samplePath: string) => {
  const pathParts = samplePath.split('?')
  const path = pathParts.shift()
  const queries = pathParts.join('?') // query param に ? が含まれる可能性を考慮
  return {
    path: path,
    queries: queries
  }
}

const trimPathParamBracket = (value: string): string => {
  return value.slice(1, -1)
}

const isMatchingToAbstractPath = (pathSample: string, abstractPath: string): { isValid: true, values: { paramName: string, value: string }[] } | { isValid: false, reason: string } => {
  const pathSampleParts = pathSample.split('/')
  const abstractPathParts = abstractPath.split('/')
  if (pathSampleParts.length !== abstractPathParts.length) return { isValid: false, reason: 'path の長さが一致しません' }
  const length = pathSampleParts.length
  const pathParams: { paramName: string, value: string }[] = []
  for (let i = 0; i < length; i++) {
    if (abstractPathParts[i].startsWith('{') && abstractPathParts[i].endsWith('}')) {
      pathParams.push({ paramName: trimPathParamBracket(abstractPathParts[i]), value: pathSampleParts[i] })
    } else if (abstractPathParts[i] !== pathSampleParts[i]) {
      return { isValid: false, reason: `${i} 番目の文字列 ${abstractPathParts[i]} と ${pathSampleParts[i]} が一致しません` }
    }
  }
  return { isValid: true, values: pathParams }
}

const toQueryParamList = (querystr: string) => {
  const queryStrParts = querystr.split('&')
  return queryStrParts.map(q => {
    const kv = q.split('=')
    const key = kv.shift()
    const value = kv.join('=')
    return {
      paramName: key,
      value: value
    }
  })
}

const isValidPathSample = (
  string: string,
  abstractPath: string,
  onEnsureValid: (params: {
    pathParams: { paramName: string, value: string }[],
    queryParams: { paramName: string, value: string }[]
  }) => void): { isValid: boolean, message: string } => {
  const pathFormResult = isValidPathForm(string)
  if (pathFormResult.isValid === false) return pathFormResult
  const { path: pathSample, queries } = pathSampleToPathAndQuery(string)
  const pathMatchingResult = isMatchingToAbstractPath(pathSample, abstractPath)
  if (pathMatchingResult.isValid === false) return { isValid: pathMatchingResult.isValid, message: pathMatchingResult.reason }
  const queryParams = toQueryParamList(queries)
  onEnsureValid({
    pathParams: pathMatchingResult.values,
    queryParams: queryParams
  })
  return {
    isValid: true,
    message: '',
  }
}

class PathLabel extends AppLabel {
  constructor(path: string, method: string) {
    super(`${method.toUpperCase()} ${path}`)
  }
}

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

class OperationMaker extends AppVStack<[PathLabel, PathSampleSection, ExtractedPathParams, ExtractedQueryParams, BodySampleSection, ResponseSampleSection, Buttons]> {
  static PATH_PARAMS = 2
  static QUERY_PARAMS = 3
  static REQUEST_BODY = 4
  static RESPONSE_BODY = 5
  #path: string
  #method: method
  constructor(path: string, method: method, nextButton: AppButton, backButton: AppButton) {
    super([
      new PathLabel(path, method),
      new PathSampleSection((path) => {
        return isValidPathSample(
          path,
          this.#path,
          (params) => {
            this.#putPathAndQueryParam(params.pathParams, params.queryParams)
          }
        )
      }),
      new ExtractedPathParams(),
      new ExtractedQueryParams(),
      new BodySampleSection(),
      new ResponseSampleSection(),
      new Buttons(backButton, nextButton)
    ])
    this.#path = path
    this.#method = method
    this.element.id = 'OperationMaker'
  }

  #putPathAndQueryParam(pathParams: { paramName: string, value: string }[], queryParams: { paramName: string, value: string }[]) {
    this.pathParams.putData(pathParams)
    this.queryParams.putData(queryParams)
  }

  get pathParams() {
    return this.contents[OperationMaker.PATH_PARAMS] as ExtractedPathParams
  }

  get queryParams() {
    return this.contents[OperationMaker.QUERY_PARAMS] as ExtractedQueryParams
  }

  get requestBody() {
    return this.contents[OperationMaker.REQUEST_BODY] as BodySampleSection
  }

  get responseBody() {
    return this.contents[OperationMaker.RESPONSE_BODY] as ResponseSampleSection
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
      requestBody: this.requestBody.requestBodySchema,
      responses: this.responseBody.responseSchema
    }
  }
}

export default OperationMaker
