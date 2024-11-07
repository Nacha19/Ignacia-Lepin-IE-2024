let particles = []; // Arreglo que almacenará todas las partículas.

function setup() {
  createCanvas(600, 400); // Crea un lienzo de 600x400 píxeles.
  background(0); // Fondo negro para el lienzo.
}

function draw() {
  background(0, 25); // Fondo negro semi-transparente que deja un rastro tenue de las partículas.

  // Crear nuevas partículas si el número de partículas es menor a 50.
  if (particles.length < 50) { 
    for (let i = 0; i < 2; i++) { // Añade dos partículas por ciclo de dibujo.
      particles.push(new Particle(random(width), random(height))); // Crea y añade una nueva partícula con posición aleatoria.
    }
  }

  // Actualizar y mostrar cada partícula.
  for (let i = particles.length - 1; i >= 0; i--) {
    
    particles[i].update(particles); // Actualiza la posición y comportamiento de la partícula.
    
    particles[i].show(); // Dibuja la partícula en el lienzo.
    if (particles[i].finished()) { // Si la partícula ha desaparecido (opacidad < 0)...
      particles.splice(i, 1); // Elimina la partícula del arreglo.
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);      // Crea un vector de posición inicial con las coordenadas dadas.
    this.vel = p5.Vector.random2D();    // Crea un vector de velocidad en una dirección aleatoria.
    this.vel.mult(random(1, 3));        // Multiplica la velocidad por un valor aleatorio entre 1 y 3 para controlar la rapidez.
    this.acc = createVector(0, 0);      // Vector de aceleración inicial en cero (no se usa activamente en este ejemplo).
    this.alpha = 255;                   // Transparencia inicial máxima (completamente visible).
    this.color = color(random(255), random(255), random(255));  // Color aleatorio de la partícula.
    this.r = 20;                        // Radio de la partícula (círculo en este caso).
  }

  finished() {
    return this.alpha < 0;              // Retorna `true` si la opacidad es menor que 0, indicando que la partícula debe eliminarse.
  }

  update(particles) {
    // Mueve la partícula sumando la velocidad a la posición.
    this.pos.add(this.vel);

    // Atracción hacia el cursor
    let attraction = createVector(mouseX, mouseY);  // Vector que apunta al mouse
    attraction.sub(this.pos);
    attraction.setMag(0.05);  // Limita la magnitud de la atracción
    this.vel.add(attraction);  // Añade la fuerza de atracción

    // Separación de otras partículas
    for (let other of particles) {
      if (other !== this) {  // Evita que la partícula se compare consigo misma.
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);  // Calcula la distancia entre partículas.
        if (d < this.r * 2) {  // Si están demasiado cerca
          let steer = p5.Vector.sub(this.pos, other.pos);  // Crea un vector para alejarse
          steer.setMag(0.1);  // Limita la magnitud de la repulsión
          this.vel.add(steer);  // Añade el vector de repulsión
        }
      }
    }

    // Rebotar en los bordes del lienzo
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;  // Invertir la dirección en el eje X
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;  // Invertir la dirección en el eje Y
    }

    this.alpha -= 2;  // Reducir la opacidad para que la partícula se desvanezca con el tiempo.
  }

  show() {
    fill(this.color, this.alpha); // Rellena la partícula con su color y opacidad actual.
    noStroke(); // Sin borde para la partícula.
    ellipse(this.pos.x, this.pos.y, this.r * 2); // Dibuja un círculo con diámetro de 2*r.
  }
}
