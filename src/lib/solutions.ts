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
  faqs: { q: string; a: string }[];
  /** Slug of a related blog post. */
  relatedPost?: string;
};

/** Service pages, rendered at /solutions/<slug>. */
export const solutions: Solution[] = [
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
        text: "Budget, timeline, and motivation are captured on every call and logged straight to the lead's CRM record.",
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
    slug: "missed-call-text-back",
    name: "Missed-Call Text-Back",
    heading: "Missed-Call Text-Back Service for Real Estate Agents",
    metaTitle: "Missed-Call Text-Back Service for Real Estate | Virtexa",
    description:
      "When a call is missed, Virtexa texts the caller back within seconds, keeps the conversation going, and logs it to your CRM, so leads don't go to the next agent.",
    intro: [
      "Many callers will not leave a voicemail. If a call goes unanswered, the lead may already be dialing the next listing agent before you see the missed call.",
      "Virtexa's missed-call text-back replies to the caller by text within seconds, so the conversation keeps going while their interest is at its peak. It works alongside your AI voice agent as a safety net for any call that is not answered live.",
    ],
    features: [
      {
        title: "A reply within seconds",
        text: "A missed call gets a friendly text reply within seconds, before the lead has a chance to call someone else.",
      },
      {
        title: "Written in your voice",
        text: "Messages identify you and your business and invite the caller to keep talking, rather than reading like a marketing blast.",
      },
      {
        title: "Logged to your CRM",
        text: "Every text conversation is saved to the lead's record, so you have the full context when you follow up.",
      },
      {
        title: "Opt-outs honored",
        text: "Replies of STOP are honored automatically, and messages are sent through registered business texting.",
      },
    ],
    steps: [
      {
        title: "Connect your number",
        text: "We connect your business line so missed calls are detected automatically.",
      },
      {
        title: "Write the messages",
        text: "We write your text-back messages and follow-up logic around how you work.",
      },
      {
        title: "Wire it to your CRM",
        text: "Conversations and lead details flow into your CRM and pipeline.",
      },
      {
        title: "Go live",
        text: "Every missed call gets a text reply, day or night.",
      },
    ],
    faqs: [
      {
        q: "Do I need missed-call text-back if I have an AI voice agent?",
        a: "Your AI voice agent answers calls live, and text-back catches anything that still slips through, such as a caller who hangs up before the call connects.",
      },
      {
        q: "Is texting leads allowed?",
        a: "Texting someone who just called you about their inquiry is standard practice, but there are rules to follow, such as honoring opt-outs and registering your business texting. We build these safeguards in. Check with your broker or attorney for your specific situation.",
      },
    ],
    relatedPost: "missed-call-text-back-for-realtors",
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
        text: "Budget, timeline, and motivation are captured first, so you walk into every appointment prepared.",
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
