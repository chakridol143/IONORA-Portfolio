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
