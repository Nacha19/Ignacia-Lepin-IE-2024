let numShapes = 10;  // Número de formas
let angleOffset = 0; // Desplazamiento de ángulo

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(30);
  translate(width / 2, height / 2);  // Movemos el origen al centro
  
  for (let i = 0; i < numShapes; i++) {
    push();
    
    let angle = map(i, 0, numShapes, 0, TWO_PI) + angleOffset; // Calcula el ángulo de rotación
    let radius = 100 + 30 * sin(frameCount * 0.05 + i);        // Radio con oscilación
    let x = radius * cos(angle);                               // Posición en X
    let y = radius * sin(angle);                               // Posición en Y
    
    translate(x, y);                                           // Trasladamos al punto calculado
    rotate(angleOffset + i * 0.5);                             // Aplicamos rotación adicional
    scale(sin(frameCount * 0.02 + i) * 0.5 + 1);               // Escalado oscilante
    
    fill(map(i, 0, numShapes, 0, 255), 200, 255);              // Color cambiante
    ellipse(0, 0, 40, 40);                                     // Dibuja la forma
    
    pop();
  }
  
  angleOffset += 0.01; // Incrementamos el ángulo para la animación
}
