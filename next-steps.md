# ✅ Next steps — deploy + finish setup

The website is **done and works** (running locally, and reflected on the temporary tunnel
link). What's left are the external accounts and the deploy, which only I can do.

Current facts:
- **Email:** `dtsconsultingservice@gmail.com` (created, already wired into the site).
- **Domain:** `dts-consulting-services.com` (bought at Namecheap).
- **Code:** pushed to GitHub at `diomidispt/CompanyPage` (branch `main`, all files at repo root).
- **Calendly:** still a placeholder — needs my real link.

---

## 1. Deploy the site free on Cloudflare Pages
Goal: get the site live on a free `*.pages.dev` URL. No domain needed for this step.

- [ ] Go to <https://dash.cloudflare.com> and sign up (use `dtsconsultingservice@gmail.com`).
- [ ] **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → authorize GitHub.
- [ ] Pick the **`diomidispt/CompanyPage`** repo.
- [ ] Build settings:
      - Framework preset: **None**
      - Build command: **(leave empty)**
      - Build output directory: **`/`**
- [ ] **Save and Deploy.** In ~30s I get a live link like `https://companypage-xxx.pages.dev`.
      (I can rename the project to make it `dts-consulting-services.pages.dev`.)
- [ ] Open the link on my phone to check mobile.

Every future `git push` to `main` auto-redeploys. Cost: €0.

## 2. Point my domain (dts-consulting-services.com) at Pages
Easiest path is to move the domain's DNS to Cloudflare (free), then Pages wires itself up.

- [ ] In Cloudflare dashboard: **Add a site** → enter `dts-consulting-services.com` → pick the
      **Free** plan. Cloudflare shows me **2 nameservers** (e.g. `xxx.ns.cloudflare.com`).
- [ ] In **Namecheap**: Domain List → Manage → **Nameservers** → choose **Custom DNS** →
      paste Cloudflare's 2 nameservers → save. (Activation: minutes to a few hours.)
- [ ] Back in Cloudflare **Pages** → my project → **Custom domains** → **Set up a domain** →
      add `dts-consulting-services.com` **and** `www.dts-consulting-services.com`.
      Cloudflare creates the DNS records automatically and issues HTTPS.
- [ ] Test `https://dts-consulting-services.com` loads with the padlock.

(Alternative without moving nameservers: keep DNS at Namecheap and add the CNAME that
Cloudflare Pages gives me. Moving nameservers is simpler and unlocks free email routing below.)

## 3. Set up Calendly (booking button)
- [ ] Sign up free at <https://calendly.com> with `dtsconsultingservice@gmail.com`.
- [ ] Connect Google Calendar. Create a **30-min** event ("Free 30-min call").
- [ ] Copy the event link (e.g. `https://calendly.com/dtsconsultingservice/30min`).
- [ ] Paste it into `main.js` → `CONFIG.CALENDLY` (replace the placeholder), commit + push.
- [ ] Click **Book a free call** on the live site to confirm.

## 4. (Optional) Professional email on the domain — free
Makes the site show `hello@dts-consulting-services.com` instead of the gmail.
- [ ] Cloudflare → **Email** → **Email Routing** → add `hello@` and forward it to
      `dtsconsultingservice@gmail.com`. Free.
- [ ] If I want to *send* from that address too, use Zoho Mail's free tier.
- [ ] Update `CONFIG.EMAIL` in `main.js` when I switch.

## 5. (Optional) Polish
- [ ] Swap the "DPT" avatar tile for a real headshot.
- [ ] Review the "Selected experience" wording in the About section.

---

### Quick reference
- Edit booking link / email / LinkedIn in **one spot**: `main.js` → `CONFIG`.
- Run locally: `cd CompanyPage && python3 -m http.server 4321` → http://localhost:4321
- Full deploy notes: see `README.md`.
