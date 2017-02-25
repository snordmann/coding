var circle;
var path;
var k = -2.5;
var initalspeed = 0.01;
var children = 2;

function setup() {
	createCanvas(600, 600);
	path = [];
	
	circle = new Circle(100, createVector(width/2,height/2), initalspeed);
	for (var i = 0; i < children; i++) { // append ____ children to inital Circle
		circle.addChildren();
	}
}

function draw() {	
	background(51);
	circle.rotate(); // updates all circles (mind the recursion in the function)
	circle.show();
	
	noFill();
	stroke(0,255,0);
	strokeWeight(1);
	beginShape();
	path.forEach(function(a) {
		vertex(a.x, a.y);
	});
	endShape();
}