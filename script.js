/* VIDEO DATA */
const sections = [
  { src: "vedios/Home.mp4", title: "IONORA", subtitle: "IONORA the elite market place.", btnExp: "Explore" },
  { src: "vedios/software2.mp4", title: "IT & AI Solutions", subtitle: " AI Automations.", btnExp: "Discover" },
  {
    src: "vedios/Digital-Marketing.mp4",
    title: "Digital Marketing",
    subtitle: "with AI Automations.",
    btnExp: "Explore",
  },
  { src: "vedios/About.mp4", title: "About", subtitle: "IONORA Pvt Ltd.", btnExp: "Discover" },
]

const slots = Array.from(document.querySelectorAll(".slot"))
const titleEl = document.getElementById("title")
const subtitleEl = document.getElementById("subtitle")
const btnExp = document.getElementById("btnExp")
const overlay = document.getElementById("overlay")
const sideNavItems = document.querySelectorAll(".side-nav-item")

const len = slots.length
let active = 0
let isAnimating = false

/* LOAD VIDEOS - only if slots exist (for index.html) */
if (slots.length > 0) {
  slots.forEach((video, i) => {
    video.src = sections[i].src
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.play().catch(() => {})
  })
}

/* POSITION STATES */
function getState(rel) {
  // rel 0 = active (center, large, full size)
  // rel 1 = above (smaller, positioned above)
  // rel 2 = far below (smaller, positioned far below)
  // rel 3 = below (smaller, positioned below active)

  if (rel === 0) {
    // Active video - center, full size, front
    return {
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      opacity: 1,
      zIndex: 40,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      z: 50, // Reduced for simpler transforms
    }
  }
  if (rel === 1) {
    // Next video - small thumbnail, positioned above
    return {
      xPercent: 0,
      yPercent: -75,
      scale: 0.3,
      opacity: 0.7,
      zIndex: 30,
      rotateX: 8, // Reduced rotation for performance
      rotateY: 0,
      rotateZ: 0,
      z: -400, // Reduced depth
    }
  }
  if (rel === 2) {
    // Opposite video - small thumbnail, far below
    return {
      xPercent: 0,
      yPercent: 105,
      scale: 0.22,
      opacity: 0.5,
      zIndex: 20,
      rotateX: -8, // Reduced rotation
      rotateY: 0,
      rotateZ: 0,
      z: -500,
    }
  }
  if (rel === 3) {
    // Previous video - small thumbnail, below active
    return {
      xPercent: 0,
      yPercent: 75,
      scale: 0.3,
      opacity: 0.7,
      zIndex: 30,
      rotateX: -8,
      rotateY: 0,
      rotateZ: 0,
      z: -400,
    }
  }

  return getState(rel % 4) // Fallback
}

/* INITIAL - only if we have slots */
function setInitial() {
  if (slots.length > 0) {
    slots.forEach((s, i) => {
      const state = getState((i - active + len) % len)
      window.gsap.set(s, state)
    })
    updateOverlay()
    updateSideNav()
  }
}

const gsap = window.gsap // Declare the gsap variable here
if (gsap && slots.length > 0) {
  setInitial()
}

/* UPDATE TEXT */
function updateOverlay() {
  if (titleEl) titleEl.textContent = sections[active].title
  if (subtitleEl) subtitleEl.textContent = sections[active].subtitle
  if (btnExp) {
    btnExp.textContent = sections[active].btnExp
    btnExp.onclick = () => {
      const t = sections[active].title
      if (t === "IT & AI Solutions") location.href = "software.html"
      else if (t === "About") location.href = "about.html"
      else location.href = "dgmarketing.html"
    }
  }
}

/* NAV ACTIVE */
function updateSideNav() {
  if (sideNavItems.length > 0) {
    sideNavItems.forEach((el, i) => el.classList.toggle("active", i === active))
  }
}

/* ROTATE */
function rotateTo(target) {
  if (isAnimating || target === active || slots.length === 0 || typeof window.gsap === "undefined") return

  target = (target + len) % len
  const f = (target - active + len) % len
  const b = (active - target + len) % len
  const dir = f <= b ? 1 : -1
  const steps = dir === 1 ? f : b

  isAnimating = true

  if (overlay) {
    window.gsap.to(overlay, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    })
  }

  const tl = window.gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 1 }, // Faster, simpler easing
    onComplete: () => {
      active = target
      updateOverlay()
      updateSideNav()
      if (overlay) {
        window.gsap.fromTo(
          overlay,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out", // Simpler easing
          },
        )
      }
      isAnimating = false
    },
  })

  for (let s = 1; s <= steps; s++) {
    const next = (active + dir * s + len) % len

    tl.to(
      slots,
      {
        duration: 1, // Faster transitions
        xPercent: (i) => getState((i - next + len) % len).xPercent,
        yPercent: (i) => getState((i - next + len) % len).yPercent,
        scale: (i) => getState((i - next + len) % len).scale,
        opacity: (i) => getState((i - next + len) % len).opacity,
        rotateX: (i) => getState((i - next + len) % len).rotateX,
        rotateY: (i) => getState((i - next + len) % len).rotateY,
        rotateZ: (i) => getState((i - next + len) % len).rotateZ,
        z: (i) => getState((i - next + len) % len).z,
        zIndex: (i) => getState((i - next + len) % len).zIndex,
        ease: "power2.inOut", // Simpler, more performant easing
        stagger: {
          each: 0.04, // Reduced stagger time
          ease: "power1.out",
        },
      },
      s === 1 ? 0 : "-=0.85", // Better overlap timing
    )
  }
}

/* SIDE NAV CLICK - only if side nav exists */
if (sideNavItems.length > 0) {
  sideNavItems.forEach((item) => {
    item.addEventListener("click", () => rotateTo(Number(item.dataset.index)))
  })
}

/* SCROLL - only if we have video slots */
if (slots.length > 0) {
  let wheelLock = false
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault()
      if (wheelLock) return
      wheelLock = true
      setTimeout(() => (wheelLock = false), 800)
      e.deltaY > 0 ? rotateTo(active + 1) : rotateTo(active - 1)
    },
    { passive: false },
  )

  /* TOUCH */
  let startY = 0
  window.addEventListener("touchstart", (e) => (startY = e.touches[0].clientY))
  window.addEventListener("touchend", (e) => {
    const dy = e.changedTouches[0].clientY - startY
    if (Math.abs(dy) > 50) dy < 0 ? rotateTo(active + 1) : rotateTo(active - 1)
  })
}

/* MENU - Works on all pages */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const sidebar = document.getElementById("sidebar")
  const overlayBg = document.getElementById("overlay-bg")
  const links = document.querySelectorAll(".sidebar-links a")

  if (!menuToggle || !sidebar || !overlayBg) return

  let open = false

  function openMenu() {
    open = true
    menuToggle.classList.add("active")
    sidebar.classList.add("open")
    overlayBg.classList.add("active")

    if (typeof window.gsap !== "undefined") {
      window.gsap.fromTo(
        sidebar,
        { clipPath: "circle(0% at 95% 40px)" },
        { clipPath: "circle(150% at 95% 40px)", duration: 0.8, ease: "power4.inOut" },
      )

      window.gsap.to(links, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" })
    }
  }

  function closeMenu() {
    open = false
    menuToggle.classList.remove("active")
    overlayBg.classList.remove("active")

    if (typeof window.gsap !== "undefined") {
      window.gsap.to(links, { opacity: 0, y: 25, duration: 0.35 })

      window.gsap.to(sidebar, {
        clipPath: "circle(0% at 95% 40px)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => sidebar.classList.remove("open"),
      })
    } else {
      sidebar.classList.remove("open")
    }
  }

  menuToggle.onclick = () => (open ? closeMenu() : openMenu())
  overlayBg.onclick = closeMenu

  /* ACTIVE LINK - improved to highlight correct menu items */
  const page = location.pathname.split("/").pop() || "index.html"

  links.forEach((a) => {
    const href = a.getAttribute("href")
    let isActive = false

    if (href === "index.html" && (page === "index.html" || page === "")) {
      isActive = true
    } else if (a.textContent.trim() === "Software Solutions" && page === "software.html") {
      isActive = true
    } else if (href === page) {
      isActive = true
    }

    a.classList.toggle("active-link", isActive)
  })

  /* Menu hover background images */
  const menuImages = {
    IONORA: document.querySelector(".bg-img.home"),
    "Software Solutions": document.querySelector(".bg-img.software"),
    "Digital Marketing": document.querySelector(".bg-img.dg"),
    "About Us": document.querySelector(".bg-img.about"),
    "Contact Us": document.querySelector(".bg-img.about"),
  }

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      document.querySelectorAll(".bg-img").forEach((img) => img.classList.remove("active"))

      const text = link.textContent.trim()

      if (menuImages[text]) {
        menuImages[text].classList.add("active")
      }
    })

    link.addEventListener("mouseleave", () => {
      document.querySelectorAll(".bg-img").forEach((img) => img.classList.remove("active"))
    })
  })
})
