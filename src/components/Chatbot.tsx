import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  isBookingWidget?: boolean;
}

const quickPrompts = [
  "Book an audit",
  "What's included?",
  "Which plan fits me?",
  "How fast can we go live?",
  "Does the AI sound robotic?",
];

const CALENDAR_ID = "lGWutJTLLOiszDqfKUfG";
const LOCATION_ID = "x0DZpgAlhsZCbnEJ44Us";
const BOOKING_API_URL = "https://backend.leadconnectorhq.com";
const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";

const CUSTOM_FIELDS = {
  teamType: "mP9JH8JwATHUhvxu6JoG",
  primaryGoal: "g8d6Qhcj8pf4Fjt902NZ",
  currentCRM: "GaIzDrZPOvJe2FguZl6L",
};

const getBrowserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const clampAvailabilityRange = (startMs: number, endMs: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = Math.max(startMs, today.getTime());
  const maxEndDate = startDate + 31 * 24 * 60 * 60 * 1000;
  const endDate = Math.min(Math.max(endMs, startDate), maxEndDate);
  return { startDate, endDate };
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

function ChatBookingWidget({
  onBooked,
}: {
  onBooked: (details: { date: string; time: string }) => void;
}) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [slotsData, setSlotsData] = useState<
    Record<string, { slots: string[] }>
  >({});
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "form" | "success">("date");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamType, setTeamType] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");

  const loadSlots = useCallback(async () => {
    setLoadingSlots(true);
    setError(null);
    try {
      const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
      const end = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      );
      const { startDate, endDate } = clampAvailabilityRange(
        start.getTime(),
        end.getTime(),
      );
      const params = new URLSearchParams({
        startDate: String(startDate),
        endDate: String(endDate),
        timezone: getBrowserTimezone(),
      });
      const res = await fetch(
        `${BOOKING_API_URL}/calendars/${CALENDAR_ID}/free-slots?${params}`,
      );
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSlotsData(data);
    } catch {
      setError("Unable to load slots.");
    } finally {
      setLoadingSlots(false);
    }
  }, [viewDate]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOffset = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1,
  ).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDates = Object.keys(slotsData).filter(
    (k) => slotsData[k]?.slots?.length > 0,
  );

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const formatSlotTime = (slot: string) => {
    try {
      return new Date(slot).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return slot;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${VIBE_API_URL}/booking/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          selectedSlot,
          locationId: LOCATION_ID,
          calendarId: CALENDAR_ID,
          selectedTimezone: getBrowserTimezone(),
          sessionId: crypto.randomUUID(),
          customFields: [
            {
              id: CUSTOM_FIELDS.teamType,
              field_value: teamType || "Not specified",
            },
            {
              id: CUSTOM_FIELDS.primaryGoal,
              field_value: primaryGoal || "Not specified",
            },
          ],
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setStep("success");
      onBooked({
        date: selectedDate || "",
        time: formatSlotTime(selectedSlot),
      });
    } catch {
      setError("Failed to book. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="rounded-xl border border-[hsl(21,38%,64%,0.3)] bg-[hsl(21,38%,64%,0.1)] p-3 text-center">
        <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(21,38%,64%)] text-[hsl(0,0%,10%)]">
          <Check className="h-4 w-4" />
        </div>
        <p className="text-xs font-semibold text-foreground">
          30-Min Audit Confirmed!
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Check your inbox for meeting details.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,12%)] p-3 text-xs">
      {step === "date" && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold text-foreground">
              Select Audit Date
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    new Date(
                      viewDate.getFullYear(),
                      viewDate.getMonth() - 1,
                      1,
                    ),
                  )
                }
                className="rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-medium text-foreground">
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    new Date(
                      viewDate.getFullYear(),
                      viewDate.getMonth() + 1,
                      1,
                    ),
                  )
                }
                className="rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {loadingSlots ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-[hsl(21,38%,64%)]" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-1 text-center">
                {dayLabels.map((d, i) => (
                  <span key={i} className="text-[10px] text-muted-foreground">
                    {d}
                  </span>
                ))}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                  <div key={`e-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateKey = formatDateKey(
                    viewDate.getFullYear(),
                    viewDate.getMonth(),
                    day,
                  );
                  const cellDate = new Date(
                    viewDate.getFullYear(),
                    viewDate.getMonth(),
                    day,
                  );
                  const isPast = cellDate < today;
                  const hasSlots = availableDates.includes(dateKey);
                  const isSelected = selectedDate === dateKey;

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={isPast || !hasSlots}
                      onClick={() => {
                        setSelectedDate(dateKey);
                        setSelectedSlot(null);
                      }}
                      className={`h-6 rounded text-[11px] font-medium transition-colors ${
                        isSelected
                          ? "bg-[hsl(21,38%,64%)] text-[hsl(0,0%,10%)] font-bold"
                          : hasSlots && !isPast
                            ? "text-foreground hover:bg-white/10"
                            : "text-muted-foreground/30"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && slotsData[selectedDate]?.slots && (
                <div className="mt-2.5 pt-2 border-t border-[hsl(30,10%,22%)] space-y-1.5">
                  <p className="text-[11px] font-medium text-muted-foreground">
                    Available times
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {slotsData[selectedDate].slots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          setStep("form");
                        }}
                        className="flex items-center justify-between rounded bg-[hsl(30,10%,18%)] border border-[hsl(30,10%,25%)] px-2 py-1 text-[11px] text-foreground hover:border-[hsl(21,38%,64%)]"
                      >
                        {formatSlotTime(slot)}
                        <ArrowRight className="h-2.5 w-2.5 text-[hsl(21,38%,64%)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">
              Contact & Audit Info
            </span>
            <button
              type="button"
              onClick={() => setStep("date")}
              className="text-[10px] text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <input
              placeholder="First Name *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="rounded bg-[hsl(0,0%,8%)] border border-[hsl(30,10%,22%)] px-2 py-1 text-[11px] text-foreground focus:outline-none"
            />
            <input
              placeholder="Last Name *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="rounded bg-[hsl(0,0%,8%)] border border-[hsl(30,10%,22%)] px-2 py-1 text-[11px] text-foreground focus:outline-none"
            />
          </div>

          <input
            placeholder="Email Address *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded bg-[hsl(0,0%,8%)] border border-[hsl(30,10%,22%)] px-2 py-1 text-[11px] text-foreground focus:outline-none"
          />

          <input
            placeholder="Phone Number *"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded bg-[hsl(0,0%,8%)] border border-[hsl(30,10%,22%)] px-2 py-1 text-[11px] text-foreground focus:outline-none"
          />

          <select
            value={teamType}
            onChange={(e) => setTeamType(e.target.value)}
            className="w-full rounded bg-[hsl(0,0%,8%)] border border-[hsl(30,10%,22%)] px-2 py-1 text-[11px] text-foreground focus:outline-none"
          >
            <option value="">Team Type...</option>
            <option value="Solo Agent">Solo Agent</option>
            <option value="Team (2-4 agents)">Team (2–4 agents)</option>
            <option value="Brokerage (5+ agents)">Brokerage (5+ agents)</option>
          </select>

          {error && <p className="text-[10px] text-red-400">{error}</p>}

          <p className="text-[9px] leading-snug text-muted-foreground">
            By booking, you agree to our{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Privacy Policy
            </a>
            , and to receive calls and texts from Virtexa about your
            appointment, including automated messages. Consent is not a
            condition of purchase. Msg &amp; data rates may apply. Reply STOP to
            opt out.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] py-1.5 text-[11px] font-semibold text-[hsl(0,0%,10%)] hover:opacity-90 flex items-center justify-center gap-1"
          >
            {submitting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              "Confirm 30-Min Audit"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

async function getBotResponseAsync(
  input: string,
  history: Message[],
): Promise<{ text: string; showBookingWidget?: boolean }> {
  const q = input.toLowerCase();

  // Try fetching response from conversational AI backend endpoint first
  try {
    const chatHistory = history.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${VIBE_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are Virtexa AI, the conversational AI sales engineer for Virtexa Solutions. Virtexa provides custom AI voice agents and autonomous operating systems for real estate top producers, teams, and brokerages. Every plan includes the same six-part core build: 24/7 AI call answering, live lead qualification (budget, timeline, motivation) logged to the CRM, instant missed-call text-back, showing and appointment booking, a pipeline and follow-up automation build wired into the client's CRM, and live warm transfer. There are three plans: Solo Agent (one agent or a small team covering their first line), Team (2–4 agents on shared lines), and Brokerage (5+ agents or multi-office). Most agents go live within 10–14 days of kickoff. Never quote prices, minutes, or specific CRM platform names; pricing is custom-quoted after a System Audit. Only describe the features listed here. Whenever a user expresses interest in a system audit, demo, pricing quote, or consultation, encourage them to pick a time directly in the chat widget.",
          },
          ...chatHistory,
          { role: "user", content: input },
        ],
        locationId: LOCATION_ID,
        calendarId: CALENDAR_ID,
      }),
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const replyText =
        data.reply || data.message || data.choices?.[0]?.message?.content;
      if (replyText) {
        const isBooking =
          q.includes("book") ||
          q.includes("audit") ||
          q.includes("schedule") ||
          q.includes("demo") ||
          q.includes("calendar") ||
          replyText.toLowerCase().includes("select a time") ||
          replyText.toLowerCase().includes("calendar below");
        return { text: replyText, showBookingWidget: isBooking };
      }
    }
  } catch {
    // Fall back to local knowledge engine
  }

  if (
    q.includes("book") ||
    q.includes("audit") ||
    q.includes("demo") ||
    q.includes("schedule") ||
    q.includes("calendar")
  ) {
    return {
      text: "I can set up your 30-minute System Audit right here in our chat! Pick a convenient date and time below to lock in your session:",
      showBookingWidget: true,
    };
  }
  if (
    q.includes("include") ||
    q.includes("feature") ||
    q.includes("offer") ||
    q.includes("what do you do")
  ) {
    return {
      text: "Every Virtexa plan includes the same six-part core build: 24/7 AI call answering, live lead qualification (budget, timeline, and motivation logged to your CRM), instant missed-call text-back, showing and appointment booking, a pipeline and follow-up automation build, and live warm transfer for hot leads.",
    };
  }
  if (
    q.includes("which plan") ||
    q.includes("solo") ||
    q.includes("team") ||
    q.includes("fit")
  ) {
    return {
      text: "Solo Agent covers a single agent or small team getting their first line answered. Team is for 2–4 agents on shared lines, with a shared reporting dashboard and coordinated rollout. Brokerage is for 5+ agents or multi-office operations, with a dedicated onboarding specialist and success manager. Book a System Audit and we'll recommend the right fit:",
      showBookingWidget: true,
    };
  }
  if (q.includes("text") || q.includes("sms") || q.includes("missed")) {
    return {
      text: "When a call is missed, the lead gets a text reply within seconds, before they have a chance to call the next listing agent.",
    };
  }
  if (q.includes("transfer") || q.includes("person")) {
    return {
      text: "When a hot lead asks for a person, your Virtexa agent warm-transfers the call to you in real time. No voicemail, no lost momentum.",
    };
  }
  if (q.includes("qualif")) {
    return {
      text: "On every call, your agent captures the lead's budget, timeline, and motivation and logs it straight to the CRM record, so you know who to call first.",
    };
  }
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("tier") ||
    q.includes("plan") ||
    q.includes("invest")
  ) {
    return {
      text: "Virtexa offers three plans — Solo Agent, Team, and Brokerage — and every plan includes the same core build. Pricing is custom-quoted after your System Audit. Pick a time below to get your exact blueprint and quote:",
      showBookingWidget: true,
    };
  }
  if (
    q.includes("crm") ||
    q.includes("integrat") ||
    q.includes("follow up boss") ||
    q.includes("kvcore") ||
    q.includes("boomtown") ||
    q.includes("salesforce")
  ) {
    return {
      text: "Your voice agent is wired straight into your CRM. We build your pipeline stages, follow-up sequences, and tagging around it, and every call's qualification details and booked appointments are logged to the lead's record.",
    };
  }
  if (
    q.includes("sound") ||
    q.includes("robot") ||
    q.includes("voice") ||
    q.includes("realistic") ||
    q.includes("human")
  ) {
    return {
      text: "Not at all. Every Virtexa agent is custom-scripted for your business and tested against real call scenarios before it goes live, so it sounds like your team, not a generic bot. And when a caller asks for a person, the agent warm-transfers them to you in real time. Try the phone simulator at the top of the page to hear it live!",
    };
  }
  if (
    q.includes("fast") ||
    q.includes("go live") ||
    q.includes("launch") ||
    q.includes("deploy") ||
    q.includes("timeline")
  ) {
    return {
      text: "Most agents are live and taking calls within 10–14 days of kickoff, with a monthly performance report from day one.",
    };
  }
  if (
    q.includes("database") ||
    q.includes("reactivat") ||
    q.includes("cold") ||
    q.includes("dormant")
  ) {
    return {
      text: "Every Virtexa build includes your pipeline stages, follow-up sequences, and tagging, wired to your voice agent — so leads get consistent follow-up and interested contacts book straight onto your calendar.",
    };
  }
  if (
    q.includes("speed") ||
    q.includes("lead") ||
    q.includes("response") ||
    q.includes("missed call")
  ) {
    return {
      text: "Every inbound call is picked up in under two rings, 24/7 — and a missed call gets an instant text-back within seconds, before the lead can call the next agent.",
    };
  }
  if (
    q.includes("brokerage") ||
    q.includes("franchise") ||
    q.includes("office")
  ) {
    return {
      text: "Our Brokerage plan is built for brokerages and multi-office operations running 5+ agents. Every agent gets the full core build, plus a dedicated onboarding specialist, a scheduled multi-office rollout, and a dedicated success manager.",
    };
  }
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("greet")
  ) {
    return {
      text: "Hello! I am the Virtexa Conversational AI Agent. How can I assist with your real estate AI voice infrastructure today? You can ask me questions or schedule a 30-minute System Audit right here.",
    };
  }
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("talk to human")
  ) {
    return {
      text: "You can email us directly at hello@virtexasolutions.com or schedule a 30-minute System Audit below to speak with an AI systems strategist:",
      showBookingWidget: true,
    };
  }
  return {
    text: "I can answer questions about what's included, our three plans (Solo Agent, Team, and Brokerage), and go-live timelines, or schedule a 30-minute System Audit for your team right now. Would you like to select an audit date?",
    showBookingWidget: true,
  };
}
let msgId = 0;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId++,
      role: "bot",
      text: "Hi! I'm the Virtexa AI assistant. Ask me anything about our AI voice agents, or book a 30-minute system audit right here in the chat!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setInput("");
    const userMsg: Message = { id: msgId++, role: "user", text: trimmed };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setTyping(true);

    const res = await getBotResponseAsync(trimmed, currentMessages);
    setTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: msgId++,
        role: "bot",
        text: res.text,
        isBookingWidget: res.showBookingWidget,
      },
    ]);
  };
  const handleBooked = ({ date, time }: { date: string; time: string }) => {
    setMessages((prev) => [
      ...prev,
      {
        id: msgId++,
        role: "bot",
        text: `Your 30-minute System Audit is scheduled for ${date} at ${time}! We look forward to analyzing your current lead flow.`,
      },
    ]);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] shadow-lg glow-soft"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(21,42%,72%)] opacity-60" />
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(21,38%,64%)] text-[10px] font-bold text-[hsl(0,0%,10%)]">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(580px,78vh)] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl glass-strong shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[hsl(30,10%,22%)] px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]">
                <Sparkles className="h-5 w-5 text-[hsl(0,0%,10%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold text-foreground truncate"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Virtexa AI Agent
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[hsl(150,40%,50%)]" />
                  Online · Book audit directly in chat
                </p>
              </div>
              <button
                onClick={() => send("Book an audit")}
                className="flex items-center gap-1 rounded-lg bg-[hsl(21,38%,64%,0.15)] border border-[hsl(21,38%,64%,0.3)] px-2.5 py-1 text-xs font-medium text-[hsl(21,38%,64%)] hover:bg-[hsl(21,38%,64%,0.25)] transition-colors"
              >
                <Calendar className="h-3 w-3" />
                Book Audit
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col",
                    m.role === "user" ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
                      m.role === "user"
                        ? "bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] font-medium"
                        : "bg-[hsl(30,12%,14%)] text-foreground border border-[hsl(30,10%,22%)]",
                    )}
                  >
                    {m.text}
                  </div>
                  {m.isBookingWidget && m.role === "bot" && (
                    <div className="w-full max-w-[92%]">
                      <ChatBookingWidget onBooked={handleBooked} />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-[hsl(30,12%,14%)] border border-[hsl(30,10%,22%)] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-[hsl(28,14%,62%)]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => send(prompt)}
                    className="rounded-full border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-[hsl(21,38%,64%)] hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[hsl(30,10%,22%)] px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message or ask to book..."
                className="flex-1 rounded-xl bg-[hsl(0,0%,8%)] border border-[hsl(30,10%,22%)] px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-[hsl(21,38%,64%)] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] transition-opacity hover:opacity-90"
                aria-label="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
