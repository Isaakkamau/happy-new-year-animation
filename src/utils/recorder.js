export function setupRecording(canvas, downloadBtn) {
  const chunks = [];
  const stream = canvas.captureStream(30);
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9'
  });

  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new-year-animation.webm';
    a.click();
    URL.revokeObjectURL(url);
  };

  downloadBtn.addEventListener('click', () => {
    if (mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      downloadBtn.textContent = 'Download Animation';
    } else {
      chunks.length = 0;
      mediaRecorder.start();
      downloadBtn.textContent = 'Stop Recording';
    }
  });
}