import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Education } from "@/components/portfolio/Education";
import { Experience } from "@/components/portfolio/Experience";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { Proof } from "@/components/portfolio/Proof";
import { Skills } from "@/components/portfolio/Skills";
import { education, profile, seo, site } from "@/data/portfolio";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
  ...(site.url ? { url: site.url } : {}),
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "profile" },
      ...(site.url ? [{ property: "og:image", content: `${site.url}${site.socialImage}` }] : []),
    ],
    links: site.url ? [{ rel: "canonical", href: `${site.url}/` }] : [],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personJsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Proof />
      <Contact />
    </main>
  );
}
