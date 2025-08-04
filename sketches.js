function autoResizeCanvas(p) {
  setTimeout(() => {
    const canvas = p.canvas;
    if (canvas) {
      const width = canvas.offsetWidth || p.width;
      const height = canvas.offsetHeight || p.height;

      window.parent.postMessage(
        {
          type: "resize-iframe",
          width,
          height,
        },
        "*"
      );
    }
  }, 50); // Verzögerung, damit Canvas wirklich da ist
}

//Challenge Kap 4
function sketchVectorChallenge(p) {
  let pos = new p5.Vector(100, 100); // Position des Kreises
  let speed = new p5.Vector(
    Math.floor(p.random(-3, 3)),
    Math.floor(p.random(-3, 3))
  ); // Geschwindigkeit
  const factor = 10; // Faktor für die Darstellung der Geschwindigkeit

  function reset() {
    speed = new p5.Vector(
      Math.floor(p.random(-3, 3)),
      Math.floor(p.random(-3, 3))
    );
    pos = new p5.Vector(100, 100);
  }

  p.setup = () => {
    p.createCanvas(200, 200);
    p.textAlign(p.CENTER);
    p.textSize(15);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(0); // Hintergrundfarbe
    p.fill(255);
    const x = Math.floor(speed.x);
    const y = Math.floor(speed.y);
    p.text("velocity: (" + x + ", " + y + ")", 100, 20);
    p.text("cursur keys to adjust vector", 100, p.height - 40);
    p.text("space to reset", 100, p.height - 20);

    p.fill(255, 255, 0);
    p.circle(pos.x, pos.y, 30); // Zeichne den Kreis
    p.stroke(255, 0, 0);
    p.line(pos.x, pos.y, pos.x + speed.x * factor, pos.y + speed.y * factor); // Zeichne die Geschwindigkeit

    p.stroke(0);
    pos.add(speed); // Aktualisiere die Position

    // Begrenzungen für den Kreis
    if (pos.x < 15 || pos.x > p.width - 15) {
      speed.x = -speed.x; // Richtungswechsel bei Kollision mit der Wand
    }
    if (pos.y < 15 || pos.y > p.height - 15) {
      speed.y = -speed.y; // Richtungswechsel bei Kollision mit der Wand
    }

    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.keyPressed = () => {
    if (p.key === " ") {
      reset(); // Zurücksetzen bei Leertaste
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      speed.x++; // Erhöhe die x-Geschwindigkeit
    }
    if (p.keyCode === p.LEFT_ARROW) {
      speed.x--; // Verringere die x-Geschwindigkeit
    }
    if (p.keyCode === p.UP_ARROW) {
      speed.y++; // Erhöhe die y-Geschwindigkeit
    }
    if (p.keyCode === p.DOWN_ARROW) {
      speed.y--; // Verringere die y-Geschwindigkeit
    }
  };
}

//Challenge Kap 3 Raincatcher
function sketchRaincatcher(p) {
  let left = false;
  let right = false;

  let xBalls = new Array(3); // Array für die x-Positionen der Bälle
  let yBalls = new Array(3); // Array für die y-Positionen der Bälle
  let farbe = new Array(3); // Array für die Farben der Bälle
  let score = 0; // Punktestand
  let life = 3; // Leben des Spielers
  let speed = 2; // Geschwindigkeit des Spielers
  let xSpieler; // x-Position des Spielers

  p.setup = () => {
    p.createCanvas(200, 200);
    for (let i = 0; i < 3; i++) {
      xBalls[i] = p.floor(p.random(p.width)); // Zufällige x-Position
      yBalls[i] = p.floor(p.random(p.height)); // Zufällige y-Position
      farbe[i] = p.floor(p.random(255)); // Zufällige Farbe
    }
    xSpieler = p.width / 2 - 20; // Spielerposition in der Mitte
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(24, 180, 22); // Hintergrundfarbe
    p.fill(255);
    p.textSize(15);
    p.textAlign(p.LEFT);
    p.text("Punkte: " + score, 10, 20);
    p.textAlign(p.RIGHT);
    p.text("Leben: " + life, p.width - 10, 20);

    for (let i = 0; i < 3; i++) {
      yBalls[i]++; // Erhöhe die y-Position
      p.fill(farbe[i]);
      p.circle(xBalls[i], yBalls[i], 25); // Zeichne den Ball

      // Wenn der Ball den unteren Rand erreicht
      if (yBalls[i] > p.height) {
        yBalls[i] = 0; // Setze den Ball zurück
        xBalls[i] = p.floor(p.random(p.width)); // Neue zufällige x-Position
        farbe[i] = p.floor(p.random(255)); // Neue zufällige Farbe
        life--; // Leben verringern
      }

      // Überprüfe, ob der Spieler den Ball fängt
      if (
        xSpieler < xBalls[i] &&
        xSpieler + 40 > xBalls[i] &&
        yBalls[i] > p.height - 25
      ) {
        yBalls[i] = 0; // Setze den Ball zurück
        xBalls[i] = p.floor(p.random(p.width)); // Neue zufällige x-Position
        farbe[i] = p.floor(p.random(255)); // Neue zufällige Farbe
        score++; // Punkte erhöhen
      }
    }

    p.noStroke();
    p.fill(220);
    p.rect(xSpieler, p.height - 25, 40, 15); // Zeichne den Spieler

    // Begrenzungen für den Spieler
    if (xSpieler < 0) xSpieler = 0;
    if (xSpieler > p.width - 40) xSpieler = p.width - 40;

    // Bewegung des Spielers
    if (left) xSpieler -= speed;
    if (right) xSpieler += speed;
  };

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) left = true; // Linke Taste gedrückt
    if (p.keyCode === p.RIGHT_ARROW) right = true; // Rechte Taste gedrückt
  };

  p.keyReleased = () => {
    if (p.keyCode === p.LEFT_ARROW) left = false; // Linke Taste losgelassen
    if (p.keyCode === p.RIGHT_ARROW) right = false; // Rechte Taste losgelassen
  };
}

// Challenge Kap 3

function sketchMovingRedCircle(p) {
  let x = 0; // Variable für die x-Position des Kreises
  p.setup = () => {
    p.createCanvas(100, 100);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(0); // Hintergrundfarbe
    p.stroke(255); // Weiße Linien

    // Zeichne vertikale Linien
    p.line(20, 0, 20, p.height);
    p.line(80, 0, 80, p.height);

    // Bestimme die Füllfarbe des Kreises
    if (x > 20 && x < 80) {
      p.fill(255, 0, 0); // Rot, wenn zwischen den Linien
    } else {
      p.fill(255); // Weiß, wenn außerhalb
    }

    // Zeichne den Kreis
    p.circle(x, p.height / 2, 20);

    // Setze x zurück, wenn es den rechten Rand überschreitet
    if (x > p.width) {
      x = 0;
    }
    x++; // Erhöhe die x-Position
  };
}

//Challenges Kap 2 b

function sketchMovingCircle(p) {
  let circleColor = [255]; // Standardfarbe des Kreises
  let x = 0;
  p.setup = () => {
    p.createCanvas(100, 100);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(0); // Hintergrundfarbe

    // Setze die Füllfarbe und zeichne den Kreis
    p.fill(circleColor);
    p.circle(x % p.width, p.mouseY, 30);
    x++; // Erhöhe die x-Position
  };

  p.mousePressed = () => {
    circleColor = [255, 0, 0]; // Ändere die Farbe zu Rot
  };

  p.keyPressed = () => {
    circleColor = [255]; // Setze die Farbe zurück zu Weiß
  };
}

//Challenges Kap 2
function sketchMouseLines(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(200); // Hintergrundfarbe

    // Vertikale Linie
    p.line(p.mouseX, 0, p.mouseX, p.height);
    // Horizontale Linie
    p.line(0, p.mouseY, p.width, p.mouseY);
  };
}

function sketchRainbow(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background(0, 0, 255); // Blauer Hintergrund
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.noStroke(); // Keine Umrandung

    // Rote Ellipse
    p.fill(255, 0, 0);
    p.circle(p.width / 2, p.height, p.width); // Vollständige Breite

    // Orange Ellipse
    p.fill(255, 122, 0);
    p.circle(p.width / 2, p.height, p.width - 20); // Breite - 20

    // Gelbe Ellipse
    p.fill(255, 255, 0);
    p.circle(p.width / 2, p.height, p.width - 40); // Breite - 40

    // Blaue Ellipse
    p.fill(0, 0, 255);
    p.circle(p.width / 2, p.height, p.width - 60); // Breite - 60
  };
}

function sketchMatrix(p) {
  p.setup = () => {
    p.createCanvas(400, 400);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    let cols = 5; // Anzahl der Spalten
    let rows = 5; // Anzahl der Zeilen
    let w = 60; // Breite der Rechtecke
    let h = 60; // Höhe der Rechtecke

    // Zeichne eine Matrix von Rechtecken
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        p.rect(j * w, i * h, w, h); // Rechteck zeichnen
      }
    }
  };
}

function sketchFace(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background(200); // Hintergrundfarbe
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.fill(0); // Schwarze Farbe für das Gesicht
    p.circle(p.width / 2, p.height / 2, 70); // Gesicht

    p.fill(255); // Weiße Farbe für die Augen
    p.circle(p.width / 2 - 10, p.height / 2 - 10, 20); // Linkes Auge
    p.circle(p.width / 2 + 10, p.height / 2 - 10, 20); // Rechtes Auge

    p.fill(0); // Schwarze Pupillen
    p.circle(p.width / 2 - 10, p.height / 2 - 10, 5); // Linke Pupille
    p.circle(p.width / 2 + 10, p.height / 2 - 10, 5); // Rechte Pupille

    p.fill(255); // Weiße Farbe für den Mund
    p.rect(p.width / 2 - 20, p.height / 2 + 10, 40, 13, 50); // Mund
    p.line(
      p.width / 2 - 20,
      p.height / 2 + 16,
      p.width / 2 + 20,
      p.height / 2 + 16
    ); // Mundlinie
    p.line(p.width / 2, p.height / 2 + 10, p.width / 2, p.height / 2 + 23); // Mittellinie
    p.line(
      p.width / 2 - 10,
      p.height / 2 + 10,
      p.width / 2 - 10,
      p.height / 2 + 23
    ); // Linke Linie
    p.line(
      p.width / 2 + 10,
      p.height / 2 + 10,
      p.width / 2 + 10,
      p.height / 2 + 23
    ); // Rechte Linie
  };
}

function sketchThreeRectangles(p) {
  let x = 0;

  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);

    // Zeichne drei Rechtecke, i läuft von 1..3
    for (let i = 1; i <= 3; i++) {
      p.rect(x, i * 20, 10, 10); // jedes hat eine andere y-Position
    }

    // Passe x-Wert an für Animation
    x++;
  };
}

function sketchFlyingRectangle(p) {
  let x = 0;

  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);

    // Zeichne "Rechteck" mit Linien
    for (let i = 0; i < 20; i++) {
      p.stroke(i * 10); // lege Graustufe fest
      p.line(x + i, 40, x + i, 60); // Zeichne Linien, um ein Rechteck zu simulieren
    }

    // Bewege Rechteck
    x++;
  };
}

// Sketch für die While-Schleife
function sketchWhileLoop(p) {
  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
    let count = 0; // Verwendung von let

    while (count < 5) {
      p.text("Zähler: " + count, 10, 30 * (count + 1)); // Ergebnisse sichtbar machen
      count++; // Schleifenschritt
    }
  };

  p.draw = () => {
    // Leere draw-Funktion, da wir nur einmal im Setup zeichnen
  };
}

// Sketch für die For-Schleife
function sketchForLoop(p) {
  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255); // Hintergrund löschen
    for (let i = 0; i < 5; i++) {
      // Verwendung von let
      p.ellipse(50 + i * 60, p.height / 2, 50, 50); // Zeichne 5 Kreise in horizontaler Linie
    }
  };
}

function sketchVektoren(p) {
  let position; // Ortsvektor
  let velocity; // Geschwindigkeitsvektor

  p.setup = () => {
    p.createCanvas(300, 200);
    position = p.createVector(p.width / 2, p.height / 2); // Setze den Anfangs-Ortsvektor in die Mitte des Canvas
    velocity = p.createVector(2, 3); // Setze den Geschwindigkeitsvektor (x: 2, y: 3)
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);

    // Aktualisiere die Position durch Addition des Geschwindigkeitsvektors
    position.add(velocity);

    // Überprüfe, ob der Ball den Rand des Canvas erreicht hat, und kehre die Richtung um
    if (position.x > p.width || position.x < 0) {
      velocity.x *= -1; // Umkehren der x-Richtung
    }
    if (position.y > p.height || position.y < 0) {
      velocity.y *= -1; // Umkehren der y-Richtung
    }

    // Zeichne den Ball
    p.fill(0);
    p.ellipse(position.x, position.y, 30, 30); // Zeichne den Ball mit dem aktuellen Ortsvektor
  };
}

function sketchDistExample(p) {
  let pointX1 = 100;
  let pointY1 = 100;
  let pointX2 = 300;
  let pointY2 = 200;

  p.setup = () => {
    p.createCanvas(400, 300);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);
    p.ellipse(pointX1, pointY1, 20, 20); // Zeichne den ersten Punkt
    p.ellipse(pointX2, pointY2, 20, 20); // Zeichne den zweiten Punkt

    // Berechne den Abstand zwischen den beiden Punkten
    let distance = p.dist(pointX1, pointY1, pointX2, pointY2);

    // Zeige den Abstand an
    p.fill(0);
    p.textSize(16);
    p.text("Abstand: " + distance, 10, 20);
  };
}

function sketchPointRectangleHover(p) {
  let rectX = 150;
  let rectY = 100;
  let rectW = 100;
  let rectH = 50;

  p.setup = () => {
    p.createCanvas(400, 300);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);

    // Überprüfe die Kollision
    if (
      p.mouseX >= rectX &&
      p.mouseX <= rectX + rectW &&
      p.mouseY >= rectY &&
      p.mouseY <= rectY + rectH
    ) {
      p.fill(255, 0, 0); // Rot, wenn der Mauszeiger im Rechteck ist
    } else {
      p.fill(0); // Schwarz, wenn der Mauszeiger außerhalb ist
    }
    p.rect(rectX, rectY, rectW, rectH); // Zeichne das Rechteck
  };

  p.mousePressed = () => {
    // Hier kann eine Aktion hinzugefügt werden, wenn der Benutzer klickt
  };
}

function sketchPointCircleHover(p) {
  let circleX = 200;
  let circleY = 150;
  let circleR = 50;

  p.setup = () => {
    p.createCanvas(400, 300);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);

    // Berechne den Abstand zwischen dem Mauszeiger und dem Mittelpunkt des Kreises
    let distance = p.dist(p.mouseX, p.mouseY, circleX, circleY);

    // Überprüfe die Kollision
    if (distance <= circleR) {
      p.fill(255, 0, 0); // Rot, wenn der Mauszeiger im Kreis ist
    } else {
      p.fill(0); // Schwarz, wenn der Mauszeiger außerhalb ist
    }
    p.ellipse(circleX, circleY, circleR * 2, circleR * 2); // Zeichne den Kreis
  };

  p.mousePressed = () => {
    // Hier kann eine Aktion hinzugefügt werden, wenn der Benutzer klickt
  };
}

function sketchPointRectangle(p) {
  let rectX = 150;
  let rectY = 100;
  let rectW = 100;
  let rectH = 50;
  let circleX, circleY;

  p.setup = () => {
    p.createCanvas(400, 300);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);
    p.rect(rectX, rectY, rectW, rectH); // Zeichne das Rechteck

    // Überprüfe die Kollision
    if (pointInRectangle(circleX, circleY, rectX, rectY, rectW, rectH)) {
      p.fill(255, 0, 0); // Rot, wenn der Punkt im Rechteck ist
    } else {
      p.fill(0, 255, 0); // Grün, wenn der Punkt außerhalb ist
    }
    p.ellipse(circleX, circleY, 20, 20); // Zeichne den Punkt
  };

  p.mousePressed = () => {
    circleX = p.mouseX;
    circleY = p.mouseY; // Setze den Punkt auf die Mausposition
  };

  function pointInRectangle(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }
}

function sketchPointCircle(p) {
  let circleX = 200;
  let circleY = 150;
  let circleR = 50;
  let pointX, pointY;

  p.setup = () => {
    p.createCanvas(400, 300);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);
    p.ellipse(circleX, circleY, circleR * 2, circleR * 2); // Zeichne den Kreis

    // Überprüfe die Kollision
    if (pointInCircle(pointX, pointY, circleX, circleY, circleR)) {
      p.fill(255, 0, 0); // Rot, wenn der Punkt im Kreis ist
    } else {
      p.fill(0, 255, 0); // Grün, wenn der Punkt außerhalb ist
    }
    p.ellipse(pointX, pointY, 20, 20); // Zeichne den Punkt
  };

  p.mousePressed = () => {
    pointX = p.mouseX;
    pointY = p.mouseY; // Setze den Punkt auf die Mausposition
  };

  function pointInCircle(px, py, cx, cy, cr) {
    let distance = p.dist(px, py, cx, cy);
    return distance <= cr;
  }
}

function sketchErweiterteTastatur(p) {
  let x = 200;
  let y = 100;
  let up = false;
  let down = false;
  let left = false;
  let right = false;

  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.ellipse(x, y, 20, 20); // Zeichne den Ball

    // Bewege den Ball basierend auf den booleschen Variablen
    if (up) {
      y -= 2; // Bewege nach oben
    }
    if (down) {
      y += 2; // Bewege nach unten
    }
    if (left) {
      x -= 2; // Bewege nach links
    }
    if (right) {
      x += 2; // Bewege nach rechts
    }
  };

  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW) {
      up = true; // Setze up auf true
    }
    if (p.keyCode === p.DOWN_ARROW) {
      down = true; // Setze down auf true
    }
    if (p.keyCode === p.LEFT_ARROW) {
      left = true; // Setze left auf true
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      right = true; // Setze right auf true
    }
  };

  p.keyReleased = () => {
    if (p.keyCode === p.UP_ARROW) {
      up = false; // Setze up auf false
    }
    if (p.keyCode === p.DOWN_ARROW) {
      down = false; // Setze down auf false
    }
    if (p.keyCode === p.LEFT_ARROW) {
      left = false; // Setze left auf false
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      right = false; // Setze right auf false
    }
  };
}

function sketchTastatur(p) {
  let x = 200;
  let y = 100;

  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.ellipse(x, y, 20, 20); // Zeichne den Ball

    // Direkte Abfrage der Systemvariablen keyPressed
    if (p.keyIsPressed) {
      if (p.key === "a") {
        x -= 5; // Bewege nach links
      } else if (p.key === "d") {
        x += 5; // Bewege nach rechts
      }
    }
  };

  p.keyPressed = () => {
    // Reaktion auf Tastenanschläge
    if (p.key === "w") {
      y -= 5; // Bewege nach oben
    } else if (p.key === "s") {
      y += 5; // Bewege nach unten
    }
  };
}

function sketchMaus(p) {
  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);

    // Direkte Abfrage der Systemvariablen mousePressed
    if (p.mouseIsPressed) {
      if (p.mouseButton === p.LEFT) {
        p.ellipse(p.mouseX, p.mouseY, 20, 20); // Zeichne bei Linksklick
      } else if (p.mouseButton === p.RIGHT) {
        p.fill(255, 0, 0); // Ändere die Farbe bei Rechtsklick
        p.ellipse(p.mouseX, p.mouseY, 20, 20); // Zeichne bei Rechtsklick
        p.fill(0); // Zurück zur ursprünglichen Farbe
      }
    }
  };
}

function sketchBoolescheAusdruecke(p) {
  let x = 0;
  let inTheZone = false; // Boolesche Variable für die Zone
  let switchOn = true; // Boolesche Variable für den Schalter

  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);

    // Überprüfe, ob der Ball in der Zone ist
    inTheZone = x > 30 && x < 70;

    // Färbe den Ball je nach Zustand
    if (inTheZone && switchOn) {
      p.fill(255, 0, 0); // rot
    } else {
      p.fill(255); // weiß
    }

    p.ellipse(x, 100, 20, 20); // Zeichne den Ball
    x++;

    // Immer wieder von links reinkommen
    if (x >= 100) {
      x = 0;
    }

    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      switchOn = !switchOn; // Schalter umlegen
    }
  };
}

function sketchAnimation(p) {
  let x = 0;
  let play = true;

  p.setup = () => {
    p.createCanvas(100, 100);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.ellipse(x, 50, 20, 20); // Zeichne den Ball

    // NEU: bewege dich nur, wenn play true ist
    if (play) {
      x++;
    }

    // immer wieder von links reinkommen
    if (x >= 100) {
      x = 0;
    }

    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.keyPressed = () => {
    play = !play; // setze play auf seine eigene Negation
  };
}

function sketchIfElse(p) {
  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    if (p.mouseX < p.width / 2) {
      p.background(255, 0, 0); // rot
    } else {
      p.background(0, 0, 255); // blau
    }

    p.fill(255);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Bewege die Maus!", p.width / 2, p.height / 2);
    autoResizeCanvas(p); // Anpassung für das iframe
  };
}

function sketchStrings(p) {
  let greeting;

  p.setup = () => {
    p.createCanvas(400, 200);
    let text1 = "Hallo";
    let text2 = "Welt";
    greeting = text1 + " " + text2;
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.textSize(32);
    p.fill(0);
    p.text(greeting, 50, 100);
    autoResizeCanvas(p); // Anpassung für das iframe
  };
}

function sketchBilder(p) {
  let img;

  p.preload = () => {
    img = p.loadImage("rgb.png");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    autoResizeCanvas(p); // Anpassung für das iframe
  };

  p.draw = () => {
    p.background(255);
    p.image(img, 0, 0);
    autoResizeCanvas(p); // Anpassung für das iframe
  };
}

function sketchGrid(p) {
  p.setup = () => {
    p.createCanvas(800, 600);
    p.textSize(20);
    const abstand = 50;

    // Zeichne vertikale Linien und Beschriftungen
    for (let i = 0; i < p.width; i += abstand) {
      p.line(i, 0, i, p.height);
      p.text(i, i + 2, 20);
    }

    // Zeichne horizontale Linien und Beschriftungen
    for (let i = 0; i < p.height; i += abstand) {
      p.line(0, i, p.width, i);
      p.text(i, 10, i - 4);
    }

    // Auto-Resize für das iframe
    autoResizeCanvas(p);
  };

  p.draw = () => {
    // Leere draw-Funktion, da wir nur einmal im Setup zeichnen
  };
}

function sketchIfCombined(p) {
  let sichtbar = true;

  p.setup = () => {
    p.createCanvas(300, 200);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(16);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    if ((p.mouseX > 100 && p.mouseY < 150) || !sichtbar) {
      p.background(100, 255, 100);
      p.text("Bedingung erfüllt", p.width / 2, p.height / 2);
    } else {
      p.background(255, 100, 100);
      p.text("Bedingung nicht erfüllt", p.width / 2, p.height / 2);
    }
  };

  p.keyPressed = () => {
    sichtbar = !sichtbar;
  };
}

function sketchIfElseIf(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
  };

  p.draw = () => {
    if (p.mouseX < 100) {
      p.background(255, 0, 0); // rot
    } else if (p.mouseX < 200) {
      p.background(255, 255, 0); // gelb
    } else {
      p.background(0, 255, 0); // grün
    }

    p.fill(0);
    p.text("mouseX = " + p.mouseX, p.width / 2, p.height / 2);

    autoResizeCanvas(p);
  };
}

function sketchBallBounce(p) {
  let x = 50;
  let xSpeed = 3;

  p.setup = () => {
    p.createCanvas(400, 200);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.ellipse(x, p.height / 2, 30, 30);
    x += xSpeed;

    if (x > p.width - 15 || x < 15) {
      xSpeed *= -1;
    }
  };
}

function sketchIfColorChange(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
  };

  p.draw = () => {
    if (p.mouseX < p.width / 2) {
      p.background(255, 0, 0); // rot
    } else {
      p.background(0, 0, 255); // blau
    }

    p.fill(255);
    p.text("mouseX = " + p.mouseX, p.width / 2, p.height / 2);

    autoResizeCanvas(p);
  };
}

function sketchModuloColorSwitch(p) {
  let index = 0;

  p.setup = () => {
    p.createCanvas(250, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    let mod = index % 3;
    if (mod === 0) p.background(255, 0, 0); // rot
    else if (mod === 1) p.background(0, 255, 0); // grün
    else p.background(0, 0, 255); // blau

    p.fill(255);
    p.text("Index: " + index + " → % 3 = " + mod, p.width / 2, p.height / 2);
  };

  p.mousePressed = () => {
    index++;
  };
}

function sketchModuloEvenOdd(p) {
  let zahl = 0;

  p.setup = () => {
    p.createCanvas(300, 100);
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    let istGerade = zahl % 2 == 0;
    let text = "Zahl " + zahl + " ist " + (istGerade ? "gerade" : "ungerade");
    p.text(text, p.width / 2, p.height / 2);
  };

  p.mousePressed = () => {
    zahl++;
  };
}

function sketchDecrementOperator(p) {
  let x = 10;

  p.setup = () => {
    p.createCanvas(250, 100);
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(240);
    p.fill(0);
    p.text("x = " + x, p.width / 2, p.height / 2);
  };

  p.mousePressed = () => {
    x--;
  };
}

function sketchIncrementOperator(p) {
  let x = 0;

  p.setup = () => {
    p.createCanvas(250, 100);
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(240);
    p.fill(0);
    p.text("x = " + x, p.width / 2, p.height / 2);
  };

  p.mousePressed = () => {
    x++;
  };
}

function sketchGrundrechenarten(p) {
  p.setup = () => {
    p.createCanvas(360, 130);
    p.textSize(14);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    let a = 10;
    let b = 4;

    let summe = a + b;
    let differenz = a - b;
    let produkt = a * b;
    let division = a / b; // Ganzzahlig
    let floatDivision = a / 4.0; // Gleitkomma

    p.fill(0);
    p.text("a = " + a + ", b = " + b, 10, 20);
    p.text("a + b = " + summe, 10, 40);
    p.text("a - b = " + differenz, 10, 60);
    p.text("a * b = " + produkt, 10, 80);
    p.text("a / b = " + 2 + " (Ganzzahlig)", 10, 100);
    p.text("a / 4.0 = " + floatDivision + " (Float)", 10, 120);
  };
}

function sketchSystemDisplaySize(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.background(240);

    p.textSize(12);
    p.textAlign(p.LEFT, p.TOP);
    p.text("displayWidth: " + p.displayWidth, 10, 20);
    p.text("displayHeight: " + p.displayHeight, 10, 40);

    autoResizeCanvas(p);
  };
}

function sketchSystemWidth(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textSize(16);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("Breite: " + p.width, 10, 50);
  };
}

function sketchSystemHeight(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textSize(16);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("Höhe: " + p.height, 10, 50);
  };
}

function sketchSystemMouseXY(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(220);
    p.fill(0);
    p.ellipse(p.mouseX, p.mouseY, 30, 30);
  };
}

function sketchSystemPmouse(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    p.background(255);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.stroke(0);
    p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
  };
}

function sketchSystemMousePressed(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(220);
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(200);
    }
    p.ellipse(150, 100, 50, 50);
  };
}

function sketchSystemMouseButton(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      if (p.mouseButton === p.LEFT) {
        p.background(255, 0, 0);
      } else if (p.mouseButton === p.RIGHT) {
        p.background(0, 0, 255);
      } else if (p.mouseButton === p.CENTER) {
        p.background(0, 255, 0);
      }
    } else {
      p.background(220);
    }
  };
}

function sketchSystemKey(p) {
  let lastKey = "";

  p.setup = () => {
    p.createCanvas(200, 200);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("Taste: " + lastKey, p.width / 2, p.height / 2);
  };

  p.keyPressed = () => {
    lastKey = p.key;
  };
}

function sketchSystemKeyCode(p) {
  let code = 0;

  p.setup = () => {
    p.createCanvas(200, 200);
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("Code: " + code, p.width / 2, p.height / 2);
  };

  p.keyPressed = () => {
    code = p.keyCode;
  };
}

function sketchSystemKeyPressed(p) {
  let isPressed = false;

  p.setup = () => {
    p.createCanvas(200, 200);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(isPressed ? 0 : 255);
  };

  p.keyPressed = () => {
    isPressed = true;
  };

  p.keyReleased = () => {
    isPressed = false;
  };
}

function sketchSystemFrameRate(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textSize(16);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("frameRate: " + p.nf(p.frameRate(), 2, 2), 10, 50);
  };
}

function sketchSystemFrameCount(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textSize(16);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("frameCount: " + p.frameCount, 10, 50);
  };
}

function sketchSystemDisplay(p) {
  p.setup = () => {
    p.createCanvas(300, 100);
    p.textSize(12);
    autoResizeCanvas(p);
  };

  p.draw = () => {
    p.background(255);
    p.text("displayWidth: " + p.displayWidth, 10, 40);
    p.text("displayHeight: " + p.displayHeight, 10, 70);
  };
}

function sketchScope(p) {
  let x = 50; // global

  p.setup = () => {
    p.createCanvas(300, 100);
  };

  p.draw = () => {
    p.background(240);
    p.ellipse(x, p.height / 2, 30, 30);

    let y = 75; // lokal
    p.ellipse(250, y, 20, 20);

    autoResizeCanvas(p);
  };
}

function sketchIncrement(p) {
  let x = 0;

  p.setup = () => {
    p.createCanvas(300, 100);
  };

  p.draw = () => {
    p.background(240);
    p.ellipse(x, p.height / 2, 30, 30);
    x += 2;

    autoResizeCanvas(p);
  };
}

function sketchVariableExample(p) {
  let x = 100;

  p.setup = () => {
    p.createCanvas(300, 150);
    p.ellipse(x, 75, 50, 50);
    autoResizeCanvas(p);
  };
}

function sketchBallMoveReset(p) {
  let x = 0;

  p.setup = () => {
    p.createCanvas(400, 200);
  };

  p.draw = () => {
    p.background(255);
    p.text("Drücke eine Taste!", 40, 40);
    p.ellipse(x, 100, 50, 50);
    x = x + 2;
  };

  p.keyPressed = () => {
    x = 0;
  };

  autoResizeCanvas(p);
}

function sketchStatic(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    p.background(240);
    p.fill(255, 0, 0);
    p.ellipse(150, 100, 100, 100);

    autoResizeCanvas(p);
  };
}

function sketchActive(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
  };

  p.draw = () => {
    p.background(255);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };

  autoResizeCanvas(p);
}

function sketchVariablen(p) {
  p.setup = () => {
    p.createCanvas(300, 200);

    let x = 100;
    let y = 150.5;
    let text = "Hallo!";
    let sichtbar = true;

    if (sichtbar) {
      p.textSize(20);
      p.text(text, x, y);
    }

    autoResizeCanvas(p);
  };
}

function sketchText(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Hallo Welt", p.width / 2, p.height / 2);

    autoResizeCanvas(p);
  };
}

function sketchRandom(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    const x = p.random(p.width);
    const y = p.random(p.height);
    p.ellipse(x, y, 50, 50);
    p.text("Drücke eine Taste!", 20, 20);
    autoResizeCanvas(p);
  };

  p.keyPressed = () => {
    const x = p.random(p.width);
    const y = p.random(p.height);
    p.ellipse(x, y, 50, 50);
  };
}

function sketchWidthHeight(p) {
  p.setup = () => {
    p.createCanvas(300, 200);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);

    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(12);
    p.text("Mittelpunkt: width/2, height/2", p.width / 2, p.height / 2 + 40);

    autoResizeCanvas(p);
  };
}

function sketchMousePressed(p) {
  p.setup = () => {
    p.createCanvas(200, 200);
    p.background(240);
  };

  p.draw = () => {
    // nichts
  };

  p.mousePressed = () => {
    p.fill(0);
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  };

  p.mouseReleased = () => {
    p.fill(255, 0, 0);
    p.rect(p.mouseX - 10, p.mouseY - 10, 20, 20);
  };

  autoResizeCanvas(p);
}

function sketchKeyPressed(p) {
  let lastKey = "";

  p.setup = () => {
    p.createCanvas(200, 200);
    p.background(255);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);
    p.text("Taste: " + lastKey, p.width / 2, p.height / 2);

    autoResizeCanvas(p);
  };

  p.keyPressed = () => {
    lastKey = p.key;
  };

  autoResizeCanvas(p);
}

function sketchKeyPress(p) {
  p.setup = () => {
    p.createCanvas(200, 200);
    p.background(200);
    autoResizeCanvas(p);
  };
  p.keyPressed = () => {
    p.background(p.random(255), p.random(255), p.random(255));
  };
}

function sketchStrokeWeight(p) {
  p.setup = () => {
    p.createCanvas(120, 80);
    p.background(255);

    p.strokeWeight(1); // dünne Linie
    p.line(10, 20, 110, 20);

    p.strokeWeight(5); // dicke Linie
    p.line(10, 40, 110, 40);

    p.noStroke();
    p.fill(0);
    p.textSize(12);
    p.text("strokeWeight(1)", 10, 15);
    p.text("strokeWeight(5)", 10, 55);

    autoResizeCanvas(p);
  };
}

function sketchBackground(p) {
  p.setup = () => {
    p.createCanvas(120, 80);

    p.background(255); // weißer Hintergrund
    p.rect(30, 30, 60, 40);

    p.background(0, 255, 0); // grüner Hintergrund
    p.ellipse(50, 50, 40, 40);

    autoResizeCanvas(p);
  };
}

function sketchStroke(p) {
  p.setup = () => {
    p.createCanvas(120, 80);
    p.background(255);
    p.stroke(255, 255, 0);
    p.line(10, 20, 110, 20);
    p.stroke(0, 255, 0);
    p.line(10, 40, 110, 40);
    p.stroke(0);
    p.line(10, 60, 110, 60);

    autoResizeCanvas(p);
  };
}

function sketchNoStroke(p) {
  p.setup = () => {
    p.createCanvas(120, 80);
    p.background(255);
    p.noStroke();
    p.fill("red");
    p.rect(30, 20, 60, 40);

    autoResizeCanvas(p);
  };
}

function sketchFill(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background(255);
    p.fill(255, 0, 0);
    p.rect(20, 20, 30, 30);
    p.fill(128);
    p.rect(60, 60, 30, 30);

    autoResizeCanvas(p);
  };
}

function sketchNoFill(p) {
  p.setup = () => {
    p.createCanvas(120, 80);
    p.background(255);
    p.noFill();
    p.ellipse(60, 40, 60, 30);

    autoResizeCanvas(p);
  };
}

function sketchSize(p) {
  p.setup = () => {
    p.createCanvas(200, 100);

    autoResizeCanvas(p);
  };
}

function sketchPoint(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.strokeWeight(5);
    p.point(50, 50);

    autoResizeCanvas(p);
  };
}

function sketchLine(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.line(20, 80, 80, 20);
    p.strokeWeight(5);
    p.point(20, 80);
    p.point(80, 20);

    autoResizeCanvas(p);
  };
}

function sketchTriangle(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.triangle(10, 90, 50, 10, 90, 90);
    p.strokeWeight(5);
    p.point(10, 90);
    p.point(50, 10);
    p.point(90, 90);

    autoResizeCanvas(p);
  };
}

function sketchRect(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.rect(20, 30, 60, 40);
    p.strokeWeight(5);
    p.point(20, 30);

    autoResizeCanvas(p);
  };
}

function sketchRectMode(p) {
  p.setup = () => {
    p.createCanvas(500, 400);
    p.textSize(10);
    p.rectMode(p.CORNER);
    p.rect(20, 20, 20, 60);
    p.text("CORNER, Linke obere Ecke 20, 20 + 20 Breite und 60 Höhe", 10, 15);

    p.rectMode(p.CENTER);
    p.rect(150, 80, 60, 20);
    p.text("CENTER, Mittelpunkt 150, 80 + 60 Breite und 20 Höhe", 150, 60);

    p.rectMode(p.CORNERS);
    p.rect(100, 200, 200, 300);
    p.text("CORNERS, Linke obere Ecke 100, 200", 80, 190);
    p.text("CORNERS, Rechte untere Ecke 200, 300", 210, 310);

    p.strokeWeight(5);
    p.point(20, 20);
    p.point(150, 80);
    p.point(100, 200);
    p.point(200, 300);

    autoResizeCanvas(p);
  };
}

function sketchEllipse(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.ellipse(50, 50, 60, 30);
    p.strokeWeight(5);
    p.point(50, 50);

    autoResizeCanvas(p);
  };
}

function sketchEllipseMode(p) {
  p.setup = () => {
    p.createCanvas(500, 350);
    p.textSize(10);
    p.ellipseMode(p.CENTER);
    p.ellipse(50, 50, 20, 60);
    p.text("CENTER, Mittelpunkt 50, 50 + 20 Breite und 60 Höhe", 10, 15);

    p.ellipseMode(p.CORNER);
    p.ellipse(150, 80, 60, 20);
    p.text("CORNER, Linke obere Ecke 150, 80 + 60 Breite und 20 Höhe", 150, 70);

    p.ellipseMode(p.CORNERS);
    p.ellipse(100, 200, 200, 300);
    p.text("CORNERS, Linke obere Ecke 100, 200", 80, 190);
    p.text("CORNERS, Rechte untere Ecke 200, 300", 210, 310);

    p.noFill();
    p.rect(150, 80, 60, 20);
    p.rect(100, 200, 100, 100);

    p.strokeWeight(5);
    p.point(50, 50);
    p.point(150, 80);
    p.point(100, 200);
    p.point(200, 300);

    autoResizeCanvas(p);
  };
}

function sketchCircle(p) {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.circle(50, 50, 40);
    p.strokeWeight(5);
    p.point(50, 50);

    autoResizeCanvas(p);
  };
}

function sketchArc(p) {
  p.setup = () => {
    p.createCanvas(220, 180);
    p.background(255);
    p.stroke(0);
    p.fill(200, 100, 100);
    p.arc(100, 100, 80, 80, p.radians(0), p.radians(90));
    p.fill(0);
    p.textSize(10);
    p.text("0°", 155, 100);
    p.text("90°", 100, 165);
    p.text("Uhrzeigersinn", 130, 20);

    p.noFill();
    p.stroke(150);
    p.circle(100, 100, 80);
    p.stroke(0);
    p.line(100, 100, 140, 100);
    p.line(100, 100, 100, 140);

    autoResizeCanvas(p);
  };
}

function sketchBeginShape(p) {
  p.setup = () => {
    p.createCanvas(300, 350);

    p.beginShape();
    p.vertex(50, 10);
    p.vertex(80, 80);
    p.vertex(5, 35);
    p.vertex(10, 0);
    p.vertex(30, 30);
    p.endShape(p.CLOSE);

    p.noFill();
    p.beginShape();
    p.vertex(100, 300);
    p.vertex(100, 100);
    p.vertex(200, 300);
    p.vertex(100, 300);
    p.vertex(200, 100);
    p.vertex(100, 100);
    p.vertex(150, 50);
    p.vertex(200, 100);
    p.vertex(200, 300);
    p.endShape();

    autoResizeCanvas(p);
  };
}
