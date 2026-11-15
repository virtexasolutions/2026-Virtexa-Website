export type Integration = {
  slug: string;
  /** CRM name used in breadcrumbs, cards, and links. */
  name: string;
  /** Page heading (h1). */
  heading: string;
  /** <title> tag, ideally under 60 characters. */
  metaTitle: string;
  /** Meta description, ideally under 160 characters. */
  description: string;
  /** 40-60 word direct answer shown at the top as "In short". */
  summary: string;
  intro: string[];
  features: { title: string; text: string }[];
  /** An example of what a call looks like once it reaches the CRM. */
  example: { heading: string; intro: string; lines: string[]; note: string };
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Slug of the solution page this integration supports. */
  relatedSolution?: string;
};

/** Every way Virtexa can deliver leads, shown on the /integrations hub. */
export const crmConnections: {
  name: string;
  text: string;
  /** Slug of the integration's own page, once it has one. */
  page?: string;
}[] = [
  {
    name: "Follow Up Boss",
    text: "Direct connection. Each call arrives as an inquiry with the caller's details, a call summary, and tags.",
    page: "follow-up-boss",
  },
  {
    name: "HubSpot",
    text: "Direct connection. Callers are added as contacts with a note holding the call summary and qualification answers.",
  },
  {
    name: "GoHighLevel",
    text: "Direct connection. Callers are added or updated as contacts in your location, tagged, with the call summary as a note.",
  },
  {
    name: "Any other CRM",
    text: "Connect almost any other CRM, including kvCORE, Lofty, and Sierra, through Zapier, Make, or a signed webhook.",
  },
];

/** CRM integration pages, rendered at /integrations/<slug>. */
export const integrations: Integration[] = [
  {
    slug: "follow-up-boss",
    name: "Follow Up Boss",
    heading: "AI Voice Agent for Follow Up Boss",
    metaTitle: "AI Voice Agent for Follow Up Boss | Virtexa",
    description:
      "Connect Virtexa's AI voice agent to Follow Up Boss. Every call arrives as an inquiry with the caller's details, qualification answers, lead score, and tags.",
    summary:
      "Virtexa connects directly to Follow Up Boss. Every call its AI voice agent answers is sent to Follow Up Boss as an inquiry from the source Virtexa AI, with the caller's name and number, a call summary, their timeline, budget, and financing, any booked showing, and tags you can build smart lists and lead flow rules around.",
    intro: [
      "Follow Up Boss is only as good as the leads that make it in. Calls are the leak: a buyer rings while you are at a showing, leaves no message, and never becomes a contact at all. Even the calls you do take often end up as a name and a number with no notes.",
      "Virtexa's AI voice agent answers every call to your business, day or night, qualifies the caller, and sends the lead straight into Follow Up Boss. Each one arrives as an inquiry from the source Virtexa AI, with the caller's details, a summary of the call, their timeline, budget, and financing, any showing they booked, and tags you can build smart lists around.",
    ],
    features: [
      {
        title: "Every call becomes an inquiry",
        text: "Calls arrive as Follow Up Boss events: a Property Inquiry when the caller asks about a home, or a General Inquiry otherwise. Follow Up Boss matches them to an existing contact or creates a new one.",
      },
      {
        title: "A summary on the record",
        text: "The inquiry carries a short call summary, the lead score, the caller's timeline, budget, and financing, the property they asked about, and the recommended next step.",
      },
      {
        title: "Tags for smart lists",
        text: "Leads are tagged Virtexa AI, plus Qualified or Showing Booked, High Intent or Prospect, and Warm Transfer when the call was handed to you live.",
      },
      {
        title: "Works with your lead flow",
        text: "Every lead comes in under the source Virtexa AI, so you can route it and start action plans with your own Follow Up Boss lead flow settings, like any other source.",
      },
      {
        title: "Showings included",
        text: "When the caller books a showing during the call, the date, time, and property are included in the inquiry, and the showing is already on your calendar.",
      },
      {
        title: "A delivery log you can check",
        text: "Your Virtexa portal shows every lead sent to Follow Up Boss. You can send a test lead at any time, and resend any call with one click.",
      },
    ],
    example: {
      heading: "What lands in Follow Up Boss",
      intro:
        "Here is an example of the call summary attached to a new inquiry. Your own leads will reflect what each caller actually said.",
      lines: [
        "Virtexa AI call for Jordan Ellis",
        "Caller is relocating for work and wants to see 412 Oak Street this weekend.",
        "Sentiment: 86/100 (Positive)",
        "Timeline: Within the next two months",
        "Budget: Around $450,000",
        "Financing: Pre-approved",
        "Property: 412 Oak Street",
        "Appointment: 2026-10-24 11:00 @ 412 Oak Street",
        "Next step: Confirm Saturday's showing and send comparable homes nearby.",
      ],
      note: "Tags on this lead: Virtexa AI, Showing Booked, High Intent. Example only; names and details are made up.",
    },
    steps: [
      {
        title: "System Audit",
        text: "We look at how calls reach you today and how your Follow Up Boss lead flow, stages, and action plans are set up.",
      },
      {
        title: "Connect your account",
        text: "You create an API key in Follow Up Boss under Admin, then API, and we connect it. The key is stored securely on our servers and never shown in the browser.",
      },
      {
        title: "Send a test lead",
        text: "We send a test lead to confirm it lands where you expect, with the right source and tags, before your agent takes a single real call.",
      },
      {
        title: "Go live",
        text: "Your AI voice agent starts answering calls, and every caller lands in Follow Up Boss within moments of hanging up.",
      },
    ],
    faqs: [
      {
        q: "Will it create duplicate contacts?",
        a: "Leads are sent as Follow Up Boss inquiry events with the caller's name, phone number, and email if they gave one, so Follow Up Boss can match them to an existing contact instead of creating a new one.",
      },
      {
        q: "Does the full transcript go into Follow Up Boss?",
        a: "Follow Up Boss receives a short summary with the key details. The full recording and transcript of every call are kept in your Virtexa portal, so you can listen back before you return the call.",
      },
      {
        q: "Can each agent on my team use their own Follow Up Boss account?",
        a: "Yes. The CRM connection is set per agent, so each agent's calls go to the account they choose. Agents on the same team can also share one account.",
      },
      {
        q: "Does the AI call my Follow Up Boss leads?",
        a: "No. Virtexa sends leads into Follow Up Boss; it does not read your contacts or make outbound calls to them. It answers the calls that come in and makes sure every one of them is captured.",
      },
      {
        q: "What happens if a lead doesn't reach Follow Up Boss?",
        a: "Every delivery is logged in your Virtexa portal with its result. If one fails, for example because an API key was changed, you can fix the connection and resend the call with one click.",
      },
    ],
    relatedSolution: "lead-qualification",
  },
];

export const INTEGRATIONS_PATH = "/integrations";

export function integrationPath(integration: Pick<Integration, "slug">) {
  return `${INTEGRATIONS_PATH}/${integration.slug}`;
}

export function getIntegration(slug: string | undefined) {
  return integrations.find((i) => i.slug === slug);
}
