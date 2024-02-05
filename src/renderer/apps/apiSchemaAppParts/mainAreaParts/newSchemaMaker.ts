import AppSlideSet from "@ElementBase/slideSet"
import InfoMethodPath from "./newSchemaMakerParts/infoMethodPath"
import OperationsMaker from "./newSchemaMakerParts/operations"


class NewSchemaMaker extends AppSlideSet<[InfoMethodPath, OperationsMaker]> {
  #saveFilePath: string
  constructor(filepath: string) {
    super([new InfoMethodPath(() => { this.toOperationMaker() }), new OperationsMaker()])
    this.#saveFilePath = filepath
  }
  toOperationMaker() {
    this.switchTo(1)
  }
  toInfoMethodPath() {
    this.switchTo(0)
  }
}

export default NewSchemaMaker