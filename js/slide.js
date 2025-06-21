export default class Slide {

  constructor(slideCssSelector, slideContainerCssSelector) {

    this.slide = document.querySelector(slideCssSelector)
    this.slideContainer = document.querySelector(slideContainerCssSelector)

    this.bindEvents()
  }

  onStart(event) {
    console.log("clicou")
    event.preventDefault()

    this.slideContainer.addEventListener("mousemove", this.onMouseMove)
  }

  onMouseMove(event) {
    console.log("moveu")
  }

  onEnd(event) {
    console.log("Cabou-se")
    this.slideContainer.removeEventListener("mousemove", this.onMouseMove)
  }

  addSlideEvents() {
    this.slideContainer.addEventListener("mousedown", this.onStart)
    this.slideContainer.addEventListener("mouseup", this.onEnd)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  init() {
    if(this.slide && this.slideContainer ) {
      this.addSlideEvents()
    }

    return this
  }
}