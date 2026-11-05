import { about, education, experience } from "@/data/portfolio";
import { AccentText, Reveal, SectionHeading } from "./primitives";

function CareerJourney() {
  return (
    <div>
      <h4 className="type-subsection text-foreground">{about.journeyLabel}</h4>
      <ol className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {about.journey.map((step) => (
          <li key={step.title} className="border-t-2 border-border-strong pt-3">
            <p className="type-meta text-accent">{step.marker}</p>
            <p className="type-card mt-1 text-foreground">{step.title}</p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EngineeringStrengths() {
  return (
    <div>
      <h4 className="type-subsection text-foreground">{about.strengthsLabel}</h4>
      <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {about.strengths.map((strength) => (
          <li key={strength.title} className="border-l-[3px] border-accent pl-4">
            <p className="type-card text-foreground">{strength.title}</p>
            <p className="type-support mt-1 text-muted-foreground">{strength.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Summary column. Reads the education and experience data so nothing is written twice. */
function AtAGlance() {
  const current = education.find((e) => e.status);
  const earlier = education.filter((e) => !e.status);
  return (
    <aside aria-label="At a glance" className="flex h-full flex-col gap-4">
      {current && (
        <div className="flex flex-1 flex-col justify-center rounded-sm bg-wine p-6 text-ink-foreground">
          <h4 className="type-meta text-accent-soft">Current MSc</h4>
          <p className="type-subsection mt-2">{current.degree}</p>
          <p className="type-support mt-2 font-medium">{current.institution}</p>
          <p className="type-support text-ink-muted">{current.location}</p>
        </div>
      )}

      {experience.map((entry) => (
        <div
          key={entry.company}
          className="flex flex-1 flex-col justify-center rounded-sm border border-border bg-paper p-6"
        >
          <h4 className="type-meta text-accent">Professional Experience</h4>
          <p className="type-subsection mt-2 text-foreground">{entry.company}</p>
          <p className="type-support mt-2 font-medium text-foreground">{entry.role}</p>
          <p className="type-support text-muted-foreground">{entry.duration}</p>
          <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
            {entry.stats.map((stat) => (
              <li key={stat.label} className="type-support flex gap-2.5 text-foreground">
                <span className="font-display font-extrabold text-accent">{stat.value}</span>
                {stat.label}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-1 flex-col justify-center rounded-sm border border-border bg-paper p-6">
        <h4 className="type-meta text-accent">Education</h4>
        {earlier.map((e) => (
          <div key={e.degree} className="mt-2">
            <p className="type-subsection text-foreground">{e.degree}</p>
            <p className="type-support mt-2 font-medium text-foreground">{e.institution}</p>
            <p className="type-support text-muted-foreground">{e.location}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function About() {
  return (
    <section id="about" className="section-y border-t border-border bg-background">
      <div className="container-page">
        <SectionHeading title={about.heading} className="mb-5 md:mb-6" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-9 lg:col-span-7">
            <Reveal>
              <h3 className="type-statement text-foreground">
                <AccentText text={about.statement} accent={about.statementAccent} />
              </h3>
              <div className="type-body mt-4 space-y-3.5 text-foreground/85">
                {about.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <CareerJourney />
            </Reveal>
            <Reveal>
              <EngineeringStrengths />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <AtAGlance />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
