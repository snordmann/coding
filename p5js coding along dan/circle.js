function Circle (r, p, s) {
	this.radius = r;
	this.children = undefined;
	this.middle = p;
	this.point = createVector(0, 0);
	this.angle = -PI/2;
	this.speed = s;
	
	this.rotate = function () {
		this.angle += this.speed;
		var x = this.middle.x + this.radius * cos(this.angle);
		var y = this.middle.y + this.radius * sin(this.angle);
		this.point = createVector(x,y);
		if (this.children !== undefined) {
			this.children.middle = this.point;
			this.children.middle.x += this.children.radius * cos(this.angle);
			this.children.middle.y += this.children.radius * sin(this.angle);
			this.children.rotate();
		}
	}
	this.addChildren = function() {
		if (this.children !== undefined) {
			this.children.addChildren();
		} else {
			this.children = new Circle(this.radius/2, createVector(this.point.x, this.point.y-this.radius), k * this.speed);
		}
	}
	
	this.show = function () {
		if (this.children !== undefined) {
			this.children.show();
		} else {
			path.push(this.point);
		}
		if (!onlyPath) {
			stroke(255);
			noFill();
			ellipse(this.middle.x, this.middle.y, this.radius*2, this.radius*2);
		}
	}
}