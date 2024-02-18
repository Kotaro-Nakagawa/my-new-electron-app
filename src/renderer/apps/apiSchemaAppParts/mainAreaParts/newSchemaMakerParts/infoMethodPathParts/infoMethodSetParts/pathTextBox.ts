import AppRestrictedTextBox from "@ElementBase/restrictedTextBox";

const pathParamValidation = (string: string) => {
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

class PathTextBox extends AppRestrictedTextBox {
  constructor(onUpdate: (value: string) => void) {
    super('', () => {
      if (this.isValid) onUpdate(this.value)
    }, (string: string) => { return pathParamValidation(string) })
    this.element.id = 'pathSampleBox'
  }
}

export default PathTextBox