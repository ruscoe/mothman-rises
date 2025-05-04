import { Car } from "./Car.js";

const canvas = document.getElementById("mothCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const roadImg = new Image();
roadImg.src = "img/road.png";
roadImg.onload = RunIfImagesLoaded;

const carImagePaths = ["/img/car01.png", "/img/car02.png", "/img/car03.png"];
const carImages: HTMLImageElement[] = [];

const mothmanImg = new Image();
mothmanImg.src = "img/mothman.png";
mothmanImg.onload = RunIfImagesLoaded;

// Count total images to track loading.
const totalImages = 2 + carImagePaths.length;

const speed = 4;

const cars: Car[] = [];
const carSpawnInterval = 100;
const lanes = [130, 200, 530, 600];

const keys: { [key: string]: boolean } = {};

let mothX = 100;
let mothY = 200;
let roadY = 0;
let carSpawnTimer = 0;

let imagesLoaded = 0;

// Load car images.
for (const path of carImagePaths) {
  const img = new Image();
  img.src = path;
  img.onload = RunIfImagesLoaded;
  carImages.push(img);
}

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  // Move Mothman with arrow keys.
  if (keys["ArrowUp"]) mothY -= speed;
  if (keys["ArrowDown"]) mothY += speed;
  if (keys["ArrowLeft"]) mothX -= speed;
  if (keys["ArrowRight"]) mothX += speed;

  // Keep Mothman within canvas bounds.
  mothX = Math.max(0, Math.min(canvas.width - 128, mothX));
  mothY = Math.max(0, Math.min(canvas.height - 128, mothY));

  // Scroll background.
  roadY += 2;
  if (roadY >= canvas.height) {
    roadY = 0;
  }

  // Spawn cars.
  carSpawnTimer++;
  if (carSpawnTimer > carSpawnInterval) {
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const carImage = carImages[Math.floor(Math.random() * carImages.length)];
    cars.push(new Car(lane, canvas.height, carImage));
    carSpawnTimer = 0;
  }

  // Update cars.
  for (let i = cars.length - 1; i >= 0; i--) {
    cars[i].update();
    if (cars[i].isOffScreen()) {
      cars.splice(i, 1);
    }
  }
}

function draw() {
  // Draw road.
  ctx.drawImage(roadImg, 0, roadY - canvas.height, canvas.width, canvas.height);
  ctx.drawImage(roadImg, 0, roadY, canvas.width, canvas.height);

  // Draw cars.
  for (const car of cars) {
    car.draw(ctx);
  }

  // Draw Mothman.
  ctx.drawImage(mothmanImg, mothX, mothY, 128, 128);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function RunIfImagesLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    gameLoop();
  }
}
