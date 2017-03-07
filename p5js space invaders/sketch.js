var enemies;
var player;
var grid;

var right = false;
var left = false;

function setup() {
  createCanvas(400, 400);
  
  grid = new Grid(5);
  
  player = new Player();  
  
  enemies = new EnemyList(10);
}

function draw() {
  background(51);
  
  if (right)
	  player.move(1);
  if (left)
	  player.move(-1);
  
  player.show();
  
  enemies.update();
  
  if (player.dead) {
	  textSize(32);
	  text("YOU DIED", 5, height-5);
	  noLoop();
  }
  if (enemies.length == 0) {
	  textSize(32);
	  text("YOU WON", 5, height-5);
	  noLoop();
  }
}

function keyPressed() {
	if (keyCode === LEFT_ARROW)
		left = true;
	if (keyCode === RIGHT_ARROW)
		right = true;
	if (keyCode == UP_ARROW || keyCode === ENTER)
		player.shot();
}
 function keyReleased() {
	if (keyCode === LEFT_ARROW)
		left = false;
	if (keyCode === RIGHT_ARROW)
		right = false;
 }