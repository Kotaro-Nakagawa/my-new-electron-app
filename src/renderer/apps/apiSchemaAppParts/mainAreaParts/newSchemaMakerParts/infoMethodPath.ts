import AppList from "@ElementBase/appList";
import AppVStack from "@ElementBase/vStack";
import PathMethodSet from "./infoMethodPathParts/pathMethodSet";
import AppButton from "@ElementBase/button";
import AppTextBox from "@ElementBase/textbox";

class InfoBox extends AppTextBox {
  constructor() {
    super('')
  }
}

class PathMethodAddButton extends AppButton {
  constructor(onclick: () => void) {
    super('追加', onclick)
  }
}

class PathMethodList extends AppList<PathMethodSet> {
  constructor(button: PathMethodAddButton) {
    super([new PathMethodSet()], button)
  }
  override push(newItem: PathMethodSet): void {
    this.contents.push(newItem)
    super.push(newItem)
  }
  get value() {
    return this.contents.flatMap(c => c.value)
  }
}

class NextButton extends AppButton {
  constructor(onGoNext: () => void) {
    super('次へ', onGoNext)
  }
}

class InfoMethodPath extends AppVStack<[InfoBox, PathMethodList, NextButton]> {
  static INFO_BOX = 0
  static LIST = 1
  static NEXT_BUTTON = 2
  constructor(onGoNext: () => void) {
    super([
      new InfoBox(),
      new PathMethodList(new PathMethodAddButton(() => { this.list.push(new PathMethodSet()) })),
      new NextButton(onGoNext)
    ])
  }
  get infoBox() {
    return this.contents[InfoMethodPath.INFO_BOX] as InfoBox
  }
  get infoValue() {
    return this.infoBox.value
  }
  get list(): PathMethodList {
    return this.contents[InfoMethodPath.LIST] as PathMethodList
  }
  get value() {
    return this.list.value
  }
}

export default InfoMethodPath