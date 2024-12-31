import { getRainbowColor } from '../utils/colors.js';

export class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = Math.random() * 20 + 10;
    this.color = getRainbowColor(Math.random());
  }

  update() {
    this.lifetime--;
  }

  draw(ctx) {
    if (this.lifetime > 0) {
      const size = Math.random() * 2 + 1;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}