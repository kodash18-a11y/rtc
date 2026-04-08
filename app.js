/* ─── XI Alumni Executive · app.js ───────────────────────────────────────── */

/* ── LIGHTBOX ──────────────────────────────────────────────────────────────── */
(function() {
  const overlay = document.getElementById('lightbox-overlay');
  const lbImg   = document.getElementById('lightbox-img');
  if (!overlay || !lbImg) return;

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  /* clicks on img-item */
  document.querySelectorAll('.img-item').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (img && img.src && !img.src.endsWith('#')) open(img.src, img.alt);
    });
  });

  /* overlay click */
  overlay.addEventListener('click', e => { if (e.target !== lbImg) close(); });

  /* close button */
  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', close);

  /* ESC */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ── SLIDERS ──────────────────────────────────────────────────────────────── */
document.querySelectorAll('.slider').forEach(slider => {
  const track  = slider.querySelector('.slider__track');
  const slides = slider.querySelectorAll('.slider__slide');
  const dots   = slider.querySelectorAll('.slider__dot');
  const prevBtn = slider.querySelector('.slider__btn--prev');
  const nextBtn = slider.querySelector('.slider__btn--next');
  if (!track || slides.length === 0) return;

  let current = 0;
  const count = slides.length;

  function goTo(idx) {
    current = (idx + count) % count;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  /* swipe */
  let startX = 0, isDragging = false;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
  slider.addEventListener('touchend',   e => {
    if (!isDragging) return; isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  });

  /* lightbox on slide click */
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const img = slide.querySelector('img');
      const overlay = document.getElementById('lightbox-overlay');
      const lbImg   = document.getElementById('lightbox-img');
      if (img && overlay && lbImg && img.src && !img.src.endsWith('#')) {
        lbImg.src = img.src;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  goTo(0);
});
