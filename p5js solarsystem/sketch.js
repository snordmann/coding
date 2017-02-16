particles = [];
var grav = 5;
var showTrail;
var deleteoffscreen;

function toggleTrail() {		
	if (this.checked()) {
		for (var i in particles)
			particles[i].trail = true;
	} else {
		for (var i in particles)
			particles[i].trail = false;
	}
}

function setup() {
	createCanvas(400, 400);
	colorMode(HSB);
	
	showTrail = createCheckbox('Show Trails', true);
	showTrail.position(width + 50, 50);
	showTrail.changed(toggleTrail);	
	
	deleteoffscreen = createCheckbox('Delete Offscreen', true);
	deleteoffscreen.position(width + 50, 75);

	for (var i = 0; i < 15; i++) {
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
		if(deleteoffscreen.checked()) {
			if (particles[i].crash ||
				particles[i].pos.x > width ||
				particles[i].pos.x < 0 ||
				particles[i].pos.y > height ||
				particles[i].pos.y < 0) {
					death = true;
				}
		} else {
			if (particles[i].crash) {
					death = true;
				}
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