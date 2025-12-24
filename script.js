gsap.registerPlugin(ScrollTrigger);

const sections = [
  { src: 'vedios/Home.mp4', title: 'Home', subtitle: 'IONORA the elite market place.', btnExp: 'Explore' },
  { src: 'vedios/Services.mp4', title: 'IT Solutions', subtitle: 'IONORA IT Solutions..', btnExp: 'Discover' },
  { src: 'vedios/Home.mp4', title: 'Digital Marketing', subtitle: 'IONORA Digital Marketing', btnExp: 'Explore' },
  { src: 'vedios/Services.mp4', title: 'About', subtitle: 'IONORA Pvt Ltd', btnExp: 'Discover' }
];

const slots = Array.from(document.querySelectorAll('.slot'));
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const btnExp1 = document.getElementById('btnExp');
const overlay = document.getElementById('overlay');
const navBtns = Array.from(document.querySelectorAll('.nav-btn'));

const len = slots.length;
let active = 0;
let isAnimating = false;

slots.forEach((v, i) => {
  v.src = sections[i].src;
  v.loop = true;
  v.muted = true;
  v.playsInline = true;
  v.play().catch(() => {});
});

function setInitial() {
  slots.forEach((s, i) => {
    const rel = (i - active + len) % len;
    gsap.set(s, getState(rel));
  });

  updateOverlayContent();
  overlay.style.opacity = 1;
  updateButtons();
}
setInitial();

function getState(rel) {
  if (rel === 0) return { yPercent: 0, scale: 1, opacity: 1, zIndex: 30, filter: 'brightness(0.8) blur(0px)' };
  if (rel === 1) return { yPercent: 120, scale: 0.7, opacity: 0, zIndex: 10, filter: 'brightness(0.5) blur(5px)' };
  if (rel === len - 1) return { yPercent: -120, scale: 0.7, opacity: 0, zIndex: 10, filter: 'brightness(1) blur(5px)' };
  return { yPercent: rel < len / 2 ? 240 : -240, scale: 0.6, opacity: 0, zIndex: 5, filter: 'brightness(0.5) blur(10px)' };
}

function updateButtons() {
  navBtns.forEach((b, i) => b.classList.toggle('active', i === active));
}

function updateOverlayContent() {
  titleEl.textContent = sections[active].title;
  subtitleEl.textContent = sections[active].subtitle;
  btnExp1.textContent = sections[active].btnExp;

  btnExp1.onclick = () => {
    const currentTitle = sections[active].title;

    if (currentTitle === 'IT Solutions') {
      window.location.href = 'software.html';
    } 
    else if (currentTitle === 'About') {
      window.location.href = 'about.html';
    }
    else if (currentTitle === 'Home' || currentTitle === 'Digital Marketing') {
      window.location.href = 'dgmarketing.html';
    }
    
  };
}

function rotateTo(target) {
  if (isAnimating || target === active) return;
  target = (target + len) % len;

  const forward = (target - active + len) % len;
  const backward = (active - target + len) % len;
  const dir = forward <= backward ? 1 : -1;
  const steps = dir === 1 ? forward : backward;

  isAnimating = true;
  gsap.to(overlay, { opacity: 0, duration: 0.3 });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => {
      active = target;
      updateOverlayContent();
      gsap.to(overlay, { opacity: 1, duration: 0.6 });
      updateButtons();
      isAnimating = false;
    }
  });

  const stepDuration = 0.7;

  for (let step = 1; step <= steps; step++) {
    const next = (active + dir * step + len) % len;

    tl.to(slots, {
      duration: stepDuration,
      yPercent: (i) => getState((i - next + len) % len).yPercent,
      scale: (i) => getState((i - next + len) % len).scale,
      opacity: (i) => getState((i - next + len) % len).opacity,
      filter: (i) => getState((i - next + len) % len).filter,
      zIndex: (i) => getState((i - next + len) % len).zIndex
    });
  }
}

navBtns.forEach((btn, i) => btn.addEventListener('click', () => rotateTo(i)));

let wheelLock = false;
window.addEventListener('wheel', e => {
  e.preventDefault();
  if (wheelLock) return;
  wheelLock = true;
  setTimeout(() => (wheelLock = false), 1000);
  e.deltaY > 0 ? rotateTo(active + 1) : rotateTo(active - 1);
}, { passive: false });

let startY = 0;
window.addEventListener('touchstart', e => (startY = e.touches[0].clientY));
window.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dy) > 50) {
    dy < 0 ? rotateTo(active + 1) : rotateTo(active - 1);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  const overlayBg = document.getElementById('overlay-bg');

  if (!menuToggle || !sidebar || !closeSidebar || !overlayBg) return;

  menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlayBg.classList.add('active');
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlayBg.classList.remove('active');
  });

  overlayBg.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlayBg.classList.remove('active');
  });
});
// === SIDEBAR ACTIVE LINK HIGHLIGHT ===
document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html"; // default to index.html if root

  sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
});


