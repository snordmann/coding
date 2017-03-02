var circle;
var path;

var showText = true;
var ShowTextButton;

var children = 2;
var childrenSlider;
var childrenText;
var childrenInput;

var k = -2.5; // TODO: Slider for k
var kSlider;
var kText;
var kInput;

var cSize = 100;
var sizeSlider;
var sizeText;
var sizeInput;

var initalspeed; // maybe relate the increment to k and the number of children
var initalspeedSlider;
var initalspeedText;
var initalspeedInput;
var initialmin = 0.0001;
var initialmax = 0.1;

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
var pathColor = 200;

var pathSaturationSlider;
var pathSaturationText;
var pathSaturation = 100;

var pathValueSlider;
var pathValueText;
var pathValue = 100;

var backgroundValueSlider;
var backgroundValueText;
var backgroundValue = 25;

var stopButton;
var stoppedAnimation = false;

var restartText;
var styleText;

function restartAnimation() {
	path = [];
	
	circle = new Circle(cSize, createVector(width/2,height/2), initalspeed);
	for (var i = 0; i < children; i++) { // append number of children to inital Circle
		circle.addChildren();
	}
}

function speedLog(value) { // makes the scale logarithmic for finer control with small numbers
	var minv = log(initialmin);
	var maxv = log(initialmax);
	
	var minp = 0;
	var maxp = 1000;
	
	var scale = (maxv-minv) / (maxp - minp);
	
	return exp(minv + scale * (value - minp));
	
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	
	showTextButton = createButton("Hide Text");
	showTextButton.position(10, height-30);
	showTextButton.mousePressed(function() {
		showText = !showText;
		if (showText) {
			this.html("Hide Text");
		} else {
			this.html("Show Text");
		}
	});
	
	restartText = createP("Changes that need the animation to restart:");
	restartText.position(10, 0);
	restartText.style("font-weight","bold");
	restartText.style("white-space","nowrap");
	
	circleInsideCheckbox = createCheckbox("Circles inside",false);
	circleInsideCheckbox.position(25, 40);
	circleInsideCheckbox.changed(function() {
		circleInside = !circleInside;
		restartAnimation();
	});
	
	
	childrenText = createP("Children:");	
	childrenText.position(140, 70-13);
	
	childrenInput = createInput(children, "number");
	childrenInput.attribute("min","0");
	childrenInput.position(205, 70+2);
	childrenInput.style("width","45px");
	childrenInput.changed(function() {
		children = this.value();
		childrenSlider.value(this.value());
		restartAnimation();
	});
	
	childrenSlider = createSlider(1,5,children,1);
	childrenSlider.position(25, 70);
	childrenSlider.style("width","100px");
	childrenSlider.input(function() {
		childrenInput.value(this.value());
	});
	childrenSlider.changed(function() {
		children = this.value();
		restartAnimation();
	});	
	
	kText = createP("Value:");	
	kText.position(140, 100-13);
	
	kInput = createInput(k, "number");
	kInput.attribute("step","0.1");
	kInput.position(195, 100+2);
	kInput.style("width","50px");
	kInput.changed(function() {
		k = parseFloat(this.value());
		kSlider.value(k);
		restartAnimation();
	});
	
	kSlider = createSlider(-4,4,k,0.05);
	kSlider.position(25, 100);
	kSlider.style("width","100px");
	kSlider.input(function() {
		kInput.value(this.value());
	});
	kSlider.changed(function() {
		k = this.value();
		restartAnimation();
	});	

	
	
	initalspeedSlider = createSlider(0,1000,750,1);
	initalspeedSlider.position(25, 130);
	initalspeedSlider.style("width","100px");
	initalspeedSlider.input(function() {
		initalspeedText.html("Speed: " + speedLog(this.value()).toFixed(5));
	});	
	initalspeedSlider.changed(function() {
		initalspeed = speedLog(this.value());
		restartAnimation();
	});		
	initalspeedText = createP("Speed: " + speedLog(initalspeedSlider.value()).toFixed(5));	
	initalspeedText.position(140, 130-13);
	initalspeed = speedLog(initalspeedSlider.value());
	
		
	sizeText = createP("Size:");	
	sizeText.position(140, 170-13);
	
	sizeInput = createInput(cSize, "number");
	sizeInput.position(195, 170+2);
	sizeInput.style("width","50px");
	sizeInput.changed(function() {
		cSize = parseFloat(this.value());
		sizeSlider.value(cSize);
		restartAnimation();
	});
	
	sizeSlider = createSlider(50,275,cSize,5);
	sizeSlider.position(25, 170);
	sizeSlider.style("width","100px");
	sizeSlider.input(function() {
		sizeInput.value(this.value());
	});
	sizeSlider.changed(function() {
		cSize = this.value();
		restartAnimation();
	});
	
	
	//-------------------------------------------------------------------------------
	
	
	styleText = createP("Style changes:");
	styleText.position(10, 200);
	styleText.style("font-weight","bold");
	
	onlyPathCheckbox = createCheckbox("Show Circles",true);
	onlyPathCheckbox.position(25, 240);
	onlyPathCheckbox.changed(function() {
		onlyPath = !onlyPath;
	});	
	
	showDotCheckbox = createCheckbox("Show drawing point",true);
	showDotCheckbox.position(25, 270);
	showDotCheckbox.changed(function() {
		showDot = !showDot;
	});
	
	drawVertexCheckbox = createButton("Show as Points");
	drawVertexCheckbox.position(25, 300);
	drawVertexCheckbox.mousePressed(function() {
		if(drawVertex) {
			drawVertexCheckbox.html("Show as Path");
		} else {
			drawVertexCheckbox.html("Show as Points");
		}
		drawVertex = !drawVertex;
	});
	
	
	
	pathColorText = createP("Path Color");	
	pathColorText.position(145, 330-13);
	pathColorText.style("white-space","nowrap");
	
	pathColorSlider = createSlider(0,360,200,0);
	pathColorSlider.position(25, 330);
	pathColorSlider.style("width","100px");
	pathColorSlider.input(function() {
		pathColor = this.value();
	});	
		
	pathSaturationText = createP("Path Saturation");	
	pathSaturationText.position(145, 360-13);
	pathSaturationText.style("white-space","nowrap");
	
	pathSaturationSlider = createSlider(0,100,100,0);
	pathSaturationSlider.position(25, 360);
	pathSaturationSlider.style("width","100px");
	pathSaturationSlider.input(function() {
		pathSaturation = this.value();
	});		
	
	pathValueText = createP("Path Brightness");	
	pathValueText.position(145, 390-13);
	pathValueText.style("white-space","nowrap");
	
	pathValueSlider = createSlider(0,100,100,0);
	pathValueSlider.position(25, 390);
	pathValueSlider.style("width","100px");
	pathValueSlider.input(function() {
		pathValue = this.value();
	});	
	
	
	backgroundValueText = createP("Background Brightness");	
	backgroundValueText.position(145, 420-13);
	backgroundValueText.style("white-space","nowrap");
	
	backgroundValueSlider = createSlider(0,100,25,0);
	backgroundValueSlider.position(25, 420);
	backgroundValueSlider.style("width","100px");
	backgroundValueSlider.input(function() {
		backgroundValue = this.value();
	});
	
	stopButton = createButton("Pause animation");
	stopButton.position(25, 450);
	stopButton.mousePressed(function() {
		stoppedAnimation = !stoppedAnimation;
		if(stoppedAnimation) {
			stopButton.html("Resume animation");
		} else {
			stopButton.html("Pause animation");
		}
	});
	
	restartAnimation();
}

function updateColor() {
	var color = round(map(100 - backgroundValue, 0, 100, 0, 255));
	var string = color.toString(16).repeat(3);
	select('body').style("color", string);
}

function checkTextVisibility () {
	showText ? childrenSlider.show() : childrenSlider.hide();
	showText ? childrenText.show() : childrenText.hide();
	showText ? childrenInput.show() : childrenInput.hide();
	showText ? kSlider.show() : kSlider.hide();
	showText ? kText.show() : kText.hide();
	showText ? kInput.show() : kInput.hide();
	showText ? sizeSlider.show() : sizeSlider.hide();
	showText ? sizeText.show() : sizeText.hide();
	showText ? sizeInput.show() : sizeInput.hide();
	showText ? initalspeedSlider.show() : initalspeedSlider.hide();
	showText ? initalspeedText.show() : initalspeedText.hide();
	showText ? circleInsideCheckbox.show() : circleInsideCheckbox.hide();
	showText ? onlyPathCheckbox.show() : onlyPathCheckbox.hide();
	showText ? drawVertexCheckbox.show() : drawVertexCheckbox.hide();
	showText ? showDotCheckbox.show() : showDotCheckbox.hide();
	showText ? pathColorSlider.show() : pathColorSlider.hide();
	showText ? pathColorText.show() : pathColorText.hide();
	showText ? pathSaturationSlider.show() : pathSaturationSlider.hide();
	showText ? pathSaturationText.show() : pathSaturationText.hide();
	showText ? pathValueSlider.show() : pathValueSlider.hide();
	showText ? pathValueText.show() : pathValueText.hide();
	showText ? backgroundValueSlider.show() : backgroundValueSlider.hide();
	showText ? backgroundValueText.show() : backgroundValueText.hide();
	showText ? stopButton.show() : stopButton.hide();
	showText ? restartText.show() : restartText.hide();
	showText ? styleText.show() : styleText.hide();
}

function draw() {	
	background(0, 0, backgroundValue);
	if (!stoppedAnimation) 
		circle.rotate(); // updates all circles (mind the recursion in the function)
	
	circle.show();	
	
	if(drawVertex) { // draw path as verticies
		noFill();
		stroke(pathColor, pathSaturation, pathValue);
			strokeWeight(1);
		beginShape();
		path.forEach(function(a) {
			vertex(a.x, a.y);
		});
		endShape();
	} else { // draw path as individual points
		stroke(pathColor, pathSaturation, pathValue);	
		strokeWeight(1);
		path.forEach(function(a) {
			point(a.x, a.y);
		});
	}
	updateColor();
	checkTextVisibility();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}