
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Formulario de suscripción (simulado — sin backend real)
const form = document.getElementById('subscribe-form');
const fineprint = document.getElementById('cta-fine');
const originalFine = fineprint.textContent;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('input[type="email"]').value.trim();
  if (!email) return;

  fineprint.textContent = `Listo — vamos a avisarte a ${email} cuando salga el próximo lote.`;
  form.reset();

  setTimeout(() => {
    fineprint.textContent = originalFine;
  }, 5000);
});

const tempEl = document.getElementById('val-temp');
if (tempEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const readings = ['96°C', '95°C', '96°C', '97°C'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % readings.length;
    tempEl.textContent = readings[i];
  }, 2600);
}
