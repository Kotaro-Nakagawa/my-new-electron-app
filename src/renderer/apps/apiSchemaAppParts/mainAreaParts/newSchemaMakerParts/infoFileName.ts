import AppButton from "@ElementBase/button";
import AppTextBox from "@ElementBase/textbox";
import AppVStack from "@ElementBase/vStack";

class FileNameBox extends AppTextBox {
  constructor() {
    super('fileNameHere')
  }
}

class NextButton extends AppButton {
  constructor(onGoNext: () => void) {
    super('次へ', onGoNext)
  }
}

class infoFileName extends AppVStack<[FileNameBox, NextButton]> {
  static FILENAME_BOX = 0
  static NEXT_BUTTON = 1

  constructor(onGoNext: () => void) {
    super([new FileNameBox(), new NextButton(onGoNext)])
  }

  get fileNameBox() {
    return this.contents[infoFileName.FILENAME_BOX] as FileNameBox
  }
  get fileName() {
    return this.fileNameBox.value
  }

}

export default infoFileName