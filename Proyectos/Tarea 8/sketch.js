// Variables globales

let numLineas = 150; // Número total de líneas

let radioMax = 290; // Radio máximo del círculo donde se dibujan las líneas

let tiempo = 0; // Variable de tiempo para la animación

let velocidadAnimacion = 0.005; // Velocidad del cambio en la animación

// Variables para controlar la rotación

let anguloX = 0;

let anguloY = 0;

function setup() {

  createCanvas(windowWidth, windowHeight,WEBGL); 

  pixelDensity(3); // Alta calidad para exportación

  noFill(); // Sin relleno para las formas

  angleMode(RADIANS); // Usar radianes para los cálculos de ángulo

}

function draw() {

  background(0); // Fondo negro para resaltar las líneas

  // Calcular la rotación basada en la posición del mouse

  anguloX = map(mouseY, 0, height, -PI, PI);

  anguloY = map(mouseX, 0, width, -PI, PI);

  // Aplicar rotaciones

  rotateX(anguloX);

  rotateY(anguloY);

  // Animar el radio máximo con base en el tiempo

  let radioAnimado = radioMax + sin(tiempo) * 50;

  // Dibujar las líneas conectando puntos en un círculo

  for (let i = 0; i < numLineas; i++) {

    let angulo1 = map(i, 0, numLineas, 0, TWO_PI); // Ángulo para el primer punto

    let angulo2 = map(i * 2, 0, numLineas, 0, TWO_PI); // Ángulo para el segundo punto

    let x1 = cos(angulo1) * radioAnimado;

    let y1 = sin(angulo1) * radioAnimado;

    let z1 = sin(tiempo + i * 0.1) * 100; // Añadir efecto de profundidad

    let x2 = cos(angulo2) * radioAnimado;

    let y2 = sin(angulo2) * radioAnimado;

    let z2 = cos(tiempo + i * 0.1) * 100; // Añadir efecto de profundidad

    // Cambiar color basado en el tiempo

    stroke(map(sin(tiempo + i * 0.1), -1, 1, 0, 255), 100, 255); // Color dinámico

    strokeWeight(map(sin(tiempo + i * 0.1), -1, 1, 0.5, 2)); // Grosor variable

    line(x1, y1, z1, x2, y2, z2); // Dibujar línea en 3D

  }

  tiempo += velocidadAnimacion; // Incrementar tiempo para la animación

}

// Exportar el frame actual como PNG al hacer clic

function mouseClicked() {

  save("patron_parametrico.png"); // Guardar la imagen como PNG

}

// Ajustar el tamaño del canvas cuando la ventana cambia de tamaño

function windowResized() {

  resizeCanvas(windowWidth, windowHeight); // Redimensionar el canvas

}