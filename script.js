// 1. Typing effect
const words = ["B.Tech CSE Student", "Web Developer", "Python & Java Learner", "Ex-Telecom Field Engineer"];
const typing = document.getElementById("typing");
let w = 0, c = 0, deleting = false;

function type() {
  const word = words[w];
  typing.textContent = word.substring(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1200); }
  else { deleting = false; w = (w + 1) % words.length; }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// 2. Dark / Light theme (saved in browser)
const themeBtn = document.getElementById("themeBtn");
try {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
  }
} catch (e) {}

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  themeBtn.textContent = isLight ? "☀️" : "🌙";
  try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch (e) {}
});

// 3. Mobile menu
const menu = document.getElementById("menu");
document.getElementById("menuBtn").addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// 4. Scroll reveal animation
const sections = document.querySelectorAll("section:not(.hero)");
sections.forEach(s => s.classList.add("reveal"));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
}, { threshold: 0.15 });
sections.forEach(s => observer.observe(s));

// 5. Scroll progress, back-to-top, active menu link
const progress = document.getElementById("progress");
const topBtn = document.getElementById("topBtn");
const links = document.querySelectorAll("#menu a");
const allSections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / max) * 100 + "%";
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";

  let current = "";
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});

topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));