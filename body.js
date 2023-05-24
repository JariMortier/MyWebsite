class body {
    constructor(x, y, m, dx, dy) {
      this.x = x;
      this.y = y;
      this.m = m;
      this.dx = dx;
      this.dy = dy;
      this.force = 0;
      this.newdx = 0;
      this.newdy = 0;
      this.newx = 0;
      this.newy = 0;
      this.alive = true;
    }
    
    display(){
      if(this.alive){
        if(this.m > 0){
          fill(lerpColor(color(0, 0, 255),color(0, 0, 0),sqrt(sq(this.dx) + sq(this.dy)) / 20));
        } else {
          fill(lerpColor(color(0, 255, 255),color(255, 255, 255),sqrt(sq(this.dx) + sq(this.dy)) / 20));
        }
        strokeWeight(3);
        stroke(0);
        circle(this.x, this.y, abs(this.m));
      }
    }
    
    bounce(){
      if(this.alive){
        if (this.x <= abs(this.m) / 2 || this.x >= width - abs(this.m) / 2) {
          this.dx *= -1;
        }
      if (this.y <= abs(this.m) / 2 || this.y >= height - abs(this.m) / 2) {
        this.dy *= -1;
        }
        this.x = constrain(this.x, abs(this.m) / 2, width - abs(this.m) / 2);
        this.y = constrain(this.y, abs(this.m) / 2, height - abs(this.m) / 2);
      }
    }
    
    kill(){
      this.alive = false;
      this.x = 0;
      this.y = 0;
      this.m = 5;
      this.dx = 0;
      this.dy = 0;
      this.force = 0;
      this.newdx = 0;
      this.newdy = 0;
      this.newx = 0;
      this.newy = 0;
      //play sound effect
    }
  }