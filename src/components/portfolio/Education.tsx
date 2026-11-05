import { GraduationCap, MapPin } from "lucide-react";
import { education, educationIntro } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function Education() {
  return (
    <section id="education" className="section-y bg-background">
      <div className="container-page">
        <SectionHeading title={educationIntro.heading} />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 0.08} className="h-full">
              <article className="flex h-full gap-4 rounded-sm border border-border border-t-[3px] border-t-accent bg-paper p-6 md:p-7">
                <GraduationCap
                  className="mt-1 size-7 shrink-0 text-accent"
                  strokeWidth={1.7}
                  aria-hidden
                />
                <div className="min-w-0">
                  <h3 className="type-subsection text-foreground">{ed.degree}</h3>
                  <p className="type-body mt-2 font-semibold text-accent">{ed.institution}</p>
                  <p className="type-support mt-1 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="size-4 shrink-0" aria-hidden />
                    {ed.location}
                    {ed.dates && ` · ${ed.dates}`}
                  </p>
                  {ed.status && (
                    <p className="type-meta mt-3 inline-block rounded-sm bg-accent-soft px-2.5 py-1 text-foreground">
                      {ed.status}
                    </p>
                  )}
                  {ed.details.length > 0 && (
                    <ul className="type-support mt-4 space-y-1.5 border-t border-border pt-4 text-foreground/85">
                      {ed.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
