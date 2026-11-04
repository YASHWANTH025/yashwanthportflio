import { createFileRoute } from "@tanstack/react-router";
import { AchievementsPage } from "@/components/portfolio/Subpages";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Yashwanth A M" },
      {
        name: "description",
        content:
          "Achievements and activities of Yashwanth A M: university Kabaddi first prize among 30+ teams and the placement training bootcamp.",
      },
      { property: "og:title", content: "Achievements — Yashwanth A M" },
      {
        property: "og:description",
        content: "Competitions, training and activities of Yashwanth A M.",
      },
      { property: "og:url", content: "https://yashwanthportflio.lovable.app/achievements" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yashwanthportflio.lovable.app/achievements" }],
  }),
  component: AchievementsPage,
});
