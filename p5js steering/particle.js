function Vehicle(x,y) {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.r = 8;
	this.maxspeed = 10;
	this.maxacc = 0.5;

	this.target = createVector(x,y);
	
	this.applyForce = function (force) {
		this.acc.add(force);
	}
	
	this.update = function () {		
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	
	this.show = function () {
		fill(255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}

	this.seek = function (target) {
		var desired = p5.Vector.sub(target, this.pos);
		var d = desired.mag();
		var speed = this.maxspeed;
		if (d < 500) {
			speed = map(d, 0, 500, 0, this.maxspeed);
		}
		desired.setMag(speed);
		var seek = p5.Vector.sub(desired, this.vel);
		seek.limit(this.maxacc);
		return seek;
	}
	
	this.flee = function (target) {
		var desired = p5.Vector.sub(target, this.pos);
		var d = desired.mag();
		var speed = 0;
		if (d < 100)
			speed = map(d, 0, 100, 0, this.maxspeed);
		desired.setMag(speed);
		desired.mult(-10);
		var seek = p5.Vector.sub(desired, this.vel);
		seek.limit(5*this.maxacc);
		return seek;
	}
	
	this.behavior = function () {
		var seek = this.seek(this.target);
		this.applyForce(seek);
		var flee = this.flee(createVector(mouseX, mouseY));
		this.applyForce(flee);
	}
	
}