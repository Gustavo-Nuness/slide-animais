export default class Slide {

  constructor(slideCssSelector, slideContainerCssSelector, initialImageSlideIndex) {

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

  smoothTransitionBetweenSlideImages(active) {
    this.slide.style.transition = active ? "transform .3s" : ""
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

    this.smoothTransitionBetweenSlideImages(false)
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
  
    this.smoothTransitionBetweenSlideImages(true)
    this.centerSlideWhenMovementOccur()

  }

  centerSlideWhenMovementOccur() {

    if (this.distancies.movementRange >= 120 && this.slideNavigationInfo.nextImageIndex !== undefined) {
      this.goToNextSlideImage()

    } else if (this.distancies.movementRange < -120 && this.slideNavigationInfo.previousImageIndex !== undefined) {
      this.goToPreviousSlideImage()
    } else  {
      this.changeSelectedSlide(this.slideNavigationInfo.currentImageIndex)
    }
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

  //Slide img config

  getCenterPositionSlideImage(slide) {
    const margin = (this.slideContainer.offsetWidth - slide.offsetWidth) / 2
    const centerPosition = - (slide.offsetLeft - margin)

    return centerPosition
  }

  getSlideNavigationInfo(currentSlideIndex) {
    const lastIndex = this.slideArray.length - 1

    this.slideNavigationInfo = {
      previousImageIndex: (currentSlideIndex !== 0) ? currentSlideIndex - 1 : undefined,
      currentImageIndex: currentSlideIndex,
      nextImageIndex: (currentSlideIndex !== lastIndex) ? currentSlideIndex + 1 : undefined

    }
  }

  changeSelectedSlide(index) {
    const currentSlideImage = this.slideArray[index]

    this.slideMove(this.slideArray[index].slidePosition)
    this.getSlideNavigationInfo(index)

    this.distancies.finalPosition = currentSlideImage.slidePosition
  }

  goToPreviousSlideImage() {

    const previousImageIndex = this.slideNavigationInfo.previousImageIndex

    if (previousImageIndex !== undefined) {
      this.changeSelectedSlide(previousImageIndex)
    }
  }

  goToNextSlideImage() {

    const nextImageIndex = this.slideNavigationInfo.nextImageIndex

    if (nextImageIndex !== undefined) {
      this.changeSelectedSlide(nextImageIndex)
    }
  }

  slideConfig() {
    this.slideArray = [...this.slide.children]
    this.slideArray = this.slideArray.map((slideImage) => {
      const slidePosition = this.getCenterPositionSlideImage(slideImage);
      return {
        slidePosition,
        slideImage
      }
    })
    console.log(this.slideArray)
  }

  init() {
    if (this.slide && this.slideContainer) {
      this.smoothTransitionBetweenSlideImages(true)
      this.addSlideEvents()
      this.slideConfig()
    }

    return this
  }
}
