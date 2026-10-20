/** Side-by-side table comparing Virtexa with an alternative. */
export type Comparison = {
  heading: string;
  intro?: string;
  /** Column label for the alternative, e.g. "Human ISA". */
  them: string;
  /** `limited` marks a row where Virtexa does not do the thing. */
  rows: { label: string; them: string; us: string; limited?: boolean }[];
  note?: string;
};

export type Solution = {
  slug: string;
  /** Short name used in navigation and the footer. */
  name: string;
  /** Page heading (h1). */
  heading: string;
  /** <title> tag, ideally under 60 characters. */
  metaTitle: string;
  /** Meta description, ideally under 160 characters. */
  description: string;
  intro: string[];
  features: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  comparison?: Comparison;
  faqs: { q: string; a: string }[];
  /** Slug of a related blog post. */
  relatedPost?: string;
};

/** Service pages, rendered at /solutions/<slug>. */
export const solutions: Solution[] = [
  {
    slug: "ai-isa",
    name: "AI ISA",
    heading: "AI ISA for Real Estate: An Inside Sales Agent That Never Sleeps",
    metaTitle: "AI ISA for Real Estate | 24/7 Inside Sales Agent | Virtexa",
    description:
      "Virtexa's AI ISA answers every call 24/7 in under two rings, qualifies the lead, books showings, and logs it all to your CRM. No hiring or managing.",
    intro: [
      "An inside sales agent (ISA) has one job: get every new lead on the phone fast, find out if they are serious, and set the appointment so you can spend your time with clients. The problem is that a human ISA works set hours, handles one call at a time, takes weeks to hire and train, and may leave once you have finally got them up to speed.",
      "Virtexa builds you an AI ISA: a dedicated AI voice agent scripted around your market and your process. It answers every inbound call in under two rings, day and night, qualifies each lead on timeline, budget, and financing, books the showing on your calendar, and logs everything to your CRM. When a hot lead wants a person, it warm-transfers them to you live.",
    ],
    features: [
      {
        title: "Speed to lead, every time",
        text: "Every new lead who calls is answered live in under two rings, while they are still thinking about the home they asked about.",
      },
      {
        title: "Works every shift",
        text: "Nights, weekends, and holidays are covered. There are no sick days, no time off, and no gaps when someone quits.",
      },
      {
        title: "Qualifies and books",
        text: "Timeline, budget, and financing are captured on every call, and ready leads are booked straight onto your calendar.",
      },
      {
        title: "Hands hot leads to you",
        text: "When a lead is ready to talk to a person, the AI ISA warm-transfers them to you or your team in real time.",
      },
      {
        title: "Everything in your CRM",
        text: "Every call, answer, and next step is logged to the lead's CRM record, wired into the pipeline and follow-up we build for you.",
      },
      {
        title: "Nothing to manage",
        text: "No hiring, training, call reviews, or scheduling. We build, test, and tune your AI ISA, and you get a monthly performance report.",
      },
    ],
    comparison: {
      heading: "AI ISA vs. human ISA",
      intro:
        "What it takes to cover your leads with a human inside sales agent, compared with a Virtexa AI ISA.",
      them: "Human ISA",
      rows: [
        {
          label: "Hours covered",
          them: "Scheduled shifts, usually business hours",
          us: "24/7, including nights, weekends, and holidays",
        },
        {
          label: "Response to a new lead",
          them: "When they are free and off their last call",
          us: "Answered live in under two rings",
        },
        {
          label: "Calls at once",
          them: "One at a time",
          us: "Every call answered, even when they come in together",
        },
        {
          label: "Time to get started",
          them: "Weeks to recruit, hire, and train",
          us: "Live in 10 to 14 days",
        },
        {
          label: "What you pay for",
          them: "Salary or hourly pay, often plus commission or per-appointment bonuses, and your time managing them",
          us: "One plan, custom-quoted after your System Audit",
        },
        {
          label: "Turnover risk",
          them: "Start over with recruiting and training when they leave",
          us: "None. Your script and setup stay in place",
        },
        {
          label: "CRM notes",
          them: "Depends on the person remembering",
          us: "Logged automatically on every call",
        },
      ],
      note: "A great human ISA still has a place, especially for outbound follow-up and long-term relationship nurturing, which the AI ISA does not do. Many teams use an AI ISA for every inbound and after-hours call, then hand warm leads to people.",
    },
    steps: [
      {
        title: "System Audit",
        text: "We look at where your leads come from, how fast they are reached today, and where they slip through.",
      },
      {
        title: "Script your ISA",
        text: "We write the call flow and qualifying questions around your market, your listings, and how you like appointments set.",
      },
      {
        title: "Connect and test",
        text: "We wire your AI ISA to your CRM, calendar, and phone lines, then test it against real call scenarios. Most go live within 10 to 14 days.",
      },
      {
        title: "Report and refine",
        text: "A monthly performance report shows what your AI ISA handled, and we keep tuning the script.",
      },
    ],
    faqs: [
      {
        q: "What is an AI ISA?",
        a: "An AI ISA is an AI voice agent that does the job of a real estate inside sales agent: it talks to new leads the moment they call, qualifies them, books appointments, and passes ready leads to an agent. Virtexa builds and runs a dedicated one for your business.",
      },
      {
        q: "Does the AI ISA make outbound calls?",
        a: "No. Your AI ISA answers inbound calls: new leads calling about a listing, sellers asking about their home, and anyone who rings after hours. It does not dial out to old leads or run follow-up call campaigns, so if outbound prospecting is a big part of your plan, that is still a job for a person.",
      },
      {
        q: "Will an AI ISA replace my human ISA?",
        a: "It doesn't have to. Many teams use the AI ISA for every inbound call, overflow, and after-hours coverage, and let their people focus on outbound follow-up and conversations that are ready to move forward. Solo agents often use it in place of hiring an ISA at all.",
      },
      {
        q: "How does the cost compare to hiring an ISA?",
        a: "A human ISA usually means salary or hourly pay, often with commission or per-appointment bonuses, plus the time it takes to recruit, train, and manage them. Virtexa is one plan, custom-quoted after your System Audit, with the build, CRM setup, and monthly reporting included.",
      },
      {
        q: "Does it sound like a robot?",
        a: "No. Your AI ISA is custom-scripted to sound like your team, with a natural voice and pacing, and tested against real call scenarios before it goes live. When a caller asks for a person, it warm-transfers them to you.",
      },
    ],
    relatedPost: "real-estate-isa-cost",
  },
  {
    slug: "ai-call-answering",
    name: "24/7 AI Call Answering",
    heading: "24/7 AI Call Answering for Real Estate",
    metaTitle: "24/7 AI Call Answering for Real Estate | Virtexa",
    description:
      "A dedicated AI voice agent that answers every call for your real estate business, day or night, qualifies the lead, and logs it to your CRM.",
    intro: [
      "Every call to your business is a buyer, a seller, or a referral who is ready to talk right now. When that call rolls to voicemail because you are at a showing, a closing, or home with your family, many callers never try again. They call the next agent.",
      "Virtexa builds you a dedicated AI voice agent that picks up every inbound call in under two rings, nights, weekends, and holidays included. It holds a natural conversation, asks your qualifying questions, and makes sure every caller leaves with a clear next step.",
    ],
    features: [
      {
        title: "Every call answered",
        text: "Inbound calls are picked up in under two rings, 24 hours a day, so no lead reaches voicemail.",
      },
      {
        title: "Custom-scripted for your business",
        text: "Your agent is scripted around your market, listings, and process, and tested against real call scenarios before it goes live.",
      },
      {
        title: "Live lead qualification",
        text: "Timeline, budget, and financing are captured on every call and logged straight to the lead's CRM record.",
      },
      {
        title: "Books and transfers",
        text: "Callers can book a showing or consultation on your calendar, and hot leads asking for a person are warm-transferred to you in real time.",
      },
    ],
    steps: [
      {
        title: "System Audit",
        text: "We map how calls and leads reach you today and where they get lost.",
      },
      {
        title: "Build and script",
        text: "We script your agent, connect it to your CRM and calendar, and build your pipeline around it.",
      },
      {
        title: "Test and launch",
        text: "We test the agent against real call scenarios. Most agents are live within 10 to 14 days of kickoff.",
      },
      {
        title: "Report and refine",
        text: "A monthly performance report shows what the agent handled, and we keep tuning it.",
      },
    ],
    faqs: [
      {
        q: "Will callers know they are talking to AI?",
        a: "Your agent is custom-scripted to sound like your team, with a natural voice and pacing. When a caller asks for a person, it warm-transfers them to you in real time.",
      },
      {
        q: "What happens to the information from each call?",
        a: "The agent logs each caller's details, qualification answers, and next step to their record in your CRM, so nothing depends on someone remembering to write it down.",
      },
      {
        q: "How long does setup take?",
        a: "Most agents are live and taking calls within 10 to 14 days of kickoff.",
      },
    ],
    relatedPost: "what-is-an-ai-voice-agent-for-real-estate",
  },
  {
    slug: "lead-qualification",
    name: "Live Lead Qualification",
    heading: "Real Estate Lead Qualification with AI, on Every Call",
    metaTitle: "Real Estate Lead Qualification AI | Virtexa",
    description:
      "Virtexa's AI voice agent qualifies every caller on timeline, budget, financing, and property, scores the lead, and sends a ready-to-act summary to your CRM.",
    intro: [
      "Most callers will tell you exactly how serious they are if someone asks the right questions. When are they hoping to move? What price range are they in? Are they pre-approved or paying cash? Which home or neighborhood are they calling about? The trouble is that those questions only get asked when someone picks up, and the answers only help if they end up somewhere you can act on them.",
      "Virtexa's AI voice agent asks them on every inbound call, day or night, in a natural conversation. After the call, you get a scored lead with the answers, a short summary, and a recommended next step, already sitting in your CRM. You decide who to call first in seconds instead of listening to voicemails.",
    ],
    features: [
      {
        title: "The four questions that matter",
        text: "Every caller is asked about their timeline, budget or target price, financing or pre-approval status, and the property or area they are interested in.",
      },
      {
        title: "A score for every lead",
        text: "Each call gets a 0 to 100 lead score, an intent rating of high, medium, or low, and the caller's overall sentiment, so the hottest leads stand out.",
      },
      {
        title: "Objections and next step",
        text: "Concerns the caller raised, like price, rates, or location, are noted along with a one-line recommendation for what to do next with this lead.",
      },
      {
        title: "Straight into your CRM",
        text: "The contact, call summary, and qualification answers are sent to Follow Up Boss, HubSpot, or GoHighLevel directly, or to almost any other CRM through a webhook.",
      },
      {
        title: "Tagged for follow-up",
        text: "Leads arrive tagged by outcome, such as Qualified, Showing Booked, High Intent, or Warm Transfer, so you can filter and build follow-up around them.",
      },
      {
        title: "Recording and transcript",
        text: "Every call is recorded and transcribed in your Virtexa portal, so you can hear exactly what the caller said before you call them back.",
      },
    ],
    comparison: {
      heading: "What you know after a call",
      intro:
        "The difference between a missed or rushed call and a call qualified by your Virtexa AI voice agent.",
      them: "Voicemail or a rushed call",
      rows: [
        {
          label: "Who called",
          them: "A number, if they left one",
          us: "Name and best callback number, confirmed before the call ends",
        },
        {
          label: "What they want",
          them: "Often unclear until you call back",
          us: "Buying, selling, a specific listing, or something else",
        },
        {
          label: "Timeline, budget, and financing",
          them: "Unknown until you ask",
          us: "Captured on the call and written into the CRM note",
        },
        {
          label: "How hot the lead is",
          them: "Your best guess",
          us: "A 0 to 100 lead score, intent rating, and sentiment",
        },
        {
          label: "What happens next",
          them: "Depends on when you get to it",
          us: "A booked showing, a live transfer to you, or a clear next-step note",
        },
      ],
    },
    steps: [
      {
        title: "System Audit",
        text: "We look at where your calls come from and what you need to know about a lead before you call them back.",
      },
      {
        title: "Script the questions",
        text: "We write the conversation around your market and listings, so the agent qualifies naturally instead of reading from a form.",
      },
      {
        title: "Connect your CRM",
        text: "We connect your CRM and calendar, then test the agent against real call scenarios before it goes live.",
      },
      {
        title: "Act on scored leads",
        text: "Every call lands in your CRM with its score, answers, and next step, ready for you or your team to follow up.",
      },
    ],
    faqs: [
      {
        q: "What does the AI ask callers?",
        a: "It first finds out what the caller needs, such as buying, selling, or asking about a specific listing. Then it asks about their timeline, budget or target price, financing or pre-approval status, and the property or area they care about. Before the call ends, it confirms their name and best callback number.",
      },
      {
        q: "How is the lead score worked out?",
        a: "After each call, the conversation is analyzed for buying or selling intent and sentiment, and given a score from 0 (no intent) to 100 (ready to act). Leads scoring 80 or above are tagged High Intent in your CRM.",
      },
      {
        q: "Will it make up answers about my listings?",
        a: "No. The agent only answers from the listings you have loaded into your Virtexa portal, and it is told never to invent property details, prices, or availability. When a caller needs something it can't answer, it can warm-transfer them to you or take a message.",
      },
      {
        q: "Does qualification slow down hot leads?",
        a: "No. If a caller asks for you, wants to negotiate, or has an urgent question, the agent warm-transfers them to your phone straight away and briefs you on who is calling and what they want. Callers ready to see a home can book a showing on your calendar during the call.",
      },
      {
        q: "What if a caller hangs up before the AI can talk to them?",
        a: "Callers who hang up before speaking are listed under Missed Calls in your Virtexa portal, so you can call them back.",
      },
    ],
    relatedPost: "real-estate-isa-cost",
  },
  {
    slug: "appointment-booking",
    name: "Appointment Booking",
    heading: "AI Appointment Booking for Real Estate",
    metaTitle: "AI Showing & Appointment Booking for Real Estate | Virtexa",
    description:
      "Let callers book showings and consultations straight onto your calendar in real time, synced to who is actually available, with no back-and-forth.",
    intro: [
      "The moment a buyer or seller is ready to meet is the best moment to book them. Every round of phone tag after that gives them another chance to talk to someone else.",
      "Your Virtexa AI voice agent books showings, listing consultations, and buyer consultations directly onto your calendar during the call, based on who is actually available.",
    ],
    features: [
      {
        title: "Booked on the call",
        text: "Leads book directly onto your calendar in real time, while they are still on the phone.",
      },
      {
        title: "Synced to real availability",
        text: "Appointments are matched to who is actually available, so there is no double-booking or back-and-forth.",
      },
      {
        title: "Qualified before they book",
        text: "Timeline, budget, and financing are captured first, so you walk into every appointment prepared.",
      },
      {
        title: "In your CRM automatically",
        text: "Every booked appointment and the details behind it are logged to the lead's CRM record.",
      },
    ],
    steps: [
      {
        title: "Connect your calendars",
        text: "We connect the calendars for you and your team.",
      },
      {
        title: "Set your rules",
        text: "We set which appointment types can be booked, by whom, and when.",
      },
      {
        title: "Script the booking flow",
        text: "Your agent qualifies the caller and offers available times naturally in conversation.",
      },
      {
        title: "Go live",
        text: "Appointments land on your calendar, and you get the details in your CRM.",
      },
    ],
    faqs: [
      {
        q: "Can it book for a whole team?",
        a: "Yes. Appointments are synced to who is actually available, so leads can be booked with the right person on your team.",
      },
      {
        q: "What kinds of appointments can it book?",
        a: "Showings, listing consultations, buyer consultations, and other appointment types you choose, following the rules you set.",
      },
    ],
    relatedPost: "speed-to-lead-real-estate",
  },
  {
    slug: "live-warm-transfer",
    name: "Live Warm Transfer",
    heading: "Live Warm Transfer for Real Estate Leads",
    metaTitle: "Live Warm Transfer for Hot Real Estate Leads | Virtexa",
    description:
      "When a hot lead asks for a person, your Virtexa AI voice agent transfers them to you or your team in real time, with no voicemail and no lost momentum.",
    intro: [
      "Some callers are ready to act right now and want to talk to a person. Telling them someone will call back loses the moment you worked so hard to create.",
      "Your Virtexa AI voice agent recognizes when a lead is hot or asks for a human, and transfers the call to you or a teammate in real time.",
    ],
    features: [
      {
        title: "Real-time transfer",
        text: "A hot lead asking for a person is transferred live, with no voicemail and no lost momentum.",
      },
      {
        title: "Qualified first",
        text: "The agent gathers the key details before the transfer, so you pick up already knowing who you are talking to and what they need.",
      },
      {
        title: "Routed to the right person",
        text: "Transfers follow the routing you set for your team.",
      },
      {
        title: "Logged to your CRM",
        text: "The call and everything learned on it are saved to the lead's record.",
      },
    ],
    steps: [
      {
        title: "Define a hot lead",
        text: "We agree on what makes a caller ready for a live conversation.",
      },
      {
        title: "Set your routing",
        text: "We set who should receive transfers, and when.",
      },
      {
        title: "Build the hand-off",
        text: "We script how the agent introduces the transfer so it feels seamless to the caller.",
      },
      {
        title: "Go live",
        text: "Hot leads reach a person in real time.",
      },
    ],
    faqs: [
      {
        q: "What if no one is available to take the transfer?",
        a: "Your agent can book an appointment or schedule a callback instead, so the lead still leaves with a clear next step.",
      },
    ],
    relatedPost: "speed-to-lead-real-estate",
  },
];

export function solutionPath(solution: Pick<Solution, "slug">) {
  return `/solutions/${solution.slug}`;
}

export function getSolution(slug: string | undefined) {
  return solutions.find((s) => s.slug === slug);
}
