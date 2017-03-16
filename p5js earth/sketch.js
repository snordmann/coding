var mapimg; // Das Bild der Karte

// Einige Konstanten, für die Karte
var clat = 0;//Mittelpunkt der Karte
var clon = 0;
var ww = 1024;// Höhe und Weite der Karte
var hh = 512;
var zoom = 1;//Zoomlevel(immer Exponent von 2)

var points = []; // Liste der x,y Koordinaten der Punkte (wird später initialisiert)
var latlons = [["54.009","9.0755","Meldorf"], // Liste der Koordinaten und Weiterleitungen
               ["40.7128","-74.0059","New York"]];

function preload() { // lade das Bild
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/' +
    clat + ',' + clon + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');

}

function mercX(lon) { // Konvertiere Längengrad nach X
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) { // Konvertiere Breitengrad nach Y
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  var c = createCanvas(ww, hh); // Mche ein Canvas, genau so groß wie die Karte
  c.parent("mapArea");
  
  var cx = mercX(clon);
  var cy = mercY(clat);


  latlons.forEach(function(l) { // Berechne 
    var x = mercX(l[1]) - cx;
    var y = mercY(l[0]) - cy;
    points.push([x, y, l[2]]); // Füge Koordinaten zum XY-Array hinzu(spart rechenleistung)
  });
}
function draw() {
  translate(width / 2, height / 2); // Alles in die Mitte verschieben
  imageMode(CENTER);
  image(mapimg, 0, 0);
  noStroke(); //Keine Rahmen anzeigen
  
  points.forEach(function(p) { // Iteriere durch alle Punkte
    var d = floor(dist(mouseX-width/2, mouseY-height/2, p[0], p[1])); //Errechne die Distanz zur Maus
    if (d <= 3) {//Mache den Punkt weiß, wenn der innerhalb des Punkts ist
      fill(255, 255, 255);
    } else {
      fill(255, 0, 0);
    }
    ellipse(p[0], p[1], 6);// Punkt mit Durchmesser 6 = Radius 3
  });

}

function mouseClicked() {
  points.forEach(function(p) { // Falls auf einen Punkt geklickt wurde
    var d = floor(dist(mouseX-width/2, mouseY-height/2, p[0], p[1]));
    if (d <= 3) {
      window.location.href = "#" + p[2];//Weiterleitung auf #Name
    }
  });
}

