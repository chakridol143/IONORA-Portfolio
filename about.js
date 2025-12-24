gsap.registerPlugin(ScrollTrigger);

// Reveal text
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
  });
});

// Parallax images
gsap.utils.toArray(".parallax img").forEach(img => {
  gsap.to(img, {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      scrub: true,
    }
  });
});
