document.addEventListener("DOMContentLoaded", () => {

  const titles = [
    `Software <br><span class="highlight">Solutions</span><br>For Digital Growth`,
    `Smart <br><span class="highlight">Cloud & AI</span><br>Transformation`
  ];

  const typingSpeed = 40;
  const slideDelay = 5000;

  let index = 0;
  let timeoutId = null;
  const el = document.getElementById("hero-title");

  function tokenize(html) {
    return html.match(/(<[^>]+>|[^<]+)/g) || [];
  }

  function clearTyping() {
    if (timeoutId) clearTimeout(timeoutId);
  }

  function typeTokens(tokens, t = 0, c = 0) {
    if (t >= tokens.length) return;

    const token = tokens[t];

    if (token.startsWith("<")) {
      el.innerHTML += token;
      typeTokens(tokens, t + 1, 0);
    } else {
      if (c < token.length) {
        el.innerHTML += token[c];
        timeoutId = setTimeout(
          () => typeTokens(tokens, t, c + 1),
          typingSpeed
        );
      } else {
        typeTokens(tokens, t + 1, 0);
      }
    }
  }

  function startTyping() {
    clearTyping();
    el.innerHTML = "";
    typeTokens(tokenize(titles[index]));
  }

  startTyping();

  setInterval(() => {
    index = (index + 1) % titles.length;
    startTyping();
  }, slideDelay);

  const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  hero.style.setProperty("--mx", `${x}%`);
  hero.style.setProperty("--my", `${y}%`);
});

// window.addEventListener("scroll", () => {
//   const scrollY = window.scrollY;
//   const heroHeight = hero.offsetHeight;

//   const progress = Math.min(scrollY / heroHeight, 1);

//   hero.style.opacity = `${1 - progress * 0.4}`;
//   hero.style.transform = `scale(${1 - progress * 0.03})`;
// });


});




document.querySelectorAll(".panel").forEach(panel => {
  const video = panel.querySelector("video");

  // Ensure autoplay works
  video.play();

  let isDragging = false;
  let startX = 0;
  let startTime = 0;

  // Mouse
  panel.addEventListener("mousedown", e => {
    isDragging = true;
    panel.style.cursor = "grabbing";
    startX = e.clientX;
    startTime = video.currentTime;
    video.pause();
  });

  panel.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    const scrubSpeed = video.duration / panel.offsetWidth;
    video.currentTime = Math.min(
      Math.max(startTime + delta * scrubSpeed, 0),
      video.duration
    );
  });

  panel.addEventListener("mouseup", () => {
    isDragging = false;
    panel.style.cursor = "grab";
    video.play();
  });

  panel.addEventListener("mouseleave", () => {
    isDragging = false;
    panel.style.cursor = "grab";
    video.play();
  });

  // Touch (mobile)
  panel.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startTime = video.currentTime;
    video.pause();
  });

  panel.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    const scrubSpeed = video.duration / panel.offsetWidth;
    video.currentTime = Math.min(
      Math.max(startTime + delta * scrubSpeed, 0),
      video.duration
    );
  });

  panel.addEventListener("touchend", () => {
    isDragging = false;
    video.play();
  });

});


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".zigzag-row").forEach((row) => {

  const text = row.querySelector(".zigzag-text");
  const image = row.querySelector(".zigzag-image");

  const isReverse = row.classList.contains("reverse");

  gsap.from(text, {
    scrollTrigger: {
      trigger: row,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    x: isReverse ? 80 : -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(image, {
    scrollTrigger: {
      trigger: row,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    x: isReverse ? -80 : 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

});


// mouse hover animation

// const hero = document.querySelector(".hero");
// hero.addEventListener("mousemove", (e) => {
//   const rect = hero.getBoundingClientRect();
//   const x = ((e.clientX - rect.left) / rect.width) * 100;
//   const y = ((e.clientY - rect.top) / rect.height) * 100;

//   hero.style.setProperty("--mx", `${x}%`);
//   hero.style.setProperty("--my", `${y}%`);
// });

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  const progress = Math.min(scrollY / heroHeight, 1);

  hero.style.opacity = `${1 - progress * 0.4}`;
  hero.style.transform = `scale(${1 - progress * 0.03})`;
});
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

  /* 🔥 MENU BG HOVER IMAGE HANDLER (UNCHANGED) */
  const menuImages = {
    "Home": document.querySelector(".bg-img.home"),
    "Software Solutions": document.querySelector(".bg-img.software"),
    "Digital Marketing": document.querySelector(".bg-img.dg"),
    "About Us": document.querySelector(".bg-img.about")
  };

  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      document.querySelectorAll(".bg-img").forEach(img => img.classList.remove("active"));
      const text = link.textContent.trim();
      if(menuImages[text]){
        menuImages[text].classList.add("active");
      }
    });

    link.addEventListener("mouseleave", () => {
      document.querySelectorAll(".bg-img").forEach(img => img.classList.remove("active"));
    });
  });

});