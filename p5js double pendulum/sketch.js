var Engine = Matter.Engine, // aliases for simpler Code
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxA, boxB, boxC;
var constraint;

var path = [];
function setup() {
  createCanvas(windowWidth, windowHeight);  
  engine = Engine.create();  
  world = engine.world;
  
  boxA = Bodies.circle(width/2, height/2, 2,{isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, collisionFilter: 0});
  World.add(world, boxA);
  
  boxB = new Circle(width/2, height/2, 5,{friction: 0, frictionAir: 0, frictionStatic: 0});
  boxC = new Circle(boxB.body.position.x, boxB.body.position.y, 5,{friction: 0, frictionAir: 0, frictionStatic: 0});
  
  
  constraint = Matter.Constraint.create({
    bodyA: boxA,
    bodyB: boxB.body,
    stiffness: 1,
  });
  World.add(world, constraint);
  
  constraint = Matter.Constraint.create({
    bodyA: boxB.body,
    bodyB: boxC.body,
    stiffness: 1,
  });
  World.add(world, constraint);
  
  
  Engine.run(engine);
  noFill();
  stroke(255);
}

function draw() {
  background(51);
  
  ellipse(boxA.position.x, boxA.position.y, boxA.circleRadius*2);
  boxB.show();
  boxC.show();
  line(boxA.position.x, boxA.position.y, boxB.body.position.x, boxB.body.position.y);
  line(boxB.body.position.x, boxB.body.position.y, boxC.body.position.x, boxC.body.position.y);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].x,path[i].y);
  }
  endShape();
  path.push(createVector(boxC.body.position.x, boxC.body.position.y));
  
  if(frameCount > 1200)
    window.location.reload();
}