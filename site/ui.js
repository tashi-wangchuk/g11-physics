/* Shared UI runtime for all chapter pages.
   - hiDPI(canvas): retina-sharp canvas backing store. Drawing code keeps its
     original logical coordinates via canvas.lw / canvas.lh.
   - Scroll-reveal: sections fade-and-rise as they enter the viewport.
   - Mobile menu toggle (works with or without lucide). */

function hiDPI(c) {
  if (c.__hd) return c.__hd;
  var r = Math.min(window.devicePixelRatio || 1, 2.5);
  c.lw = c.width;
  c.lh = c.height;
  c.width = Math.round(c.lw * r);
  c.height = Math.round(c.lh * r);
  var x = c.getContext('2d');
  x.setTransform(r, 0, 0, r, 0, 0);
  c.__hd = x;
  return x;
}

document.addEventListener('DOMContentLoaded', function () {
  // ----- scroll reveal -----
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('section.idea, .chapter-head .inner');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
    // anything already on screen shows immediately
    requestAnimationFrame(function () {
      targets.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    });
  }

  // ----- mobile menu (fallback-safe) -----
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu && !btn.__wired) {
    btn.__wired = true;
    btn.addEventListener('click', function () {
      menu.classList.toggle('active');
    });
    // if lucide failed to load, give the button a plain hamburger glyph
    if (!window.lucide && !btn.textContent.trim()) {
      btn.textContent = '☰';
      btn.style.fontSize = '1.3rem';
    }
  }
});
