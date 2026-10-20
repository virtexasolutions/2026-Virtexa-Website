/**
 * A short, direct answer to the page's main question, placed near the top so
 * search engines and AI answer engines can quote it as a self-contained passage.
 */
export default function AnswerBox({ summary }: { summary: string }) {
  return (
    <section
      aria-label="In short"
      className="rounded-2xl border border-[hsl(21,38%,64%,0.3)] bg-[hsl(21,38%,64%,0.06)] p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
        In short
      </p>
      <p className="mt-2 leading-relaxed text-foreground">{summary}</p>
    </section>
  );
}
