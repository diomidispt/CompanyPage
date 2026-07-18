/* ============================================================
   DTS Consulting — main.js
   Vanilla JS: config wiring, mobile nav, active link, reveals.
   ============================================================ */

/* ------------------------------------------------------------
   EDIT ME — the only values you'll usually change.
   1. CALENDLY: after creating a free account at calendly.com,
      paste your real event link here (e.g.
      "https://calendly.com/your-name/30min").
   2. EMAIL:    your contact email.
   3. LINKEDIN: your LinkedIn profile URL.
   Every "Book a call", "Email us" and "LinkedIn" button on the
   page reads from here — change once, updates everywhere.
   ------------------------------------------------------------ */
const CONFIG = {
  CALENDLY: "https://calendly.com/dts-consulting/30min", // <-- PLACEHOLDER: replace with your real Calendly link
  EMAIL:    "dtsconsulting@gmail.com",
  LINKEDIN: "https://www.linkedin.com/in/diomidispt/",
};

(function wireConfig() {
  document.querySelectorAll(".js-book").forEach((el) => {
    el.setAttribute("href", CONFIG.CALENDLY);
  });
  document.querySelectorAll(".js-linkedin").forEach((el) => {
    el.setAttribute("href", CONFIG.LINKEDIN);
  });
  document.querySelectorAll(".js-email").forEach((el) => {
    el.setAttribute(
      "href",
      "mailto:" + CONFIG.EMAIL + "?subject=" + encodeURIComponent("Free 30-min consultation")
    );
  });
})();

/* ------------------------------------------------------------
   Mobile nav toggle
   ------------------------------------------------------------ */
(function mobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close the menu after tapping any in-page link.
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
})();

/* ------------------------------------------------------------
   Active nav link highlight based on section in view
   ------------------------------------------------------------ */
(function activeLink() {
  const sections = document.querySelectorAll("main section[id]");
  const linkFor = {};
  document.querySelectorAll('.nav__links a[href^="#"]').forEach((a) => {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });
  if (!sections.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(linkFor).forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => obs.observe(s));
})();

/* ------------------------------------------------------------
   Scroll-reveal animation
   ------------------------------------------------------------ */
(function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          o.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  items.forEach((el) => obs.observe(el));
})();

/* ------------------------------------------------------------
   Current year in footer
   ------------------------------------------------------------ */
(function year() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
})();
