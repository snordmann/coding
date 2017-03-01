var h = 1;
var f0 = 440;
var energy = 0;
var voltage;
var f;
var ampere = 0;

var freqSlider;
var freqSliderText;
var voltSlider;
var voltSliderText;
var voltSliderValue;
var onlyhigh;
var ampereText;



var particles = [];


function setup() {
	createCanvas(400,400);
	colorMode(HSB);
	noStroke();
	
	ampereText = createP(ampere + "A");
	ampereText.position(width + 5, 10);
	
	voltSlider = createSlider(0,2,0.5,0.01);
	voltSlider.position(5,height+80);
	voltSlider.style('width', '100px');
	
	voltage = createVector(0, 0);
	
	voltSliderValue = createP(voltSlider.value() + "V");
	voltSliderValue.position(110,height+80);
	
	freqSlider = createSlider(430, 770, 430);
	freqSlider.position(5, height + 10);
	
	
	onlyhigh = createCheckbox("Show only max energy electrons", true);
	onlyhigh.position(5, height + 40);
}

function draw() {
	f = freqSlider.value();
	var col = map(f, 430, 770, 0, 240);
	background(col, 150, 255);
	
	
	voltSliderValue.html(voltSlider.value());
	voltage.x = -1 * voltSlider.value();
	if(frameCount % 50 == 0) {
		ampereText.html(ampere);
		ampere = 0;
	}
	
	if (f > f0) {
		energy = h * (f - f0);
		if(!onlyhigh.checked()){
			energy = random(energy);
		}
		
		if ( random(1) > 0.5) {
			particles.push(new Particle(energy));
		}
	}
	for (var i =  particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();
		
		if (particles[i].pos.x > width) {
			ampere += 0.01;
			particles.splice(i,1);
		}
		
		if(particles[i].pos.x < 0) {
			particles.splice(i, 1);
		}
	}
	
}