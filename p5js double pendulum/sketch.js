var Theta1;
var Theta2;

var dTheta1 = 0;
var dTheta2 = 0;
var d2Theta1 = 0;
var d2Theta2 = 0;

var l1 = 50;
var l2 = 50;

var m1 = 2;
var m2 = 2;

var mu = 1+ m1/m2;

var g = 9.8;

var path = [];

function setup() {
  createCanvas(windowWidth, windowHeight);  
  Theta1 = random(PI, TWO_PI);
  Theta2 = random(PI, TWO_PI);
  
  l1 = width/8 - 4;
  l2 = width/8 - 4;
  
}

function draw() {
  background(51);
  translate(width/2, height/2);
  rotate(PI/2);
  
  d2Theta1  =  (g*(Math.sin(Theta2)*Math.cos(Theta1-Theta2)-mu*Math.sin(Theta1))-(l2*dTheta2*dTheta2+l1*dTheta1*dTheta1*Math.cos(Theta1-Theta2))*Math.sin(Theta1-Theta2))/(l1*(mu-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
  d2Theta2  =  (mu*g*(Math.sin(Theta1)*Math.cos(Theta1-Theta2)-Math.sin(Theta2))+(mu*l1*dTheta1*dTheta1+l2*dTheta2*dTheta2*Math.cos(Theta1-Theta2))*Math.sin(Theta1-Theta2))/(l2*(mu-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
  dTheta1   += d2Theta1*0.1;
  dTheta2   += d2Theta2*0.1;
  Theta1    += dTheta1*0.1;
  Theta2    += dTheta2*0.1;
  
  var x1 = l1 * cos(Theta1);
  var y1 = l1 * sin(Theta1);
  var x2 = l2 * cos(Theta2);
  var y2 = l2 * sin(Theta2);
  x2 += x1;
  y2 += y1;
  
  path.push([x2, y2]);
  
  stroke(255);
  noFill();
  ellipse (x1, y1, 6, 6);
  ellipse (x2, y2, 6, 6);
  line(0,0,x1,y1);
  line(x1,y1,x2,y2);
  
  beginShape();
  path.forEach(function(p) {
    vertex(p[0],p[1]);
  });
  endShape();
}