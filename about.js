gsap.registerPlugin(ScrollTrigger);

// === REVEAL ANIMATIONS (FASTER) ===
gsap.utils.toArray(".reveal").forEach((el, index) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      markers: false,
    },
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: index * 0.05,
    ease: "power2.out",
  });
});

// === IMPROVED PARALLAX (NO UPSIDE EFFECT) ===
gsap.utils.toArray(".parallax img").forEach(img => {
  const parent = img.closest(".image");

  gsap.from(img, {
    scrollTrigger: {
      trigger: parent,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
      markers: false,
    },
    y: -50,
    ease: "none",
  });
});

// === IMAGE SCALE REVEAL ANIMATION ===
gsap.utils.toArray(".image").forEach((image, index) => {
  gsap.from(image, {
    scrollTrigger: {
      trigger: image,
      start: "top 65%",
    },
    opacity: 0,
    scale: 0.93,
    duration: 1.2,
    delay: index * 0.1,
    ease: "back.out(1.3)",
  });
});

// === SECTION TITLE ANIMATION ===
gsap.utils.toArray(".section-title").forEach((title, index) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
    },
    opacity: 0,
    x: -40,
    duration: 0.8,
    delay: index * 0.08,
    ease: "power3.out",
  });
});

// === LIST ITEMS STAGGER ===
gsap.utils.toArray(".points").forEach(list => {
  const items = list.querySelectorAll("li");

  gsap.from(items, {
    scrollTrigger: {
      trigger: list,
      start: "top 80%",
    },
    opacity: 0,
    x: -25,
    stagger: 0.08,
    duration: 0.6,
    ease: "power2.out",
  });
});

// === INTERACTIVE LIST HOVER EFFECT ===
document.querySelectorAll(".points li").forEach(item => {
  const bullet = item.querySelector("::before");

  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      color: "#00e5ff",
      duration: 0.2,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      color: "#c5cfd6",
      duration: 0.2,
    });
  });
});

// === HERO CONTENT ENTRANCE ===
const heroContent = document.querySelector(".hero-content");
if (heroContent) {
  gsap.from(heroContent, {
    opacity: 0,
    y: 60,
    duration: 1.2,
    delay: 0.2,
    ease: "power3.out",
  });
}

// === HERO TITLE CHARACTER ANIMATION ===
function splitText(element) {
  const text = element.innerText;
  const chars = text.split("");
  element.innerHTML = chars.map((char, i) => {
    if (char === " ") return `<span style="display: inline-block; width: 0.4em;"></span>`;
    return `<span style="display: inline-block; opacity: 0;">${char}</span>`;
  }).join("");
  return element.querySelectorAll("span");
}

const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
  const chars = splitText(heroTitle);
  gsap.to(chars, {
    opacity: 1,
    duration: 0.6,
    stagger: 0.02,
    delay: 0.4,
    ease: "power2.out",
  });
}

// === EYEBROW ANIMATION ===
const eyebrow = document.querySelector(".eyebrow");
if (eyebrow) {
  gsap.from(eyebrow, {
    opacity: 0,
    y: 20,
    duration: 0.7,
    delay: 0.15,
    ease: "power2.out",
  });
}

// === CTA BUTTON INTERACTIVE ===
const ctaBtn = document.querySelector(".cta-btn");
if (ctaBtn) {
  ctaBtn.addEventListener("mouseenter", () => {
    gsap.to(ctaBtn, {
      boxShadow: "0 35px 70px rgba(11,188,214,0.5)",
      duration: 0.3,
    });
  });

  ctaBtn.addEventListener("mouseleave", () => {
    gsap.to(ctaBtn, {
      boxShadow: "0 20px 40px rgba(11,188,214,0.3)",
      duration: 0.3,
    });
  });
}

// === SECTION TEXT ANIMATION ===
gsap.utils.toArray(".section-text").forEach((text, index) => {
  gsap.from(text, {
    scrollTrigger: {
      trigger: text,
      start: "top 80%",
    },
    opacity: 0,
    y: 25,
    duration: 0.8,
    delay: index * 0.1,
    ease: "power2.out",
  });
});

// === IMAGE BORDER GLOW EFFECT ===
gsap.utils.toArray(".image").forEach(image => {
  image.addEventListener("mouseenter", () => {
    gsap.to(image, {
      "--glow": "1",
      duration: 0.3,
    });
  });

  image.addEventListener("mouseleave", () => {
    gsap.to(image, {
      "--glow": "0",
      duration: 0.3,
    });
  });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, autoKill: true },
        ease: "power3.inOut",
      });
    }
  });
});

// === FOOTER FADE IN ===
const footer = document.getElementById("global-footer");
if (footer) {
  gsap.from(footer, {
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: footer,
      start: "top 90%",
    }
  });
}

// === REFRESH SCROLL TRIGGER ===
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// === MOUSE PARALLAX ON HERO ===
const heroSection = document.querySelector(".hero");
if (heroSection) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(heroContent, {
      x: x,
      y: y,
      duration: 0.8,
      overwrite: "auto",
    });
  });
}

// === HEADER INJECTION ===
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("global-header").innerHTML = html;

      const s = document.createElement("script");
      s.src = "header.js";
      s.onload = () => {
        if (typeof initHeaderMenu !== 'undefined') {
          initHeaderMenu();
        }
      };
      document.body.appendChild(s);
    })
    .catch(err => console.error("Failed to load header:", err));
});

// === ACCESSIBILITY: RESPECT PREFERS REDUCED MOTION ===
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.set(".reveal", { opacity: 1, y: 0 });
  gsap.globalTimeline.timeScale(0.01);
}
