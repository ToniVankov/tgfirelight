# Birchline Studio — Portfolio Site

A static, bilingual (EN/BG) portfolio site for a laser-cutting / digital cut-file /
3D-printing / kids'-book creator. Pure HTML, CSS, and JavaScript — no build step,
no backend. Ready to publish on GitHub Pages.

## Structure

```
index.html          → redirects visitors to /en/ or /bg/ based on browser language
en/index.html        → English site (source of truth for content)
bg/index.html        → Bulgarian site (direct translation, same structure)
assets/css/style.css → all styles
assets/js/script.js  → mobile nav, scroll reveal, portfolio filter, lightbox, contact form
assets/img/*.svg     → placeholder illustrations — replace with real photos
```

There are no `?lang=` query parameters — languages live in separate folders as required,
so each version can be crawled and indexed independently.

## Replacing placeholder content

1. **Images** — swap the files in `assets/img/` for real photos of your products.
   Keep the same filenames or update the `src` / `data-full` attributes in both
   `en/index.html` and `bg/index.html`. Recommended size: at least 800×600px,
   compressed as `.jpg` or `.webp` for faster loading.
2. **Portfolio items** — each `<article class="card">` in the portfolio grid has a
   `data-category` (`svg`, `dxf`, `lasercut`, `3dprint`, `kidsbook`) that drives the
   filter buttons, plus a `data-description` used in the lightbox caption.
3. **Etsy link** — replace every `https://www.etsy.com/shop/YourShopName` with your
   actual shop URL (there are a few occurrences per page).
4. **Social links** — update the Instagram / Pinterest / Facebook URLs in the contact
   section and footer.
5. **Email** — replace `hello@birchlinestudio.example` (appears in the mailto link and
   the form's `data-email` attribute) with your real address.
6. **Contact form** — the form currently opens the visitor's email client (no backend
   required). To collect submissions directly on the page instead, connect it to a
   service such as Formspree, and update the `submit` handler in `assets/js/script.js`.

## Keeping EN and BG in sync

The English version is the primary source. When you edit content, mirror the same
change in the Bulgarian file — same structure, direct translation, no new sections.
Both pages share the same `assets/` folder, so CSS/JS/image changes apply to both
automatically.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (the contents of this folder should be at
   the repository root, or in a `/docs` folder if you configure Pages that way).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your branch
   (e.g. `main`) and the root folder.
4. Your site will be published at `https://<username>.github.io/<repo-name>/`.
5. Update the `og:url`, `canonical`, and `hreflang` links in both `en/index.html` and
   `bg/index.html` to match your real published URL (they currently use a placeholder
   `https://example.github.io/birchline-studio/`).

## Notes

- Filtering, the lightbox, and the mobile menu work without any external libraries.
- Images use `loading="lazy"` and sections fade in on scroll via `IntersectionObserver`;
  both respect `prefers-reduced-motion`.
- All colors, type, and spacing live in CSS custom properties at the top of
  `assets/css/style.css` — change the palette or fonts from one place.
