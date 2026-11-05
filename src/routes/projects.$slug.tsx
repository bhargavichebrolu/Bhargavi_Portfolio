import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { GithubIcon } from "@/components/portfolio/brand-icons";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { Reveal, StatusBadge, TechLogo } from "@/components/portfolio/primitives";
import { Button } from "@/components/ui/button";
import { profile, publishedProjects, site, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const findProject = (slug: string) => publishedProjects.find((p) => p.slug === slug);

export const Route = createFileRoute("/projects/$slug")({
  // Only validates the slug. Returning the project would make SSR try to
  // serialise its icon components, which fails with a 500.
  loader: ({ params }) => {
    if (!findProject(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${project.title} case study | ${profile.displayName}`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
      ],
      links: site.url ? [{ rel: "canonical", href: `${site.url}/projects/${project.slug}` }] : [],
    };
  },
  notFoundComponent: NotFound,
  component: CaseStudy,
});

function NotFound() {
  return (
    <main
      id="main"
      className="container-page flex min-h-[70vh] flex-col items-start justify-center"
    >
      <h1 className="type-section text-foreground">This project doesn't exist.</h1>
      <Button asChild variant="line" size="lg" className="mt-6">
        <Link to="/" hash="projects">
          <ArrowLeft /> Back to projects
        </Link>
      </Button>
    </main>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-3 border-t border-border py-8 md:grid-cols-12 md:gap-8">
        <h2 className="type-subsection text-foreground md:col-span-4">{title}</h2>
        <div className="type-body min-w-0 space-y-4 text-foreground/85 md:col-span-8">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  return (
    <figure className="rounded-sm border border-border bg-paper p-5">
      <ol className="flex flex-wrap items-center gap-2">
        {nodes.map((node, i) => (
          <li key={node} className="flex items-center gap-2">
            <span className="type-meta rounded-sm border border-border-strong bg-background px-3 py-2 text-foreground">
              {node}
            </span>
            {i < nodes.length - 1 && (
              <ArrowRight aria-hidden className="size-4 shrink-0 text-accent" />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        Simplified flow, in order
      </figcaption>
    </figure>
  );
}

function ProjectLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 font-medium text-accent"
    >
      {children}
    </a>
  );
}

/** The full case study template. Sections with no content follow `site.showEmptyCaseStudySections`. */
function caseStudySections(project: Project) {
  const cs = project.caseStudy;
  const hasResults = !!cs.resultsSummary || !!cs.results?.length;
  return [
    {
      title: "Overview",
      filled: !!cs.overview,
      content: <p>{cs.overview}</p>,
    },
    {
      title: "Problem statement",
      filled: !!cs.problem,
      content: <p>{cs.problem}</p>,
    },
    {
      title: "Objectives",
      filled: !!cs.objectives?.length,
      content: <List items={cs.objectives ?? []} />,
    },
    {
      title: "Technical architecture",
      filled: !!cs.architecture || !!cs.architectureNodes?.length,
      content: (
        <>
          {cs.architecture && <p>{cs.architecture}</p>}
          {cs.architectureNodes?.length ? (
            <ArchitectureDiagram nodes={cs.architectureNodes} />
          ) : null}
        </>
      ),
    },
    {
      title: "Technologies used",
      filled: project.stack.length > 0,
      content: (
        <ul className="grid gap-2 sm:grid-cols-2">
          {project.stack.map((t) => (
            <li
              key={t.name}
              className="flex items-center gap-3 rounded-sm border border-border bg-paper p-3 text-[0.9375rem] font-semibold text-foreground"
            >
              <TechLogo tech={t} size={24} /> {t.name}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "My contributions",
      filled: !!cs.contributions?.length,
      content: <List items={cs.contributions ?? []} />,
    },
    {
      title: "Implementation details",
      filled: !!cs.implementation?.length,
      content: <List items={cs.implementation ?? []} />,
    },
    {
      title: "Challenges and solutions",
      filled: !!cs.challenges?.length,
      content: (
        <dl className="space-y-4">
          {cs.challenges?.map((c) => (
            <div key={c.challenge} className="rounded-sm border border-border p-5">
              <dt className="font-semibold text-foreground">{c.challenge}</dt>
              <dd className="mt-2 text-muted-foreground">{c.solution}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: "Evaluation methodology",
      filled: !!cs.evaluation || !!cs.metrics?.length,
      content: (
        <>
          {cs.evaluation && <p>{cs.evaluation}</p>}
          {cs.metrics?.length ? <List items={cs.metrics} /> : null}
        </>
      ),
    },
    {
      title: "Results and metrics",
      filled: hasResults,
      content: (
        <>
          {cs.resultsSummary && <p>{cs.resultsSummary}</p>}
          {cs.results?.length ? (
            <dl className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {cs.results.map((r) => (
                <div key={r.label} className="bg-paper p-5">
                  <dd className="font-display text-3xl font-extrabold text-foreground">
                    {r.value}
                  </dd>
                  <dt className="mt-1 text-sm text-muted-foreground">{r.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </>
      ),
    },
    {
      title: "Key learnings",
      filled: !!cs.learnings?.length,
      content: <List items={cs.learnings ?? []} />,
    },
    {
      title: "GitHub repository",
      filled: !!project.github,
      content: (
        <ProjectLink href={project.github ?? ""}>
          <GithubIcon size={16} /> <span className="link-underline">View the repository</span>
        </ProjectLink>
      ),
    },
    {
      title: "Live demo",
      filled: !!project.demo,
      content: (
        <ProjectLink href={project.demo ?? ""}>
          <ExternalLink className="size-4" /> <span className="link-underline">Open the demo</span>
        </ProjectLink>
      ),
    },
  ];
}

function CaseStudy() {
  const { slug } = Route.useParams();
  const project = findProject(slug)!;
  const dark = project.group === "featured-ai-research";
  const idx = publishedProjects.findIndex((p) => p.slug === project.slug);
  const next = publishedProjects[(idx + 1) % publishedProjects.length] ?? project;
  const sections = caseStudySections(project).filter(
    (s) => s.filled || site.showEmptyCaseStudySections,
  );

  return (
    <main id="main" className="pt-6 md:pt-8">
      <article className="container-page">
        <Link
          to="/"
          hash="projects"
          className="type-meta inline-flex min-h-11 items-center gap-2 text-accent transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All projects
        </Link>

        <header className="mt-3 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <p className="type-meta text-accent">{project.category}</p>
              {project.status && <StatusBadge status={project.status} />}
            </div>
            <h1 className="type-hero mt-2 text-foreground">{project.title}</h1>
            <p className="type-body mt-4 text-foreground/80">{project.summary}</p>
            {project.note && (
              <p className="type-support mt-3 text-muted-foreground">{project.note}</p>
            )}
            {(project.github || project.demo) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.github && (
                  <Button asChild size="lg">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon size={16} /> GitHub repository
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild variant="line" size="lg">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink /> Live demo
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
          {project.visual && (
            <div
              className={cn(
                "aspect-[16/11] overflow-hidden rounded-sm border lg:col-span-5",
                dark
                  ? "border-ink bg-ink text-ink-foreground grid-ink"
                  : "border-border bg-secondary text-foreground",
              )}
            >
              <ProjectVisual variant={project.visual} />
            </div>
          )}
        </header>

        <div className="mt-10">
          {sections.map((section) => (
            <Block key={section.title} title={section.title}>
              {section.filled ? (
                section.content
              ) : (
                <p className="text-muted-foreground">To be added.</p>
              )}
            </Block>
          ))}
        </div>
      </article>

      {next.slug !== project.slug && (
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group mt-6 block bg-wine py-10 text-ink-foreground md:py-12"
        >
          <div className="container-page flex items-center justify-between gap-6">
            <div>
              <p className="type-meta text-accent-soft">Next case study</p>
              <p className="type-section mt-1">{next.title}</p>
            </div>
            <ArrowRight className="size-8 shrink-0 text-accent-soft transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      )}
    </main>
  );
}
