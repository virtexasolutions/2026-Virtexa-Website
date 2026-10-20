import type { Comparison } from "@/lib/solutions";

export type ComparisonPage = {
  slug: string;
  /** Short name used in breadcrumbs and links. */
  name: string;
  /** Page heading (h1). */
  heading: string;
  /** <title> tag, ideally under 60 characters. */
  metaTitle: string;
  /** Meta description, ideally under 160 characters. */
  description: string;
  intro: string[];
  table: Comparison;
  /** Body sections. Paragraphs and bullets accept inline Markdown links. */
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  faqs: { q: string; a: string }[];
  /** Slug of the solution page this comparison supports. */
  relatedSolution?: string;
  /** Slug of a related blog post. */
  relatedPost?: string;
};

/** Comparison pages, rendered at /compare/<slug>. */
export const comparisons: ComparisonPage[] = [
  {
    slug: "ai-vs-isa",
    name: "AI vs ISA",
    heading: "AI vs ISA: Which Is Right for Your Real Estate Team?",
    metaTitle: "AI vs ISA for Real Estate Teams: Which Fits? | Virtexa",
    description:
      "An honest comparison of an AI ISA and a human inside sales agent for real estate: what each does well, where each falls short, and when to use both.",
    intro: [
      "An inside sales agent's job comes in two halves. One half is answering: picking up when a buyer or seller calls, finding out what they need, and setting the appointment. The other half is chasing: calling online leads who never picked up the phone, working through an old database, and following up for months until someone is ready.",
      "An AI ISA and a human ISA are good at different halves. This guide compares them side by side, including the things an AI voice agent does not do, so you can decide which fits your team, or whether you need both.",
    ],
    table: {
      heading: "AI ISA vs. human ISA, side by side",
      intro:
        "How a Virtexa AI ISA compares with a human inside sales agent across the parts of the job that matter most.",
      them: "Human ISA",
      rows: [
        {
          label: "Answering inbound calls",
          them: "During their shift, one call at a time",
          us: "Every call, 24/7, in under two rings, even when several come in at once",
        },
        {
          label: "Outbound follow-up calls",
          them: "A core strength: working new online leads, old leads, and the database",
          us: "Not included. The AI ISA answers inbound calls only",
          limited: true,
        },
        {
          label: "Long-term nurture",
          them: "Builds relationships over weeks and months",
          us: "Not included. Leave this to people and your CRM",
          limited: true,
        },
        {
          label: "Qualifying questions",
          them: "As thorough as the person and the day allow",
          us: "Timeline, budget, financing, and property asked on every call",
        },
        {
          label: "Notes in your CRM",
          them: "Typed up when they get a moment",
          us: "Summary, 0 to 100 lead score, objections, and next step sent automatically",
        },
        {
          label: "Booking showings",
          them: "Checks your calendar and books",
          us: "Offers only your open times on Google or Outlook and books during the call",
        },
        {
          label: "Listing questions",
          them: "Learns your inventory over time",
          us: "Answers from the listings you load, and never makes up details",
        },
        {
          label: "Negotiation and judgment calls",
          them: "Can read the situation and handle it",
          us: "Warm-transfers the caller to you, with a quick briefing first",
        },
        {
          label: "Getting started",
          them: "Weeks to recruit, hire, and train",
          us: "Live in 10 to 14 days, built and tested by our team",
        },
        {
          label: "If they leave",
          them: "Recruit and train all over again",
          us: "Nothing changes. Your script and setup stay in place",
        },
      ],
    },
    sections: [
      {
        heading: "The real difference: who starts the call",
        paragraphs: [
          "The simplest way to compare the two is to ask who dials. When a lead calls you, an AI ISA is hard to beat: it answers instantly at any hour, asks the same qualifying questions every time, and puts a scored summary in your CRM before you are back from your showing.",
          "When you need to call the lead, a human ISA is still the answer. A Virtexa AI ISA does not place outbound calls, so it will not work through a list of online leads, revive an old database, or make the fifth follow-up call that finally gets someone on the phone.",
        ],
      },
      {
        heading: "When an AI ISA is the better fit",
        bullets: [
          "**Most of your leads call you.** Sign calls, portal calls, referrals, and people ringing about a specific listing all start inbound.",
          "**Calls come in after hours.** Evenings and weekends are when many buyers browse, and a human ISA on a day shift will miss them.",
          "**You are a solo agent or a small team.** An AI ISA covers your phone without the cost of a full-time hire. Our guide to [what a real estate ISA costs](/blog/real-estate-isa-cost) walks through the numbers.",
          "**You have been burned by turnover.** The AI ISA does not quit, so you are not starting over every few months.",
          "**You want clean data on every call.** Every caller is [qualified and scored](/solutions/lead-qualification) the same way, and the answers land in your CRM automatically.",
        ],
      },
      {
        heading: "When a human ISA is the better fit",
        bullets: [
          "**You buy online leads that rarely call.** Leads who filled in a form need to be chased by phone, and that takes outbound calling.",
          "**You have a large database to work.** Calling past clients and old leads is a people job.",
          "**Your leads need long nurture.** Some buyers are a year away. Staying in touch until they are ready takes a person who remembers them.",
          "**You have time to manage someone.** A good ISA needs coaching, call reviews, and a clear compensation plan.",
        ],
      },
      {
        heading: "Why many teams use both",
        paragraphs: [
          "For many teams, the answer is not either-or. The AI ISA answers every inbound call, day and night, and books what it can. Your human ISA starts each morning with a scored list of everyone who called overnight, then spends the day on the outbound work only a person can do.",
          "That split also makes a human ISA easier to justify. They are no longer paid to sit by the phone waiting for it to ring, so their hours go into the follow-up that turns old leads into appointments.",
        ],
      },
      {
        heading: "Questions to ask before you decide",
        bullets: [
          "What share of your new leads call in, and what share need to be called?",
          "How many calls arrive outside business hours?",
          "How quickly is every caller reached today, and how many never get a call back?",
          "What does each closed deal from your current lead flow cost you?",
        ],
        paragraphs: [
          "If you are not sure of the answers, our free 30-minute System Audit is built to find them. We look at where your leads come from and how they are handled today, then tell you honestly whether an [AI ISA](/solutions/ai-isa), a human ISA, or both makes sense.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can an AI ISA completely replace a human ISA?",
        a: "Only if your ISA's job is mostly answering inbound calls. A Virtexa AI ISA handles that fully: it answers, qualifies, books showings, and transfers hot leads. It does not make outbound calls or nurture leads over time, so if that is a big part of your ISA's day, you still need a person for it.",
      },
      {
        q: "Does a Virtexa AI ISA make outbound calls?",
        a: "No. It answers inbound calls only. It will not dial through online leads or your database. Many teams pair it with a human ISA or agent who handles outbound follow-up.",
      },
      {
        q: "Is an AI ISA cheaper than a human ISA?",
        a: "Usually, once you count everything. A human ISA means salary or hourly pay, often bonuses, payroll costs and benefits, tools, training, and your time managing them. Virtexa is one plan, custom-quoted after your System Audit, with the build, CRM setup, and phone line included.",
      },
      {
        q: "Will callers know they are talking to AI?",
        a: "The AI ISA sounds natural and is scripted around your business, but it will never claim to be a person if a caller sincerely asks. When a caller wants to talk to someone, it warm-transfers them to you.",
      },
      {
        q: "How do an AI ISA and a human ISA work together?",
        a: "The AI ISA answers every inbound call and sends a scored summary of each caller to your CRM. Your human ISA uses that to decide who to follow up with first, and spends their time on outbound calls and long-term nurture.",
      },
    ],
    relatedSolution: "ai-isa",
    relatedPost: "real-estate-isa-cost",
  },
];

export function comparisonPath(page: Pick<ComparisonPage, "slug">) {
  return `/compare/${page.slug}`;
}

export function getComparison(slug: string | undefined) {
  return comparisons.find((c) => c.slug === slug);
}
