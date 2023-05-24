const gravConst = 1;
let pushForce;
let x;
let y;
let m;
let bodies = [];
let refl;
let angle;
let speed1;
let speed2;
let speedB1;
let speedB2;
let checkX;
let checkY;
let backgroundColor = 225;
let slowDown = 100;
let slowDownCheck = false;
let nano;
let score = 0;
let gameState = 0;
let lvl = 0;
let friends = 0;
let enemies = 0;
let hp = 100;
let t0;

function game(){
  nano.physics();
    
  for (i = 0; i < bodies.length; i++) {
    if (dist(bodies[i].x, bodies[i].y, nano.x, nano.y) <= (abs(bodies[i].m) / 2) + 100){ //precollision check
      if (((abs(bodies[i].x - nano.x) <= abs(bodies[i].m / 2) + 70) && (abs(bodies[i].y - nano.y) <= abs(bodies[i].m / 2) + 100))) {
        if(bodies[i].m < 0){
          score++;
        } else {
          hp -= bodies[i].m;
          nano.damage(true);
        }
        bodies[i].kill();
//play slurp.mp3
      }
    }
    if(bodies[i].alive){      
      bodies[i].force = createVector(mouseX - bodies[i].x, mouseY - bodies[i].y);
      bodies[i].force.setMag((gravConst * bodies[i].m) / (max(sq(dist(bodies[i].x, bodies[i].y, mouseX, mouseY)), 15)) * 10);
      bodies[i].newdx = bodies[i].dx;
      bodies[i].newdy = bodies[i].dy;
      bodies[i].newx = bodies[i].x;
      bodies[i].newy = bodies[i].y;
      for (j = 0; j < bodies.length; j++) {
        if(bodies[j].alive && j != i){
          let force = createVector(bodies[j].x - bodies[i].x, bodies[j].y - bodies[i].y);
          force.setMag((gravConst * bodies[j].m * bodies[i].m) / (max(sq(dist(bodies[i].x, bodies[i].y, bodies[j].x, bodies[j].y)),(bodies[i].m + bodies[j].m) / 2) * abs(bodies[i].m)));
          if (dist(bodies[i].x, bodies[i].y, bodies[j].x, bodies[j].y) < (abs(bodies[i].m) + abs(bodies[j].m)) / 2){

            refl = createVector(bodies[j].x - bodies[i].x, bodies[j].y - bodies[i].y);

            let newPos = createVector(bodies[j].x - refl.x, bodies[j].y - refl.y);
            bodies[i].newx = newPos.x;
            bodies[i].newy = newPos.y;

            angle = refl.heading();
            speed1 = createVector(bodies[i].dx, bodies[i].dy);
            speed2 = createVector(bodies[j].dx, bodies[j].dy);
            speed1.rotate(-angle);
            speed2.rotate(-angle);

            speedB1 = speed1.x;
            bodies[i].newdy = speed1.y;
            speedB2 = speed2.x;

            speedB1 = speedB1 + 2 * abs(bodies[j].m) * (speedB2 - speedB1) / (abs(bodies[j].m) + abs(bodies[i].m))

            speed1.x = speedB1;

            speed1.rotate(angle);
            bodies[i].newdx = speed1.x;
            bodies[i].newdy = speed1.y;
          }
          bodies[i].force.add(force);
        }
      }
    }
  }

  if (mouseIsPressed === true && slowDown > 0){

    slowDownCheck = true;

    nano.dx *= 0.97;
    nano.dy *= 0.97;

    slowDown -= 0.02 * bodies.length;

  } else if(!mouseIsPressed) {

    slowDownCheck = false;

    slowDown += 0.2;
    slowDown = constrain(slowDown, 0, 100);
  }

  for (i = 0; i < bodies.length; i++) {
    if(bodies[i].alive){
      bodies[i].dx = bodies[i].newdx;
      bodies[i].dy = bodies[i].newdy;

      bodies[i].x = bodies[i].newx;
      bodies[i].y = bodies[i].newy;

      bodies[i].dx += bodies[i].force.x;
      bodies[i].dy += bodies[i].force.y;

      bodies[i].x += bodies[i].dx;
      bodies[i].y += bodies[i].dy;

      bodies[i].bounce(); //constrain to box
      bodies[i].display();

      if (slowDownCheck) {
        bodies[i].dx *= 0.97;
        bodies[i].dy *= 0.97;
      }
    }
  }
  
  if (slowDownCheck) {
    nano.open();
  } else {
    nano.display();
  }
  
  nano.damage(false);
  
  strokeWeight(2);
  stroke(0);
  fill(255);
  rect(9, height - 31, 202, 22);
  rect(9, height - 61, 202, 22)
  strokeWeight(0);
  fill(0, 255, 0);
  rect(10, height - 30, 2 * slowDown, 20);
  fill(255, 0, 0);
  rect(10, height - 60, 2 * hp, 20);
  
  textSize(20);
  fill(0);
  text('score: ' + score, 221, height - 12);
  text('level: ' + lvl, 221, height - 42)
}

function death(){ //death animation
  
  if (millis() - t0 >= 10000){
    gameState = 4;
  }
   
  fill(145);
  strokeWeight(1);
  stroke(0);
  ellipseMode(CENTER);
  angleMode(RADIANS);
  arc(width/2, 1000, 400, 400, 0, PI);
  
  if(millis() - t0 > 4500){
    fill(lerpColor(color(175), color(35, 219, 248), map(millis() - t0, 500, 4500, 0, 1)));
  } else {
    fill(175);
  }

  ellipse(width/2, 1000, 400, 90)
  
  fill(212);
  strokeWeight(0);
  ellipse(width/2, 997, 150, 27)
  arc(width/2, 997, 150, 150, PI, 0); //bottom half done
  
  fill(145);
  strokeWeight(1);
  if (millis() - t0 < 5000){
    ellipse(width/2, map(millis() - t0, 0, 5000, 400, 993), 300, 68);
    arc(width/2, map(millis() - t0, 0, 5000, 400, 993), 300, 300, PI, 0);
  } else {
    ellipse(width/2, 993, 300, 68);
    arc(width/2, 993, 300, 300, PI, 0); //top half
  }
  
  if (millis() - t0 >= 4500){
    strokeWeight(0);
    fill(35, 219, 248, 45 + 10 * cos(millis() / 50));
    ellipse(750, 1000, 2 * (millis() - t0 - 4500), 0.46 * (millis() - t0 - 4500))
    
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    
    if(millis() - t0 <= 4500){
      textSize(map(millis() - t0, 4500, 9500, 0, 128));
    } else {
      textSize(128);
    }
    
    if(lvl >= 10){
      text("YOU DID IT!", width/2, 450);
    } else {
      text("YOU DIED", width/2, 450); 
    }
  }
}

function preScreen(){
  background(235, 235, 235);
  textSize(110);
  textAlign(CENTER);
  fill(0);
  text("SAVE THE WORLD", width/2, 200);
  
  fill(255, 0, 0);
  if (abs(mouseX - width / 2) <= 200 && abs(mouseY - height + 150) <= 50){
    fill(120, 0, 0); //hover effect
    if (mouseIsPressed){
      gameState = 1;
    }
  }
  strokeWeight(5);
  rect(width/2 - 200, height - 200, 400, 100);
  
  
  textSize(43);
  textAlign(CENTER, TOP);
  fill(0);
  text("You are a nanorobot eating exotic matter in a reactor, without you the plant will detonate! You can nudge the bot and the matter with your mouse, but be warned. For your actions have consequences. Try clicking the mouse to see if that does something.", width/2 - 400, 500, 800);
  
  
  textSize(64);
  textAlign(CENTER, CENTER);
  text("PLAY", width/2, height - 150);
}

function gameSetup(friends, enemies){
  
  randomSeed(millis());
  
  bodies.length = friends + enemies;

  nano = new robot(width/2, height/2);
  
  for (let i = 0; i < friends; i++) {
    m = -1 * random(10, 50);
    
    if(random(0, 10) >= 5){
      x = random(m/2, width/2 - 200);
    } else {
      x = random(width/ 2 + 200, width - m/2);
      y = random(height/ 2 + 200, height - m/2);
    } 
    
    if(random(0, 10) >= 5){
      y = random(m/2, height/2 - 200); 
    } else {
      y = random(height/ 2 + 200, height - m/2);
    }
    
    bodies[i] = new body(x, y, m, random(-1, 1), random(-1, 1));
  }
  
  for (let i = 0; i < enemies; i++) {
    m = random(10, 50);
    
    if(random(0, 10) >= 5){
      x = random(m/2, width/2 - 200);
    } else {
      x = random(width/ 2 + 200, width - m/2);
      y = random(height/ 2 + 200, height - m/2);
    } 
    
    if(random(0, 10) >= 5){
      y = random(m/2, height/2 - 200); 
    } else {
      y = random(height/ 2 + 200, height - m/2);
    } 
    
    
    bodies[i + friends] = new body(x, y, m, random(-1, 1), random(-1, 1));
  }
  
  for (i = 0; i < bodies.length; i++) {
    circle(bodies[i].x, bodies[i].y, abs(bodies[i].m));
  }
  textAlign(LEFT, BOTTOM);
}

function gameOver(){
  strokeWeight(1);
  background(235, 235, 235);
  textSize(110);
  textAlign(CENTER);
  fill(0);
  if(lvl >= 10){
    fill(255, 215, 0);
    text("You saved the world!", width/2, 200);
  } else {
    text("You didn't save the world!", width/2, 200);
  }
  
  
  
  fill(255, 0, 0);
  if (abs(mouseX - width / 2) <= 200 && abs(mouseY - height + 150) <= 50){
    fill(120, 0, 0); //hover effect
    if (mouseIsPressed){
      gameState = 1;
      lvl = 0;
      score = 0;
    }
  }
  strokeWeight(5);
  rect(width/2 - 200, height - 200, 400, 100);
  
  strokeWeight(1);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(64)
  text("SCORE: " + score, width/2, 600);
  text("Level: " + lvl, width/2, 680);
  text("TRY AGAIN", width/2, height - 150);
  
  textSize(40);
  textAlign(LEFT, TOP);
  text("Special thanks to Marcovdt68 for playtesting this game.", 30, 900, 500);
}

function setup() {
  createCanvas(1500, 1500);
  colorMode(RGB);
  t0 = millis();
  //let universe = loadImage('images/universe.jpeg');
}

function draw() {
  //Image(universe, 0, 0);
  background(backgroundColor);
  
  if(hp <= 0){
    gameState = 3;
    hp = 100;
  }
  
  switch(gameState){
    case 0:
      preScreen(); //start menu and explanation
      break;
      
    case 1:
      lvl++;
      hp += 20;
      hp = constrain(hp, 0, 100);
      switch(lvl){
        case 1:
          friends = 5;
          enemies = 0;
          break;
          
        case 2:
          friends = 5;
          enemies = 1;
          break;
        
        default:
          friends = ceil(30 * (1 - pow(2, -0.066 * lvl)));
          enemies = 3 * lvl - 4;         
      }
      
      gameSetup(friends, enemies); //setup for game and next level
      gameState = 2;
      break;
      
    case 2: //the game at level ${lvl}
      game();
      gameState = 1;
      for (let i = 0; i < friends; i++) {
        if (bodies[i].alive){
          if (bodies[i].m < 0){
            gameState = 2;
          }
        }
      }
        
      break;
      
    case 3:
      death(); //game over animation
      break;
      
    case 4:
      gameOver(); //game over screen
      break;
  }
}