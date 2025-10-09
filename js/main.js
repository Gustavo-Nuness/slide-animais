import Slide from "./slide.js";

const slide = new Slide(".slide", ".slide-container")
slide.init()
slide.changeSelectedSlide(4)
// console.log(slide.slideArray)