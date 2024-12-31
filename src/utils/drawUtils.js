import { getRainbowColor, createGradient } from './colors.js';

export function drawBackground(ctx, canvas) {
  const gradient = createGradient(ctx, canvas.height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawText2024(ctx, canvas, alpha) {
  const currentTime = Date.now();
  const glowOffset = Math.sin(currentTime * 0.002) * 3;
  
  for (let offset = 10; offset > 0; offset -= 2) {
    ctx.font = '160px Arial';
    ctx.fillStyle = `rgba(${offset * 5}, ${offset * 5}, ${offset * 10}, ${alpha / 255 / 2})`;
    ctx.textAlign = 'center';
    ctx.fillText('2024', canvas.width/2 + glowOffset, canvas.height/2);
  }
  
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha / 255})`;
  ctx.fillText('2024', canvas.width/2, canvas.height/2);
}

export function drawText2025(ctx, canvas) {
  ctx.font = '120px Arial';
  ctx.textAlign = 'center';
  "2025".split('').forEach((digit, i) => {
    ctx.fillStyle = getRainbowColor(i * 0.25 + Date.now() * 0.0003);
    ctx.fillText(digit, canvas.width/2 - 120 + i * 80, canvas.height/3);
  });
}

export function drawNewYearMessage(ctx, canvas, name) {
  const message = `Happy New Year, ${name}!`;
  ctx.font = '80px Arial';
  
  for (let offset = 5; offset > 0; offset--) {
    ctx.fillStyle = `rgb(${offset * 20}, ${offset * 20}, ${offset * 20})`;
    ctx.fillText(
      message,
      canvas.width/2 + (Math.random() * 2 - 1),
      canvas.height * 2/3 + (Math.random() * 2 - 1)
    );
  }
  
  ctx.fillStyle = '#FFD700';
  ctx.fillText(message, canvas.width/2, canvas.height * 2/3);
}