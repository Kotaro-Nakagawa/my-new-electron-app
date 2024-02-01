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

class Parameter {
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

  constructor(values: ParameterValues) {
    console.log(values)
    this.#values = values // 画面に表示されない情報はいったんここに格納
    // 本当は type に応じて編集可否を決めないといけないのか面倒だな
    // 全部編集可能にして alert を出す形のほうが良いかも知れない。いずれにしてもここで判定して item に挙動を教えないとダメ
    this.#name = new ParameterNameItem(values.name)
    this.#in = new ParameterInItem(values.in)
    this.#type = new ParameterTypeItem(values.type)
    this.#min = new ParameterMinItem(values.min)
    this.#valueorlength = new ParameterValueOrLengthItem(values.type === "string" ? "length" : "value")
    this.#max = new ParameterMaxItem(values.max)
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
}

export default Parameter