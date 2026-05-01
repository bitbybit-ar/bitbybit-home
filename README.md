# BitByBit — landing site

Source for <https://bitbybit.com.ar>. A small, fully static, SEO-first
landing page introducing BitByBit and pointing visitors to our
projects.

> Construyendo nuestra mejor versión, juntos.

## Stack

Next.js 16 (App Router) · next-intl (es / en) · next-themes · SCSS
modules · Vercel.

The site has **no backend**. Project apps live on their own
subdomains: <https://habits.bitbybit.com.ar> and
<https://arena.bitbybit.com.ar>.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Visit <http://localhost:3000> — you will be redirected to `/es`.

## Documentation

The full internal documentation lives in [`docs/`](./docs/README.md):

- [Getting started](./docs/guides/getting-started.md)
- [Deployment](./docs/guides/deployment.md)
- [Development conventions](./docs/guides/development.md)
- [Architecture overview](./docs/architecture/overview.md)
- [Architecture decisions (ADRs)](./docs/architecture/decisions/)
- [Runbooks](./docs/runbooks/)
- [Roadmap](./docs/ROADMAP.md)
- [Changelog](./CHANGELOG.md) (repo root)
- [Contributing + code of conduct + security policy](./CONTRIBUTING.md) (repo root)
- [Agent instructions and doc standard](./CLAUDE.md) (repo root)

The `docs/` structure is the canonical template across BitByBit
projects — copy it into new repos to keep documentation consistent.

## Sister projects

- [bitbybit-habits](https://github.com/bitbybit-ar/bitbybit-habits) —
  habit tracker with Lightning rewards.
- [bitbybit-arena](https://github.com/bitbybit-ar/bitbybit-arena) —
  public Nostr challenges with badges and zaps.

## License

Open source. See `LICENSE` (TBD).
