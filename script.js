// Navbar scroll
const nav = document.getElementById('navbar');
if(nav){
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
if(hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobile);
function closeMobile(){ if(mobileMenu) mobileMenu.classList.remove('open'); }

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Counter animation
function animateCounter(el, target){
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if(start >= target){ el.textContent = target.toLocaleString(); clearInterval(timer); }
    else el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      animateCounter(e.target, parseInt(e.target.dataset.target));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

// Toast notification
function showToast(msg, duration=3000){
  let toast = document.querySelector('.toast');
  if(!toast){ toast = document.createElement('div'); toast.className='toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}