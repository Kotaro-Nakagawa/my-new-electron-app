import AppVStack from "@ElementBase/vStack";
import MethodCheckList from "./infoMethodSetParts/methodCheckList";
import PathTextBox from "./infoMethodSetParts/pathTextBox";

class PathMethodSet extends AppVStack<[PathTextBox, MethodCheckList]> {
  constructor() {
    super([
      new PathTextBox(() => { }), new MethodCheckList()
    ])
  }
  get value() {
    return { path: this.pathTextBox.value, methods: this.methodCheckList.value }
  }
  get pathTextBox(): PathTextBox {
    return this.contents[0]
  }
  get methodCheckList(): MethodCheckList {
    return this.contents[1]
  }
}

export default PathMethodSet