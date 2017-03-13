var Theta1;
var Theta2;

var dTheta1 = 0;
var dTheta2 = 0;
var d2Theta1 = 0;
var d2Theta2 = 0;

var l1 = 50;
var l2 = 50;

var m1 = 1;
var m2 = 1;

var mu = 1+ m1/m2;

var g = 9.8;

var path = [];
var path1 = [];


function setup() {
  createCanvas(windowWidth, windowHeight);  
  colorMode(HSB);
  Theta1 = random(0, TWO_PI);
  Theta2 = random(0, TWO_PI);
  
  l1 = width/8 - 2;
  l2 = width/8 - 2;
  
}

function draw() {
  background(21);
  translate(width/2, height/2-10);
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
  path1.push([x1, y1]);
  
  stroke(150, 100,100);
  noFill();
  line(0,0,x1,y1);
  line(x1,y1,x2,y2);
  
  for (var i = 0; i < path.length -1; i++) {
    var hu = map(i, 0, path.length-1, 26, 100);
    stroke(hu);
    line(path[i][0], path[i][1], path[i+1][0], path[i+1][1]);
  }  
  for (var i = 0; i < path1.length -1; i++) {
    var hu = map(i, 0, path1.length-1, 21,100);
    stroke(hu);
    line(path1[i][0], path1[i][1], path1[i+1][0], path1[i+1][1]);
  }
  
  if (path.length > 100) 
    path.splice(0,1);
  
  if (path1.length > 25) 
    path1.splice(0,1);
}