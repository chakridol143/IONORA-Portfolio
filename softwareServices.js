document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".zigzag-row");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.25 });

  rows.forEach(row => {
    row.classList.add("hidden");
    observer.observe(row);
  });
});


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