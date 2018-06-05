// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Polynomial Regression with TensorFlow.js
// Video: https://youtu.be/tIXDik5SGsI

let x_vals = [];
let y_vals = [];
let clearPointsButton;

let orderPoly = 3;
let orderPolySlider;
let learningRate = 0.2;
let learningRateSlider;


let operands = [];
let operandsTextHolder;

let optimizer = tf.train.adam(learningRate);

function updateOrder() {
  orderPoly = orderPolySlider.value();
  initOperands();
}
function updateLearningRate() {
  learningRate = learningRateSlider.value();
  optimizer = tf.train.adam(learningRate);
}
function clearPoints () {
  x_vals = [];
  y_vals = [];
}

function initOperands() {
  operands = [];
  for(let i = 0; i <= orderPoly; i++) {
    operands.push(tf.variable(tf.scalar(random(-1,1))));
  }
}

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('demo');
  orderPolySlider = select("#orderPolySlider");
  learningRateSlider = select("#learningRateSlider");
  operandsTextHolder = select("#outputs");
  clearPointsButton = select("#clearPointsButton");

  orderPolySlider.value(orderPoly);
  orderPolySlider.changed(updateOrder);
  learningRateSlider.value(learningRate);
  learningRateSlider.changed(updateLearningRate);
  clearPointsButton.mouseClicked(clearPoints);

  canvas.mousePressed(() => {
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    x_vals.push(x);
    y_vals.push(y);
  });

  initOperands();
}

function draw() {
  if (x_vals.length == 0 ) {
    console.log();
    if (!clearPointsButton.class().includes("disabled")) {
      clearPointsButton.addClass("disabled")
    }
  } else {
    clearPointsButton.removeClass("disabled")
  }

    train(x_vals, y_vals);
  let output = [];
  for(let i = 0; i <= orderPoly; i++) {
    const coef = operands[i].dataSync()[0].toFixed(2);
    const pow = i;
    if(pow === 1) {
      output.push(`${coef}x`);
    } else if (pow === 0) {
      output.push(`${coef}`);
    } else {
      output.push(`${coef}x<sup>${pow}</sup>`);
    }
  }
  operandsTextHolder.html("<p>"+output.reverse().join(" + ") + "</p>");

  background(0);

  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], -1, 1, 0, width);
    let py = map(y_vals[i], -1, 1, height, 0);
    point(px, py);
  }


  const curveX = [];
  for (let x = -1; x <= 1; x += 0.01) {
    curveX.push(x);
  }

  const ys = tf.tidy(() => predict(curveX));
  let curveY = ys.dataSync();
  ys.dispose();

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < curveX.length; i++) {
    let x = map(curveX[i], -1, 1, 0, width);
    let y = map(curveY[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

}
