import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import {
  projectGroups,
  projects,
  projectsIntro,
  site,
  type Project,
  type ProjectGroup,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./brand-icons";
import { ProjectVisual } from "./ProjectVisual";
import { MaybeLink, Reveal, SectionHeading, StatusBadge, TechLogo } from "./primitives";

const cardHover = {
  whileHover: { y: -4 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

/** True once a project has anything beyond its title and summary. */
const hasDetails = ({ caseStudy: cs, stack, note, github, demo }: Project) =>
  !!(
    stack.length ||
    note ||
    github ||
    demo ||
    cs.problem ||
    cs.implementation?.length ||
    cs.contributions?.length ||
    cs.evaluation ||
    cs.metrics?.length ||
    cs.results?.length
  );

const groupProjects = (key: ProjectGroup["key"]) =>
  projects.filter(
    (p) =>
      p.group === key &&
      (p.status !== "details-pending" || hasDetails(p) || site.showDraftProjects),
  );

function CaseStudyLink({ project, dark }: { project: Project; dark: boolean }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        dark ? "text-ink-foreground" : "text-accent",
      )}
    >
      <span className="link-underline">View Case Study</span>
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/** The flagship in dark, or a full-width project on paper. */
function ProjectCard({ project }: { project: Project }) {
  const dark = project.group === "featured-ai-research";
  const secondaryLink =
    "inline-flex min-h-11 items-center gap-1.5 font-semibold transition-colors hover:text-current";
  return (
    <motion.article
      {...cardHover}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-sm border transition-shadow duration-300 hover:shadow-lift lg:flex-row",
        dark
          ? "border-ink bg-ink text-ink-foreground"
          : "border-border bg-paper text-foreground lg:flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[42%] lg:shrink-0",
          dark ? "bg-ink text-ink-foreground grid-ink" : "bg-secondary text-foreground",
        )}
      >
        {project.visual && (
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <ProjectVisual variant={project.visual} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className={cn("type-meta", dark ? "text-accent-soft" : "text-accent")}>
            {project.category}
          </p>
          {project.status && <StatusBadge status={project.status} tone={dark ? "ink" : "paper"} />}
        </div>
        <h4 className={cn("mt-2", dark ? "type-section" : "type-statement")}>{project.title}</h4>
        <p className={cn("type-body mt-3", dark ? "text-ink-muted" : "text-foreground/80")}>
          {project.summary}
        </p>

        {project.highlights?.length ? (
          <dl className={cn("mt-5 grid gap-4", project.highlights.length > 1 && "sm:grid-cols-2")}>
            {project.highlights.map((h) => (
              <div key={h.label}>
                <dt className={cn("type-meta", dark ? "text-accent-soft" : "text-accent")}>
                  {h.label}
                </dt>
                <dd className="type-support mt-1 font-medium">{h.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((t) => (
            <li
              key={t.name}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[0.8125rem] font-semibold",
                dark ? "bg-paper text-foreground" : "border border-border bg-background",
              )}
            >
              <TechLogo tech={t} size={16} />
              {t.name}
            </li>
          ))}
        </ul>

        {project.note && (
          <p className={cn("type-support mt-5", dark ? "text-ink-muted" : "text-muted-foreground")}>
            {project.note}
          </p>
        )}

        <div
          className={cn(
            "mt-auto flex flex-wrap items-center gap-x-6 gap-y-1 pt-5 text-[0.9375rem]",
            dark ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          <CaseStudyLink project={project} dark={dark} />
          <MaybeLink href={project.github ?? ""} className={secondaryLink}>
            <GithubIcon size={16} /> GitHub
          </MaybeLink>
          <MaybeLink href={project.demo ?? ""} className={secondaryLink}>
            <ExternalLink className="size-4" /> Live demo
          </MaybeLink>
        </div>
      </div>
    </motion.article>
  );
}

/** The lead professional project: who it was for, my role and what I did. */
function ProfessionalLeadCard({ project }: { project: Project }) {
  const contributions = project.caseStudy.contributions ?? [];
  return (
    <motion.article
      {...cardHover}
      className="group grid overflow-hidden rounded-sm bg-wine text-ink-foreground transition-shadow duration-300 hover:shadow-lift lg:grid-cols-2"
    >
      <div className="flex flex-col p-6 md:p-8">
        <p className="type-meta text-accent-soft">{project.category}</p>
        <h4 className="type-section mt-2">{project.title}</h4>
        <p className="type-body mt-3 text-ink-muted">{project.summary}</p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {project.highlights?.map((h) => (
            <div key={h.label}>
              <dt className="type-meta text-accent-soft">{h.label}</dt>
              <dd className="type-subsection mt-0.5">{h.items.join(" · ")}</dd>
            </div>
          ))}
          {project.contribution && (
            <div>
              <dt className="type-meta text-accent-soft">Role</dt>
              <dd className="type-subsection mt-0.5">{project.contribution}</dd>
            </div>
          )}
        </dl>

        {project.caseStudyPage && (
          <div className="mt-auto pt-5">
            <CaseStudyLink project={project} dark />
          </div>
        )}
      </div>

      <div className="border-t border-ink-foreground/15 p-6 md:p-8 lg:border-t-0 lg:border-l">
        {contributions.length > 0 && (
          <>
            <h5 className="type-card text-accent-soft">My contribution</h5>
            <ul className="mt-3 space-y-2.5">
              {contributions.map((item) => (
                <li key={item} className="type-support flex gap-3 font-medium">
                  <span aria-hidden className="mt-2.5 h-0.5 w-3 shrink-0 bg-accent-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((t) => (
            <li
              key={t.name}
              className="inline-flex items-center gap-1.5 rounded-sm bg-paper px-2 py-1 text-[0.8125rem] font-semibold text-foreground"
            >
              <TechLogo tech={t} size={16} />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/** Small card for a professional project that is still to be written up. */
function CompactCard({ project }: { project: Project }) {
  const pending = project.status === "details-pending";
  return (
    <motion.article
      {...cardHover}
      className={cn(
        "group flex h-full flex-col justify-between gap-4 rounded-sm border bg-paper p-5 transition-shadow duration-300 hover:shadow-lift md:p-6",
        pending ? "border-dashed border-border-strong" : "border-border",
      )}
    >
      <div>
        <p className="type-meta text-accent">{project.category}</p>
        <h4 className="type-subsection mt-1.5 text-foreground">{project.title}</h4>
        {project.contribution && (
          <p className="type-support mt-1.5 font-medium text-foreground">{project.contribution}</p>
        )}
      </div>
      {project.caseStudyPage ? (
        <CaseStudyLink project={project} dark={false} />
      ) : (
        <p className="type-support text-muted-foreground">{project.summary}</p>
      )}
    </motion.article>
  );
}

function RowDetail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 lg:grid-cols-12 lg:gap-8">
      <dt className="type-meta text-accent lg:col-span-3">{label}</dt>
      <dd className="type-support text-foreground/85 lg:col-span-9">{children}</dd>
    </div>
  );
}

function RowList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function RowHeader({ project, expandable }: { project: Project; expandable: boolean }) {
  return (
    <div className="grid gap-x-8 gap-y-2 p-5 lg:grid-cols-12 lg:items-center lg:px-6">
      <div className="lg:col-span-5">
        <p className="type-meta text-accent">{project.category}</p>
        <h4 className="type-subsection mt-1 text-foreground">{project.title}</h4>
      </div>
      <p className="type-support text-foreground/80 lg:col-span-4">{project.summary}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 lg:col-span-3 lg:justify-end">
        {project.status && <StatusBadge status={project.status} />}
        {expandable && (
          <span className="type-meta inline-flex min-h-11 items-center gap-1 text-accent">
            <span className="group-open/row:hidden">Show details</span>
            <span className="hidden group-open/row:inline">Hide details</span>
            <ChevronDown className="size-4 transition-transform duration-200 group-open/row:rotate-180" />
          </span>
        )}
      </div>
    </div>
  );
}

/** One line in the list of personal AI projects, which expands once it has details to show. */
export function ProjectRow({ project }: { project: Project }) {
  if (!hasDetails(project)) {
    return (
      <article>
        <RowHeader project={project} expandable={false} />
      </article>
    );
  }
  const cs = project.caseStudy;
  const evaluation = [...(cs.evaluation ? [cs.evaluation] : []), ...(cs.metrics ?? [])];
  return (
    <article>
      <details className="group/row">
        <summary className="cursor-pointer list-none transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          <RowHeader project={project} expandable />
        </summary>
        <dl className="space-y-4 border-t border-border bg-background px-5 py-5 lg:px-6">
          {cs.problem && <RowDetail label="Problem addressed">{cs.problem}</RowDetail>}
          {cs.implementation?.length ? (
            <RowDetail label="Technical approach">
              <RowList items={cs.implementation} />
            </RowDetail>
          ) : null}
          {project.stack.length > 0 && (
            <RowDetail label="Technologies">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li
                    key={t.name}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-paper px-2 py-1 text-[0.8125rem] font-semibold"
                  >
                    <TechLogo tech={t} size={16} />
                    {t.name}
                  </li>
                ))}
              </ul>
            </RowDetail>
          )}
          {cs.contributions?.length ? (
            <RowDetail label="My contribution">
              <RowList items={cs.contributions} />
            </RowDetail>
          ) : null}
          {evaluation.length > 0 && (
            <RowDetail label="Evaluation methods">
              <RowList items={evaluation} />
            </RowDetail>
          )}
          {cs.results?.length ? (
            <RowDetail label="Verified results">
              <RowList items={cs.results.map((r) => `${r.label}: ${r.value}`)} />
            </RowDetail>
          ) : null}
          {project.note && <RowDetail label="Please note">{project.note}</RowDetail>}
          {(project.github || project.demo || project.caseStudyPage) && (
            <RowDetail label="Links">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                {project.caseStudyPage && <CaseStudyLink project={project} dark={false} />}
                {project.github && (
                  <MaybeLink
                    href={project.github}
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent"
                  >
                    <GithubIcon size={16} /> GitHub
                  </MaybeLink>
                )}
                {project.demo && (
                  <MaybeLink
                    href={project.demo}
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent"
                  >
                    <ExternalLink className="size-4" /> Live demo
                  </MaybeLink>
                )}
              </div>
            </RowDetail>
          )}
        </dl>
      </details>
    </article>
  );
}

function GroupBody({ group, items }: { group: ProjectGroup; items: Project[] }) {
  if (group.key === "professional-real-world") {
    const [lead, ...rest] = items;
    return (
      <div className="grid gap-5">
        <Reveal>{lead && <ProfessionalLeadCard project={lead} />}</Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="h-full">
              <CompactCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    );
  }
  if (group.key === "personal-ai-research") {
    return (
      <div className="divide-y divide-border overflow-hidden rounded-sm border border-border bg-paper">
        {items.map((p) => (
          <Reveal key={p.slug} y={8}>
            <ProjectRow project={p} />
          </Reveal>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-5">
      {items.map((p) => (
        <Reveal key={p.slug}>
          <ProjectCard project={p} />
        </Reveal>
      ))}
    </div>
  );
}

function GroupSection({
  group,
  band,
  first,
}: {
  group: ProjectGroup;
  band: boolean;
  /** The first group continues directly from the switcher above it. */
  first: boolean;
}) {
  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-title`}
      className={cn(
        first ? "pt-10 pb-14 md:pt-12 md:pb-20" : "section-y",
        band ? "bg-secondary" : "bg-background",
      )}
    >
      <div className="container-page">
        <p className="type-meta mb-3 inline-flex rounded-sm bg-wine px-2.5 py-1 text-ink-foreground">
          {group.label}
        </p>
        <SectionHeading
          as="h3"
          id={`${group.id}-title`}
          title={group.title}
          intro={group.subtitle}
        />
        <GroupBody group={group} items={groupProjects(group.key)} />
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="bg-secondary pt-14 md:pt-20">
        <div className="container-page">
          <SectionHeading
            id="projects-title"
            title={projectsIntro.heading}
            className="mb-5 md:mb-6"
          />
          <nav aria-label="Project groups" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {projectGroups.map((group) => {
              const count = groupProjects(group.key).length;
              return (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="group flex items-center justify-between gap-4 rounded-sm bg-ink p-4 text-ink-foreground transition-colors hover:bg-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:px-5"
                >
                  <span>
                    <span className="type-card block">{group.navLabel}</span>
                    <span className="mt-0.5 block text-sm font-medium text-ink-muted">
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  </span>
                  <ArrowDown className="size-5 shrink-0 text-accent-soft transition-transform group-hover:translate-y-0.5" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      {projectGroups.map((group, i) => (
        <GroupSection key={group.id} group={group} band={i % 2 === 0} first={i === 0} />
      ))}
    </section>
  );
}
