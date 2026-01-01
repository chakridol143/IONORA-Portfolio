function initHeaderMenu() {
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

    links.forEach((link, index) => {
      /* Reduced stagger from 80ms to 50ms for faster link cascading */
      setTimeout(() => {
        link.style.opacity = "1"
        link.style.transform = "translateY(0)"
      }, index * 50)
    })
  }

  function closeMenu() {
    open = false
    menuToggle.classList.remove("active")
    overlayBg.classList.remove("active")

    links.forEach((link) => {
      link.style.opacity = "0"
      link.style.transform = "translateY(25px)"
    })

    /* Reduced timeout from 600ms to 350ms to match faster 0.4s closing animation */
    setTimeout(() => sidebar.classList.remove("open"), 350)
  }

  menuToggle.addEventListener("mouseenter", () => {
    menuToggle.classList.add("icon-hover")
  })

  menuToggle.addEventListener("mouseleave", () => {
    menuToggle.classList.remove("icon-hover")
  })

  menuToggle.onclick = () => (open ? closeMenu() : openMenu())
  overlayBg.onclick = closeMenu

  const page = location.pathname.split("/").pop() || "index.html"
  links.forEach((a) => a.classList.toggle("active-link", a.getAttribute("href") === page))

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
      const key = link.textContent.trim()
      if (menuImages[key]) {
        menuImages[key].classList.add("active")
      }

      links.forEach((otherLink) => {
        if (otherLink !== link) {
          otherLink.classList.add("dimmed")
        }
      })

      link.classList.add("text-hover")
    })

    link.addEventListener("mousemove", (e) => {
      const key = link.textContent.trim()
      const bgImg = menuImages[key]
      if (bgImg && bgImg.classList.contains("active")) {
        const rect = bgImg.parentElement.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        bgImg.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`
      }
    })

    link.addEventListener("mouseleave", () => {
      document.querySelectorAll(".bg-img").forEach((img) => {
        img.classList.remove("active")
        img.style.transform = "translate(0, 0) scale(1)"
      })

      links.forEach((otherLink) => {
        otherLink.classList.remove("dimmed")
      })

      link.classList.remove("text-hover")
    })
  })
}
