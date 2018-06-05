// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Polynomial Regression with TensorFlow.js
// Video: https://youtu.be/tIXDik5SGsI

// declare some variables and dom elements
let canvas; // dom holder for canvas

let x_vals = []; // user defined points
let y_vals = [];
let clearPointsButton; // dom holder for the big red button

let dragged = false; // Is mouse currently clicked?

let orderPoly = 3; //default value for degree of polynom
let orderPolySlider; // dom holder for .... you get it right!?
let learningRate = 0.2; // still default value
let learningRateSlider;


let operands = []; // array to store the values for the polynom
// operands[0] + operands[1]*x + operands[2] * x^2 + ...
let operandsTextHolder; // dom element

//initilize optimizer with default value learningRate
let optimizer = tf.train.adam(learningRate);

// function is called onchange
// updates varbiables and creates new array of length orderPoly
function updateOrder() {
  orderPoly = orderPolySlider.value();
  initOperands();
}
// function is called onchange
// set learningRate and override optimizer
function updateLearningRate() {
  learningRate = learningRateSlider.value();
  optimizer = tf.train.adam(learningRate);
}
// function is called onclick
// just delete them
function clearPoints () {
  x_vals = [];
  y_vals = [];
}
// creates array of random tensors based on chosen degree of polynomial
function initOperands() {
  operands = [];
  for(let i = 0; i <= orderPoly; i++) {
    operands.push(tf.variable(tf.scalar(random(-1,1))));
  }
}
//set size of the canvas
// use the width of parent element but don't be higher than window
function setSize() {
  parentWidth = $("#demo").width();
  let size = parentWidth < windowHeight ? parentWidth : windowHeight;
  resizeCanvas(size, size);
}
// resize canvas dynamically
function windowResized() {
  setSize();
}
//standard p5 function to get called
// NOW the program starts
function setup() {
  // use 500 by 500 as default size (gets overwritten anyways)
  canvas = createCanvas(500, 500);
  canvas.parent('demo'); // place canvas in dom

  // select all the doms
  orderPolySlider = select("#orderPolySlider");
  learningRateSlider = select("#learningRateSlider");
  operandsTextHolder = select("#outputs");
  clearPointsButton = select("#clearPointsButton");

  // set doms to default values and append onchange funcions
  orderPolySlider.value(orderPoly);
  orderPolySlider.changed(updateOrder);
  learningRateSlider.value(learningRate);
  learningRateSlider.changed(updateLearningRate);
  clearPointsButton.mouseClicked(clearPoints);

  canvas.mousePressed(() => {
    dragged = true;
  });
  // initilize array of operands and update canvas size
  initOperands();
  setSize();
}

// this needs to be implemented document wide
// otherwise you can start a drag inside the canvas and let go outside of it
// without having reset dragged to false
function mouseReleased() {
  dragged = false;
}

// p5js function
function draw() {
  // if we have datapoints enable the button, otherwise disable it
  if (x_vals.length == 0 ) {
    // dont append the class if it already is assigned
    if (!clearPointsButton.class().includes("disabled")) {
      clearPointsButton.addClass("disabled")
    }
  } else {
    // we dont need to test if it doesn't have the class, because jQuery just
    // removes it without asking or throwing errors
    clearPointsButton.removeClass("disabled")
  }

  // create new points when we drag and train on the data otherwise
  if(dragged) {
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    x_vals.push(x);
    y_vals.push(y);
  } else {
    train(x_vals, y_vals);
  }

  // render and show string of coefficients
  let output = [];
  for(let i = 0; i <= orderPoly; i++) {
    const coef = operands[i].dataSync()[0].toFixed(2);
    // when power of x is one or zero show sont show powers
    if(i === 1) {
      output.push(`${coef}x`);
    } else if (i === 0) {
      output.push(`${coef}`);
    } else {
      output.push(`${coef}x<sup>${i}</sup>`);
    }
  }
  operandsTextHolder.html("<p>"+output.reverse().join(" + ") + "</p>");

  background(51);

  // render user drawn points
  stroke(200);
  strokeWeight(4);
  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], -1, 1, 0, width);
    let py = map(y_vals[i], -1, 1, height, 0);
    point(px, py);
  }

  // sample values from predicted function
  const curveX = [];
  for (let x = -1; x <= 1; x += 0.01) {
    curveX.push(x);
  }
  const ys = tf.tidy(() => predict(curveX));
  let curveY = ys.dataSync();
  ys.dispose();

  // draw predicted function by connecting verticies
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
