(() => {
  const loader = document.getElementById("page-loader");
  const body = document.body;
  const lines = document.querySelectorAll(".nevera-lines .line");
  const linesWrap = document.querySelector(".nevera-lines");
  const brand = document.querySelector(".brand-name");

  if (!loader || !lines.length || !brand) return;

  body.classList.add("loading");

  // PHASE 1 — charge lines
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add("active"), 400 + i * 250);
  });

  // PHASE 2 — hide lines
  setTimeout(() => linesWrap.classList.add("hide"), 1400);

  // PHASE 3 — show brand
  setTimeout(() => {
    brand.offsetHeight; // force reflow
    brand.classList.add("show");
  }, 1800);

  // PHASE 4 — exit
  setTimeout(() => {
    loader.classList.add("fade-out");
    body.classList.remove("loading");
    setTimeout(() => loader.remove(), 900);
  }, 5200);
})();
