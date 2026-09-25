import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CALENDAR_ID = "IfEWJ3S36rtJPcFjkqh1";
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

const fetchCalendarFreeSlots = async (
  calendarId: string,
  startMs: number,
  endMs: number,
) => {
  const { startDate, endDate } = clampAvailabilityRange(startMs, endMs);
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: getBrowserTimezone(),
  });
  const response = await fetch(
    `${BOOKING_API_URL}/calendars/${calendarId}/free-slots?${params}`,
  );
  if (!response.ok) throw new Error("Failed to fetch calendar availability");
  return response.json();
};

const submitCalendarBooking = async (payload: Record<string, unknown>) => {
  const response = await fetch(`${VIBE_API_URL}/booking/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      locationId: LOCATION_ID,
      calendarId: CALENDAR_ID,
      selectedTimezone:
        (payload.selectedTimezone as string) ?? getBrowserTimezone(),
      sessionId: (payload.sessionId as string) ?? crypto.randomUUID(),
      customFields: payload.customFields ?? [],
    }),
  });
  if (!response.ok) throw new Error("Booking submission failed");
  return response.json();
};

type SlotData = Record<string, { slots: string[] }>;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

export default function BookingCalendar() {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [slotsData, setSlotsData] = useState<SlotData>({});
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "success">("calendar");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamType, setTeamType] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [currentCRM, setCurrentCRM] = useState("");

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
      const data = await fetchCalendarFreeSlots(
        CALENDAR_ID,
        start.getTime(),
        end.getTime(),
      );
      setSlotsData(data as SlotData);
    } catch {
      setError("Unable to load availability. Please try again.");
    } finally {
      setLoadingSlots(false);
    }
  }, [viewDate]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const prevMonth = () => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() - 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return;
    setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  const nextMonth = () => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() + 1);
    setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
  };

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

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const handleDateClick = (dateKey: string) => {
    if (slotsData[dateKey]?.slots?.length) {
      setSelectedDate(dateKey);
      setSelectedSlot(null);
    }
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitCalendarBooking({
        firstName,
        lastName,
        email,
        phone,
        selectedSlot,
        customFields: [
          {
            id: CUSTOM_FIELDS.teamType,
            field_value: teamType || "Not specified",
          },
          {
            id: CUSTOM_FIELDS.primaryGoal,
            field_value: primaryGoal || "Not specified",
          },
          {
            id: CUSTOM_FIELDS.currentCRM,
            field_value: currentCRM || "Not specified",
          },
        ],
      });
      setStep("success");
    } catch {
      setError("Booking failed. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const availableDates = Object.keys(slotsData).filter(
    (k) => slotsData[k]?.slots?.length > 0,
  );

  return (
    <div>
      {step === "calendar" && (
        <>
          {/* Month navigation */}
          <div className="mb-4 flex items-center justify-between">
            <h3
              className="font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Claim Your Audit
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-medium text-foreground min-w-[100px] text-center">
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          {loadingSlots ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-[hsl(21,38%,64%)]" />
            </div>
          ) : (
            <>
              <div className="mb-4 grid grid-cols-7 gap-1 text-center">
                {dayLabels.map((d, i) => (
                  <div
                    key={i}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {d}
                  </div>
                ))}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                  <div key={`empty-${i}`} />
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
                      onClick={() =>
                        !isPast && hasSlots && handleDateClick(dateKey)
                      }
                      disabled={isPast || !hasSlots}
                      className={`flex h-8 items-center justify-center rounded-lg text-xs transition-colors ${
                        isSelected
                          ? "bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] font-bold text-[hsl(0,0%,10%)]"
                          : hasSlots && !isPast
                            ? "text-foreground hover:bg-white/5 cursor-pointer"
                            : "text-muted-foreground/30 cursor-not-allowed"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              {selectedDate && slotsData[selectedDate]?.slots && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    Available times
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {slotsData[selectedDate].slots.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => handleSlotClick(slot)}
                        className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          selectedSlot === slot
                            ? "border-[hsl(21,38%,64%,0.4)] bg-[hsl(21,38%,64%,0.1)] text-foreground"
                            : "border-[hsl(30,10%,22%)] text-muted-foreground hover:border-[hsl(30,10%,28%)] hover:text-foreground"
                        }`}
                      >
                        {formatSlotTime(slot)}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {!selectedDate &&
                availableDates.length === 0 &&
                !loadingSlots && (
                  <p className="text-center text-xs text-muted-foreground py-4">
                    No availability this month. Try the next month.
                  </p>
                )}

              {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
            </>
          )}
        </>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="mb-2 flex items-center justify-between">
            <h3
              className="font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Details
            </h3>
            <button
              type="button"
              onClick={() => setStep("calendar")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to calendar
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Selected: {selectedDate} at{" "}
            {selectedSlot && formatSlotTime(selectedSlot)}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="firstName"
                className="text-xs text-muted-foreground"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 h-9 bg-[hsl(30,12%,10%)] border-[hsl(30,10%,22%)] text-sm"
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="text-xs text-muted-foreground"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 h-9 bg-[hsl(30,12%,10%)] border-[hsl(30,10%,22%)] text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 h-9 bg-[hsl(30,12%,10%)] border-[hsl(30,10%,22%)] text-sm"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs text-muted-foreground">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 h-9 bg-[hsl(30,12%,10%)] border-[hsl(30,10%,22%)] text-sm"
            />
          </div>

          {/* 3-question audit profile */}
          <div className="border-t border-[hsl(30,10%,22%)] pt-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Quick Audit Profile
            </p>

            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Team Type
                </Label>
                <select
                  value={teamType}
                  onChange={(e) => setTeamType(e.target.value)}
                  className="mt-1 w-full h-9 rounded-md border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,10%)] px-3 text-sm text-foreground"
                >
                  <option value="">Select...</option>
                  <option value="Solo Agent">Solo Agent</option>
                  <option value="Team (2-4 agents)">Team (2–4 agents)</option>
                  <option value="Brokerage (5+ agents)">
                    Brokerage (5+ agents)
                  </option>
                </select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Primary Goal
                </Label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="mt-1 w-full h-9 rounded-md border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,10%)] px-3 text-sm text-foreground"
                >
                  <option value="">Select...</option>
                  <option value="Answer Every Call 24/7">
                    Answer Every Call 24/7
                  </option>
                  <option value="Qualify & Book More Leads">
                    Qualify & Book More Leads
                  </option>
                  <option value="Text Back Missed Calls">
                    Text Back Missed Calls
                  </option>
                  <option value="Automate Follow-Up & Pipeline">
                    Automate Follow-Up & Pipeline
                  </option>
                  <option value="Warm-Transfer Hot Leads">
                    Warm-Transfer Hot Leads
                  </option>
                  <option value="All of the Above">All of the Above</option>
                </select>
              </div>

              <div>
                <Label
                  htmlFor="currentCRM"
                  className="text-xs text-muted-foreground"
                >
                  Current CRM
                </Label>
                <Input
                  id="currentCRM"
                  value={currentCRM}
                  onChange={(e) => setCurrentCRM(e.target.value)}
                  placeholder="e.g., Follow Up Boss, kvCORE..."
                  className="mt-1 h-9 bg-[hsl(30,12%,10%)] border-[hsl(30,10%,22%)] text-sm"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full gap-2 rounded-xl bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] font-semibold hover:opacity-90"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </form>
      )}

      {step === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]">
            <Check className="h-7 w-7 text-[hsl(0,0%,10%)]" />
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Audit Scheduled!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a confirmation to {email}. Look forward to your 30-minute
            system audit.
          </p>
        </motion.div>
      )}
    </div>
  );
}
