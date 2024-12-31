import { FloatingLetter } from '../entities/floatingLetter.js';

export function initializeSecretLetters(ctx, message, canvas) {
  if (!message) return [];
  
  const fontSize = 72;
  ctx.font = `${fontSize}px Arial`;
  const letterSpacing = 2;
  
  const totalWidth = message.split('').reduce((width, letter) => {
    return width + ctx.measureText(letter).width + letterSpacing;
  }, 0);
  
  let currentX = (canvas.width - totalWidth) / 2;
  
  return message.split('').map(letter => {
    const letterWidth = ctx.measureText(letter).width;
    const letterObj = new FloatingLetter(
      letter,
      currentX,
      canvas.height / 2 - 50,
      canvas,
      letterWidth
    );
    currentX += letterWidth + letterSpacing;
    return letterObj;
  });
}