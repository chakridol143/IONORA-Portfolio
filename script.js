/* VIDEO DATA */
const sections = [
  { src: "vedios/Home.mp4", title: "IONORA", subtitle: "Transforming Ideas Into Digital Reality.", btnExp: "Explore" },
  { src: "vedios/software2.mp4", title: "IT & AI Solutions", subtitle: "Building Tomorrow's Technology Today.", btnExp: "Discover" },
  {
    src: "vedios/Digital-Marketing.mp4",
    title: "Digital Marketing",
    subtitle: "Grow Your Brand. Amplify Your Reach.",
    btnExp: "Explore",
  },
  { src: "vedios/About.mp4", title: "About", subtitle: "Driving Success Through Technology.", btnExp: "Discover" },
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
  // rel 0 = active (center, large but not fullscreen)
  // rel 1 = above (smaller thumbnail)
  // rel 2 = far above (smaller thumbnail)
  // rel 3 = below (smaller thumbnail)

  if (rel === 0) {
    // Active video - FULLSCREEN
    return {
      xPercent: 0,
      yPercent: 0,
      scale: 1, // Full size
      opacity: 1,
      zIndex: 40,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      z: 50,
    }
  }
  if (rel === 1) {
    // Next video - positioned above active, small thumbnail
    return {
      xPercent: 0,
      yPercent: -120,
      scale: 0.25, // Small thumbnail
      opacity: 0.6,
      zIndex: 30,
      rotateX: 15,
      rotateY: 0,
      rotateZ: 0,
      z: -350,
    }
  }
  if (rel === 2) {
    // Opposite video - far above, small thumbnail
    return {
      xPercent: 0,
      yPercent: -220,
      scale: 0.2, // Smallest thumbnail
      opacity: 0.4,
      zIndex: 20,
      rotateX: 20,
      rotateY: 0,
      rotateZ: 0,
      z: -550,
    }
  }
  if (rel === 3) {
    // Previous video - positioned below active, small thumbnail
    return {
      xPercent: 0,
      yPercent: 120,
      scale: 0.25, // Small thumbnail
      opacity: 0.6,
      zIndex: 30,
      rotateX: -15,
      rotateY: 0,
      rotateZ: 0,
      z: -350,
    }
  }

  return getState(rel % 4)
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

  const isFarJump = steps === 2 // Jumping to opposite video
  const baseDuration = isFarJump ? 0.9 : 1.2 // Slower for adjacent (neighbors)
  const zoomDuration = isFarJump ? 0.5 : 0.7 // Slower zoom for adjacent
  const expandDuration = isFarJump ? 0.7 : 1.4 // Much slower fade-in for adjacent (was 1.2, now 1.4)
  const overlayFadeInDuration = isFarJump ? 0.6 : 1.0 // Slower overlay fade for adjacent

  isAnimating = true

  if (overlay) {
    window.gsap.to(overlay, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power1.in",
    })
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
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
          },
        )
      }
      isAnimating = false
    },
  })

  tl.to(slots, {
    scale: 0.4,
    opacity: 0.8,
    duration: zoomDuration,
    ease: "power1.out",
  })

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
        rotateY: (i) => getState((i - next + len) % len).rotateY,
        rotateZ: (i) => getState((i - next + len) % len).rotateZ,
        z: (i) => getState((i - next + len) % len).z,
        zIndex: (i) => getState((i - next + len) % len).zIndex,
        ease: "power1.inOut",
        stagger: {
          each: 0.08,
          ease: "power1.out",
        },
      },
      "-=0.4",
    )
  }

  tl.to(
    slots,
    {
      duration: expandDuration,
      scale: (i) => {
        const relPos = (i - target + len) % len
        return getState(relPos).scale
      },
      opacity: (i) => {
        const relPos = (i - target + len) % len
        return getState(relPos).opacity
      },
      ease: isFarJump ? "power1.inOut" : "power1.out", // Gentler easing for adjacent
    },
    "-=0.5",
  )
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
      setTimeout(() => (wheelLock = false), 1000)
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

    link.addEventListener("mousemove", (e) => {
      const text = link.textContent.trim()
      const activeImg = menuImages[text]

      if (!activeImg || !activeImg.classList.contains("active")) return

      const rect = link.getBoundingClientRect()
      const x = e.clientX - rect.left // Mouse X position relative to link
      const y = e.clientY - rect.top // Mouse Y position relative to link

      // Calculate movement as percentage (-20 to +20 for smooth parallax)
      const moveX = (x / rect.width - 0.5) * 40 // -20 to +20 range
      const moveY = (y / rect.height - 0.5) * 40 // -20 to +20 range

      // Apply transform to move background image
      activeImg.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`
    })

    link.addEventListener("mouseleave", () => {
      document.querySelectorAll(".bg-img").forEach((img) => {
        img.classList.remove("active")
        img.style.transform = "scale(1.15) translateY(20px)"
      })
    })
  })
})
