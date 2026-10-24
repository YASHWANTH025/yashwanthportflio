import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yashwanth A M — Full-Stack Developer" },
      { name: "description", content: "Portfolio of Yashwanth A M, a Bengaluru-based full-stack and Flutter developer building web apps, REST APIs and AI-enabled tools." },
      { property: "og:title", content: "Yashwanth A M — Full-Stack Developer" },
      { property: "og:description", content: "Projects, experience and skills of Yashwanth A M: React, Node.js, Java, Flutter and AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PortfolioPage />;
}
