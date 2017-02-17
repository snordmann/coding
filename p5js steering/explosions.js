function Explosion (x, y, hu,initialx, initialy) {
	this.pos = createVector(x,y);
	this.lastpos = createVector(x,y);
	this.vel = createVector(initialx + random(-0.75,0.75), initialy + random(-0.75,0.75));
	this.vel.mult(random(2,5));
	this.acc = createVector(0,0);
	this.ended = false;
	this.lifetime = 255;
	this.hu = random(hu - 15, hu + 15);
	
	this.applyForce = function (force) {
		this.acc.add(force);
	}
	
	this.updateLast = function () {
		this.lastpos = this.pos.copy();
	}
	
	this.update = function () {
		if (this.lifetime <= 0) {
			this.ended = true;
		}		
		
		this.applyForce(gravity);
		this.vel.add(this.acc);
		this.pos.add(this.vel); 		
		this.updateLast();
		this.acc.mult(0);
		
		this.lifetime -= 2.5;
	}
	
	this.show = function () {
		stroke(this.hu, 255, this.lifetime);
		strokeWeight(random(this.lifetime/125, this.lifetime/45));
		line(this.pos.x, this.pos.y, this.lastpos.x, this.lastpos.y);
	}
	
}