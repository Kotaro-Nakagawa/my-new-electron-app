import AppLabel from "@ElementBase/label";
import AppElement from "../element";
import AppTextBox from "@ElementBase/textbox";
import KeyValueList from "./keyValueList";

const DIV = 'div'

// const keyElement = () => {
//   return document.createElement(DIV)
// }
// const valueElement = () => {
//   const element = document.createElement(DIV)
//   element.contentEditable = 'ture'
//   return element
// }

const baseElement = () => {
  const element = document.createElement(DIV)
  element.style.display = 'grid'
  element.style.gridTemplateColumns = '20% 80%'
  return element
}


class KeyValueRecord extends AppElement {
  #keyElement
  #valueElement
  constructor(key: AppLabel, value: AppTextBox | KeyValueList) {
    super(baseElement())
    this.#keyElement = key
    this.#valueElement = value
    this.element.appendChild(this.#keyElement.element)
    this.element.appendChild(this.#valueElement.element)
  }

  get value() {
    return {
      key: this.#keyElement.value,
      value: this.#valueElement.value
    }
  }
}

export default KeyValueRecord