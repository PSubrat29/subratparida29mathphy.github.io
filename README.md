# Personal Academic Website - Subrat Parida

A secure, static personal website for academics and researchers. Zero cost, maximum security.

**Status:** Populated with CV data from `D:\ParidaUser\DOWNLOADS\SubratP.tex`

---

## Security Features

- **No external dependencies** - All CSS/JS is inline or local
- **No database** - Static HTML only, nothing to hack
- **No third-party services** - No analytics, no trackers
- **Content Security Policy** - Prevents XSS attacks
- **Email obfuscation** - Reduces spam scraping
- **HTTPS enforced** - Via GitHub Pages

---

## Quick Start

### Step 1: Review your CV data

Your CV data has been extracted and is stored in `CV_DATA_SUBRAT.json`. Review it for accuracy.

### Step 2: Add your profile photo (optional)

Place a profile photo named `profile.jpg` in the `images/` folder, then in `index.html` replace:
```html
<div class="photo-placeholder" aria-hidden="true">👤</div>
```
with:
```html
<img src="images/profile.jpg" alt="Subrat Parida">
```

### Step 3: Set up GitHub Pages

1. Create a new repository on GitHub: `subratparida.github.io` (or your username)
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Subrat Parida academic website"
   git branch -M main
   git remote add origin https://github.com/subratparida/subratparida.github.io.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Under "Source", select "GitHub Actions"
5. Your site will be live at `https://subratparida.github.io`

### Step 4: Verify deployment

1. Go to the Actions tab in your GitHub repository
2. Wait for the "Deploy to GitHub Pages" workflow to complete
3. Click on the workflow run to see the deployment URL

---

## File Structure

```
personal-website/
├── index.html              # Main website
├── css/
│   └── style.css           # All styles
├── images/                 # Add your photos here
│   └── profile.jpg
├── .github/
│   └── workflows/
│       ├── deploy.yml      # Auto-deploy on git push
│       └── security-headers.yml
├── CV_DATA_SUBRAT.json     # Your CV data (from LaTeX file)
├── _config.yml             # GitHub Pages config
└── README.md               # This file
```

---

## Website Sections

Based on your CV, the website includes:

1. **About** - Research vision and profile
2. **Research Interests** - 8 areas from Number Theory to Reaction Rate Theory
3. **Publications** - Book chapter, journal articles, preprints (all from CV)
4. **Conference Presentations** - ICSAMY, ICSIDS, ICSFA, ICFIDCAA
5. **Advanced Training** - ICTP, MIT, Harvard, ETH, and other advanced courses
6. **Experience** - Research Intern at Pondicherry University
7. **Education** - M.Sc. (Pondicherry), B.Sc. (Utkal)
8. **Skills & Awards** - Programming, scholarships, languages
9. **Contact** - Email (obfuscated), profile links

---

## Customization

### Colors

Edit `css/style.css` and modify the CSS custom properties:

```css
:root {
    --color-primary: #003366;    /* Main accent color */
    --color-secondary: #005599;  /* Secondary color */
    --color-link: #0066cc;       /* Link color */
}
```

### Adding/Updating Publications

The publications section is already populated from your CV. To add new ones, add entries in `index.html` under the appropriate section.

---

## Security Best Practices

1. **Never commit sensitive data** - No API keys, passwords, or private info
2. **Keep dependencies minimal** - This site has zero npm packages
3. **Review GitHub Actions** - The workflow file runs on every push
4. **Use relative URLs** - For internal links, use relative paths
5. **Enable branch protection** - In GitHub Settings, protect your main branch

---

## Troubleshooting

### Site not deploying?

1. Check the Actions tab for error messages
2. Ensure your branch is named `main` or `master`
3. Verify `index.html` exists in the root

### CSS not loading?

1. Check browser DevTools Console for 404 errors
2. Verify the file path: `css/style.css`
3. Clear browser cache (Ctrl+Shift+R)

### Email not showing?

1. Enable JavaScript in your browser
2. Check that `data-user` and `data-domain` attributes are set correctly
3. Verify no JavaScript errors in Console

---

**Built with:** Pure HTML5, CSS3, and vanilla JavaScript  
**Hosting:** GitHub Pages (free, HTTPS included)  
**Security score:** A+ (no external resources, no trackers)

**Data source:** CV LaTeX file (`SubratP.tex`) - All information extracted directly, no external sources used.
