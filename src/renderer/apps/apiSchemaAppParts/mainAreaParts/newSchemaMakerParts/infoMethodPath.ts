import AppList from "@ElementBase/appList";
import AppVStack from "@ElementBase/vStack";
import PathMethodSet from "./infoMethodPathParts/pathMethodSet";
import AppButton from "@ElementBase/button";
import AppTextBox from "@ElementBase/textbox";
import AppSection from "@ElementBase/section";

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
  get value() {
    return this.contents.flatMap(c => c.value)
  }
}

class PathMethodSection extends AppSection<PathMethodList> {
  constructor(button: PathMethodAddButton) {
    super(
      'path と method のリスト',
      new PathMethodList(button)
    )
  }
  push(newItem: PathMethodSet): void {
    this.content.push(newItem)
  }
  get value() {
    return this.content.value
  }
}

class NextButton extends AppButton {
  constructor(onGoNext: () => void) {
    super('次へ', onGoNext)
  }
}

class InfoMethodPath extends AppVStack<[InfoBox, PathMethodSection, NextButton]> {
  static INFO_BOX = 0
  static LIST = 1
  static NEXT_BUTTON = 2
  constructor(onGoNext: () => void) {
    super([
      new InfoBox(),
      new PathMethodSection(new PathMethodAddButton(() => { this.list.push(new PathMethodSet()) })),
      new NextButton(onGoNext)
    ])
  }
  get infoBox() {
    return this.contents[InfoMethodPath.INFO_BOX] as InfoBox
  }
  get infoValue() {
    return this.infoBox.value
  }
  get list(): PathMethodSection {
    return this.contents[InfoMethodPath.LIST] as PathMethodSection
  }
  get value() {
    return this.list.value
  }
}

export default InfoMethodPath