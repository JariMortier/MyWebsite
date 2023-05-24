class robot{
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
    }
    
    physics(){
      pushForce = createVector(mouseX - this.x, mouseY - this.y);
      pushForce.setMag(gravConst * 80 / max(sq(dist(this.x, this.y, mouseX, mouseY) / 8), 6));
      this.dx += pushForce.x;
      this.dy += pushForce.y;
      this.x += this.dx;
      this.y += this.dy;
    }
    
    display() {
      fill(235);
      strokeWeight(3);
      stroke(0);
  
      ellipse(this.x, this.y, 140, 200);
      angleMode(RADIANS);
      arc(this.x, this.y, 16, 200, QUARTER_PI, -3 * HALF_PI);
      arc(this.x, this.y, 140, 40, 0, PI);
  
      strokeWeight(2);
      circle(this.x + 9, this.y, 22);
      strokeWeight(1);
      circle(this.x - 15, this.y - 33, 20);
      circle(this.x + 29, this.y - 33, 20);
  
      push();
      fill(128);
      angleMode(DEGREES);
      translate(this.x - 31, this.y - 68);
      rotate(-8);
      ellipse(0, 0, 12, 10);
      pop();
  
      push();
      fill(128);
      translate(this.x + 39, this.y - 69);
      rotate(18);
      ellipse(0, 0, 11, 9);
      pop();
      
      if (this.x <= 70 || this.x >= width - 70) {
        this.dx *= -1;
      }
      if (this.y <= 100 || this.y >= height - 100) {
        this.dy *= -1;
      }
  
      this.x = constrain(this.x, 70, width - 70);
      this.y = constrain(this.y, 100, height - 100);
    }
    
    open() {
      //Right casing
      fill(235);
      strokeWeight(3);
      stroke(0);
      angleMode(RADIANS);
  
      arc(this.x + 18.8, this.y, 146, 200, 0, HALF_PI);
      angleMode(DEGREES);
      arc(this.x + 18.8, this.y, 146, 39.6, -119.3, 60.7);
  
      fill(207);
      arc(this.x + 18.8, this.y, 21.9, 200, 60.7, -119.3);
      line(this.x + 7.8, this.y - 19.4, this.x + 29.7, this.y + 19.7);
  
      //Foot
      strokeWeight(0);
      angleMode(RADIANS);
      fill(194);
  
      rect(this.x - 7.5, this.y + 56, 10.4, 52.2);
      rect(this.x - 9, this.y + 16, 13.5, 40);
  
      fill(166);
  
      arc(this.x - 2.2, this.y + 110, 37, 32, PI, 0);
      rect(this.x + 1.9, this.y + 56, 1, 52.2);
      rect(this.x + 2.9, this.y + 16, 1.5, 40);
  
      //Left casing
      strokeWeight(3);
      fill(235);
  
      arc(this.x - 21.7, this.y, 140, 200, HALF_PI, PI);
      angleMode(DEGREES);
      arc(this.x - 22, this.y, 22, 200, 60.7, 90);
      arc(this.x - 21.7, this.y, 140, 39.6, 60.7, -119.3);
      line(this.x - 33, this.y - 19.4, this.x - 11, this.y + 19.7);
  
      //Head
      fill(235);
      strokeWeight(3);
      stroke(0);
      angleMode(RADIANS);
  
      arc(this.x, this.y, 140, 200, PI, 0);
      arc(this.x, this.y, 140, 40, 0, PI);
  
      strokeWeight(2);
      fill(194);
  
      circle(this.x + 9, this.y, 22);
  
      strokeWeight(1);
      fill(255, 51, 51);
      arc(this.x - 15, this.y - 33, 20, 20, 0, 3 * HALF_PI, CHORD);
      arc(this.x + 29, this.y - 33, 20, 20, -HALF_PI, PI, CHORD);
  
      push();
      fill(128);
      angleMode(DEGREES);
      translate(this.x - 31, this.y - 68);
      rotate(-8);
      ellipse(0, 0, 12, 10);
      pop();
  
      push();
      fill(128);
      translate(this.x + 39, this.y - 69);
      rotate(18);
      ellipse(0, 0, 11, 9);
      pop();
  
      stroke(158);
      strokeWeight(4);
  
      line(this.x + 38, this.y - 67, this.x + 54, this.y - 96);
      line(this.x - 29, this.y - 66, this.x - 50, this.y - 94);
  
      strokeWeight(0);
      fill(51, 51, 255);
      circle(this.x + 54, this.y - 96, 10);
      circle(this.x - 50, this.y - 94, 10);
      
      if (this.x <= 92 || this.x >= width - 92) {
        this.dx *= -1;
      }
      if (this.y <= 100 || this.y >= height - 110) {
        this.dy *= -1;
      }
  
      this.x = constrain(this.x, 92, width - 92);
      this.y = constrain(this.y, 100, height - 110);
    }
    
    damage(n){
      if (n){
        t0 = millis();
      }
      fill(255, 0, 0, map(millis() - t0, 0, 200, 255, 0));
      strokeWeight(0);
      if (millis() - t0 <= 200){
        ellipse(this.x, this.y, 160, 220);
      }
    }
  }