import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";
import {
  About,
  Contact,
  Experience,
  Footer,
  Projects,
  Skills,
} from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yashwanth A M — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Yashwanth A M, a Bengaluru-based full-stack and Flutter developer building web apps, REST APIs and AI-enabled tools.",
      },
      { property: "og:title", content: "Yashwanth A M — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Projects, experience and skills of Yashwanth A M: React, Node.js, Java, Flutter and AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PortfolioIntro>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </PortfolioIntro>
  );
}
