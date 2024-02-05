import AppButton from "@ElementBase/button";

class AddFileButton extends AppButton {
  #path: string
  constructor(path: string, onclick: (filePath: string) => void) {
    super('[追加]', () => { onclick(this.#path) })
    this.#path = path
  }
}

export default AddFileButton