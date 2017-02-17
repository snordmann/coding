function Particle(energy) {
	this.pos = createVector(0,random(height));
	this.acc = createVector(0,0);
	this.energy = energy;
	this.mass = 1;
	
	this.vel = createVector(1,0);
	this.vel.setMag(sqrt(energy/(2*this.mass)));
	
	this.update = function() {
		this.applyForce(voltage);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		
		this.acc.mult(0);
	}
	
	this.applyForce = function (force) {
		this.acc.add(force);
	}	
	
	this.show = function() {
		fill(255);
		ellipse(this.pos.x, this.pos.y, 4, 4);
	}

}