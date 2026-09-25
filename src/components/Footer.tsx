import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  Solutions: [
    "Speed-to-Lead Voice AI",
    "Database Reactivation",
    "Listing-to-Social",
    "AI Recruiting Engine",
  ],
  Company: ["About", "Use Cases", "Comparison", "Pricing", "Virtexa Connect"],
  Resources: ["System Audit", "Live Demo", "FAQ", "Documentation"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[hsl(30,10%,22%)] bg-[hsl(0,0%,5%)]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[hsl(0,0%,10%)]"
                  fill="none"
                >
                  <path
                    d="M6 5 L12 19 L18 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Virtexa Solutions
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Custom, human-grade AI voice agents and autonomous operating
              systems for real estate teams and brokerages.{" "}
              <span className="font-semibold text-[hsl(28,40%,76%)]">
                For agents, by agents.
              </span>
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[hsl(28,40%,76%)]" />
                <span>hello@virtexasolutions.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[hsl(28,40%,76%)]" />
                <span>Enterprise AI Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => {
                  const isConnect = link === "Virtexa Connect";
                  return (
                    <li key={link}>
                      <a
                        href={
                          isConnect
                            ? "https://connect.virtexasolutions.com/"
                            : "#"
                        }
                        target={isConnect ? "_blank" : undefined}
                        rel={isConnect ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-[hsl(28,40%,76%)]"
                      >
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[hsl(30,10%,22%)] pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Virtexa Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a
              href="#"
              className="transition-colors hover:text-[hsl(28,40%,76%)]"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-[hsl(28,40%,76%)]"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition-colors hover:text-[hsl(28,40%,76%)]"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
