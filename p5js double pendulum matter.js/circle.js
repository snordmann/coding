class Circle {
  constructor (x,y,r,options) {
    var deg = random(PI, TWO_PI);
    var pos = p5.Vector.fromAngle(deg);
    // var pos = p5.Vector.random2D();
    pos.setMag(r);
    pos.x += x;
    pos.y += y;
    this.body = Bodies.circle(pos.x,pos.y,5,options);
    World.add(world, this.body);    
  }
  
  show() {
    ellipse(this.body.position.x, this.body.position.y, this.body.circleRadius*2);
  }
}