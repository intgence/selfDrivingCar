class Sensor {
  constructor(CAR) {
    this.car = CAR;
    this.rayCount = 45;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }

  update(roadBorders) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; ++i) {
      this.readings.push(this.#getReading(this.rays[i], roadBorders));
    }
  }

  #getReading(ray, roadBorders) {
    let touches = [];
    for (let i = 0; i < roadBorders.length; ++i) {
      const TOUCH = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (TOUCH) {
        touches.push(TOUCH);
      }
    }

    if (touches.length == 0) {
      return null;
    } else {
      const OFFSETS = touches.map((e) => e.offset);
      const MINOFFSET = Math.min(...OFFSETS);
      return touches.find((e) => e.offset == MINOFFSET);
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; ++i) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;

      const START = { x: this.car.x, y: this.car.y };
      const END = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([START, END]);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; ++i) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }


      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "lightgreen";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
