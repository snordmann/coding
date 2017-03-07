class Player extends Ship {
	constructor() {
		super(grid.getField(floor(grid.w/2), grid.h-2), 3);
	}
	
	move(dx) {
		this.pos.x += dx;
	}
	
	shot() {
		super.shot(-1);
	}
	
	checkHit(list) {
		super.checkHit(list, this);
	}
}