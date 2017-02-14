function Bar (px, py) {
	this.x = px;
	this.y = py;
	
	this.move = function (direction) {
		if (direction == -1) {
			if (this.y + 25 < height){
				this.y += 10;
			}
		} else if (this.y - 25 >= 0){
				this.y -= 10;
		}
	}
	
	this.show = function () {
		rect(this.x, this.y-25, 5, 50);
	}
	
}