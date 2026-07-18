# ✅ Next steps — things I still need to do

A checklist so I remember where I left off. The website itself is **done and works
locally**; these are the external accounts / deploy tasks that only I can finish.

---

## 1. Set up Calendly (booking button)
- [ ] Create a **free** account at <https://calendly.com>.
- [ ] Create a **30-minute** event (e.g. "Free 30-min intro call").
- [ ] Copy the event link (looks like `https://calendly.com/my-name/30min`).
- [ ] Paste it into `main.js` → `CONFIG.CALENDLY` (replace the placeholder).
- [ ] Reload the site and click **Book a free call** to confirm it opens my Calendly.

## 2. Set up the email
- [ ] Decide the address. For now the plan is **`dtsconsulting@gmail.com`** (Gmail, free).
      - Create that Gmail account if it doesn't exist yet.
      - It's already wired into the site (`CONFIG.EMAIL` in `main.js`) — just change the
        string if I pick a different address.
- [ ] (Later / optional) Go pro with a custom domain:
      - `dts.com` is **taken** (DTS Inc, audio company) — so register something like
        **`dtsconsulting.com`** (~$10–12/yr).
      - Then I can have `hello@dtsconsulting.com` + `diomidis@dtsconsulting.com` and a
        future `nikos@dtsconsulting.com`. Free email hosting via Cloudflare Email Routing
        or Zoho Mail.
      - Update `CONFIG.EMAIL` when I switch.

## 3. Deploy it publicly (free)
- [ ] Push the repo to GitHub (see README — remote is already set).
- [ ] **Cloudflare Pages** (recommended): connect the repo → preset `None`, no build
      command, output dir `/` → get `dts-consulting.pages.dev`.
      - *(Alternative: GitHub Pages — repo must be public.)*
- [ ] Open the live URL on my phone to check it looks good on mobile.

## 4. (Later) Custom domain
- [ ] Register `dtsconsulting.com` (Cloudflare Registrar / Namecheap / etc.).
- [ ] In Cloudflare Pages → **Custom domains** → add it, follow DNS steps (HTTPS is automatic).
- [ ] Update `CONFIG.EMAIL` if I moved to a domain email.

## 5. Polish the content (optional but recommended)
- [ ] Replace the **placeholder "Notable engagements"** in `index.html` (`#about` section)
      with my own anonymized real work.
- [ ] Double-check certifications/dates are exactly how I want them shown.
- [ ] (Optional) Add a real headshot in place of the "DPT" avatar tile.

---

### Quick reference
- Edit booking/email/LinkedIn in **one spot**: `main.js` → `CONFIG`.
- Run locally: `cd CompanyPage && python3 -m http.server 8080` → http://localhost:8080
- Full deploy instructions: see `README.md`.
