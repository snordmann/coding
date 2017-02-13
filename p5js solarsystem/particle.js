function Particle(position, velocity, mass) {
  if(position) {
	this.pos = position;
  }else {
	this.pos = createVector(random(width), random(height));
  }
  if(velocity) {
	this.vel = velocity;
  } else {
	this.vel = createVector(0,0);
  }
  this.acc = createVector(0, 0);
  if(mass) {
	  this.mass = mass;
  } else {
	this.mass = random(1,5);
  }
  this.lastpos = new Array();

  this.crash = false;
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.attract = function(other) {
	  if (p5.Vector.dist(other.pos, this.pos) <= this.mass + other.mass) {
		  if (this.mass <= other.mass) {
			  this.crash = true;
		  } else {
			  other.crash = true;
		  }
	  }
    var force = p5.Vector.sub(other.pos, this.pos);
	var dis = p5.Vector.dist(this.pos, other.pos);
	var strength = grav * other.mass / (dis * dis);
	force.setMag(strength);
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
	stroke(255);
	for (var i = 0; i < this.lastpos.length - 1; i++) {
		line(this.lastpos[i].x, this.lastpos[i].y, this.lastpos[i+1].x, this.lastpos[i+1].y);
	}
	fill(255);
    ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2);
	
	this.lastpos.push(this.pos);
	if(this.lastpos.length > 100) {
		this.lastpos.splice(0,1);
	}
  }
}