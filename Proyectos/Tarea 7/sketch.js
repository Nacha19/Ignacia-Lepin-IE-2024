let img; 
let size = 10; 
let asciiChar = "@/#$";

function preload() {
  img = loadImage("your name 1.jpg"); // Asegúrate de usar el nombre correcto de tu archivo
}

function setup() {
  createCanvas(650, 800);
  img.resize(100, 0); // Redimensiona la imagen (ancho fijo, alto proporcional)
  size = width / img.width; // Ajusta el tamaño de los caracteres según el ancho del lienzo
}

function draw() {
  background(255);

  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let pixelIndex = (i + j * img.width) * 4;
      let r = img.pixels[pixelIndex + 0];
      let g = img.pixels[pixelIndex + 1];
      let b = img.pixels[pixelIndex + 2];
      
      // Calcula el brillo de cada píxel
      let bright = (r + g + b) / 1.5;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length)); // Mapea el brillo a un índice en asciiChar

      let x = i * size + size / 2;
      let y = j * size + size / 2;
      let t = asciiChar.charAt(tIndex); // Obtiene el carácter correspondiente según el brillo

      // Cambia el color de los caracteres dependiendo del píxel
      let col = color(r, g, b); // Crea un color a partir de los valores RGB del píxel
      fill(col); // Establece el color del texto con 'fill'
      
      stroke(0); // Color de la línea (negro para el texto)
      textSize(size); // Establece el tamaño del texto
      textAlign(CENTER, CENTER); // Alinea el texto al centro
      text(t, x, y); // Dibuja el carácter en las coordenadas (x, y)
    }
  }
}
