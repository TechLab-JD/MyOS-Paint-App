// MyOS Paint — draw on a canvas, pick color/size, clear, save as PNG.
const canvas = document.getElementById('pt-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const color = document.getElementById('pt-color');
  const size = document.getElementById('pt-size');
  let drawing = false, last = null;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
  }
  function stroke(a, b) {
    ctx.strokeStyle = color.value;
    ctx.lineWidth = parseInt(size.value, 10);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }

  canvas.addEventListener('pointerdown', (e) => { drawing = true; last = pos(e); stroke(last, last); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => { if (!drawing) return; const p = pos(e); stroke(last, p); last = p; });
  canvas.addEventListener('pointerup', () => { drawing = false; });
  canvas.addEventListener('pointercancel', () => { drawing = false; });

  document.getElementById('pt-clear').addEventListener('click', () => { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); });
  document.getElementById('pt-save').addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = 'myos-drawing.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
}
