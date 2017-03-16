var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;

var points = [];
var latlons = [["54.009","9.0755","Meldorf"],
               ["40.7128","-74.0059","New York"]];

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/' +
    clat + ',' + clon + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');

}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(ww, hh);

  var cx = mercX(clon);
  var cy = mercY(clat);


  latlons.forEach(function(l) {
    var x = mercX(l[1]) - cx;
    var y = mercY(l[0]) - cy;
    points.push([x, y, l[2]]);
  });
}
function draw() {
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  noStroke();
  
  points.forEach(function(p) {
    var d = floor(dist(mouseX-width/2, mouseY-height/2, p[0], p[1]));
    console.log(d);
    if (d <= 3) {
      fill(255, 255, 255);
    } else {
      fill(255, 0, 0);
    }
    ellipse(p[0], p[1], 6, 6);
  });

}

function mouseClicked() {
  points.forEach(function(p) {
    var d = floor(dist(mouseX-width/2, mouseY-height/2, p[0], p[1]));
    if (d <= 3) {
      window.location.href = "#" + p[2];
    }
  });
}

