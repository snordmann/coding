float angle = 0;
float radius = 200;

Table table;
PImage earth;
PShape globe;

void setup() {
  size(600,600,P3D);
  table = loadTable("all_month.csv", "header");  
  earth = loadImage("earth.jpg");
  
  noStroke();
  globe = createShape(SPHERE, radius);
  //globe.setTexture(earth);
}

void draw() {
  background(51);
  
  translate(0.5*width, 0.5*height);
  rotateY(angle);
  angle += 0.01;
  
  for (TableRow row : table.rows()) {
    float lat = row.getFloat(1);
    float lon = row.getFloat(2);
    float mag = row.getFloat(4);
    
    float x = tox(lat,lon);
    float y = toy(lat,lon);
    float z = toz(lat);
    
    PVector pos = new PVector(x,y,z);
    PVector xnorm = new PVector(1,0,0);
    
    float angleb = PVector.angleBetween(xnorm, pos);
    PVector raxis = xnorm.cross(pos);
    
    float h = map(mag, 0, 10, 10, 100);
    
    pushMatrix();
    translate(x,y,z);
    rotate(angleb, raxis.x, raxis.y, raxis.z);
    box(h, 5, 5);    
    popMatrix();
  }
  
  lights();
  shape(globe);
  
}

float tox (float lat, float lon) {
  return radius * sin(lat) * cos(lon);
}
float toy (float lat, float lon) {
  return radius * sin(lat) * sin(lon);
}
float toz (float lat) {
  return radius * cos (lat);
}