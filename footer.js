document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("global-footer").innerHTML = html;
    });
});