import AppTextBox from "@ElementBase/textbox";

class PathSampleBox extends AppTextBox {
  constructor(onUpdate: (value: string) => void) {
    super('')
    this.element.oninput = () => {
      onUpdate(this.value)
    }
    this.element.id = 'pathSampleBox'
  }
}

export default PathSampleBox