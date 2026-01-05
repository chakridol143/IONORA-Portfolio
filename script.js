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
const scrollIndicator = document.querySelector(".scroll-indicator")
const viewer = document.getElementById("viewer")

const len = slots.length
let active = 0
let isAnimating = false
let hasScrolled = false

// Create custom cursor element
const customCursor = document.createElement("div")
customCursor.className = "custom-scroll-cursor"
document.body.appendChild(customCursor)

const isMobileDevice = () => window.innerWidth <= 800
let isOverVideo = false

// Interactive elements that should hide custom cursor and show pointer
const interactiveSelectors = [
  ".glow-btn",
  ".side-nav-item",
  ".nav-btn",
  "#logo",
  "header",
  ".header",
  ".menu-icon",
  "a",
  "button",
]

// Track mouse position
document.addEventListener("mousemove", (e) => {
  if (isOverVideo && !isMobileDevice()) {
    customCursor.style.left = e.clientX + "px"
    customCursor.style.top = e.clientY + "px"
  }
})

document.addEventListener("mouseover", (e) => {
  if (isMobileDevice()) return

  const isInteractive = interactiveSelectors.some((selector) => e.target.closest(selector))

  if (isInteractive) {
    customCursor.classList.remove("active")
    document.body.style.cursor = "pointer"
    console.log("[v0] Hovering over interactive element")
  }
})

// Show custom cursor when leaving interactive elements
document.addEventListener("mouseout", (e) => {
  if (isMobileDevice()) return

  const isInteractive = interactiveSelectors.some((selector) => e.target.closest(selector))

  if (isInteractive && isOverVideo) {
    customCursor.classList.add("active")
    document.body.style.cursor = "none"
    console.log("[v0] Back to video area")
  }
})

// Show custom cursor only when over video container
if (viewer) {
  viewer.addEventListener("mouseenter", () => {
    if (!isMobileDevice()) {
      isOverVideo = true
      customCursor.classList.add("active")
      document.body.style.cursor = "none"
      console.log("[v0] Entered video area - show custom cursor")
    }
  })

  viewer.addEventListener("mouseleave", () => {
    isOverVideo = false
    customCursor.classList.remove("active")
    document.body.style.cursor = "auto"
    console.log("[v0] Left video area - hide custom cursor")
  })
}

/* LOAD VIDEOS */
if (slots.length > 0) {
  slots.forEach((video, i) => {
    video.src = sections[i].src
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.play().catch(() => {})
  })
}

function getState(rel) {
  if (rel === 0) return { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, zIndex: 40, rotateX: 0, z: 50 }
  if (rel === 1) return { xPercent: 0, yPercent: 120, scale: 0.25, opacity: 0.6, zIndex: 30, rotateX: -15, z: -350 }
  if (rel === 2) return { xPercent: 0, yPercent: 220, scale: 0.2, opacity: 0.4, zIndex: 20, rotateX: -20, z: -550 }
  if (rel === 3) return { xPercent: 0, yPercent: -120, scale: 0.25, opacity: 0.6, zIndex: 30, rotateX: 15, z: -350 }
  return getState(rel % 4)
}

/* INITIAL SETUP */
function setInitial() {
  if (slots.length > 0) {
    slots.forEach((s, i) => window.gsap.set(s, getState((i - active + len) % len)))
    updateOverlay()
    updateSideNav()
  }
}

const gsap = window.gsap
if (gsap && slots.length > 0) setInitial()

/* OVERLAY TEXT */
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
  if (sideNavItems.length > 0) sideNavItems.forEach((el, i) => el.classList.toggle("active", i === active))
}

/* ROTATE */
function rotateTo(target) {
  if (isAnimating || target === active || slots.length === 0 || typeof window.gsap === "undefined") return

  target = (target + len) % len
  const f = (target - active + len) % len
  const b = (active - target + len) % len
  const dir = f <= b ? 1 : -1
  const steps = dir === 1 ? f : b
  const isFarJump = steps === 2

  const zoomDuration = 0.55
  const baseDuration = 0.9
  const expandDuration = isFarJump ? 1.5 : 1.1
  const overlayFadeInDuration = isFarJump ? 1.1 : 0.8

  isAnimating = true

  if (overlay) {
    window.gsap.to(overlay, { opacity: 0, scale: 0.95, duration: 0.5, ease: "power1.in" })
  }

  const tl = window.gsap.timeline({
    defaults: { ease: "power1.inOut", duration: baseDuration },
    onComplete: () => {
      active = target
      updateOverlay()
      updateSideNav()
      if (overlay) {
        window.gsap.fromTo(
          overlay,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: overlayFadeInDuration, ease: "power1.out" },
        )
      }
      isAnimating = false
    },
  })

  tl.to(slots, { scale: 0.4, opacity: 0.8, duration: zoomDuration, ease: "power1.out" })

  for (let s = 1; s <= steps; s++) {
    const next = (active + dir * s + len) % len

    tl.to(
      slots,
      {
        duration: baseDuration,
        xPercent: (i) => getState((i - next + len) % len).xPercent,
        yPercent: (i) => getState((i - next + len) % len).yPercent,
        scale: 0.4,
        opacity: (i) => Math.max(0.5, getState((i - next + len) % len).opacity),
        rotateX: (i) => getState((i - next + len) % len).rotateX,
        z: (i) => getState((i - next + len) % len).z,
        zIndex: (i) => getState((i - next + len) % len).zIndex,
        stagger: { each: 0.08, ease: "power1.out" },
      },
      "-=0.4",
    )
  }

  tl.to(
    slots,
    {
      duration: expandDuration,
      scale: (i) => getState((i - target + len) % len).scale,
      opacity: (i) => getState((i - target + len) % len).opacity,
      rotateX: (i) => getState((i - target + len) % len).rotateX,
      ease: isFarJump ? "power1.inOut" : "power1.out",
    },
    "-=0.5",
  )
}

/* SCROLL INDICATOR FADE OUT */
function hideScrollIndicator() {
  if (!hasScrolled && scrollIndicator) {
    hasScrolled = true
    scrollIndicator.classList.add("hidden")
  }
}

/* SIDE NAV CLICK */
if (sideNavItems.length > 0) {
  sideNavItems.forEach((item) => item.addEventListener("click", () => rotateTo(Number(item.dataset.index))))
}

/* SCROLL */
if (slots.length > 0) {
  let wheelLock = false
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault()
      if (wheelLock) return
      wheelLock = true
      setTimeout(() => (wheelLock = false), 1000)
      e.deltaY > 0 ? rotateTo(active + 1) : rotateTo(active - 1)
      hideScrollIndicator()
    },
    { passive: false },
  )

  /* TOUCH */
  let startY = 0
  window.addEventListener("touchstart", (e) => (startY = e.touches[0].clientY))
  window.addEventListener("touchend", (e) => {
    const dy = e.changedTouches[0].clientY - startY
    if (Math.abs(dy) > 50) {
      dy < 0 ? rotateTo(active + 1) : rotateTo(active - 1)
      hideScrollIndicator()
    }
  })
}
fetch("loader.html")
.then(res => res.text())
.then(html => {
  document.getElementById("loader-root").innerHTML = html;

  const s = document.createElement("script");
  s.src = "loader.js";
  document.body.appendChild(s);
});