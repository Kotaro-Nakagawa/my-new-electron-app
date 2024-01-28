import AppElement from "@ElementBase/element";
import StartPageDescription from "./startPageParts/startPageDescription";
import FolderSelectButton from "./startPageParts/folderSelectButton";

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}


class StartPage extends AppElement {
  description: StartPageDescription
  directorySelectButton: FolderSelectButton
  constructor(onFolderOpenButtonClick: () => Promise<void>) {
    super(baseElement())
    this.description = new StartPageDescription('作業フォルダを選んでください')
    this.directorySelectButton = new FolderSelectButton('フォルダを選ぶ', async () => {
      await onFolderOpenButtonClick()
    })
    this.element.appendChild(this.description.element)
    this.element.appendChild(this.directorySelectButton.element)
  }
}

export default StartPage