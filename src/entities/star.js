export class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = 0;
    this.speed = Math.random() * 3 + 2;
    this.size = Math.random() * 2 + 1;
    this.twinkle = Math.random() * Math.PI;
  }

  update() {
    this.y += this.speed;
    this.twinkle += 0.1;
    if (this.y > this.canvas.height) {
      this.reset();
    }
  }

  draw(ctx) {
    const brightness = Math.abs(Math.sin(this.twinkle));
    const color = `rgb(${255 * brightness}, ${255 * brightness}, ${255 * brightness})`;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}