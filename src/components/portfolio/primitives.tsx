import { motion } from "framer-motion";
import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  profile,
  projectStatusLabels,
  type ProjectStatus,
  type Technology,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Scroll-triggered fade/slide. MotionConfig in the root route handles reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section title on the left, with its introduction alongside on wide screens. */
export function SectionHeading({
  id,
  title,
  intro,
  tone = "paper",
  as: Heading = "h2",
  className,
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "paper" | "ink";
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <Reveal
      className={cn("mb-8 grid items-end gap-x-10 gap-y-3 md:mb-10 lg:grid-cols-12", className)}
    >
      <Heading
        id={id}
        className={cn(
          Heading === "h2" ? "type-section" : "type-statement",
          intro ? "lg:col-span-6" : "lg:col-span-12",
          tone === "ink" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            "type-body lg:col-span-6",
            tone === "ink" ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Renders `text` with the first occurrence of `accent` wrapped for colouring. */
export function AccentText({
  text,
  accent,
  className = "text-accent",
}: {
  text: string;
  accent: string;
  className?: string;
}) {
  const at = text.indexOf(accent);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

/** Whether a project is in progress, complete or still being written up. */
export function StatusBadge({
  status,
  tone = "paper",
}: {
  status: ProjectStatus;
  tone?: "paper" | "ink";
}) {
  return (
    <span
      className={cn(
        "type-meta inline-flex w-fit items-center rounded-sm px-2 py-0.5",
        tone === "ink"
          ? "bg-accent-soft text-foreground"
          : status === "details-pending"
            ? "border border-dashed border-border-strong text-muted-foreground"
            : "bg-accent-soft text-foreground",
      )}
    >
      {projectStatusLabels[status]}
    </span>
  );
}

/** Official brand mark from public/logos, a neutral icon for concepts, or a monogram. */
export function TechLogo({
  tech,
  size = 20,
  className,
}: {
  tech: Technology;
  size?: number;
  className?: string;
}) {
  if (tech.logo) {
    return (
      <img
        src={`/logos/${tech.logo}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={cn("shrink-0 object-contain", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  if (tech.glyph) {
    const Glyph = tech.glyph;
    return (
      <Glyph
        aria-hidden
        size={size}
        strokeWidth={1.6}
        className={cn("shrink-0 text-accent", className)}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-[0.6rem] font-medium text-foreground",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {tech.name
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );
}

/**
 * A link that may not have a destination yet. Without an href it renders as a
 * disabled link rather than pointing somewhere broken.
 */
export function MaybeLink({
  href,
  className,
  children,
  label,
  unavailable = "Link coming soon",
}: {
  href: string;
  className?: string;
  children: ReactNode;
  /** Accessible name, for links that only contain an icon. */
  label?: string;
  unavailable?: string;
}) {
  const named = label ? { "aria-label": label } : {};
  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={unavailable}
        className={cn(className, "cursor-not-allowed opacity-60")}
        {...named}
      >
        {children}
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      {...named}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Download CV action. Disabled, not a dead link, until `profile.cvUrl` is set. */
export function CvButton({ className, ...props }: Omit<ButtonProps, "asChild" | "children">) {
  if (!profile.cvUrl) {
    return (
      <Button disabled title="CV coming soon" className={className} {...props}>
        <Download /> Download CV
      </Button>
    );
  }
  return (
    <Button asChild className={className} {...props}>
      <a href={profile.cvUrl} download>
        <Download /> Download CV
      </a>
    </Button>
  );
}
