import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import { CONTACT_EMAIL, EFFECTIVE_DATE } from "@/lib/legal";

export function LegalDocument({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <SubpageHeader />
      <main className="container mx-auto max-w-3xl px-4 pt-12 pb-20 lg:pt-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
          {eyebrow}
        </p>
        <h1
          className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Effective date: {EFFECTIVE_DATE}
        </p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
          {intro}
        </div>
        <div className="mt-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pt-10">
      <h2
        className="text-2xl font-bold tracking-tight text-foreground"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-[hsl(21,38%,64%)]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export function EmailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
    >
      {CONTACT_EMAIL}
    </a>
  );
}
