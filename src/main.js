import { Animation } from './animation.js';
import { setupRecording } from './utils/recorder.js';

const canvas = document.getElementById('canvas');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('secretMessage');
const startBtn = document.getElementById('startBtn');
const downloadBtn = document.getElementById('downloadBtn');
let animation;

startBtn.addEventListener('click', () => {
  const config = {
    name: nameInput.value || 'Friend',
    secretMessage: messageInput.value || ''
  };
  
  animation = new Animation(canvas, config);
  animation.start();
  
  startBtn.classList.add('hidden');
  downloadBtn.classList.remove('hidden');
  
  setupRecording(canvas, downloadBtn);
});