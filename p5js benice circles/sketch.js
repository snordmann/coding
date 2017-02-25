var circle;
var path;

var k = -2.5; // TODO: Slider for k
var kSlider;
var kText;

var initalspeed = 0.01; // maybe relate the increment to k and the number of children
var initalspeedSlider;
var initalspeedText;

var children = 2;
var cildenSlider;
var childrenText;

var circleInside = false;
var circleInsideCheckbox;

var onlyPath = false;
var onlyPathCheckbox;

var drawVertex = true;
var drawVertexCheckbox;

var showDot = true;
var showDotCheckbox;

var pathColorSlider;
var pathColorText;
var pathColor = 250;

var pathValueSlider;
var pathValueText;
var pathValue = 100;

var backgroundValueSlider;
var backgroundValueText;
var backgroundValue = 25;

function restartAnimation() {
	path = [];
	
	circle = new Circle(100, createVector(width/2,height/2), initalspeed);
	for (var i = 0; i < children; i++) { // append ____ children to inital Circle
		circle.addChildren();
	}
}


function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	
	onlyPathCheckbox = createCheckbox("Show Circles",true); // Initialize checkboxes
	onlyPathCheckbox.position(width+10, 10);
	onlyPathCheckbox.changed(function() {
		onlyPath = !onlyPath;
	});	
	
	drawVertexCheckbox = createCheckbox("Show as Path",true);
	drawVertexCheckbox.position(width+10, 30);
	drawVertexCheckbox.changed(function() {
		drawVertex = !drawVertex;
	});
	
	showDotCheckbox = createCheckbox("Show Dot",true); // Initialize checkboxes
	showDotCheckbox.position(width+10, 50);
	showDotCheckbox.changed(function() {
		showDot = !showDot;
	});
	
	circleInsideCheckbox = createCheckbox("Circles inside",false);
	circleInsideCheckbox.position(width+10, 70);
	circleInsideCheckbox.changed(function() {
		circleInside = !circleInside;
		restartAnimation();
	});
	
	childrenText = createP(children + " Children");	
	childrenText.position(width+100, 90-12);
	
	childrenSlider = createSlider(1,5,2,1);
	childrenSlider.position(width+10, 90);
	childrenSlider.style("width","70px");
	childrenSlider.input(function() { //live preview of value
		childrenText.html(this.value() + " Children");
	});
	childrenSlider.changed(function() { //value has been chosen
		children = this.value();
		restartAnimation();
	});	
	
	kText = createP("Value: " +k);	
	kText.position(width+100, 120-12);
	
	kSlider = createSlider(-4,4,-2,0.1);
	kSlider.position(width+10, 120);
	kSlider.style("width","70px");
	kSlider.input(function() {
		kText.html("Value: " +this.value());
	});
	kSlider.changed(function() {
		k = this.value();
		restartAnimation();
	});
	
	initalspeedText = createP("Speed: " +initalspeed);	
	initalspeedText.position(width+100, 150-12);
	
	initalspeedSlider = createSlider(0.0005,0.5,0.1,0.0005);
	initalspeedSlider.position(width+10, 150);
	initalspeedSlider.style("width","70px");
	initalspeedSlider.input(function() {
		initalspeedText.html("Speed: " + this.value());
	});	
	initalspeedSlider.changed(function() {
		initalspeed = this.value();
		restartAnimation();
	});	
	
	
	
	pathColorText = createP("Path Color");	
	pathColorText.position(width+100, 200-12);
	
	pathColorSlider = createSlider(0,360,250,0);
	pathColorSlider.position(width+10, 200);
	pathColorSlider.style("width","70px");
	pathColorSlider.input(function() {
		pathColor = this.value();
	});	
		
	pathValueText = createP("Path Brightness");	
	pathValueText.position(width+100, 230-12);
	
	pathValueSlider = createSlider(0,100,100,0);
	pathValueSlider.position(width+10, 230);
	pathValueSlider.style("width","70px");
	pathValueSlider.input(function() {
		pathValue = this.value();
	});	
	
	backgroundValueText = createP("Background Brightness");	
	backgroundValueText.position(width+100, 260-12);
	
	backgroundValueSlider = createSlider(0,100,25,0);
	backgroundValueSlider.position(width+10, 260);
	backgroundValueSlider.style("width","70px");
	backgroundValueSlider.input(function() {
		backgroundValue = this.value();
	});
	
	restartAnimation();
}

function draw() {	
	background(0, 0, backgroundValue);
	circle.rotate(); // updates all circles (mind the recursion in the function)
	circle.show();
	
	if(drawVertex) { // draw path as verticies
		noFill();
		stroke(pathColor, 100, pathValue);
			strokeWeight(1);
		beginShape();
		path.forEach(function(a) {
			vertex(a.x, a.y);
		});
		endShape();
	} else { // draw path as individual points
		stroke(pathColor, 100, pathValue);	
		strokeWeight(1);
		path.forEach(function(a) {
			point(a.x, a.y);
		});
	}
	
	// TODO: plice path length, when it it back at its startpoint
}