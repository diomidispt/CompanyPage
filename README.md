# DTS Consulting — company website

A modern, minimal, **single-page** marketing site for DTS Consulting (cloud, Kubernetes &
DevOps platform engineering). Pure static HTML + CSS + vanilla JS — **no build step, no
backend, no secrets**. It runs anywhere you can serve static files.

```
CompanyPage/
├── index.html        # the whole page (all sections)
├── styles.css        # dark, minimal theme (CSS variables at the top)
├── main.js           # config wiring, mobile nav, active link, reveal animations
├── assets/
│   └── favicon.svg    # DTS monogram favicon
├── robots.txt
├── .gitignore
├── README.md
└── next-steps.md      # your personal to-do list (email, Calendly, deploy)
```

---

## ✏️ The 3 things you'll edit

All editable values live in **one place**: the `CONFIG` block at the top of
[`main.js`](main.js). Every button on the page reads from it.

```js
const CONFIG = {
  CALENDLY: "https://calendly.com/dts-consulting/30min", // replace with your real link
  EMAIL:    "dtsconsultingservice@gmail.com",
  LINKEDIN: "https://www.linkedin.com/in/diomidispt/",
};
```

- **CALENDLY** — currently a **placeholder**. Create a free account at
  [calendly.com](https://calendly.com), make a 30-min event, copy its link, paste it here.
- **EMAIL** — powers every "Email us" button (`mailto:`).
- **LINKEDIN** — powers every "LinkedIn" button.

Other editable copy:
- **Notable engagements** in `index.html` (`#about` → `.engagements`) are **placeholder**
  blurbs. Replace them with your own (anonymized) real work.

---

## ▶️ Run it locally

No dependencies. Pick either:

```bash
# Option A — Python (built into macOS)
cd CompanyPage
python3 -m http.server 8080
# open http://localhost:8080

# Option B — Node
npx serve .
```

Or just double-click `index.html` (works, but a local server behaves closer to production).

---

## 🚀 Deploy publicly (free, global, HTTPS)

The site is static, so hosting is essentially free. **Recommended: Cloudflare Pages.**

### Option 1 — Cloudflare Pages ✅ recommended
Free, global CDN, automatic HTTPS, auto-deploys on every `git push`.

1. Push this repo to GitHub (already wired: `git@github.com:diomidispt/CompanyPage.git`).
2. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick `diomidispt/CompanyPage`.
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Save and Deploy.** You get a URL like `https://dts-consulting.pages.dev`.
5. Later: **Custom domains** tab → add `dtsconsulting.com` and follow the DNS steps.

### Option 2 — GitHub Pages
Also free. Repo must be **public** (or you need GitHub Pro for private Pages).

1. Push to GitHub.
2. Repo → **Settings** → **Pages** → **Source: Deploy from a branch** → **Branch: `main` / `/ (root)`** → Save.
3. Site goes live at `https://diomidispt.github.io/CompanyPage/`.
4. Custom domain: add it under Settings → Pages → Custom domain.

### Option 3 — Netlify / Vercel
Same idea — "import from Git", no build command, publish directory `/`. Free tier is plenty.

---

## 🔒 Security notes
- **No secrets, keys, or environment variables** anywhere — it's a static brochure site,
  so there's nothing sensitive to leak.
- The contact path is `mailto:` + Calendly (a trusted third party). No form backend means
  no data handling to secure.
- If you later want a proper contact **form** without running a server, add
  [Formspree](https://formspree.io) (free tier) — it posts to their endpoint; still no
  secrets stored in this repo.
- All hosts above serve over **HTTPS** automatically.

---

## Customizing the look
Colors, spacing and radius are CSS variables at the top of [`styles.css`](styles.css)
(`:root { ... }`). Change `--accent` to reskin the whole site.
