import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { AccentText, CvButton, MaybeLink } from "./primitives";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const socialLink =
  "inline-flex h-12 items-center gap-2 rounded-sm px-3 text-[0.95rem] font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Portrait() {
  const { photo } = profile;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={photo.srcSetWebp}
        sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
      />
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </picture>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* Burgundy panel behind the photo, running up into the navigation bar */}
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[36%] bg-wine lg:block" />

      <div className="container-page relative grid items-center gap-x-10 lg:grid-cols-12">
        <motion.div className="pt-10 pb-10 lg:col-span-7 lg:py-14" {...enter(0)}>
          <p className="eyebrow mb-5">{profile.role}</p>
          <h1 className="type-hero text-foreground">
            <AccentText text={profile.headline} accent={profile.headlineAccent} />
          </h1>
          <p className="type-body mt-5 max-w-2xl text-foreground/80">{profile.intro}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <Link to="/" hash="projects" activeOptions={{ includeHash: true }}>
                Explore My Work
                <ArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
            </Button>
            <CvButton size="lg" variant="line" />
            <div className="flex items-center gap-1">
              <MaybeLink href={profile.github} className={socialLink}>
                <GithubIcon /> GitHub
              </MaybeLink>
              <MaybeLink href={profile.linkedin} className={socialLink}>
                <LinkedinIcon /> LinkedIn
              </MaybeLink>
            </div>
          </div>

          <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-border-strong pt-5 sm:grid-cols-3">
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="type-meta text-accent">{fact.label}</dt>
                <dd className="type-support mt-1 font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="-mx-5 bg-wine px-5 py-8 md:-mx-10 md:px-10 lg:col-span-5 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-10"
          {...enter(0.15)}
        >
          <figure className="mx-auto max-w-md lg:mr-8 lg:ml-auto">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary shadow-[0_24px_50px_-28px_rgb(0_0_0/0.65)]">
              <Portrait />
            </div>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
