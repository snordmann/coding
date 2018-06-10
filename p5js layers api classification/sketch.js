let canvas
let outputDiv
let inputDiv

let xvals = []
let yvals = []

let inputs
let resolution = 25;
let cols
let rows
const optimizer = tf.train.adam(0.01)
const model = tf.sequential()



model.add(tf.layers.dense({
  inputShape:[2],
  units: 8,
  activation: 'tanh'
}))
model.add(tf.layers.dense({
  units: 4,
  activation: 'tanh'
}))
model.add(tf.layers.dense({
  units: 1,
  activation: 'tanh'
}))

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: tf.losses.meanSquaredError, optimizer})

async function train(input, target) {
  let response = undefined
  if (input.length > 0) {
    let xs = tf.tensor(input)
    let ys = tf.tensor(target)
    response = await model.fit(xs,ys,{
      shuffle: true,
      epochs: 10,
    })
    xs.dispose()
    ys.dispose()
  }
  return response
}


let setSize = function() {
  let parentWidth = $("#demo").width()
  let size = parentWidth < windowHeight ? parentWidth : windowHeight
  resizeCanvas(size, size)

  cols = width / resolution
  rows = height / resolution
  inputs = []
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = map(i * resolution, 0,  width, -1, 1);
      let x2 = map(j * resolution, height, 0, -1, 1);
      inputs.push( [x1, x2] );
    }
  }
}

function setup() {
  canvas = createCanvas(500, 500)
  canvas.parent('demo')
  setSize()

  outputDiv = select("#output")
  inputDiv = select("#input")
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function draw() {
  background(255)

  train(xvals, yvals).then((response) => {
    let y = [];
    tf.tidy(() => {
      let ys = model.predict(tf.tensor(inputs));
      y = ys.dataSync();
      ys.dispose();
    })
    noStroke()

    let tmpScale = d3.scale.linear().domain([0, .5, 1]).range(["#f59322", "#e8eaeb", "#0877bd"]).clamp(!0)

    let index = 0
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if(y[index] === undefined) fill(255,255,255,50)
        else {
          let c = hexToRgb(tmpScale(y[index]))
          fill(c.r,c.g,c.b,150)
        }
        rect(i * resolution, j * resolution, resolution, resolution);
        index++;
      }
    }
  })

  strokeWeight(6)
  for (let i = 0; i < xvals.length; i++) {
    label = yvals[i] < 0
    let px = map(xvals[i][0], -1, 1, 0, width)
    let py = map(xvals[i][1], -1, 1, height, 0)
    if (label) {
      stroke('#f59322')
    } else {
      stroke('#0877bd')
    }
    point(px, py)
  }


}

function windowResized() {
  setSize()
}
$(document).ready(() => {
  $('#demo').mousedown(function(event) {
    let xval = map(mouseX, 0, width, -1, 1)
    let yval = map(mouseY, height, 0, -1, 1)
    switch (event.which) {
      case 1: // LEFT mouse
        event.preventDefault();
        xvals.push([xval,yval])
        yvals.push([1])
        break;
      case 2: // MIDDLE mouse
        break;
      case 3: // RIGHT mouse
        xvals.push([xval,yval])
        yvals.push([-1])
        event.preventDefault();
        break;
      default: //OTHERS
    }
  });
  $('#demo').bind("contextmenu",function(e){
    return false;
  });
})
