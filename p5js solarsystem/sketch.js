particles = [];
var grav = 10;

function setup() {
	createCanvas(400, 400);

	particles.push(new Particle(createVector(width/2,height/2),createVector(0,random(-0.5,0.5)),5));
	particles.push(new Particle(createVector(width/2+100,height/2),createVector(-1,random(-0.5,0.5)),5));
}

function draw() {
	background(0,5);
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
