let canvas
let outputDiv
let inputDiv

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
  activation: 'relu'
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

async function train() {
  return await model.fit(xs,ys,{
    epochs: 2
  })
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

  tf.tidy(() => {
    train().then((response) => {
      response.model.predict(tf.tensor([
        [-1,-1],
        [-1,1],
        [1,-1],
        [1,1],
      ])).print()
    })
  })
}

function windowResized() {
  setSize()
}
