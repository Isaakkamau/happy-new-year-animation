import { getRainbowColor } from '../utils/colors.js';

export class Particle {
  constructor(x, y, particleType, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.particleType = particleType;
    
    const angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 7 + 3;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    
    this.lifetime = Math.random() * 40 + 40;
    this.maxLifetime = this.lifetime;
    this.size = Math.random() * 2 + 2;
    this.color = this.generateColor();
  }

  generateColor() {
    if (this.particleType === "rainbow") {
      return getRainbowColor(Math.random());
    }
    return `rgb(${Math.random() * 55 + 200}, ${Math.random() * 155 + 100}, ${Math.random() * 155 + 100})`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15;
    this.lifetime--;
    
    if (this.particleType === "rainbow") {
      this.color = getRainbowColor(this.x / this.canvas.width + this.y / this.canvas.height);
    }
  }

  draw(ctx) {
    if (this.lifetime > 0) {
      const alpha = this.lifetime / this.maxLifetime;
      ctx.fillStyle = this.color;
      ctx.globalAlpha = alpha;
      
      if (this.particleType === "rainbow") {
        const size = this.size * (this.lifetime / this.maxLifetime);
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
    }
  }
}