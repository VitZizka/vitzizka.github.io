// Vít Žižka — small scripts shared by every page
(function () {
  // Keep the footer year current
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // A dim torch that follows the cursor. Desktop only, and off for people
  // who have asked their device to reduce motion.
  var spot = document.querySelector('.spotlight');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!spot || !finePointer || reduceMotion) return;

  var targetX = window.innerWidth / 2, targetY = window.innerHeight * 0.4;
  var x = targetX, y = targetY, frame = null;

  function step() {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    spot.style.setProperty('--x', x.toFixed(1) + 'px');
    spot.style.setProperty('--y', y.toFixed(1) + 'px');
    if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
      frame = requestAnimationFrame(step);
    } else {
      frame = null;
    }
  }

  window.addEventListener('pointermove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    spot.classList.add('is-on');
    if (!frame) frame = requestAnimationFrame(step);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', function () {
    spot.classList.remove('is-on');
  });
})();
