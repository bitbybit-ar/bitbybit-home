import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BitByBit",
    short_name: "BitByBit",
    description:
      "BitByBit — building our best version, together. Healthy habits, community, and open-source tools for a free future.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f1a",
    theme_color: "#8b5cf6",
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
