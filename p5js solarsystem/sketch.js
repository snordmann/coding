particles = [];
var grav = 5;

function setup() {
	createCanvas(400, 400);

	for (var i = 0; i < 15; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background(0);
	for (var i = particles.length - 1; i >= 0 ; i--) {
		for (var j in particles) {
			if (particles[j] != particles[i]) {
				particles[i].attract(particles[j]);
			}
		}
		if (particles[i].crash) {
			particles.splice(i,1);
			continue;
		}
		particles[i].update();
		particles[i].show();
	}

}