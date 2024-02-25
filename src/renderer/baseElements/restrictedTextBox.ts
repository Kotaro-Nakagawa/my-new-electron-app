import AppElement from "./element";
import AppTextBox from "./textbox";

const DIV = 'div'

const alertLabelElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class AppRestrictedTextBox extends AppElement {
  protected textBox: AppTextBox
  #validation: (string: string) => { isValid: Boolean, message: string }

  #alertLabelElement
  constructor(value: string, onupdate: () => void, validation: (string: string) => { isValid: Boolean, message: string }) {
    super(baseElement())
    this.#validation = validation
    this.textBox = new AppTextBox(value)
    this.element.appendChild(this.textBox.element)
    this.#alertLabelElement = alertLabelElement()
    this.element.appendChild(this.#alertLabelElement)
    this.element.oninput = () => {
      const validateResult = this.#validation(this.textBox.element.innerText)
      this.#alertLabelElement.innerText = validateResult.message
      validateResult.isValid ? this.toAcceptedStyle() : this.toAlertStyle()
      onupdate()
    }
  }
  protected toAlertStyle() {
    this.#alertLabelElement.classList.add('alert')
  }
  protected toAcceptedStyle() {
    this.#alertLabelElement.classList.remove('alert')
  }

  isValid() {
    const validateResult = this.#validation(this.element.innerText)
    return validateResult.isValid
  }

  get value() {
    return this.textBox.value
  }
}

export default AppRestrictedTextBox