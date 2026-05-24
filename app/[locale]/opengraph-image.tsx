import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "BitByBit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand block colors — all real theme tokens:
// purple = --color-nostr, gold = --color-secondary, green = --color-accent-alt.
const BLOCKS = ["#8B5CF6", "#F7A825", "#22C55E"] as const;

// Fetch a TTF subset from the Google Fonts CSS API so the OG mark renders
// in the platform font (Nunito). Same Google Fonts source the site already
// pulls via `next/font/google`; subsetting with `text` keeps the payload
// tiny. The default (undici) User-Agent makes Google serve `truetype`,
// which Satori can parse — `woff2` it cannot.
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
  );
  if (!src) throw new Error(`Failed to load font: ${family} ${weight}`);
  return (await fetch(src[1])).arrayBuffer();
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tagline = t("ogTagline");

  const [nunitoBold, nunitoSans] = await Promise.all([
    loadGoogleFont("Nunito", 800, "BitByBit"),
    loadGoogleFont("Nunito+Sans", 600, tagline),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 55%, #2A1F4A 100%)",
          color: "#FFFFFF",
          fontFamily: "Nunito",
        }}
      >
        {/* Brand lockup — vertical three-block stack beside the wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {BLOCKS.map((color) => (
              <div
                key={color}
                style={{
                  display: "flex",
                  width: "42px",
                  height: "42px",
                  borderRadius: "9px",
                  backgroundColor: color,
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 35%, transparent 55%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.18)",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: "Nunito",
              fontWeight: 800,
              fontSize: "140px",
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            BitByBit
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Nunito Sans",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: 1.3,
            textAlign: "center",
            maxWidth: "900px",
            color: "rgba(255,255,255,0.82)",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nunito", data: nunitoBold, weight: 800, style: "normal" },
        {
          name: "Nunito Sans",
          data: nunitoSans,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}
