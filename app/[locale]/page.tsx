import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/landing/Hero";
import { Mission } from "@/components/about/Mission";
import { Projects } from "@/components/about/Projects";
import { Friends } from "@/components/landing/Friends";
import { Support } from "@/components/landing/Support";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "BitByBit Habits",
          description: t("habitsDescription"),
          url: "https://habits.bitbybit.com.ar",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareApplication",
          name: "BitByBit Arena",
          description: t("arenaDescription"),
          url: "https://arena.bitbybit.com.ar",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "SoftwareApplication",
          name: "CURSATS",
          description: t("cursatsDescription"),
          url: "https://cursats.bitbybit.com.ar",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "SoftwareApplication",
          name: "BitByBit Run",
          description: t("runDescription"),
          url: "https://run.bitbybit.com.ar",
          applicationCategory: "GameApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Hero />
      <div id="mission">
        <Mission />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="friends">
        <Friends />
      </div>
      <div id="support">
        <Support />
      </div>
    </>
  );
}

export const dynamic = "force-static";
