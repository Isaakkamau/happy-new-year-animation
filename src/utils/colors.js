export function getRainbowColor(offset) {
  const hue = (offset % 1.0);
  return `hsl(${hue * 360}, 100%, 50%)`;
}

export function createGradient(ctx, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgb(0, 0, 20)');
  gradient.addColorStop(1, 'rgb(20, 0, 40)');
  return gradient;
}