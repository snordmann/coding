class Projectile {
	constructor(origin, dy) {
		this.pos = origin.copy();
		this.vel = dy;
		this.offScreen = false;
		this.radius = 2;
	}
	
	update() {
		this.pos.y += this.vel;
		if (this.pos.x < 0 ||
			this.pos.x > grid.w ||
			this.pos.y < 0 ||
			this.pos.y > grid.h) {
				this.offScreen = true;
			}
	}
	
	show() {
		stroke(255);
		fill(255);
		var pos = grid.getPosFromField(this.pos);
		rect(pos.x, pos.y, grid.scale, grid.scale);
	}
}