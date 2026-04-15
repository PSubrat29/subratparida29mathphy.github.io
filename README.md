# Personal Academic Website - Subrat Parida

A secure, static personal website with slide-style navigation for academics and researchers.

**Live Site:** [https://psubrat29.github.io/subratparida29mathphy.github.io](https://psubrat29.github.io/subratparida29mathphy.github.io)

---

## Features

- **Slide-Style Navigation:** 4 distinct pages with smooth transitions
- **Mathematical Physics Theme:** Animated background with math symbols
- **Zero External Dependencies:** All CSS/JS is local
- **Keyboard Navigation:** Arrow keys, number keys (1-4), Home/End
- **Touch/Swipe Support:** Mobile-friendly gestures
- **Security Hardened:** CSP headers, no external resources

---

## Site Structure

| Slide | Content |
|-------|---------|
| 1 (Home) | About, Profile, Research Vision |
| 2 (Research) | Research Areas + Publications (with filters) |
| 3 (Academic) | Education, Experience, Conferences, Training |
| 4 (Skills & Contact) | Skills, Awards, Contact Info, Social Links |

---

## Security Features

- **Content Security Policy (CSP)** headers
- **No external dependencies** - All CSS/JS is inline or local
- **No JavaScript** where possible (vanilla JS only)
- **Email obfuscation** - Reduces spam scraping
- **HTTPS enforced** - Via GitHub Pages
- **No database** - Static site, nothing to hack

---

## Deployment via GitHub Actions

### Step 1: Initialize Git and Push

Open Command Prompt and run:

```bash
cd C:\Users\Lenovo\personal-website

git init
git add .
git commit -m "Initial commit: Slide-style academic website"
git branch -M main
git remote add origin https://github.com/PSubrat29/subratparida29mathphy.github.io.git
git push -u origin main
```

### Step 2: Configure GitHub Pages for Actions

1. Go to: `https://github.com/PSubrat29/subratparida29mathphy.github.io/settings/pages`
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Once selected, GitHub will automatically use the workflow in `.github/workflows/deploy.yml`

### Step 3: Verify Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (green checkmark)
4. Click on the workflow run to see the deployment URL

---

## Local Testing

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python (if installed)
cd C:\Users\Lenovo\personal-website
python -m http.server 8000
# Then open: http://localhost:8000
```

---

## Customization

### Add Profile Photo

1. Save your photo as `images/profile.jpg`
2. In `index.html`, replace the placeholder:
```html
<!-- Replace this: -->
<div class="photo-placeholder" aria-hidden="true">
    <span class="math-avatar">∫∂</span>
</div>

<!-- With this: -->
<img src="images/profile.jpg" alt="Subrat Parida">
```

### Update Contact Info

Edit the contact section in `index.html`:
- Email: Change `href="mailto:your@email.com"`
- Phone: Change `href="tel:+91..."`
- Social links: Update the `href` attributes

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ← / ↑ | Previous slide |
| → / ↓ | Next slide |
| 1-4 | Jump to slide |
| Home | First slide |
| End | Last slide |

---

## File Structure

```
personal-website/
├── index.html              # Main website (4 slides)
├── css/
│   └── style.css           # All styles with math theme
├── js/
│   └── slides.js           # Slide navigation logic
├── images/                 # Add photos here
│   └── profile.jpg
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── CV_DATA_SUBRAT.json     # CV data
└── README.md               # This file
```

---

## Troubleshooting

### Site not deploying?

1. Check the **Actions** tab for error messages
2. Ensure your branch is named `main` or `master`
3. Verify `index.html` exists in the root

### CSS not loading?

1. Check browser DevTools Console for 404 errors
2. Verify the file path: `css/style.css`
3. Clear browser cache (Ctrl+Shift+R)

### GitHub Pages Source is greyed out?

This means GitHub Pages is already configured. Go to **Actions** tab and check if deployment is already running. If you want to switch to Actions:
1. First disable Pages in Settings → Pages → Source → "Disable"
2. Then push the workflow file
3. Re-enable Pages with "GitHub Actions" as source

---

**Built with:** Pure HTML5, CSS3, and vanilla JavaScript  
**Hosting:** GitHub Pages (free, HTTPS included)  
**Deployment:** GitHub Actions  

**Data source:** CV LaTeX file (`SubratP.tex`) - All information extracted directly.
