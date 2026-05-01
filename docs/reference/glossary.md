# Glossary

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Header | Migrated to the new doc-header standard. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | Standard vocabulary across BitByBit projects. |

---

Terms that appear across BitByBit projects.

## ADR

**Architecture Decision Record.** A short markdown file capturing one
significant decision: context, decision, consequences, alternatives.
Lives in `docs/architecture/decisions/`.

## Hreflang

An HTML attribute (and HTTP header, and sitemap element) that tells
search engines which language a page is in, and which other URLs are
the equivalent for other languages. Set automatically by next-intl in
this project.

## La Crypta

A Bitcoin community in Argentina that organizes Lightning and Nostr
hackathons. Both BitByBit projects launched at La Crypta hackathons.

## Lightning Network

A layer-2 protocol on top of Bitcoin for fast, cheap payments. Used by
BitByBit Habits to pay rewards, and by BitByBit Home for the Support
section's zap CTA.

## Nostr

A decentralized protocol for social applications. Public keys are
identities; messages are signed events relayed across servers. Used by
BitByBit Arena for identity and challenge data.

## NWC (Nostr Wallet Connect)

A Nostr-based protocol that lets an app request payments from a user's
Lightning wallet without holding the wallet's keys.

## OG image

**Open Graph image.** The preview image shown when a URL is shared on
social media. Generated dynamically per locale in
`app/[locale]/opengraph-image.tsx`.

## SEO

**Search Engine Optimization.** Practices that help a site rank well in
search results: semantic HTML, structured data, fast load times, good
metadata, indexable URLs, hreflang for multilingual sites.

## SemVer

**Semantic Versioning.** Version numbers as `MAJOR.MINOR.PATCH`.
`MAJOR` for breaking changes, `MINOR` for backward-compatible features,
`PATCH` for fixes. See <https://semver.org>.

## Static generation

Building the site at deploy time into HTML files, served from a CDN
with no per-request server work. The default and only mode for this
site.

## Token (design token)

A named, themable value (color, spacing, font size). Defined once in
`styles/_theme.scss`, referenced everywhere via CSS custom properties.

## Web of Trust (WoT)

A decentralized trust model where users vouch for each other's
identities through their existing relationships, without a central
authority. Nostr WoT applies this to Nostr.
