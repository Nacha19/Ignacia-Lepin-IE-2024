let triangles = [];
let pentagons = [];

function setup() {
  createCanvas(500, 500);
  noStroke();
  
  // Crear múltiples objetos de tipo triángulo y pentágono
  for (let i = 0; i < 3; i++) {
    triangles.push(new Triangle(random(width), random(height)));
    pentagons.push(new Pentagon(random(width / 2), random(height / 2)));
  }
}

function draw() {
  background(1000);
  
  // Mostrar y actualizar triángulos
  for (let triangle of triangles) {
    triangle.update();
    triangle.display();
  }

  // Mostrar y actualizar pentágonos
  for (let pentagon of pentagons) {
    pentagon.update();
    pentagon.display();
  }
}

// Clase para los triángulos, movimiento con aceleración y desaceleración
class Triangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(1, 5);
    this.ySpeed = random(1, 5);
    this.acceleration = 0.2; // Aceleración y desaceleración
    this.radius = 50;
  }
  
  update() {
    // Incrementa la velocidad y luego la disminuye para simular aceleración y desaceleración
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    this.xSpeed += random(-this.acceleration, this.acceleration);
    this.ySpeed += random(-this.acceleration, this.acceleration);
    
    // Rebotar en los bordes
    if (this.x > width || this.x < 0) {
      this.xSpeed *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed *= -1;
    }
  }
  
  display() {
    fill(random(100, 255), random(50, 200), 255);
    // Dibujar triángulo equilátero
    let size = this.radius;
    triangle(this.x, this.y - size / 2, this.x - size / 2, this.y + size / 2, this.x + size / 2, this.y + size / 2);
  }
}

// Clase para los pentágonos, movimiento en órbita alrededor de un punto
class Pentagon {
  constructor(centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.orbitRadius = random(50, 150); // Radio de la órbita
    this.angle = random(TWO_PI); // Ángulo inicial
    this.orbitSpeed = random(0.03, 0.02); // Velocidad de órbita
    this.size = 50;
  }
  
  update() {
    // Movimiento circular alrededor de un punto central
    this.angle += this.orbitSpeed;
    this.x = this.centerX + cos(this.angle) * this.orbitRadius;
    this.y = this.centerY + sin(this.angle) * this.orbitRadius;
  }
  
  display() {
    fill(255, 100, random(100, 255));
    
    // Dibujar pentágono
    let angle = TWO_PI / 5;
    beginShape();
    for (let i = 0; i < 5; i++) {
      let xOffset = cos(angle * i) * this.size;
      let yOffset = sin(angle * i) * this.size;
      vertex(this.x + xOffset, this.y + yOffset);
    }
    endShape(CLOSE);
  }
}

