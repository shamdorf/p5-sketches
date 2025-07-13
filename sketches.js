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
