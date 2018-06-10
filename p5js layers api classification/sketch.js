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
  activation: 'tanh'
}))
model.add(tf.layers.dense({
  units: 4,
  activation: 'relu'
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

  if(xvals.length > 0) {
    train(xvals, yvals).then((response) => {
      let resolution = 100;
      let cols = width / resolution;
      let rows = height / resolution;
      let inputs = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x1 = map(i / cols,0,width,-1,1);
          let x2 = map(j / rows,height,0,-1,1);
          inputs.push( [x1, x2] );
        }
      }
      let y = [];
      tf.tidy(() => {
        let ys = response.model.predict(tf.tensor(inputs));
        y = ys.dataSync();
        ys.dispose();
      })
      let index = 0
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          noStroke()
          if(y[index] === undefined) fill(255,255,255,50)
          else {
            if (y[index] < 0) {
              fill(150,150,51,50)
            } else {
              fill(51,51,150,50)
            }
          }
          rect(i * resolution, j * resolution, resolution, resolution);
          fill(255)
          textAlign(CENTER,CENTER)
          text(nf(y[index],2, 2), i * resolution+resolution/2, j * resolution+resolution/2)
          index++;
        }
      }
      /*for (let x = -1; x <= 1; x += 0.1) {
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
      }*/
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
