# rimaki.net

Personal hub site for Rimaki: hero, projects, services and contact on a single
scroll-driven page.

Next.js (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion · Lenis.
Built as a fully static export, so it runs on Cloudflare Pages with no server.

## Develop

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
```

`npm run build` writes the static site to `out/`. To preview that exact output:

```bash
npx serve out
```

## Edit content

All content lives in `src/data/`. You never need to touch a component to change
text, links or projects.

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, hero kicker/tagline/bio, site URL, contact links (GitHub, Discord, email). Also feeds the SEO metadata and the Open Graph image. |
| `src/data/projects.ts` | Project cards and the modal tabs (Overview, Roadmap, Changelog). |
| `src/data/services.ts` | Service cards. |

Search the folder for `PLACEHOLDER` to find everything that still needs real
details (Discord handle, email, project statuses, roadmap and changelog
entries). Placeholder text on the page is wrapped in `[square brackets]`.

### Add a project

Append an object to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-project",            // unique, lowercase-with-dashes
  name: "My Project",
  tagline: "One line shown on the card.",
  description: ["Paragraph one.", "Paragraph two."],
  status: "active",              // active | in-development | paused | archived
  tags: ["Paper", "Java"],
  githubUrl: "https://github.com/you/repo", // or null to hide the button
  roadmap: [{ item: "Thing to ship", status: "planned" }], // done | in-progress | planned
  changelog: [{ version: "1.0.0", date: "2026-01-31", notes: ["First release."] }],
}
```

Empty `roadmap` or `changelog` arrays show an empty state in the modal.

### Contact links

A link without an `href` renders as plain text (that is how the placeholders
show up). Add `href` to make it clickable, for example
`href: "mailto:you@rimaki.net"`.

### Look and feel

- Accent colour and the rest of the palette: the `@theme` block at the top of
  `src/app/globals.css`. Change `--color-accent` to re-theme the site. Update
  the two hex values in `src/app/og.png/route.tsx` and `src/app/icon.svg` to match.
- Favicon: `src/app/icon.svg` is a placeholder "R". Replace the file with your own.
- Open Graph image: generated at build time by `src/app/og.png/route.tsx`.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages →
   Connect to Git** and pick the repository.
3. Build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Environment variable:** `NODE_VERSION` = `22`
4. Save and deploy. Every push to the production branch redeploys; other
   branches get preview URLs.

### Use the rimaki.net domain

1. Open the Pages project → **Custom domains → Set up a custom domain**.
2. Enter `rimaki.net` and confirm. If the domain's DNS is already on
   Cloudflare, the record is created for you. If it is registered elsewhere,
   first add the domain to Cloudflare and switch its nameservers at the
   registrar.
3. Repeat for `www.rimaki.net`, then add a redirect rule (**Rules → Redirect
   Rules**) from `www.rimaki.net/*` to `https://rimaki.net/$1` so there is one
   canonical URL.

If you ever serve the site from a different domain, change `siteUrl` in
`src/data/profile.ts`: canonical, Open Graph and sitemap URLs are built from it.

## Structure

```
src/
  app/          layout (metadata, fonts), page, icon, og image, robots, sitemap
  components/   Hero, Projects (+ card, modal), Services, Contact, Header
  data/         profile.ts, projects.ts, services.ts  ← edit these
```

Motion respects `prefers-reduced-motion`: smooth scrolling, tilt and slide
animations are switched off and the particle background renders a still frame.
