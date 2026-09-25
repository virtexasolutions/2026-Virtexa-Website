const stats = [
  { value: "< 5 Seconds", label: "Average Inbound Lead Response Time" },
  { value: "$1.4M+", label: "Database Reactivation Volume Generated" },
  { value: "24/7/365", label: "Autonomous Front-Desk & Outbound Operations" },
  { value: "100%", label: "CRM & Pipeline Sync Accuracy" },
];

export default function StatsBar() {
  // Duplicate for seamless marquee
  const items = [...stats, ...stats];

  return (
    <section className="relative border-y border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%,0.6)] py-5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div
                className="text-2xl font-bold gradient-text sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee ticker (mobile) */}
      <div className="mt-4 overflow-hidden lg:hidden mask-fade-b">
        <div className="flex w-max animate-marquee gap-8 px-4">
          {items.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap"
            >
              <span className="font-bold text-[hsl(28,40%,76%)]">
                {stat.value}
              </span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
