import Parameter from "@Structure/openAPI/openAPIParts/pathitemParts/parameter"
import ParameterValues from "./parameterInterface"
import ParameterDescriptionItem from "./parameterParts/parameterDescriptionItem"
import ParameterExampleItem from "./parameterParts/parameterExampleItem"
import ParameterInItem from "./parameterParts/parameterInItem"
import ParameterMaxItem from "./parameterParts/parameterMaxItem"
import ParameterMinItem from "./parameterParts/parameterMinItem"
import ParameterNameItem from "./parameterParts/parameterNameItem"
import ParameterTypeItem from "./parameterParts/parameterTypeItem"
import ParameterValueOrLengthItem from "./parameterParts/parameterValueOrLengthItem"

const columns = ['1fr', '0.5fr', '0.5fr', '1fr', '1fr', '1fr', '2fr', '3fr']

const element = () => {
  const ret = document.createElement('div')
  ret.style.display = 'grid'
  ret.style.gridTemplateColumns = columns.join(' ')
  return ret
}

class AppParameter {
  #values
  #name
  #in
  #type
  #min
  #valueorlength
  #max
  #example
  #description

  #element

  constructor(values: Parameter) {
    console.log(values)
    this.#values = values // 画面に表示されない情報はいったんここに格納
    // 本当は type に応じて編集可否を決めないといけないのか面倒だな
    // 全部編集可能にして alert を出す形のほうが良いかも知れない。いずれにしてもここで判定して item に挙動を教えないとダメ
    if (!values.schema) values.schema = { type: 'string', default: '' }
    const valuesType = typeof values.schema.type === 'object' ? values.schema.type[0] : values.schema.type
    this.#name = new ParameterNameItem(values.name)
    this.#in = new ParameterInItem(values.in)
    this.#type = new ParameterTypeItem(valuesType)
    this.#min = new ParameterMinItem(valuesType === 'string' ? values.schema.minlength : values.schema.minimum)
    this.#valueorlength = new ParameterValueOrLengthItem(valuesType === "string" ? "length" : "value")
    this.#max = new ParameterMaxItem(valuesType === 'string' ? values.schema.maxlength : values.schema.maximum)
    this.#example = new ParameterExampleItem(values.example)
    this.#description = new ParameterDescriptionItem(values.description)

    this.#element = element()
    this.#element.appendChild(this.#name.element)
    this.#element.appendChild(this.#in.element)
    this.#element.appendChild(this.#type.element)
    this.#element.appendChild(this.#min.element)
    this.#element.appendChild(this.#valueorlength.element)
    this.#element.appendChild(this.#max.element)
    this.#element.appendChild(this.#example.element)
    this.#element.appendChild(this.#description.element)
  }

  get element() {
    return this.#element
  }

  get value(): Parameter {
    this.#values.name = this.#name.element.innerText
    this.#values.in = inFromText(this.#in.element.innerText) // ちゃんと inTextBox 型を作るべき
    this.#values.schema.type = typeFromText(this.#type.element.innerText)
    if (this.#values.schema.type === "string") {
      this.#values.schema.minlength = numberFromText(this.#min.element.innerText)
      this.#values.schema.maxlength = numberFromText(this.#max.element.innerText)
    } else {
      this.#values.schema.minimum = numberFromText(this.#min.element.innerText)
      this.#values.schema.maximum = numberFromText(this.#min.element.innerText)
    }
    this.#values.example = this.#example.element.innerText
    this.#values.description = this.#example.element.innerText
    return this.#values

    function inFromText(text: string): "query" | "header" | "path" | "cookie" {
      if (text === "query") return text
      if (text === "header") return text
      if (text === "path") return text
      if (text === "cookie") return text
      return undefined
    }

    function typeFromText(text: string): "string" | "number" | "boolean" | "integer" {
      if (text === "string") return text
      if (text === "number") return text
      if (text === "boolean") return text
      if (text === "integer") return text
      return undefined
    }

    function numberFromText(text: string): number {
      const number = Number.parseFloat(text)
      if (isNaN(number)) return undefined
      return number
    }
  }
}

export default AppParameter