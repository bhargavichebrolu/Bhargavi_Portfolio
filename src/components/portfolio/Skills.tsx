import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { skillCategories, skillsIntro, type SkillCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading, TechLogo } from "./primitives";

const RADIUS = 34; // % of the constellation box: category nodes
const LOGO_RADIUS = 22.5; // % of the constellation box: logos of the selected category
const technologyCount = skillCategories.reduce((sum, c) => sum + c.technologies.length, 0);

function polar(i: number, total: number, radius: number) {
  const angle = (-90 + (i * 360) / total) * (Math.PI / 180);
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
}

/* ------------------------------------------------------------------ */

function Constellation({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  // Bumped on each selection so the signal only runs in response to a click.
  const [signal, setSignal] = useState(0);
  const activeIndex = skillCategories.findIndex((c) => c.id === activeId);
  const active = skillCategories[activeIndex];
  const target = polar(activeIndex, skillCategories.length, RADIUS);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[680px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          className="stroke-ink-border"
          strokeWidth="0.2"
          strokeDasharray="0.6 0.9"
        />
        {skillCategories.map((c, i) => {
          const p = polar(i, skillCategories.length, RADIUS);
          const selected = c.id === activeId;
          return (
            <line
              key={c.id}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              strokeWidth={selected ? 0.4 : 0.15}
              className={cn(
                "transition-all duration-300",
                selected ? "stroke-accent-soft" : "stroke-ink-border",
              )}
            />
          );
        })}
        {!reduce && signal > 0 && (
          <motion.circle
            key={signal}
            r="0.8"
            className="fill-accent-soft"
            initial={{ cx: 50, cy: 50, opacity: 1 }}
            animate={{ cx: target.x, cy: target.y, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        )}
      </svg>

      {/* The selected category's technologies gather around the centre. */}
      <div aria-hidden key={activeId}>
        {active?.technologies.map((t, i) => {
          const p = polar(i, active.technologies.length, LOGO_RADIUS);
          return (
            <motion.span
              key={t.name}
              title={t.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.03 * i, ease: "easeOut" }}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper xl:size-10"
            >
              <TechLogo tech={t} size={22} />
            </motion.span>
          );
        })}
      </div>

      <div className="absolute top-1/2 left-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-ink-border bg-wine px-2 text-center">
        <h3 className="font-display text-lg leading-tight font-extrabold text-ink-foreground xl:text-xl">
          {skillsIntro.title}
        </h3>
      </div>

      {skillCategories.map((c, i) => {
        const p = polar(i, skillCategories.length, RADIUS);
        const selected = c.id === activeId;
        const Icon = c.icon;
        // Labels sit on the outside of the ring so they never cover the logos.
        const above = p.y < 50;
        return (
          <motion.button
            key={c.id}
            type="button"
            onClick={() => {
              setSignal((n) => n + 1);
              onSelect(c.id);
            }}
            aria-pressed={selected}
            aria-controls="skills-panel"
            whileHover="lift"
            whileTap="press"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={cn(
              "group absolute flex w-28 -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-sm text-center focus:outline-none xl:w-32",
              above
                ? "translate-y-[calc(-100%+1.625rem)] flex-col-reverse"
                : "-translate-y-[1.625rem] flex-col",
            )}
          >
            <motion.span
              variants={{ lift: { scale: 1.08 }, press: { scale: 0.96 } }}
              transition={{ duration: 0.18 }}
              className={cn(
                "flex size-13 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-accent-soft group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink",
                selected
                  ? "border-accent-soft bg-accent-soft text-accent"
                  : "border-ink-border bg-ink-raised text-accent-soft group-hover:border-accent-soft",
              )}
            >
              <Icon className="size-6" strokeWidth={1.7} />
            </motion.span>
            <span
              className={cn(
                "text-[0.8125rem] leading-tight font-semibold transition-colors xl:text-sm",
                selected ? "text-accent-soft" : "text-ink-foreground",
              )}
            >
              {c.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Mobile and tablet replacement for the constellation. */
function CategoryGrid({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-5">
      {skillCategories.map((c) => {
        const Icon = c.icon;
        const selected = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            aria-pressed={selected}
            aria-controls="skills-panel"
            className={cn(
              "flex min-h-32 flex-col justify-between gap-3 rounded-sm border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
              selected
                ? "border-accent-soft bg-accent-soft text-foreground"
                : "border-ink-border bg-ink-raised text-ink-foreground",
            )}
          >
            <Icon
              className={cn("size-5", selected ? "text-accent" : "text-accent-soft")}
              strokeWidth={1.7}
            />
            <span className="text-[0.9375rem] leading-tight font-bold">{c.name}</span>
            <span aria-hidden className="flex gap-1">
              {c.technologies
                .filter((t) => t.logo)
                .slice(0, 3)
                .map((t) => (
                  <span
                    key={t.name}
                    className="flex size-6 items-center justify-center rounded-sm bg-paper"
                  >
                    <TechLogo tech={t} size={16} />
                  </span>
                ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SkillsPanel({ category }: { category: SkillCategory }) {
  const Icon = category.icon;
  return (
    <div className="rounded-sm bg-paper p-5 text-foreground md:p-6">
      <div className="flex items-start gap-3.5 border-b border-border pb-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm bg-accent text-accent-foreground">
          <Icon className="size-5" strokeWidth={1.7} />
        </span>
        <div>
          <h3 className="type-subsection text-foreground">{category.name}</h3>
          <p className="type-support mt-0.5 text-muted-foreground">{category.summary}</p>
        </div>
      </div>

      <ul className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {category.technologies.map((t, i) => (
          <motion.li
            key={t.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.025 * i }}
            className="flex min-w-0 items-start gap-3 py-2"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-border bg-background">
              <TechLogo tech={t} size={26} />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.9375rem] leading-snug font-semibold text-foreground">
                {t.name}
              </span>
              {t.description && (
                <span className="block text-[0.8125rem] leading-snug text-muted-foreground">
                  {t.description}
                </span>
              )}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function AllSkills() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-ink-border bg-ink-border md:grid-cols-2">
      {skillCategories.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.id} className="bg-paper p-5 md:p-6">
            <h3 className="type-card flex items-center gap-2.5 text-foreground">
              <Icon className="size-[1.125rem] shrink-0 text-accent" strokeWidth={2} />
              {c.name}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 xl:grid-cols-3">
              {c.technologies.map((t) => (
                <li
                  key={t.name}
                  className="flex min-w-0 items-center gap-2.5 text-[0.9375rem] leading-tight font-medium text-foreground"
                >
                  <TechLogo tech={t} size={22} />
                  <span className="min-w-0">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Skills() {
  const [activeId, setActiveId] = useState("languages");
  const [showAll, setShowAll] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0]!;

  const selectFromGrid = (id: string) => {
    setActiveId(id);
    // On small screens the panel sits below the grid, so bring it into view.
    requestAnimationFrame(() =>
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const toggleAll = () => {
    const next = !showAll;
    setShowAll(next);
    if (next) {
      requestAnimationFrame(() =>
        allRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };

  return (
    <section id="skills" className="section-y bg-ink text-ink-foreground">
      <div className="container-page">
        <SectionHeading tone="ink" title={skillsIntro.heading} intro={skillsIntro.intro} />

        <Reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div role="group" aria-label="Skill categories" className="hidden lg:col-span-7 lg:block">
            <Constellation activeId={activeId} onSelect={setActiveId} />
          </div>
          <div role="group" aria-label="Skill categories" className="lg:hidden">
            <h3 className="type-subsection mb-4">{skillsIntro.title}</h3>
            <CategoryGrid activeId={activeId} onSelect={selectFromGrid} />
          </div>

          <div
            id="skills-panel"
            ref={panelRef}
            aria-live="polite"
            className="min-w-0 scroll-mt-4 lg:col-span-5"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <SkillsPanel category={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div ref={allRef} className="mt-8 scroll-mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-border pt-5">
            <p className="type-support font-medium text-ink-muted">
              {skillCategories.length} domains, {technologyCount} technologies
            </p>
            <Button
              variant="paper"
              className="h-11 px-5"
              onClick={toggleAll}
              aria-expanded={showAll}
              aria-controls="all-skills"
            >
              {showAll ? (
                <>
                  <X /> Hide All Skills
                </>
              ) : (
                <>
                  View All Skills <ArrowUpRight />
                </>
              )}
            </Button>
          </div>
          <div id="all-skills">
            <AnimatePresence initial={false}>
              {showAll && (
                // No height animation: measuring "auto" makes Framer Motion restore the
                // scroll position, which would cancel the scroll to this view.
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="pt-5"
                >
                  <AllSkills />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
