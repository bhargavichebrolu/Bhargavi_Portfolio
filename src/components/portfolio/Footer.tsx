import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

const iconLink =
  "inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-ink-border/50 hover:text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft";

export function Footer() {
  // Links that have not been added yet are left out of the footer entirely.
  const links: { label: string; href: string; icon: ReactNode }[] = [
    { label: "GitHub", href: profile.github, icon: <GithubIcon size={16} /> },
    { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon size={16} /> },
    {
      label: "Email",
      href: profile.email && `mailto:${profile.email}`,
      icon: <Mail className="size-4" />,
    },
  ];
  return (
    <footer className="border-t border-ink-border bg-ink text-ink-foreground">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{profile.displayName}</p>
          <p className="text-sm text-ink-muted">{profile.role}</p>
        </div>
        <div className="flex items-center gap-1">
          {links
            .filter((l) => l.href)
            .map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                className={iconLink}
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.icon}
              </a>
            ))}
        </div>
        <p className="font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} {profile.displayName}
        </p>
      </div>
    </footer>
  );
}
