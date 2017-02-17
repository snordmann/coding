var h = 1;
var f0 = 440;
var energy = 0;
var voltage;
var f;

var freqSlider;
var onlyhigh;

var particles = [];


function setup() {
	createCanvas(400,400);
	colorMode(HSB);
	noStroke();
	
	voltage = createVector(-0.1, 0);
	
	freqSlider = createSlider(430, 770, 430);
	freqSlider.position(5, height + 10);
	
	onlyhigh = createCheckbox("Show only max energy electrons", false);
	onlyhigh.position(5, height + 30);
}

function draw() {
	f = freqSlider.value();
	var col = map(f, 430, 770, 0, 240); ;
	background(col, 255, 255);
	if (f > f0) {
		energy = h * (f - f0);
		if(!onlyhigh.checked()){
			energy = randomGaussian(energy*0.75);
		}
		
		if ( random(1) > 0.5) {
			particles.push(new Particle(energy));
		}
	}
	for (var i =  particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();
		
		if(particles[i].pos.x > width) {
			particles.splice(i, 1);
		}
	}
}