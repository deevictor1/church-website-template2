# Church Website Template

> A free, modern, fully editable church website — no WordPress, no backend, no monthly fees.
> Built with plain HTML/CSS/JS, deployed on Netlify, managed through a built-in admin panel.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/marcus7288/church-website-template)

---

## Quick Start (5 Steps)

**Step 1 — Use this template**
Click the green **"Use this template"** button at the top of this page on GitHub, then choose "Create a new repository." Name it after your church.

**Step 2 — Deploy to Netlify**
Click the **Deploy to Netlify** button above (or go to [netlify.com](https://netlify.com), connect your GitHub account, and import your new repo). Netlify will build and publish the site automatically — free tier is plenty.

**Step 3 — Edit `config.json`**
Open `config.json` in your repo and fill in your church's name, address, phone, email, social links, and giving URL. The website reads this file on every load and populates itself automatically.

**Step 4 — Set up the admin panel**
- Open `/admin.html` on your live site
- Log in with the default password: `faithag2026` *(change this immediately — see below)*
- Go to **Church Settings** and enter your GitHub username and repo name
- Generate a GitHub token (see instructions below) and paste it into the token field
- Click **Save & Publish All** — your site updates in ~30 seconds

**Step 5 — Upload your logo and hero photo**
- Replace `logo 2.png` in the repo with your church's logo (keep the same filename, or update it in `index.html`)
- Upload a photo named `hero-bg.jpg` — it will appear as the hero background automatically

---

## Repository Structure

```
/
├── index.html            # Public website (reads from all JSON files)
├── admin.html            # Staff admin panel (password protected)
├── config.json           # ⭐ START HERE — all church settings
├── events.json           # Upcoming events
├── announcements.json    # Top-of-page announcement banner
├── sermons.json          # Featured sermon (YouTube embed + details)
├── hero-bg.jpg           # Hero background photo (upload to activate)
├── logo 2.png            # Church logo
├── CUSTOMIZATION.md      # Guide to colors, fonts, and layout
└── README.md             # This file
```

---

## config.json Reference

This is the only file you need to edit to brand the site for a new church:

```json
{
  "churchName": "New Covenant Church, Bolton",
  "churchShortName": "NCCBolton",
  "tagline": "Love | Grow | Share",
  "denomination": "Assembly of God",
  "city": "Your City",
  "state": "MO",
  "address": "123 Main Street",
  "addressLine2": "Your City, MO 00000",
  "phone": "(000) 000-0000",
  "email": "info@youremail.com",
  "services": [
    { "day": "Sunday", "name": "Sunday Morning Worship", "time": "10:30 AM", "description": "..." },
    { "day": "Wednesday", "name": "Wednesday Night", "time": "7:00 PM", "description": "..." }
  ],
  "social": {
    "facebook": "https://facebook.com/yourpage",
    "instagram": "https://instagram.com/yourpage",
    "youtube": "https://youtube.com/@yourchannel"
  },
  "giving": {
    "url": "https://tithe.ly/give",
    "label": "Give Online"
  },
  "maps": {
    "embedUrl": "https://www.google.com/maps/embed?pb=..."
  },
  "github": {
    "owner": "your-github-username",
    "repo": "your-repo-name",
    "branch": "main"
  }
}
```

> **Getting a Google Maps embed URL:** Go to [maps.google.com](https://maps.google.com), search your church address, click Share → Embed a map, and copy the `src="..."` URL from the iframe code.

---

## Admin Panel

Visit `/admin.html` on your live site.

| Tab | What You Can Do |
|---|---|
| **Events** | Add, edit, delete upcoming events |
| **Announcement** | Toggle the top banner on/off, edit message |
| **Sermons** | Update featured sermon, YouTube embed, speaker |
| **Church Settings** | Edit all config.json values (name, address, social, GitHub settings) |
| **Change Password** | Generate a new SHA-256 password hash |

### Default Password
```
faithag2026
```
Change it immediately: go to **Change Password**, generate a hash, then replace `STORED_HASH` in `admin.html`.

### Publishing Changes
Click **"Save & Publish All"** — the admin panel pushes all JSON files to GitHub via the API, and Netlify redeploys in ~30–60 seconds.

---

## GitHub Token Setup

Required once per browser to enable publishing from the admin panel.

1. Go to [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
2. Click **Generate new token** → give it a name (e.g. *Church Admin Panel*)
3. Set **Repository access** → Only selected repositories → your church repo
4. Under **Permissions**: set **Contents** to **Read and write** (Metadata is auto-selected)
5. Click **Generate token**, copy it
6. Paste into the green token bar in the admin panel — it saves to your browser automatically

---

## Changing the Admin Password

1. Open the admin panel → **Change Password** tab
2. Type your new password and click **Generate Hash**
3. Copy the hash string
4. Edit `admin.html` on GitHub → find `STORED_HASH` near the top of the `<script>` block
5. Replace the existing hash value with your new one

---

## JSON Data Formats

### events.json
```json
[
  {
    "id": 1,
    "title": "Sunday Morning Worship",
    "date": "2026-04-20",
    "time": "10:30 AM",
    "category": "Worship",
    "description": "Join us for uplifting worship and biblical teaching."
  }
]
```
Valid categories: `Worship`, `Bible Study`, `Outreach`, `Special`, `Youth`, `Prayer`, `Children`

### announcements.json
```json
{ "active": true, "text": "Join us this Sunday at 10:30 AM!" }
```

### sermons.json
```json
[{
  "id": 1,
  "title": "Walking in Faith",
  "series": "Faith That Works",
  "speaker": "Pastor",
  "date": "2026-04-13",
  "youtubeId": "VIDEO_ID_HERE",
  "description": "Brief description of the message."
}]
```

---

## Customization

See **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** for a full guide to colors, fonts, sections, and layout.

---

## Tech Stack

| Layer | Technology |
|---|---|
| HTML/CSS/JS | Vanilla — no frameworks or build tools |
| Fonts | Google Fonts (Cormorant Garamond, Inter, Outfit) |
| Icons | Font Awesome 6 |
| Hosting | Netlify (free tier) |
| Source control | GitHub |
| CMS layer | GitHub Contents API + custom admin panel |
| Password security | SHA-256 via Web Crypto API |

---

## License

Free to use for any church or non-profit. Attribution appreciated but not required.

*Template built by [Professor Mark Maine](https://github.com/marcus7288) — Springfield Faith Assembly, Springfield, Missouri*
