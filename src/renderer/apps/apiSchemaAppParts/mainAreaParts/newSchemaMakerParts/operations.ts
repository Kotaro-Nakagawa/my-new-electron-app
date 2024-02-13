import AppSlideList from "@ElementBase/slideList";
import OperationMaker from "./operationsParts/operationMaker";
import AppButton from "@ElementBase/button";
import Operation from "@Structure/openAPI/openAPIParts/pathitemParts/operation";

class GoNextButton extends AppButton {
  constructor(onclick: () => void) {
    super('次へ', onclick)
  }
}

class OnCompleteButton extends AppButton {
  constructor(onclick: () => void) {
    super('完了', onclick)
  }
}

class GoBackButton extends AppButton {
  constructor(onclick: () => void) {
    super('戻る', onclick)
  }
}

class OperationsMaker extends AppSlideList<OperationMaker> {
  #onComplete: () => void
  #backToInfoMethodPath: () => void
  constructor(backToInfoMethodPath: () => void, onComplete: () => void) {
    super(
      []
    )
    this.#onComplete = onComplete
    this.#backToInfoMethodPath = backToInfoMethodPath
  }
  putNewSlidesFromPathMethodList(pathMethodList: { path: string; method: method }[]) {
    const lastIndex = pathMethodList.length - 1
    const slides = pathMethodList.map((pm, i) => {
      return new OperationMaker(
        pm.path,
        pm.method,
        i !== lastIndex ? new GoNextButton(() => { this.goNextOrComplete() }) : new OnCompleteButton(() => { this.goNextOrComplete() }),
        new GoBackButton(this.backOrResetPath))
    })
    this.putSlides(slides)
  }

  goNextOrComplete() {
    console.log('call go Next')
    console.log(this)
    const result = this.goNext()
    if (!result) {
      this.#onComplete()
    }
  }

  backOrResetPath() {
    const result = this.goBack()
    if (!result) {
      this.#backToInfoMethodPath()
    }
  }

  valueOf(path: string, method: method): Operation {
    console.log(`returning item of ${path} ${method}`)
    return this.contents.find(c => c.path === path && c.method === method).value
  }
}

export default OperationsMaker