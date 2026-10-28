import { createFileRoute } from "@tanstack/react-router";
import { CertificationsPage } from "@/components/portfolio/Subpages";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Yashwanth A M" },
      { name: "description", content: "Industry certifications earned by Yashwanth A M: Oracle OCI AI Foundations, React front-end development, Flutter and strategic communication." },
      { property: "og:title", content: "Certifications — Yashwanth A M" },
      { property: "og:description", content: "Oracle, Coursera, Infosys and NPTEL certifications earned by Yashwanth A M." },
      { property: "og:url", content: "/certifications" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/certifications" }],
  }),
  component: CertificationsPage,
});
