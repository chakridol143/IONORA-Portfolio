gsap.registerPlugin(ScrollTrigger);

/* ===============================
   SECTION DATA
================================ */
const sections = [
  { src: 'vedios/Home.mp4', title: 'Home', subtitle: 'IONORA the elite market place.', btnExp: 'Explore' },
  { src: 'vedios/software2.mp4', title: 'IT Solutions', subtitle: 'IONORA IT Solutions.', btnExp: 'Discover' },
  { src: 'vedios/Digital-Marketing.mp4', title: 'Digital Marketing', subtitle: 'IONORA Digital Marketing.', btnExp: 'Explore' },
  { src: 'vedios/About.mp4', title: 'About', subtitle: 'IONORA Pvt Ltd.', btnExp: 'Discover' }
];

const slots = Array.from(document.querySelectorAll('.slot'));
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const btnExp = document.getElementById('btnExp');
const overlay = document.getElementById('overlay');
const sideNavItems = document.querySelectorAll('.side-nav-item');

const len = slots.length;
let active = 0;
let isAnimating = false;

/* ===============================
   VIDEO SETUP
================================ */
slots.forEach((video, i) => {
  video.src = sections[i].src;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.play().catch(() => {});
});

/* ===============================
   INITIAL STATE
================================ */
function setInitial() {
  slots.forEach((slot, i) => {
    const rel = (i - active + len) % len;
    gsap.set(slot, getState(rel));
  });

  updateOverlayContent();
  updateSideNav();
  overlay.style.opacity = 1;
}
setInitial();

/* ===============================
   VIDEO STATES (DEPTH EFFECT)
================================ */
function getState(rel) {
  if (rel === 0)
    return { yPercent: 0, scale: 1, opacity: 1, zIndex: 30, filter: 'brightness(0.85) blur(0px)' };

  if (rel === 1)
    return { yPercent: 120, scale: 0.7, opacity: 0, zIndex: 10, filter: 'brightness(0.5) blur(6px)' };

  if (rel === len - 1)
    return { yPercent: -120, scale: 0.7, opacity: 0, zIndex: 10, filter: 'brightness(1) blur(6px)' };

  return {
    yPercent: rel < len / 2 ? 240 : -240,
    scale: 0.6,
    opacity: 0,
    zIndex: 5,
    filter: 'brightness(0.4) blur(10px)'
  };
}

/* ===============================
   OVERLAY CONTENT
================================ */
function updateOverlayContent() {
  titleEl.textContent = sections[active].title;
  subtitleEl.textContent = sections[active].subtitle;
  btnExp.textContent = sections[active].btnExp;

  btnExp.onclick = () => {
    const title = sections[active].title;

    if (title === 'IT Solutions') window.location.href = 'software.html';
    else if (title === 'About') window.location.href = 'about.html';
    else window.location.href = 'dgmarketing.html';
  };
}

/* ===============================
   SIDE NAV UPDATE
================================ */
function updateSideNav() {
  sideNavItems.forEach((item, i) => {
    item.classList.toggle('active', i === active);
  });
}

/* ===============================
   ROTATION LOGIC
================================ */
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
    defaults: { ease: 'power4.inOut' },
    onComplete: () => {
      active = target;
      updateOverlayContent();
      updateSideNav();
      gsap.to(overlay, { opacity: 1, duration: 0.6 });
      isAnimating = false;
    }
  });

  for (let step = 1; step <= steps; step++) {
    const next = (active + dir * step + len) % len;

    tl.to(slots, {
      duration: 0.75,
      yPercent: i => getState((i - next + len) % len).yPercent,
      scale: i => getState((i - next + len) % len).scale,
      opacity: i => getState((i - next + len) % len).opacity,
      filter: i => getState((i - next + len) % len).filter,
      zIndex: i => getState((i - next + len) % len).zIndex
    });
  }
}

/* ===============================
   SIDE NAV CLICK
================================ */
sideNavItems.forEach(item => {
  item.addEventListener('click', () => {
    rotateTo(Number(item.dataset.index));
  });
});

/* ===============================
   SCROLL / TOUCH
================================ */
let wheelLock = false;

window.addEventListener(
  'wheel',
  e => {
    e.preventDefault();
    if (wheelLock) return;

    wheelLock = true;
    setTimeout(() => (wheelLock = false), 1000);
    e.deltaY > 0 ? rotateTo(active + 1) : rotateTo(active - 1);
  },
  { passive: false }
);

let startY = 0;
window.addEventListener('touchstart', e => (startY = e.touches[0].clientY));
window.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dy) > 50) dy < 0 ? rotateTo(active + 1) : rotateTo(active - 1);
});

/* ===============================
   SIDEBAR MENU
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  const overlayBg = document.getElementById('overlay-bg');

  if (!menuToggle) return;

  menuToggle.onclick = () => {
    sidebar.classList.add('open');
    overlayBg.classList.add('active');
  };

  closeSidebar.onclick = overlayBg.onclick = () => {
    sidebar.classList.remove('open');
    overlayBg.classList.remove('active');
  };
});

/* ===============================
   SIDEBAR ACTIVE LINK
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar-links a');
  const page = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === page);
  });
});