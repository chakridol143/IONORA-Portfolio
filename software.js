document.addEventListener("DOMContentLoaded", () => {

  const titles = [
    `IONORA <br><span class="highlight">IT Solutions</span><br>For Digital Growth`,
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

});