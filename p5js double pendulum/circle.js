class Circle {
  constructor (x,y,r,options) {
    var pos = p5.Vector.random2D();
    pos.setMag(25*r);
    pos.x += x;
    pos.y += y;
    this.body = Bodies.circle(pos.x,pos.y,r,options);
    World.add(world, this.body);    
  }
  
  show() {
    ellipse(this.body.position.x, this.body.position.y, this.body.circleRadius*2);
  }
}