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
  colorMode(HSB);
  
  engine = Engine.create({
    constraintIterations: 50,
    positionIterations: 50,
    velocityIterations: 50,
  });  
  world = engine.world;
  
  boxA = Bodies.circle(width/2, height/2, 2,{isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, collisionFilter: 0});
  World.add(world, boxA);
  
  
  var r = height < width ? height/4 : width/4;
  r -= 2;
  boxB = new Circle(width/2, height/2, r,{ inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0},50);
  boxC = new Circle(boxB.body.position.x, boxB.body.position.y, r,{ inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0},50);
  
  
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
}

function draw() {
  background(26);
  
  stroke(255);
  ellipse(boxA.position.x, boxA.position.y, boxA.circleRadius*2);
  boxB.show();
  boxC.show();
  line(boxA.position.x, boxA.position.y, boxB.body.position.x, boxB.body.position.y);
  line(boxB.body.position.x, boxB.body.position.y, boxC.body.position.x, boxC.body.position.y);
  
  for (var i = 0; i < path.length-1; i++) {
    var hu = map(i, 0, 1200, 0, 360);
    stroke(hu, 255, 255);
    line(path[i].x,path[i].y, path[i+1].x, path[i+1].y);
  }  
  path.push(createVector(boxC.body.position.x, boxC.body.position.y));
  // path.push(createVector(boxB.body.position.x, boxB.body.position.y));
  
  if(frameCount > 1200)
    window.location.reload();
}