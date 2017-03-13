var Theta1;
var Theta2;

var dTheta1 = 0;
var dTheta2 = 0;
var d2Theta1 = 0;
var d2Theta2 = 0;

var l1 = 50;
var l2 = 50;

var g = 9.8;
var time = 0.1;

var path = [];


function setup() {
  createCanvas(windowWidth, windowHeight);  
  colorMode(HSB);
  Theta1 = random(0, TWO_PI);
  Theta2 = random(0, TWO_PI);
  
  l1 = width > height ? height/4 : width/4;
  l2 = width > height ? height/4 : width/4;
  
}

function draw() {
  background(21);
  translate(width/2, height/2-10);
  rotate(PI/2);
  
  //use math functions, for faster computing
  d2Theta1  =  (g*(Math.sin(Theta2)*Math.cos(Theta1-Theta2)-2*Math.sin(Theta1))-(l2*dTheta2*dTheta2+l1*dTheta1*dTheta1*Math.cos(Theta1-Theta2))*Math.sin(Theta1-Theta2))/(l1*(2-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
  d2Theta2  =  (2*g*(Math.sin(Theta1)*Math.cos(Theta1-Theta2)-Math.sin(Theta2))+(2*l1*dTheta1*dTheta1+l2*dTheta2*dTheta2*Math.cos(Theta1-Theta2))*Math.sin(Theta1-Theta2))/(l2*(2-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
  dTheta1   += d2Theta1*time;
  dTheta2   += d2Theta2*time;
  Theta1    += dTheta1*time;
  Theta2    += dTheta2*time;
  
  var x1 = l1 * cos(Theta1);
  var y1 = l1 * sin(Theta1);
  var x2 = l2 * cos(Theta2);
  var y2 = l2 * sin(Theta2);
  x2 += x1;
  y2 += y1;
  
  path.push([x2, y2]);
  
  stroke(150, 100,100);
  line(0,0,x1,y1);
  line(x1,y1,x2,y2);
  
  for (var i = 0; i < path.length -1; i++) {
    var hu = map(i, 0, 100, 21, 100);
    stroke(200,hu,hu);
    line(path[i][0], path[i][1], path[i+1][0], path[i+1][1]);
  }  
  
  if (path.length > 100) 
    path.splice(0,1);
}