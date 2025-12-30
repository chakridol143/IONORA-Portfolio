function initHeaderMenu() {

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlayBg = document.getElementById("overlay-bg");
  const links = document.querySelectorAll(".sidebar-links a");

  if (!menuToggle || !sidebar || !overlayBg) return;

  let open = false;

  function openMenu() {
    open = true;
    menuToggle.classList.add("active");
    sidebar.classList.add("open");
    overlayBg.classList.add("active");

    gsap.fromTo(
      sidebar,
      { clipPath: "circle(0% at 95% 40px)" },
      { clipPath: "circle(150% at 95% 40px)", duration: 0.8, ease: "power4.inOut" }
    );

    gsap.to(links, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 });
  }

  function closeMenu() {
    open = false;
    menuToggle.classList.remove("active");
    overlayBg.classList.remove("active");

    gsap.to(links, { opacity: 0, y: 25, duration: 0.35 });

    gsap.to(sidebar, {
      clipPath: "circle(0% at 95% 40px)",
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => sidebar.classList.remove("open")
    });
  }

  menuToggle.onclick = () => (open ? closeMenu() : openMenu());
  overlayBg.onclick = closeMenu;

  const page = location.pathname.split("/").pop() || "index.html";
  links.forEach(a =>
    a.classList.toggle("active-link", a.getAttribute("href") === page)
  );

  const menuImages = {
    "IONORA": document.querySelector(".bg-img.home"),
    "Software Solutions": document.querySelector(".bg-img.software"),
    "Digital Marketing": document.querySelector(".bg-img.dg"),
    "About Us": document.querySelector(".bg-img.about"),
    "Contact Us": document.querySelector(".bg-img.about")
  };

  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      document.querySelectorAll(".bg-img").forEach(img => img.classList.remove("active"));
      const key = link.textContent.trim();
      if (menuImages[key]) menuImages[key].classList.add("active");
    });

    link.addEventListener("mouseleave", () => {
      document.querySelectorAll(".bg-img").forEach(img => img.classList.remove("active"));
    });
  });

}
