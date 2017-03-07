class Enemy extends Ship {
	constructor(x, y) {
		super(grid.getField(x, y), 1);
	}
}