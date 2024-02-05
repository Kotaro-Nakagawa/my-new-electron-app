import AppHStack from "@ElementBase/hStack"
import MethodCheckBox from "./methodCheckListParts/methodCheckBox"

class MethodCheckList extends AppHStack<[MethodCheckBox, MethodCheckBox, MethodCheckBox, MethodCheckBox, MethodCheckBox]> {
  constructor() {
    super([
      new MethodCheckBox('GET'), new MethodCheckBox('POST'), new MethodCheckBox('PUT'), new MethodCheckBox('PATCH'), new MethodCheckBox('DELETE')
    ])
  }
}

export default MethodCheckList