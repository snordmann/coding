var last = [];
var maxi = 100000000000;
var it = 1;
var x = 0;
var piline;

function isCoprime(a, b) {
    var t;
    while(b != 0){
        t = a;
        a = b;
        b = t % b;
    }
    return a == 1;
}

function setup() {
  createCanvas(400, 400);    
  piline = map(PI, 0, TWO_PI, -height/2, height/2);  
  noFill();
}

function draw() {
  background(51);
  
  translate(0, height/2);
  
  var nr1 = ceil(random(0, maxi));
  var nr2 = ceil(random(0, maxi));
  var ret = false;
  
  if (isCoprime(nr1, nr2)) {
    x += 1;
  }
  
  last.push(sqrt(6/(x/it)));
  
  if (last.length > width) {
    last.splice(0, 1);
  }
  
  stroke(255);  
  line(0,piline, width,piline);
  stroke(0,255,0);
  beginShape();
  last.forEach(function(l, i) {
    var t = map(l, 0, TWO_PI, -height/2, height/2);
    vertex(i, t);
  });
  endShape();
  
  it += 1;
}