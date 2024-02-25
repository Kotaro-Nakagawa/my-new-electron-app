import AppElement from "./element";

const DIV = 'div'

const baseElement = () => {
  const elem = document.createElement(DIV)
  return elem
}

class AppSlideList<T extends AppElement> extends AppElement {
  protected current: number
  protected contents: T[]
  constructor(contents: T[]) {
    super(baseElement())
    this.putSlides(contents)
  }
  protected putSlides(slides: T[]) {
    this.contents = new Array<T>()
    slides.forEach(s => {
      this.contents.push(s)
    })
    if (this.contents.length > 0) {
      this.switchTo(0)
    }
  }
  protected maxIndex() {
    return this.contents.length - 1
  }
  protected switchTo(index: number) {
    this.current = index
    this.element.innerHTML = ''
    this.element.appendChild(this.contents[index].element)
  }
  protected goNext(): boolean {
    console.log('calling go next')
    if (this.current == this.maxIndex()) {
      return false
    }
    this.current += 1
    this.switchTo(this.current)
    return true
  }
  protected goBack(): boolean {
    if (this.current === 0) {
      return false
    }
    this.current -= 1
    this.switchTo(this.current)
    return true
  }
}

export default AppSlideList
