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
    let moveType;

    // Condição para verificar se o usuário está usando um mouse.
    if (event.type === "mousedown") {

      event.preventDefault()
      this.distancies.startX = event.clientX;
      moveType = "mousemove"

    } else {
      this.distancies.startX = event.changedTouches[0].clientX
      moveType = "touchmove"
    }

    this.slideContainer.addEventListener(moveType, this.onMouseMove)
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
    // Posição do ponteiro ao clicar com o mouse, ou a posição do dedo do usuário
    // ao clicar na tela do seu celular.

    const userIndicatedPosition = (event.type === "mousemove") ? event.clientX
      : event.changedTouches[0].clientX

    const finalPosition = this.updatePosition(userIndicatedPosition)

    this.slideMove(finalPosition)
  }

  onEnd(event) {
    console.log("Cabou-se")

    const eventType = (event.type === "mouseup") ? "mousemove" : "touchmove"

    this.slideContainer.removeEventListener(eventType, this.onMouseMove)

    this.distancies.finalPosition = this.distancies.movedPosition
  }

  addSlideEvents() {
    this.slideContainer.addEventListener("mousedown", this.onStart)
    this.slideContainer.addEventListener("touchstart", this.onStart)

    this.slideContainer.addEventListener("mouseup", this.onEnd)
    this.slideContainer.addEventListener("touchend", this.onEnd)
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