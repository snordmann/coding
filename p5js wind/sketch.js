var data = [];
var particles = [];

var zoom = 5;
var clat = 0;
var clon = 0;

var flowfield;

var scl = 10;
var cols, rows;

function preload() {
	cols = floor(width / scl);
	rows = floor(height / scl);
	console.log(cols + ";"+ rows)
	for (var y = clat; y < clat + rows*zoom; y+=zoom) {
		for (var x = clon; x < clon + cols*zoom; x+=zoom) {
			var url = "http://api.openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y+"&appid=7bbbb47522848e8b9c26ba35c226c734"
			data.push(loadJSON(url));
		}
	}
}

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);
	stroke(0,50);
	
	
	flowfield = new Array(cols * rows);
	for (var i = 0; i < 150; i++) {
		particles[i] = new Particle();
	}
	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var index = x + y * cols;
			console.log(index);
			var angle = data[index]["wind"]["deg"];
			var v = p5.Vector.fromAngle(angle);
			v.setMag(data[index]["wind"]["speed"]);
			flowfield[index] = v;
		}
	}
	
	console.log(flowfield);
	console.log(flowfield.length + ";" + data.length);
	
}
function draw() {
	for (var i = particles.length-1; i >=0 ; i--) {
		particles[i].follow(flowfield);
		particles[i].update();
		if (particles[i].offscreen) {
			particles.splice(i,1);
			particles.push(new Particle());
		}
		particles[i].show();
	}
}