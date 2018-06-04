// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Polynomial Regression with TensorFlow.js
// Video: https://youtu.be/tIXDik5SGsI

let x_vals = [];
let y_vals = [];

let orderPoly = 3;
let orderPolySlider;
let learningRate = 0.2;
let learningRateSlider;

let operands = [];
let operandsTextHolder;

let optimizer = tf.train.adam(learningRate);

function sliderChanged() {
  orderPoly = orderPolySlider.value();
  learningRateValue = learningRateSlider.value();
  initTF();
}

function initTF() {

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

  orderPolySlider.value(orderPoly);
  orderPolySlider.changed(sliderChanged);
  learningRateSlider.value(learningRate);
  learningRateSlider.changed(sliderChanged);

  canvas.mouseClicked(() => {
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    x_vals.push(x);
    y_vals.push(y);
  })

  initTF();
}

function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function predict(x) {
  const xs = tf.tensor1d(x);
  let ys = tf.variable(tf.zerosLike(xs));
  for (let i = 0; i <= orderPoly; i++) {
    const coef = operands[i];
    const pow_ts = tf.fill(xs.shape, i);
    const sum = tf.add(ys, operands[i].mul(xs.pow(pow_ts)));
    ys.dispose();
    ys = sum.clone();
  }
  return ys;
}

function draw() {
  tf.tidy(() => {
    if (x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(() => loss(predict(x_vals), ys));
    }
  });

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
  strokeWeight(8);
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
