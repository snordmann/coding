// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/KWoJgHFYWxY

var c = 15;
var maxlength;
var count = 0;

var pos = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
  
	noStroke();
	
	maxlength = sqrt( pow(height / 2,2) + pow(width / 2,2 ) );

	var r = 0;
	var n = 0;
	
	translate(width/2, height/2);
	
	while (r < maxlength) {
		var a = n * 137.3525;
		r = c * sqrt(n);
		var x = r * cos(a);
		var y = r * sin(a);
		
		pos.push(createVector(x,y,pow(r,0.75)));
		
		n += 1;
	}
}
function draw() {
  background(0);
  translate(width/2,height/2);
  rotate(3.15*count);
  
  for( i in pos) {
	  var curr = pos[i];
	var hu = map(sin( curr.z + count ), -1.25, 1.25, 0, 360);
	var size = map(curr.z, 0, maxlength, c/1.75, c/7.5);
	
	fill (hu,255,255);
	ellipse(curr.x, curr.y, c/2, c/2);
	
	count += 0.0005;
  }
}