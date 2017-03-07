class Grid {
	constructor(scale) {
		this.scale = scale;
		this.w = floor(width/this.scale);
		this.h = floor(height/this.scale);
		this.fields = new Array(this.w * this.h);
		for (var y = 0; y < this.h; y++) {
			for (var x = 0; x < this.w; x++) {
				this.fields[x + this.w * y] = createVector(x, y);
			}
		}
	}
	
	getField(x, y) {
		return this.fields[x + this.w * y];
	}
	
	getPosFromXY(x, y) {
		var CurrentField = this.getField(x, y);
		return getPosFromField(CurrentField);
	}
	
	getPosFromField(field) {
		var x = field.x * this.scale;
		var y = field.y * this.scale;
		return createVector(x, y);
	}
}