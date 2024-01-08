const element = (fileName: string) => {
  const ret = document.createElement('div')
  ret.classList.add('treefile')
  ret.innerText = fileName
  return ret
}

class TreeFileItem {
  #element
  constructor(fileName: string) {
    this.#element = element(fileName)
  }
  get element() {
    return this.#element
  }
}

export default TreeFileItem
