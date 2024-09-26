let circles = [];
let numCircles = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  // Crear círculos con posiciones y colores iniciales
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      radius: random(10, 50),
      xSpeed: random(-3, 3),
      ySpeed: random(-3, 3),
      color: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(255);

  // Actualizar y dibujar cada círculo
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    
    // Actualizar posición
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
    
    // Rebotar en los bordes
    if (circle.x > width || circle.x < 0) {
      circle.xSpeed *= -1;
    }
    if (circle.y > height || circle.y < 0) {
      circle.ySpeed *= -1;
    }
    
    // Dibujar círculo
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.radius * 2, circle.radius * 2);
  }
}

function mousePressed() {
  // Cambiar el color de todos los círculos al azar al hacer clic
  for (let i = 0; i < circles.length; i++) {
    circles[i].color = color(random(255), random(255), random(255));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
