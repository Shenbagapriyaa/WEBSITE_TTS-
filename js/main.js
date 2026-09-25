// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Cursor glow follows pointer (desktop only, handled in CSS media query)
const glow = document.getElementById('cursorGlow');
if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// Pause background videos when off-screen to save resources
const backgroundVideos = document.querySelectorAll('.hero-bg-video, .section-video, .workflow-bg-video');
if (backgroundVideos.length && 'IntersectionObserver' in window) {
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.play().catch(() => {});
      else entry.target.pause();
    });
  }, { threshold: 0.1 });
  backgroundVideos.forEach(video => vidObserver.observe(video));
}

// Animated counters — run once when each stat enters view
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));
} else {
  counters.forEach(animateCounter);
}

// Quiet scroll-reveal for whole sections (not per-card, per design guidance)
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Draw the workflow path one step at a time as each stage enters view.
const workflowSteps = document.querySelectorAll('.workflow-list li');
if ('IntersectionObserver' in window && workflowSteps.length) {
  const workflowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        workflowSteps.forEach(step => step.classList.remove('is-active'));
        entry.target.classList.add('is-active');
      }
    });
  }, { threshold: 0.55, rootMargin: '-12% 0px -28% 0px' });
  workflowSteps.forEach(step => workflowObserver.observe(step));
} else {
  workflowSteps.forEach(step => step.classList.add('is-visible', 'is-active'));
}

// Live floor ticker — simulated piece counter, clearly cosmetic/illustrative
const tickerCount = document.getElementById('tickerCount');
if (tickerCount) {
  let count = parseInt(tickerCount.textContent, 10);
  setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1;
    tickerCount.textContent = count.toLocaleString('en-IN');
  }, 2200);
}
