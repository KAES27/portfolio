const app = document.getElementById("app");
const navbarMount = document.getElementById("navbar");
const footerMount = document.getElementById("footer");

const routes = {
  "/home": "pages/home.html",
  "/skills": "pages/skills.html",
  "/portfolio": "pages/portfolio.html",
  "/contact": "pages/contact.html",
  "/about": "pages/about.html",
};

function getRouteFromHash() {
  const hash = window.location.hash || "#/home";
  const route = hash.replace("#", "");
  return routes[route] ? route : "/home";
}

async function loadHTML(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Erreur chargement: ${path}`);
  return await res.text();
}

function setActiveLink(route) {
  document.querySelectorAll(".nbar a[data-link]").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${route}`);
  });
}

async function render() {
  const route = getRouteFromHash();
  const file = routes[route];

  try {
    const html = await loadHTML(file);
    app.innerHTML = html;
    setActiveLink(route);
  } catch (err) {
    app.innerHTML = `<p>Page introuvable.</p>`;
    console.error(err);
  }
}

async function init() {
  try {
    const navHTML = await loadHTML("partials/navbar.html");
    navbarMount.innerHTML = navHTML;

    const footerHTML = await loadHTML("partials/footer.html");
    footerMount.innerHTML = footerHTML;
  } catch (err) {
    console.error("Erreur chargement navbar/footer :", err);
  }

  window.addEventListener("hashchange", render);

  if (!window.location.hash) {
    window.location.hash = "#/home";
  }

  render();
}

init();