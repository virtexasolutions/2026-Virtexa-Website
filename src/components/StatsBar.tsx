const stats = [
  { value: "< 5 Seconds", label: "Average Inbound Lead Response Time" },
  { value: "24/7/365", label: "Every Call Answered, Nights & Weekends" },
  { value: "10–14 Days", label: "From Kickoff to Live Agent" },
];

// One half of the loop repeats the stats enough times to span wide screens;
// the track holds two identical halves so translateX(-50%) loops seamlessly.
const half = [...stats, ...stats, ...stats];
const track = [...half, ...half];

const edgeFade =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden border-y border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%,0.6)] py-5 backdrop-blur-sm">
      <ul className="sr-only">
        {stats.map((stat) => (
          <li key={stat.value}>
            {stat.value}: {stat.label}
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="group"
        style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
      >
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: "70s" }}
        >
          {track.map((stat, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-8 sm:pr-12"
            >
              <span
                className="text-2xl font-bold gradient-text sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </span>
              <span className="ml-5 h-1.5 w-1.5 rounded-full bg-[hsl(21,38%,64%,0.6)] sm:ml-9" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
