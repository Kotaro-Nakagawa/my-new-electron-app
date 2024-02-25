import AppHStack from "@ElementBase/hStack"
import MethodCheckBox from "./methodCheckListParts/methodCheckBox"

class MethodCheckList extends AppHStack<[MethodCheckBox, MethodCheckBox, MethodCheckBox, MethodCheckBox, MethodCheckBox]> {
  #checkBoxes
  constructor() {
    const getElement = new MethodCheckBox('GET')
    const postElement = new MethodCheckBox('POST')
    const putElement = new MethodCheckBox('PUT')
    const patchElement = new MethodCheckBox('PATCH')
    const deleteElement = new MethodCheckBox('DELETE')
    super([
      getElement, postElement, putElement, patchElement, deleteElement
    ])
    this.#checkBoxes = new Map<method, MethodCheckBox>()
    this.#checkBoxes.set('get', getElement)
    this.#checkBoxes.set('post', postElement)
    this.#checkBoxes.set('put', putElement)
    this.#checkBoxes.set('patch', patchElement)
    this.#checkBoxes.set('delete', deleteElement)
  }
  get value() {
    const entries = Array.from(this.#checkBoxes.entries())
    return entries.reduce<method[]>((acc, [key, checkbox]) => {
      return checkbox.isChecked() ? acc.concat([key]) : acc
    }, [])
  }
}

export default MethodCheckList