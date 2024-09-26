let depthSlider;

function setup() {
  createCanvas(400, 400);
  noFill();
  angleMode(DEGREES);
  colorMode(HSB);  // Cambiamos a modo de color HSB (matiz, saturación, brillo)

  depthSlider = createSlider(1, 10, 5, 1);  // Slider para controlar la profundidad
  depthSlider.position(10, height + 10);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  let depth = depthSlider.value();  // Lee el valor del slider
  triangulos(250, depth, 0);  // Llama a la función recursiva con el tamaño inicial, la profundidad y el ángulo inicial
}

function triangulos(size, depth, angle) {
  if (depth > 0) {
    push();  // Guarda el estado actual del sistema de coordenadas

    // Cambia el color en función de la profundidad
    let hueValue = map(depth, 1, 10, 0, 255);  // Cambia el matiz entre 0 y 255
    stroke(hueValue, 255, 255);  // Asigna el color basado en el valor de matiz

    rotate(angle);  // Rotación del conjunto de triángulos
    strokeWeight(1.5);

    // Dibuja el triángulo y lo rota
    push();  // Guarda el estado antes de rotar el triángulo
    rotate(frameCount / 2);  // Rotación del triángulo individual
    triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
    pop();  // Restaura el estado después de dibujar el triángulo

    // Reduce el tamaño del triángulo para la próxima recursión
    let newSize = size * 0.7;
    let newAngle = angle + 15;  // Cambia este valor para ajustar la velocidad de rotación del conjunto

    triangulos(newSize, depth - 1, newAngle);  // Llamada recursiva
    pop();  // Restaura el estado del sistema de coordenadas
  }
}
