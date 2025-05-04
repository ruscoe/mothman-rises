const canvas = document.getElementById("mothCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const roadImg = new Image();
roadImg.src = "img/road.png";

const mothmanImg = new Image();
mothmanImg.src = "img/mothman.png";

let mothX = 100;
let mothY = 200;
let roadY = 0;
const speed = 4;

const keys: { [key: string]: boolean } = {};

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

  // Scroll background.
  roadY += 2;
  if (roadY >= canvas.height) {
    roadY = 0;
  }
}

function draw() {
  // Draw road.
  ctx.drawImage(roadImg, 0, roadY - canvas.height, canvas.width, canvas.height);
  ctx.drawImage(roadImg, 0, roadY, canvas.width, canvas.height);

  // Draw Mothman.
  ctx.drawImage(mothmanImg, mothX, mothY, 128, 128);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

mothmanImg.onload = () => {
  gameLoop();
};
