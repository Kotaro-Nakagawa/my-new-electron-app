import AppVStack from "@ElementBase/vStack";
import MethodCheckList from "./infoMethodSetParts/methodCheckList";
import PathTextBox from "./infoMethodSetParts/pathTextBox";

class PathMethodSet extends AppVStack<[PathTextBox, MethodCheckList]> {
  constructor() {
    super([
      new PathTextBox(), new MethodCheckList()
    ])
  }
}

export default PathMethodSet