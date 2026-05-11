// ===== NAV: pink when active/clicked, white default. Smooth scroll. =====
const navButtons = document.querySelectorAll('[data-target]');
const sections = document.querySelectorAll('.page');

function setActive(targetId) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.target === targetId);
  });
}

navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = btn.dataset.target;
    if (!target) return;
    setActive(target);
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Update active button as the user scrolls
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 200;
  let current = sections[0].id;
  sections.forEach(s => {
    if (s.offsetTop <= scrollPos) current = s.id;
  });
  setActive(current);
}, { passive: true });

// ===== LIGHTBOX: click a project image to view larger =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.src;
    if (!src) return;
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
});

// Initialize
setActive('about');
