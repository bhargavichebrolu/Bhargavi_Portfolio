import { ArrowUpRight, Award, BookOpen, PenLine } from "lucide-react";
import type { ReactNode } from "react";
import { proofIntro, proofLinks, type ProofLink } from "@/data/portfolio";
import { Reveal } from "./primitives";

const brandLogo = (slug: string) => (
  <img src={`/logos/${slug}.svg`} alt="" width={26} height={26} className="size-[26px]" />
);

const icons: Record<ProofLink["kind"], ReactNode> = {
  github: brandLogo("github"),
  leetcode: brandLogo("leetcode"),
  research: <BookOpen className="size-[26px] text-accent" strokeWidth={1.7} />,
  writing: <PenLine className="size-[26px] text-accent" strokeWidth={1.7} />,
  achievement: <Award className="size-[26px] text-accent" strokeWidth={1.7} />,
};

export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="section-y bg-secondary">
      <div className="container-page">
        <Reveal>
          <h2 id="proof-title" className="type-statement mb-6 text-foreground">
            {proofIntro.heading}
          </h2>
        </Reveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {proofLinks.map((l, i) => {
            const content = (
              <>
                {icons[l.kind]}
                <span className="type-card mt-4 flex items-center justify-between gap-2 text-foreground">
                  {l.label}
                  {l.href && (
                    <ArrowUpRight className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </span>
                <span className="mt-1 text-sm leading-snug text-muted-foreground">
                  {l.href ? l.description : proofIntro.unavailable}
                </span>
              </>
            );
            return (
              <li key={l.label}>
                <Reveal delay={i * 0.05} className="h-full">
                  {l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-sm bg-paper p-5 transition-shadow hover:shadow-lift"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-sm bg-paper p-5">{content}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
