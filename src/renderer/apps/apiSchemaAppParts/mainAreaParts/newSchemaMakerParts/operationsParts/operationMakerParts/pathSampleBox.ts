import AppRestrictedTextBox from "@ElementBase/restrictedTextBox";
import AppSection from "@ElementBase/section";

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

class PathSampleBox extends AppRestrictedTextBox {
  constructor(onUpdate: (value: string) => void) {
    super('', () => {
      if (this.isValid) onUpdate(this.value)
    }, (string: string) => { return pathParamValidation(string) })
    this.element.id = 'pathSampleBox'
  }
}

class PathSampleSection extends AppSection<PathSampleBox> {
  constructor(onUpdate: (value: string) => void) {
    super('リクエスト URL のサンプルを入力', new PathSampleBox(onUpdate))
  }
}

export default PathSampleSection