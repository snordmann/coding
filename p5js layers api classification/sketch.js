let canvas
let outputDiv
let inputDiv

let xvals = []
let yvals = []

const optimizer = tf.train.adam(0.01)
const model = tf.sequential()


model.add(tf.layers.dense({
  inputShape:[2],
  units: 8,
  activation: 'relu'
}))
model.add(tf.layers.dense({
  units: 4,
  activation: 'relu'
}))
model.add(tf.layers.dense({
  units: 1,
  activation: 'tanh'
}))

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: tf.losses.meanSquaredError, optimizer})

// Generate some synthetic data for training.
let xdata = Array.apply(null, Array(100)).map(() => {
  return [Math.random(1)*2-1, Math.random(1)*2-1]
})
let ydata = xdata.map((el) => {
  if ((el[0] > 0 && el[1] > 0) || (el[0] <= 0 && el[1] <= 0))
    return [0]
  return [1]
})
const xs = tf.tensor(xdata)
const ys = tf.tensor(ydata)

async function train(input, target) {
  let response = undefined
  if (input.length > 0) {
    let xs = tf.tensor(input)
    let ys = tf.tensor(target)
    response = await model.fit(xs,ys,{
      epochs: 1
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
}

function setup() {
  canvas = createCanvas(500, 500)
  canvas.parent('demo')
  setSize()

  outputDiv = select("#output")
  inputDiv = select("#input")
}

function draw() {
  background(51)
  strokeWeight(1)
  let curveX = [];
  let curveY = [];
  if(xvals.length > 0) {
    train(xvals, yvals).then((response) => {
      for (let x = -1; x <= 1; x += 0.1) {
        for (let y = -1; y <= 1; y += 0.1) {
          curveX.push([x,y]);
        }
      }
      const ys = tf.tidy(() => response.model.predict(tf.tensor(curveX)));
      curveY = ys.dataSync();
      ys.dispose();
      for (let i = 0; i < curveX.length; i++) {
        let label = curveY[i] < 0
        let x = map(curveX[i][0], -1, 1, 0, width);
        let y = map(curveX[i][1], -1, 1, height, 0);
        if (label) {
          stroke(150,150,51)
        } else {
          stroke(51,51,150)
        }
        point(x, y)
      }
    })
  }
  strokeWeight(4)
  for (let i = 0; i < xvals.length; i++) {
    label = yvals[i] < 0
    let px = map(xvals[i][0], -1, 1, 0, width)
    let py = map(xvals[i][1], -1, 1, height, 0)
    if (label) {
      stroke(255, 255, 150)
    } else {
      stroke(150, 150, 255)
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
