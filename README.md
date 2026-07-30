# Advocate Jatin Pareek website

This is a static, GitHub Pages-ready website. It has no build step and can be hosted directly from the repository root.

## Publish with GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, then select `main` and the `/ (root)` folder.
4. Save. GitHub will provide the live website URL in the Pages settings.

## Custom domain

The site is configured for `fightforjustices.com`, including the root `CNAME` file. In GitHub Pages, add that domain under **Settings → Pages → Custom domain**, then point the GoDaddy DNS records to GitHub Pages.

The enquiry form is connected to the provided Formspree endpoint and works without a backend or build step.

## Project structure

- `index.html` — page content, SEO metadata, and structured data
- `assets/css/styles.css` — responsive design and transitions
- `assets/js/main.js` — navigation, counters, accordion, carousel, and motion
- `public/images/` — responsive hero images, brand logos, advocate portrait, court visual, and section imagery
