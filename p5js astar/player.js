function Player() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = p5.Vector.random2D();
	// this.vel = createVector(1,0);
	this.vel.mult(5);
	this.winner = undefined;
	this.lastpos = undefined;
	
	this.update = function() {
		if (this.pos.y > height || this.pos.y < 0) {
			this.vel.y *= -1;
		} 
		
		this.bars(bar1);
		this.bars(bar2);
		
		if (this.pos.x < 0) {
			// Bar 2 scores
			this.winner = 2;
		} else if (this.pos.x > width) {
			// Bar 1 scores
			this.winner = 1;
		}
		
		this.pos.add(this.vel);
		
	}
	
	this.bars = function (bar) {
		if (floor(this.pos.y) > floor(bar.y - 50) && floor(this.pos.y) < floor(bar.y + 50)) {
			if (floor(this.pos.x) <= floor(bar.x + 6.5) && floor(this.pos.x) >= floor(bar.x)) {
				this.vel.x *= -1;
				this.vel.mult(1.05);
			}
		}
	}
	
	this.show = function() {
		fill(255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 8, 8);
	}
}