import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { experience, experienceIntro, projectGroups, type ExperienceEntry } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

const professional = projectGroups.find((g) => g.key === "professional-real-world");

function Group({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="type-card text-accent-soft">{title}</h4>
      <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="type-support flex gap-3 font-medium text-ink-foreground">
            <span aria-hidden className="mt-2.5 h-0.5 w-3 shrink-0 bg-accent-soft" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Entry({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <p className="type-meta text-accent-soft">
          {entry.duration}
          {entry.location && ` · ${entry.location}`}
        </p>
        <h3 className="type-statement mt-2">{entry.company}</h3>
        <p className="type-body mt-3 font-semibold">
          {entry.role}
          {entry.roleNote && <span className="font-normal text-ink-muted"> {entry.roleNote}</span>}
        </p>
        <p className="type-body mt-3 text-ink-muted">{entry.summary}</p>
        {professional && (
          <a
            href={`#${professional.id}`}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-sm font-bold text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft"
          >
            <span className="link-underline">{experienceIntro.projectsLink}</span>
            <ArrowDownRight className="size-4" />
          </a>
        )}
      </div>

      <div className="space-y-7 lg:col-span-7">
        {entry.stats.length > 0 && (
          <dl className="grid gap-3 sm:grid-cols-2">
            {entry.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-sm bg-ink-foreground/10 p-4"
              >
                <dd className="font-display text-5xl font-extrabold text-ink-foreground">
                  {stat.value}
                </dd>
                <dt className="type-support font-medium text-ink-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        )}
        <Group title="Responsibilities" items={entry.responsibilities} />
        <Group title="Achievements" items={entry.achievements} />
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-y bg-wine text-ink-foreground">
      <div className="container-page">
        <SectionHeading tone="ink" title={experienceIntro.heading} intro={experienceIntro.intro} />

        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-0.5 origin-top bg-accent-soft/40"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="space-y-12">
            {experience.map((entry, i) => (
              <li key={entry.company} className="relative pl-7 md:pl-10">
                <span
                  aria-hidden
                  className="absolute top-1 -left-[5px] size-3 rounded-full bg-accent-soft"
                />
                <Reveal delay={i * 0.08}>
                  <Entry entry={entry} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
