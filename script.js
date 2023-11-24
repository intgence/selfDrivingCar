const CANVAS = document.getElementById("myCanvas");
CANVAS.width = 200;

const CTX = CANVAS.getContext("2d");
const ROAD = new Road(CANVAS.width / 2, CANVAS.width * 0.9);
const CAR = new Car(ROAD.getLaneCenter(1), 100, 30, 50); //Pass the lane l to keep your car in getLaneCenter as l-1

animate();

function animate() {
  CAR.update(ROAD.borders);

  CANVAS.height = window.innerHeight;

  CTX.save();
  CTX.translate(0, -CAR.y + CANVAS.height * 0.7);
  ROAD.draw(CTX);
  CAR.draw(CTX);

  CTX.restore();
  requestAnimationFrame(animate);
}
