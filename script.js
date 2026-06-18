// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 15000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  // draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();
window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });


// ===== TYPEWRITER =====
const phrases = [
  'B.E. CSE Student 🎓',
  'Frontend Developer 🎨',
  'C++ Programmer ⚡',
  'SQL Enthusiast 🗄️',
  'Problem Solver 🧩',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typewrite() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(typewrite, 1800); return; }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typewrite, deleting ? 40 : 70);
}
typewrite();


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(5,9,18,0.95)'
    : 'rgba(5,9,18,0.75)';
});


// ===== SKILL BAR ANIMATION =====
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('section, .skill-card, .timeline-item, .contact-card');
revealEls.forEach(el => el.classList.add('reveal'));

let skillsAnimated = false;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (!skillsAnimated && entry.target.id === 'skills') {
        setTimeout(animateSkillBars, 300);
        skillsAnimated = true;
      }
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));


// ===== FORM SUBMIT =====
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.classList.remove('hidden');
  e.target.reset();
  setTimeout(() => success.classList.add('hidden'), 5000);
}


// ===== SMOOTH ACTIVE NAV LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--cyan)' : '';
  });
});
