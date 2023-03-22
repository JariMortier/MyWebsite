function setup() {
  createCanvas(1000, 1000);
}

function egg(x, y) {
  fill(235);
  strokeWeight(3);
  stroke(0);

  ellipse(x, y, 140, 200);
  angleMode(RADIANS);
  arc(x, y, 16, 200, QUARTER_PI, -3 * HALF_PI);
  arc(x, y, 140, 40, 0, PI);

  strokeWeight(2);
  circle(x + 9, y, 22);
  strokeWeight(1);
  circle(x - 15, y - 33, 20);
  circle(x + 29, y - 33, 20);

  push();
  fill(128);
  angleMode(DEGREES);
  translate(x - 31, y - 68);
  rotate(-8);
  ellipse(0, 0, 12, 10);
  pop();

  push();
  fill(128);
  translate(x + 39, y - 69);
  rotate(18);
  ellipse(0, 0, 11, 9);
  pop();
}

function openEgg(x, y) {
  //Right casing
  fill(235);
  strokeWeight(3);
  stroke(0);
  angleMode(RADIANS);

  arc(x + 18.8, y, 146, 200, 0, HALF_PI);
  angleMode(DEGREES);
  arc(x + 18.8, y, 146, 39.6, -119.3, 60.7);

  fill(207);
  arc(x + 18.8, y, 21.9, 200, 60.7, -119.3);
  line(x + 7.8, y - 19.4, x + 29.7, y + 19.7);

  //Foot
  strokeWeight(0);
  angleMode(RADIANS);
  fill(194);

  rect(x - 7.5, y + 56, 10.4, 52.2);
  rect(x - 9, y + 16, 13.5, 40);

  fill(166);

  arc(x - 2.2, y + 110, 37, 32, PI, 0);
  rect(x + 1.9, y + 56, 1, 52.2);
  rect(x + 2.9, y + 16, 1.5, 40);

  //Left casing
  strokeWeight(3);
  fill(235);

  arc(x - 21.7, y, 140, 200, HALF_PI, PI);
  angleMode(DEGREES);
  arc(x - 22, y, 22, 200, 60.7, 90);
  arc(x - 21.7, y, 140, 39.6, 60.7, -119.3);
  line(x - 33, y - 19.4, x - 11, y + 19.7);

  //Head
  fill(235);
  strokeWeight(3);
  stroke(0);
  angleMode(RADIANS);

  arc(x, y, 140, 200, PI, 0);
  arc(x, y, 140, 40, 0, PI);

  strokeWeight(2);
  fill(194);

  circle(x + 9, y, 22);

  strokeWeight(1);
  fill(255, 51, 51);
  arc(x - 15, y - 33, 20, 20, 0, 3 * HALF_PI, CHORD);
  arc(x + 29, y - 33, 20, 20, -HALF_PI, PI, CHORD);

  push();
  fill(128);
  angleMode(DEGREES);
  translate(x - 31, y - 68);
  rotate(-8);
  ellipse(0, 0, 12, 10);
  pop();

  push();
  fill(128);
  translate(x + 39, y - 69);
  rotate(18);
  ellipse(0, 0, 11, 9);
  pop();

  stroke(158);
  strokeWeight(4);

  line(x + 38, y - 67, x + 54, y - 96);
  line(x - 29, y - 66, x - 50, y - 94);

  strokeWeight(0);
  fill(51, 51, 255);
  circle(x + 54, y - 96, 10);
  circle(x - 50, y - 94, 10);
}

let x = 100;
let dx = 0;
let y = 110;
let dy = 0;
let pushConst = 150;
let pushForce = 1;

function draw() {
  background(0, 236, 250);
  pushForce = createVector(mouseX - x, mouseY - y);
  pushForce.setMag(pushConst / max(sq(dist(x, y, mouseX, mouseY) / 8), 6));
  dx += pushForce.x;
  dy += pushForce.y;
  x += dx;
  y += dy;

  if (mouseIsPressed) {
    dx *= 0.95;
    dy *= 0.95;
    
    if (x <= 92 || x >= width - 92) {
      dx *= -1;
    }
    if (y <= 100 || y >= height - 110) {
      dy *= -1;
    }

    x = constrain(x, 92, width - 92);
    y = constrain(y, 100, height - 110);
    
    openEgg(x, y);
  } else {
    
    if (x <= 70 || x >= width - 70) {
      dx *= -1;
    }
    if (y <= 100 || y >= height - 100) {
      dy *= -1;
    }

    x = constrain(x, 70, width - 70);
    y = constrain(y, 100, height - 100);
    
    egg(x, y);
  }
}
