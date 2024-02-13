import AppVStack from "@ElementBase/vStack";
import MethodCheckList from "./infoMethodSetParts/methodCheckList";
import PathTextBox from "./infoMethodSetParts/pathTextBox";

class PathMethodSet extends AppVStack<[PathTextBox, MethodCheckList]> {
  #pathTextBox
  #methodCheckList
  constructor() {
    const pathTextBox = new PathTextBox()
    const methodCheckList = new MethodCheckList()
    super([
      pathTextBox, methodCheckList
    ])
    this.#pathTextBox = pathTextBox
    this.#methodCheckList = methodCheckList
  }
  get value() {
    // return this.#methodCheckList.value.map(m => { return { method: m, path: this.#pathTextBox.value } })
    return { path: this.#pathTextBox.value, methods: this.#methodCheckList.value }
  }
}

export default PathMethodSet