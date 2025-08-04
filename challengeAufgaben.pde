//Aufgabe 1.2c

//size(100, 100);
//background(200);
//fill(0);
//circle(width/2, height/2, 70);
//fill(255);
//circle(width/2 - 10 , height/2 - 10, 20);
//circle(width/2 + 10 , height/2 - 10, 20);
//fill(0);
//circle(width/2 - 10 , height/2 - 10, 5);
//circle(width/2 + 10 , height/2 - 10, 5);
//fill(255);
//rect(width/2 - 20, height/2 + 10, 40, 13, 50);
//line(width/2 - 20, height/2 + 16, width/2 + 20, height/2 + 16);
//line(width/2, height/2 + 10, width/2, height/2 + 23);
//line(width/2 - 10, height/2 + 10, width/2 - 10, height/2 + 23);
//line(width/2+ 10, height/2 + 10, width/2 + 10, height/2 + 23);


//Aufgabe 1.2c
//size(100, 100);
//background(0, 0, 255);
//noStroke();
//fill(255, 0, 0);
//circle(width/2, height, width);
//fill(255, 122, 0);
//circle(width/2, height, width-20);
//fill(255, 255, 0);
//circle(width/2, height, width-40);
//fill(0, 0, 255);
//circle(width/2, height, width-60);

//Aufgabe 2.1g
//void setup() {
//  size(100, 100);
//}

//void draw() {
//  background(200);
//  line(mouseX, 0, mouseX, height);
//  line(0, mouseY, width, mouseY);
//}

//Aufgabe 2.1f
//int x = 0;

//void setup() {
//  size(100, 100);
//}

//void draw() {
//  background(0);
//  circle(x % width, mouseY, 30);
//  x++;
//}

//void mousePressed() {
//  fill(255, 0, 0);
//}

//void keyPressed() {
//  fill(255);
//}

//Aufgabe 3.3e
//int x = 0;

//void setup() {
//  size(100, 100);
//}

//void draw() {
//  background(0);
//  stroke(255);
//  line(20, 0, 20, height);
//  line(80, 0, 80, height);
//  if (x >20 && x <80) {
//    fill(255, 0, 0);
//  } else {
//    fill(255);
//  }
//  circle(x, height/2, 20);
//  if ( x > width) {
//    x = 0;
//  }
//  x++;
//}

//Aufgabe 3.6c

//boolean left = false;
//boolean right = false;

//int[] x = new int[3];
//int[] y = new int[3];
//int[] farbe = new int[3];
//int score = 0;
//int life = 3;
//int speed = 1;
//int xSpieler;


//void setup() {
//  size(200, 200);
//  for (int i = 0; i < 3; i++) {
//    x[i] = int (random(width));
//    y[i] = int (random(height));
//    farbe[i] = int (random(255));
//  }
//  xSpieler = width/2 - 20;
//}

//void draw() {
//  background(#18B416);
//  fill(255);
//  textSize(15);
//  textAlign(LEFT);
//  text("Punkte: " + score, 10, 20);
//  textAlign(RIGHT);
//  text("Leben: " + life, width-10, 20);
//  for (int i = 0; i < 3; i++) {
//    y[i]++;
//    fill(farbe[i]);
//    circle(x[i], y[i], 25);
//    if (y[i] > height) {
//      y[i] = 0;
//      x[i] = int (random(width));
//      farbe[i] = int (random(255));
//      life--;
//    }
    
//    if (xSpieler < x[i] && xSpieler + 40 > x[i] && y[i] > height-25) {
//       y[i] = 0;
//      x[i] = int (random(width));
//      farbe[i] = int (random(255));
//      score++;
//    }
//    noStroke();
//    fill(220);
//    rect(xSpieler, height-25, 40, 15);
//    if (xSpieler < 0) xSpieler = 0;
//    if (xSpieler > width-40) xSpieler = width-40;
//    if (left) xSpieler -= speed;
//    if (right) xSpieler +=speed;
//  }
//}

//void keyPressed() {
//  if (keyCode == LEFT) left = true;
//  if (keyCode == RIGHT) right = true;
//}

//void keyReleased() {
//  if (keyCode == LEFT) left = false;
//  if (keyCode == RIGHT) right = false;
//}

//Aufgabe 4.2f
//PVector pos = new PVector(100, 100);
//PVector speed = new PVector(floor(random(-3, 3)), floor(random(-3,3)));
//int factor = 10;
//void reset() {
//  speed = new PVector(floor(random(-3, 3)), floor(random(-3,3)));
//  pos = new PVector(100, 100);
//}

//void setup() {
//  size(200, 200);
//  textAlign(CENTER);
//  textSize(15);
//}

//void draw() {
//  background(0);
//  fill(255);
//  int x = int(speed.x);
//  int y = int(speed.y);
//  text("velocity: ("+x+", "+y+")", 100, 20);
//  text("cursur keys to adjust vector", 100, height -40);
//  text("space to reset", 100, height - 20);
//  fill(255, 255, 0);
//  circle(pos.x, pos.y, 30);
//  stroke(255, 0, 0);
//  line (pos.x, pos.y, pos.x + speed.x*factor, pos.y + speed.y*factor);
//  stroke(0);
//  pos.add(speed);
//  if (pos.x < 15 || pos.x > width -15) {
//    speed.x = -speed.x;
//  }
//  if (pos.y < 15 || pos.y > height -15) {
//    speed.y = -speed.y;
//  }
  
//}
//void keyPressed() {
//  if (key == 32) {
//    reset();
//  }
//  if (keyCode == RIGHT) {
//    speed.x ++;
//  }
//  if (keyCode == LEFT) {
//    speed.x --;
//  }
//  if (keyCode == UP) {
//    speed.y ++;
//  }
//  if (keyCode == DOWN) {
//    speed.y --;
//  }
//  // Wird aufgerufen, wenn eine Taste gedrückt wird
//}

//Aufgabe 5.2j
//void setup() {
// size(100, 100);
// for (int x = 0; x < 100; x +=10) {
//   float y = 100 - (x);
   
//   circle(x, y, 5);
// }
//}

//void draw() {
 
//}

//Aufgabe 5.2jParabal

//void setup() {
// size(100, 100);
// for (int x = 0; x < 100; x +=10) {
//   float y = 100 - (x*x + 2);
//   y = map(y, 0, -10000, 0, 100);
//   circle(x, 100-y, 5);
// }
//}

//void draw() {
 
//}

//Aufgabe 5.3d
//int counter = 0;

//void setup() {
//  size(100, 100);
//}

//void draw() {
//  background(255);
//  for (int i = 0; i < 100; i+=10) {
//    line(0, i + counter, 100, i + counter);
//  }
//  counter++;
//  if (counter > 10) {
//    counter = 0;
//  }
//}

//Aufgabe 5.4g
//int counter = 0;

//void setup() {
//  size(101, 101);
//  for (int i = 0; i < 100; i+=25) {
//    for (int j = 0; j < 100; j+= 25) {
//      if ((i % 2 == 0 && j % 2 ==1) || (i % 2 == 1 && j % 2 ==0)) {
//        fill(255);
//      } else fill(0);
//    rect(i, j , 25, 25);
//    }
//  }
//}

//Aufgabe 6.3b
//int anzahl = 10;
//int diameter = 10;
//PVector[] pos = new PVector[anzahl];
//PVector[] speed = new PVector[anzahl];
//color[] farbe = new color[anzahl];

//void setup() {
//  size(200, 200);  
//  for (int i = 0; i < anzahl; i++) {
//    pos[i] = new PVector(random(diameter/2, width-diameter/2), random(diameter/2, height-diameter/2));
//    speed[i] = new PVector (random(-2,2), random(-2,2));
    
//    farbe[i] = color(random(255), random(255), random(255));
//  }
//}

//void draw() {
// background(0);
//  for (int i = 0; i < anzahl; i++) {
//    fill(farbe[i]);
//   circle(pos[i].x, pos[i].y, diameter);
//   pos[i].add(speed[i]);
//   if (pos[i].x < diameter/2 || pos[i].x > width- diameter/2) {
//     speed[i].x = -speed[i].x;
//   }
//   if (pos[i].y < diameter/2 || pos[i].y > height- diameter/2) {
//     speed[i].y = -speed[i].y;
//   }
// }
 
//}
