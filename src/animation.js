import { Star } from './entities/star.js';
import { Particle } from './entities/particle.js';
import { Sparkle } from './entities/sparkle.js';
import { FloatingLetter } from './entities/floatingLetter.js';
import { AnimationState } from './constants/states.js';
import { initializeSecretLetters } from './utils/textUtils.js';
import { drawBackground, drawText2024, drawText2025, drawNewYearMessage } from './utils/drawUtils.js';

export class Animation {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    this.resize();
    this.init();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.stars = Array.from({ length: 100 }, () => new Star(this.canvas));
    this.fireworks = [];
    this.sparkles = [];
    this.state = AnimationState.FADE_OUT;
    this.alpha = 255;
    this.startTime = Date.now();
    this.secretRevealed = false;
    this.showSecret = false;
    this.messageStartTime = 0;
    this.messageDuration = 10000;
    this.messageFadeDuration = 2000;
    this.secretLetters = initializeSecretLetters(this.ctx, this.config.secretMessage, this.canvas);
  }

  start() {
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawBackground(this.ctx, this.canvas);
    
    this.stars.forEach(star => {
      star.update();
      star.draw(this.ctx);
    });

    if (this.state === AnimationState.FADE_OUT) {
      drawText2024(this.ctx, this.canvas, this.alpha);
      this.alpha = Math.max(0, this.alpha - 3);
      if (this.alpha === 0) {
        this.state = AnimationState.FIREWORKS;
        this.startTime = Date.now();
        // Auto show secret message when transitioning to fireworks
        this.showSecret = true;
        this.messageStartTime = Date.now() + 1000; // Slight delay after 2025 appears
      }
    } else if (this.state === AnimationState.FIREWORKS) {
      this.updateFireworks();
      drawText2025(this.ctx, this.canvas);
      drawNewYearMessage(this.ctx, this.canvas, this.config.name);
      this.updateSecretMessage();
    }

    requestAnimationFrame(() => this.animate());
  }

  updateFireworks() {
    if (Math.random() < 0.1) {
      this.createFirework();
    }

    this.fireworks = this.fireworks.filter(particle => {
      particle.update();
      particle.draw(this.ctx);
      return particle.lifetime > 0;
    });

    this.sparkles = this.sparkles.filter(sparkle => {
      sparkle.update();
      sparkle.draw(this.ctx);
      return sparkle.lifetime > 0;
    });
  }

  createFirework() {
    const x = Math.random() * (this.canvas.width - 200) + 100;
    const y = Math.random() * (this.canvas.height - 200) + 100;
    const fireworkType = Math.random() < 0.3 ? "rainbow" : "normal";
    
    for (let i = 0; i < 70; i++) {
      this.fireworks.push(new Particle(x, y, fireworkType, this.canvas));
    }
    for (let i = 0; i < 20; i++) {
      this.sparkles.push(new Sparkle(
        x + (Math.random() * 60 - 30),
        y + (Math.random() * 60 - 30),
        this.canvas
      ));
    }
  }

  updateSecretMessage() {
    if (this.showSecret && Date.now() >= this.messageStartTime) {
      const timeElapsed = Date.now() - this.messageStartTime;
      
      if (timeElapsed < this.messageDuration + this.messageFadeDuration) {
        const fadeAlpha = timeElapsed > this.messageDuration
          ? 255 * (1 - (timeElapsed - this.messageDuration) / this.messageFadeDuration)
          : 255;

        let allSettled = true;
        this.secretLetters.forEach(letter => {
          letter.update();
          if (!letter.isSettled()) {
            allSettled = false;
          }
          if (letter.alpha > fadeAlpha) {
            letter.alpha = fadeAlpha;
          }
          letter.draw(this.ctx);
        });

        if (allSettled) {
          this.secretRevealed = true;
        }
      } else {
        this.showSecret = false;
        this.secretRevealed = false;
      }
    }
  }
}