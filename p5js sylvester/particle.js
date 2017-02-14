function Particle (x, y) {
	this.pos = createVector(x,y);
	this.vel = createVector(random(-0.5,0.5),random(-15,-7));
	this.acc = createVector(0,0);
	// this.mass = 1;
	this.laspos = createVector(x,y);
	this.offscreen = false;
	
	this.applyForce = function (force) {
		this.acc.add(force);
	}
	this.update = function () {
		if (this.vel.y >= random(-1,1)) {
			this.offscreen = true;
		}
		
		this.applyForce(gravity);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	
	this.show = function () {
		fill(0,0,255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 3, 5);
	}
	
}