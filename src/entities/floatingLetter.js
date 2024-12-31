import { getRainbowColor } from '../utils/colors.js';

export class FloatingLetter {
  constructor(letter, targetX, targetY, canvas, letterWidth) {
    this.letter = letter;
    this.targetX = targetX;
    this.targetY = targetY;
    this.canvas = canvas;
    this.letterWidth = letterWidth;
    this.letterSpacing = 2; // Add spacing between letters
    
    if (Math.random() < 0.5) {
      this.x = Math.random() < 0.5 ? -50 : canvas.width + 50;
      this.y = Math.random() * canvas.height;
    } else {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() < 0.5 ? -50 : canvas.height + 50;
    }
    
    this.revealed = false;
    this.alpha = 0;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 1) {
      this.vx += (dx * 0.08 - this.vx) * 0.1;
      this.vy += (dy * 0.08 - this.vy) * 0.1;
      this.x += this.vx;
      this.y += this.vy;
    } else {
      this.revealed = true;
      this.alpha = Math.min(255, this.alpha + 5);
    }
  }

  draw(ctx) {
    if (this.alpha > 0) {
      ctx.font = '72px Arial';
      ctx.fillStyle = getRainbowColor(Date.now() * 0.001);
      ctx.globalAlpha = this.alpha / 255;
      ctx.textAlign = 'left'; // Change to left alignment for better spacing control
      ctx.fillText(this.letter, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }

  isSettled() {
    return this.revealed && this.alpha >= 255;
  }
}