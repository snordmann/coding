class Ship {
	constructor(field, lifes) {
		this.pos = createVector(field.x, field.y);
		this.projectiles =  [];
		this.lifes = lifes;
		this.dead = false;
		this.radius = 4;
	}
	
	move(dx, dy) {
		this.pos.add(createVector(dx, dy));
	}
	
	shot(dy) {
		this.projectiles.push(new Projectile(this.pos, dy));
	}
	
	hit() {
		this.lifes -= 1;
		if (this.lifes <= 0) {
			this.dead = true;
		}
	}
	
	checkHit(list, target) {
		for (var i = list.length-1; i >= 0; i--) {
			var targetPos = grid.getPosFromField(target.pos);
			var listPos = grid.getPosFromField(list[i].pos);
			var distance = p5.Vector.dist(listPos, targetPos);
			if (distance < grid.scale) {
				target.hit();
				list.splice(i, 1);
			}
		}
	}
	
	show() {
		stroke(255);
		var pos = grid.getPosFromField(this.pos);
		rect(pos.x, pos.y, grid.scale, grid.scale);
		
		for (var i = this.projectiles.length-1; i >= 0; i--) {
			this.projectiles[i].update();
			this.projectiles[i].show();
			if (this.projectiles[i].offScreen)
				this.projectiles.splice(i, 1);
		}
	}
}