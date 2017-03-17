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
var mu = 2;
var r1 = 5;
var r2 = 5;

var g = 9.8;
var time = 0.1;

var path = [];
var col = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);  
  Theta1 = random(PI/2, 3*PI/2);
  Theta2 = random(PI/2, 3*PI/2);
  
  var vhl = random(0.35,0.65);
  l1 = height < width ? height/2 * vhl - 5 : width /2 * vhl - 5;
  l2 = height < width ? height/2 * (1-vhl) - 5 : width /2 * (1-vhl) - 5;
  
  
  m1 = random(1,10);
  m2 = random(1,10);
  mu =  1+m1/m2;
  
  r1 = map(m1, 1, 10, 5, 20);
  r2 = map(m2, 1, 10, 5, 20);
  fill(100,255,100);
  
}

function draw() {
  background(51);
  
  col += 0.25;
  translate(width/2, height/2);
  rotate(PI/2);
  
  //use math functions, for faster computing
  d2Theta1  =  (g*(Math.sin(Theta2)*Math.cos(Theta1-Theta2)-mu*Math.sin(Theta1))-(l2*dTheta2*dTheta2+l1*dTheta1*dTheta1*Math.cos(Theta1-Theta2))*Math.sin(Theta1-Theta2))/(l1*(mu-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
  d2Theta2  =  (mu*g*(Math.sin(Theta1)*Math.cos(Theta1-Theta2)-Math.sin(Theta2))+(mu*l1*dTheta1*dTheta1+l2*dTheta2*dTheta2*Math.cos(Theta1-Theta2))*Math.sin(Theta1-Theta2))/(l2*(mu-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
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
  

  
  
  for (var i = 0; i < path.length -1; i++) {
    var hu = map(i, 0, path.length -1, 0, 255);
    stroke(255, hu);
    line(path[i][0], path[i][1], path[i+1][0], path[i+1][1]);
  }  
    
  
  stroke(100,255,100);
  line(0,0,x1,y1);
  line(x1,y1,x2,y2);
  ellipse(x1,y1,r1);
  ellipse(x2,y2,r2);
  if (path.length > 500) 
    path.splice(0,1);
}