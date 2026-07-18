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
  CALENDLY: "https://calendly.com/dtsconsultingservice/30min",
  EMAIL:    "dtsconsultingservice@gmail.com",
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
   Section accordion (mobile only, via CSS media query — this
   handler is harmless on desktop since .section__body ignores
   the is-open class there).
   ------------------------------------------------------------ */
(function sectionAccordion() {
  document.querySelectorAll(".section__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body = document.getElementById(btn.getAttribute("aria-controls"));
      if (!body) return;
      const open = body.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();

/* ------------------------------------------------------------
   Precise in-page smooth scrolling.
   Scrolls so the target lands just below the sticky header,
   instead of hiding under it (fixes "doesn't scroll exactly
   where I want"). Runs AFTER config wiring, so the Calendly /
   email / LinkedIn buttons (now real URLs) are left alone.
   ------------------------------------------------------------ */
(function smoothAnchors() {
  const header = document.querySelector(".nav");
  const gap = 18; // breathing room below the header
  const offset = () => (header ? header.offsetHeight : 68) + gap;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const hash = a.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      // The brand logo / "#top" always goes to the very top of the page.
      if (hash === "#top" || target === header) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", hash);
        return;
      }
      // Jumping straight to a section via nav should reveal its content,
      // not land on a collapsed accordion header (mobile only).
      const toggle = target.querySelector(".section__toggle");
      const body = toggle && document.getElementById(toggle.getAttribute("aria-controls"));
      if (toggle && body && !body.classList.contains("is-open")) {
        body.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
      // Land on the section's heading block — not the padded section top —
      // so the title sits neatly just below the sticky header every time.
      const anchor = target.querySelector(".section__head, .whyus__intro, .cta") || target;
      const y = anchor.getBoundingClientRect().top + window.pageYOffset - offset();
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      history.pushState(null, "", hash);
    });
  });
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
