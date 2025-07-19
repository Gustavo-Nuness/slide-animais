export default class Slide {

  constructor(slideCssSelector, slideContainerCssSelector) {

    this.slide = document.querySelector(slideCssSelector)
    this.slideContainer = document.querySelector(slideContainerCssSelector)

    this.distancies = {

      finalPosition: 0,
      startX: 0,
      movementRange: 0,
      movedPosition: 0,

    }

    this.bindEvents()
  }

  onStart(event) {
    console.log("clicou")
    event.preventDefault()

    this.distancies.startX = event.clientX;
    this.slideContainer.addEventListener("mousemove", this.onMouseMove)
  }

  updatePosition(clientMouseX) {

    this.distancies.movementRange = (this.distancies.startX - clientMouseX) * 1.6
    return this.distancies.finalPosition - this.distancies.movementRange

  }

  slideMove(distanceX) {
    this.distancies.movedPosition = distanceX
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`
  }

  onMouseMove(event) {
    console.log("moveu")
    const finalPosition = this.updatePosition(event.clientX)

    this.slideMove(finalPosition)
  }

  onEnd(event) {
    console.log("Cabou-se")
    this.slideContainer.removeEventListener("mousemove", this.onMouseMove)

    this.distancies.finalPosition = this.distancies.movedPosition
    console.log(this.distancies.finalPosition)
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
    if (this.slide && this.slideContainer) {
      this.addSlideEvents()
    }

    return this
  }
}