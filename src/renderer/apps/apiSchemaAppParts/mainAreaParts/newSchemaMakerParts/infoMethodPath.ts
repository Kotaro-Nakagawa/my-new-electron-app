import ListElement from "@ElementBase/listElement";
import AppVStack from "@ElementBase/vStack";
import PathMethodSet from "./infoMethodPathParts/pathMethodSet";
import AppButton from "@ElementBase/button";
import AppTextBox from "@ElementBase/textbox";

class InfoBox extends AppTextBox {
  constructor() {
    super('')
  }
}

class PathMethodList extends ListElement<PathMethodSet> {
  constructor() {
    super([])
  }
}

class NextButton extends AppButton {
  constructor(onGoNext: () => void) {
    super('次へ', onGoNext)
  }
}

class InfoMethodPath extends AppVStack<[InfoBox, PathMethodList, NextButton]> {
  constructor(onGoNext: () => void) {
    super([
      new InfoBox(), new PathMethodList(), new NextButton(onGoNext)
    ])
  }
}

export default InfoMethodPath