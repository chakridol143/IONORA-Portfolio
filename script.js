gsap.registerPlugin(ScrollTrigger);

/* VIDEO DATA */
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

/* LOAD VIDEOS */
slots.forEach((video,i)=>{
  video.src = sections[i].src;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.play().catch(()=>{});
});

/* POSITION STATES */
function getState(rel){
  if(rel===0) return {yPercent:0,scale:1,opacity:1,zIndex:30,filter:'brightness(.85)'};
  if(rel===1) return {yPercent:120,scale:.7,opacity:0,zIndex:10,filter:'brightness(.5) blur(6px)'};
  if(rel===len-1) return {yPercent:-120,scale:.7,opacity:0,zIndex:10,filter:'brightness(1) blur(6px)'};
  return {yPercent:240,scale:.6,opacity:0,zIndex:5,filter:'brightness(.4) blur(10px)'};
}

/* INITIAL */
function setInitial(){
  slots.forEach((s,i)=>gsap.set(s,getState((i-active+len)%len)));
  updateOverlay();
  updateSideNav();
}
setInitial();

/* UPDATE TEXT */
function updateOverlay(){
  titleEl.textContent = sections[active].title;
  subtitleEl.textContent = sections[active].subtitle;
  btnExp.textContent = sections[active].btnExp;

  btnExp.onclick = ()=>{
    const t = sections[active].title;
    if(t==='IT Solutions') location.href='software.html';
    else if(t==='About') location.href='a.html';
    else location.href='dgmarketing.html';
  };
}

/* NAV ACTIVE */
function updateSideNav(){
  sideNavItems.forEach((el,i)=>el.classList.toggle('active',i===active));
}

/* ROTATE */
function rotateTo(target){
  if(isAnimating||target===active) return;

  target=(target+len)%len;
  const f=(target-active+len)%len;
  const b=(active-target+len)%len;
  const dir=f<=b?1:-1;
  const steps=dir===1?f:b;

  isAnimating=true;
  gsap.to(overlay,{opacity:0,duration:.3});

  const tl=gsap.timeline({
    defaults:{ease:'power4.inOut'},
    onComplete:()=>{
      active=target;
      updateOverlay();
      updateSideNav();
      gsap.to(overlay,{opacity:1,duration:.6});
      isAnimating=false;
    }
  });

  for(let s=1;s<=steps;s++){
    const next=(active+dir*s+len)%len;
    tl.to(slots,{
      duration:.75,
      yPercent:i=>getState((i-next+len)%len).yPercent,
      scale:i=>getState((i-next+len)%len).scale,
      opacity:i=>getState((i-next+len)%len).opacity,
      filter:i=>getState((i-next+len)%len).filter,
      zIndex:i=>getState((i-next+len)%len).zIndex
    });
  }
}

/* SIDE NAV CLICK */
sideNavItems.forEach(item=>{
  item.addEventListener('click',()=>rotateTo(Number(item.dataset.index)));
});

/* SCROLL */
let wheelLock=false;
window.addEventListener('wheel',e=>{
  e.preventDefault();
  if(wheelLock) return;
  wheelLock=true;
  setTimeout(()=>wheelLock=false,1000);
  e.deltaY>0?rotateTo(active+1):rotateTo(active-1);
},{passive:false});

/* TOUCH */
let startY=0;
window.addEventListener('touchstart',e=>startY=e.touches[0].clientY);
window.addEventListener('touchend',e=>{
  const dy=e.changedTouches[0].clientY-startY;
  if(Math.abs(dy)>50) dy<0?rotateTo(active+1):rotateTo(active-1);
});

/* 🔥 MENU */
document.addEventListener('DOMContentLoaded',()=>{

  const menuToggle=document.getElementById('menu-toggle');
  const sidebar=document.getElementById('sidebar');
  const overlayBg=document.getElementById('overlay-bg');
  const links=document.querySelectorAll('.sidebar-links a');

  let open=false;

  function openMenu(){
    open=true;
    menuToggle.classList.add('active');
    sidebar.classList.add('open');
    overlayBg.classList.add('active');

    gsap.fromTo(sidebar,
      {clipPath:'circle(0% at 95% 40px)'},
      {clipPath:'circle(150% at 95% 40px)',duration:.8,ease:'power4.inOut'}
    );

    gsap.to(links,{opacity:1,y:0,stagger:.08,duration:.5,ease:'power3.out'});
  }

  function closeMenu(){
    open=false;
    menuToggle.classList.remove('active');
    overlayBg.classList.remove('active');

    gsap.to(links,{opacity:0,y:25,duration:.35});

    gsap.to(sidebar,{
      clipPath:'circle(0% at 95% 40px)',
      duration:.7,
      ease:'power4.inOut',
      onComplete:()=>sidebar.classList.remove('open')
    });
  }

  menuToggle.onclick=()=>open?closeMenu():openMenu();
  overlayBg.onclick=closeMenu;

  /* ACTIVE LINK */
  const page=location.pathname.split('/').pop()||'index.html';
  links.forEach(a=>a.classList.toggle('active-link',a.getAttribute('href')===page));
});
