particles = [];
var grav = 5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	for (var i = 0; i < 50; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background(0);
	for (var i = particles.length - 1; i >= 0 ; i--) {
		var death = false;
		for (var j in particles) {
			if (particles[j] != particles[i]) {
				particles[i].attract(particles[j]);
			}
		}
		if (particles[i].crash ||
			particles[i].pos.x > width ||
			particles[i].pos.x < 0 ||
			particles[i].pos.y > height ||
			particles[i].pos.y < 0) {
				death = true;
			}
		if (death) {
			particles.splice(i,1);
			particles.push(new Particle());
		} else {
			particles[i].update();
			particles[i].show();
		}
	}

}