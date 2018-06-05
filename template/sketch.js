let canvas
let outputDiv
let inputDiv

let setSize = function() {
  let parentWidth = $("#demo").width()
  let size = parentWidth < windowHeight ? parentWidth : windowHeight
  resizeCanvas(size, size)
}

function setup() {
  canvas = createCanvas(500, 500)
  canvas.parent('demo')
  setSize()

  outputDiv = select("#output")
  inputDiv = select("#input")
}

function draw() {
  background(51);
}

function windowResized() {
  setSize()
}
