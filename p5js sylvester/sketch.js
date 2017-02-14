var particles = [];
var explosions = [];
var gravity;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	gravity = createVector(0,0.1);
}

function draw() {
	background(0,0,0);
	
	if ( random(1) < 0.075 ) {
		particles.push(new Particle(random(width), height));
	}
	
	for( var i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();
		if (particles[i].offscreen) {
			hu = random(360);
			for(var j = 0; j < 50; j ++) {
			explosions.push( new Explosion(particles[i].pos.x, particles[i].pos.y, hu, particles[i].vel.x, particles[i].vel.y) );
			}
			particles.splice(i,1);
		}
	}	
	for( var i = explosions.length - 1; i >= 0; i--) {
		// explosions[i].applyForce(createVector(random(-0.25,0.25),0));
		explosions[i].update();
		explosions[i].show();
		if (explosions[i].ended) {
			explosions.splice(i,1);
		}
	}
}