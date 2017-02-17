var font;
var points;
var vehicles = [];

function preload() {
	font = loadFont('Avenir Next LT Pro Demi.ttf');
}

function setup() {
	createCanvas(800,300);
	textFont(font);
	
	points = font.textToPoints('train', 30, 200, 192, { sampleFactor: 0.4 });
	
	for (var i = 0; i < points.length; i++) {
		vehicles.push(new Vehicle(points[i].x, points[i].y));
	}
}

function draw() {
	background(51);
	
	for (var i in vehicles) {
		vehicles[i].behavior();
		vehicles[i].update();
		vehicles[i].show();
	}
}