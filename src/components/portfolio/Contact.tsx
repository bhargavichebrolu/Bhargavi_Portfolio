import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Info, Loader2, Mail, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactConfig, contactIntro, profile } from "@/data/portfolio";
import {
  buildMailto,
  contactSchema,
  getContactDelivery,
  type ContactDelivery,
  type ContactValues,
} from "@/lib/contact";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { AccentText, CvButton, MaybeLink, Reveal } from "./primitives";

type Status =
  | { kind: "idle" }
  | { kind: "mailto" }
  | { kind: "sent" }
  | { kind: "unavailable" }
  | { kind: "error" };

const deliveryNote: Record<ContactDelivery, string> = {
  endpoint: "Your message is sent directly to my inbox.",
  mailto: "This opens your email app with the message ready to send.",
  none: "This form is not connected yet, so it cannot deliver messages.",
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="type-meta mb-1.5 block text-ink-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive-ink">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  cn(
    "w-full rounded-sm border bg-ink px-4 py-3 text-[0.9375rem] text-ink-foreground placeholder:text-ink-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-soft",
    invalid ? "border-destructive-ink" : "border-ink-border focus:border-accent-soft",
  );

export function ContactForm({
  endpoint = contactConfig.formEndpoint,
  email = profile.email,
}: {
  endpoint?: string;
  email?: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const delivery = getContactDelivery(endpoint, email);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    if (delivery === "none") {
      setStatus({ kind: "unavailable" });
      return;
    }
    if (delivery === "mailto") {
      window.location.href = buildMailto(email, values);
      setStatus({ kind: "mailto" });
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error" });
    }
  };

  const describedBy = (name: keyof ContactValues) =>
    errors[name] ? { "aria-describedby": `${name}-error` } : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name?.message}>
          <input
            id="name"
            autoComplete="name"
            aria-required
            aria-invalid={!!errors.name}
            className={inputCls(!!errors.name)}
            {...describedBy("name")}
            {...register("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required
            aria-invalid={!!errors.email}
            className={inputCls(!!errors.email)}
            {...describedBy("email")}
            {...register("email")}
          />
        </Field>
      </div>
      <Field id="subject" label="Subject" error={errors.subject?.message}>
        <input
          id="subject"
          aria-required
          aria-invalid={!!errors.subject}
          className={inputCls(!!errors.subject)}
          {...describedBy("subject")}
          {...register("subject")}
        />
      </Field>
      <Field id="message" label="Message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          aria-required
          aria-invalid={!!errors.message}
          className={cn(inputCls(!!errors.message), "resize-y")}
          {...describedBy("message")}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm leading-snug text-ink-muted">
          <Info className="mt-0.5 size-4 shrink-0" />
          {deliveryNote[delivery]}
        </p>
        <Button
          type="submit"
          variant="paper"
          size="lg"
          disabled={isSubmitting}
          className="shrink-0"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Mail />}
          {delivery === "mailto" ? "Compose email" : "Send message"}
        </Button>
      </div>

      <div aria-live="polite" className="text-sm">
        {status.kind === "mailto" && (
          <p className="text-ink-foreground">
            Your email app should now be open. Nothing has been sent until you press send there.
          </p>
        )}
        {status.kind === "sent" && (
          <p className="text-ink-foreground">Thank you, your message has been sent.</p>
        )}
        {status.kind === "unavailable" && (
          <p className="text-destructive-ink">
            Your message was not sent because this form is not connected yet. Please use the contact
            links on this page instead.
          </p>
        )}
        {status.kind === "error" && (
          <p className="text-destructive-ink">
            Your message could not be sent. Please use the contact links on this page instead.
          </p>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  const links = [
    {
      label: "Email",
      value: profile.email || "Coming soon",
      href: profile.email && `mailto:${profile.email}`,
      icon: <Mail className="size-4" />,
    },
    {
      label: "LinkedIn",
      value: profile.linkedin ? "Connect on LinkedIn" : "Coming soon",
      href: profile.linkedin,
      icon: <LinkedinIcon size={16} />,
    },
    {
      label: "GitHub",
      value: profile.github ? "View my repositories" : "Coming soon",
      href: profile.github,
      icon: <GithubIcon size={16} />,
    },
    ...(profile.phone
      ? [
          {
            label: "Phone",
            value: profile.phone,
            href: `tel:${profile.phone.replace(/\s/g, "")}`,
            icon: <Phone className="size-4" />,
          },
        ]
      : []),
  ];
  return (
    <section id="contact" className="section-y bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 className="type-section">{contactIntro.heading}</h2>
          <p className="type-statement mt-3">
            <AccentText
              text={contactIntro.statement}
              accent={contactIntro.statementAccent}
              className="text-accent-soft"
            />
          </p>
          <p className="type-body mt-3 text-ink-muted">{contactIntro.intro}</p>

          <ul className="mt-6 divide-y divide-ink-border border-y border-ink-border">
            {links.map((l) => (
              <li key={l.label}>
                <MaybeLink
                  href={l.href}
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-ink-raised text-accent-soft">
                      {l.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="type-card block">{l.label}</span>
                      <span className="block break-words text-sm text-ink-muted">{l.value}</span>
                    </span>
                  </span>
                  {l.href && (
                    <ArrowUpRight className="size-4 shrink-0 text-accent-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </MaybeLink>
              </li>
            ))}
          </ul>

          <CvButton variant="paper" size="lg" className="mt-6" />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-sm bg-ink-raised p-6 md:p-8">
            <h3 className="type-subsection mb-5">{contactIntro.formTitle}</h3>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
