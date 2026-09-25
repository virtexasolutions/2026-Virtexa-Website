import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Volume2, Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CallState = "idle" | "ringing" | "connecting" | "connected" | "ended";

interface TranscriptLine {
  speaker: "ai" | "lead";
  text: string;
}

const transcript: TranscriptLine[] = [
  {
    speaker: "ai",
    text: "Hi! Thanks for calling about the property on Maple Street. Are you looking to buy or sell?",
  },
  { speaker: "lead", text: "I'm interested in buying. What's the price?" },
  {
    speaker: "ai",
    text: "It's listed at $485,000. Are you pre-qualified, and would you like to book a showing this week?",
  },
  { speaker: "lead", text: "Yes, I'm pre-qualified. I can do Thursday." },
  {
    speaker: "ai",
    text: "Perfect — I've booked you for Thursday at 2 PM. You'll get a text confirmation shortly.",
  },
];

export default function PhoneSimulator() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [activeLine, setActiveLine] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Call timer
  useEffect(() => {
    if (callState === "connected") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Speak a line using Web Speech API
  const speakLine = useCallback(
    (line: TranscriptLine) => {
      if (!("speechSynthesis" in window)) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(line.text);
      utteranceRef.current = utterance;

      if (line.speaker === "ai") {
        // AI voice — slightly lower pitch, slower rate for natural cadence
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = muted ? 0 : 1;
      } else {
        // Lead voice — slightly higher pitch
        utterance.rate = 1.05;
        utterance.pitch = 1.15;
        utterance.volume = muted ? 0 : 0.85;
      }

      // Try to pick a natural-sounding voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.name.includes("Samantha")) ||
        voices.find((v) => v.lang === "en-US" && v.localService) ||
        voices.find((v) => v.lang === "en-US");
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        // Advance to next line after a brief pause
        setTimeout(() => {
          setActiveLine((l) => {
            const next = l + 1;
            if (next >= transcript.length) {
              setCallState("ended");
              return l;
            }
            return next;
          });
        }, 600);
      };
      utterance.onerror = () => {
        setSpeaking(false);
        // Fallback: advance without speech
        setTimeout(() => {
          setActiveLine((l) => {
            const next = l + 1;
            if (next >= transcript.length) {
              setCallState("ended");
              return l;
            }
            return next;
          });
        }, 2000);
      };

      window.speechSynthesis.speak(utterance);
    },
    [muted],
  );

  // Drive transcript via speech
  useEffect(() => {
    if (callState === "connected" && activeLine < transcript.length) {
      const t = setTimeout(
        () => speakLine(transcript[activeLine]),
        activeLine === 0 ? 300 : 800,
      );
      return () => clearTimeout(t);
    }
  }, [callState, activeLine, speakLine]);

  // Load voices (some browsers load async)
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () =>
        window.speechSynthesis.getVoices();
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startCall = () => {
    setCallState("ringing");
    setElapsed(0);
    setActiveLine(0);
    setTimeout(() => setCallState("connecting"), 1200);
    setTimeout(() => setCallState("connected"), 2200);
  };

  const endCall = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setCallState("ended");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setCallState("idle");
    setActiveLine(0);
    setElapsed(0);
  };

  const toggleMute = () => {
    setMuted((m) => {
      const newMuted = !m;
      if ("speechSynthesis" in window && utteranceRef.current) {
        // Can't change volume of active utterance; cancel and restart current line
        if (speaking) {
          window.speechSynthesis.cancel();
          setTimeout(() => {
            const u = new SpeechSynthesisUtterance(transcript[activeLine].text);
            u.volume = newMuted ? 0 : 1;
            u.rate = 1.0;
            u.onstart = () => setSpeaking(true);
            u.onend = () => {
              setSpeaking(false);
              setTimeout(() => {
                setActiveLine((l) => {
                  const next = l + 1;
                  if (next >= transcript.length) {
                    setCallState("ended");
                    return l;
                  }
                  return next;
                });
              }, 600);
            };
            window.speechSynthesis.speak(u);
          }, 100);
        }
      }
      return newMuted;
    });
  };

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isActive = callState === "connected" || callState === "connecting";

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* Glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-[hsl(21,38%,64%,0.25)] to-[hsl(28,35%,72%,0.25)] blur-2xl" />

      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[hsl(30,12%,14%)] to-[hsl(0,0%,7%)] p-3 shadow-2xl">
        <div className="overflow-hidden rounded-[2rem] bg-[hsl(0,0%,6%)]">
          {/* Notch */}
          <div className="relative flex justify-center py-2">
            <div className="h-1.5 w-20 rounded-full bg-white/15" />
          </div>

          {/* Screen content */}
          <div className="flex flex-col items-center px-5 pb-6 pt-2">
            {/* Status */}
            <div className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isActive
                    ? "bg-[hsl(150,40%,50%)]"
                    : "bg-[hsl(150,40%,50%,0.5)]",
                )}
              />
              Virtexa AI Voice Agent
            </div>

            {/* Avatar / visualizer */}
            <div className="relative mb-5">
              <AnimatePresence mode="wait">
                {callState === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                  >
                    <Phone className="h-10 w-10 text-[hsl(0,0%,10%)]" />
                  </motion.div>
                )}
                {callState === "ringing" && (
                  <motion.div
                    key="ringing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] animate-pulse-ring"
                  >
                    <Phone className="h-10 w-10 text-[hsl(0,0%,10%)]" />
                  </motion.div>
                )}
                {callState === "connecting" && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                  >
                    <Loader2 className="h-8 w-8 animate-spin text-[hsl(0,0%,10%)]" />
                  </motion.div>
                )}
                {(callState === "connected" || callState === "ended") && (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                  >
                    <VoiceVisualizer active={speaking} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Caller info */}
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">
                Virtexa AI
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {callState === "idle" && "Speed-to-Lead Voice Agent"}
                {callState === "ringing" && "Connecting..."}
                {callState === "connecting" && "Establishing call..."}
                {callState === "connected" &&
                  (speaking ? "Speaking..." : fmtTime(elapsed))}
                {callState === "ended" && "Call ended"}
              </p>
            </div>

            {/* Transcript preview */}
            <div className="mt-5 h-28 w-full overflow-hidden rounded-xl bg-white/5 p-3">
              {callState === "idle" && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Tap call to simulate a live AI voice agent qualifying a Zillow
                  buyer lead in under 5 seconds.
                </p>
              )}
              {callState === "ringing" && (
                <div className="flex h-full items-center justify-center">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-[hsl(21,38%,64%)]"
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
              {callState === "connecting" && (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-[hsl(21,38%,64%)]" />
                </div>
              )}
              {(callState === "connected" || callState === "ended") && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLine}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "text-xs leading-relaxed",
                      transcript[activeLine].speaker === "ai"
                        ? "text-[hsl(28,40%,76%)]"
                        : "text-foreground",
                    )}
                  >
                    <span className="font-semibold">
                      {transcript[activeLine].speaker === "ai"
                        ? "AI: "
                        : "Lead: "}
                    </span>
                    {transcript[activeLine].text}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-6">
              <button
                onClick={toggleMute}
                disabled={callState === "idle" || callState === "ended"}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                  muted
                    ? "bg-[hsl(0,80%,50%,0.2)] text-[hsl(0,80%,70%)]"
                    : "bg-white/10 text-muted-foreground",
                  (callState === "idle" || callState === "ended") &&
                    "opacity-40 cursor-not-allowed",
                )}
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </button>

              {callState === "idle" && (
                <button
                  onClick={startCall}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(150,40%,45%)] to-[hsl(150,40%,35%)] text-white glow-soft transition-transform hover:scale-105"
                  aria-label="Start call"
                >
                  <Phone className="h-6 w-6" />
                </button>
              )}
              {(callState === "ringing" ||
                callState === "connecting" ||
                callState === "connected") && (
                <button
                  onClick={endCall}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(0,80%,60%)] to-[hsl(0,80%,50%)] text-white transition-transform hover:scale-105"
                  aria-label="End call"
                >
                  <PhoneOff className="h-6 w-6" />
                </button>
              )}
              {callState === "ended" && (
                <button
                  onClick={reset}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] transition-transform hover:scale-105"
                  aria-label="Reset"
                >
                  <Volume2 className="h-6 w-6" />
                </button>
              )}

              <button
                disabled
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-muted-foreground opacity-40"
                aria-label="Speaker"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>

            {/* Hint */}
            {callState === "idle" && (
              <p className="mt-4 text-center text-[10px] text-muted-foreground/60">
                🔊 Make sure your sound is on
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceVisualizer({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-[hsl(0,0%,10%)]"
          animate={active ? { height: [8, 24, 12, 20, 8] } : { height: 8 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
}
