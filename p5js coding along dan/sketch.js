var circle;
var path = [];
var k = -5;
var inc = 0.01;
var children = 2;
function setup() {
	createCanvas(600, 600);
	
	circle = new Circle(100, createVector(width/2,height/2), inc);
	for (var i = 0; i < children; i++) {
		circle.addChildren();
	}
}

function draw() {	
	background(51);
	circle.rotate();
	circle.show();
	
	beginShape();
	path.forEach(function(a) {
		stroke(0,255,0);
		// point(a.x, a.y);
		vertex(a.x, a.y);
	});
	endShape();
}