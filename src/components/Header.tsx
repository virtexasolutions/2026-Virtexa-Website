import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Comparison", href: "#comparison" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Virtexa Connect",
    href: "https://connect.virtexasolutions.com/",
    external: true,
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass-strong shadow-lg" : "glass",
          )}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Virtexa
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNav("#audit")}
              className="gap-2 rounded-xl bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] font-semibold hover:opacity-90 glow-soft"
            >
              <Phone className="h-4 w-4" />
              Book Audit
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden"
            >
              <div className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-3">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => handleNav(link.href)}
                      className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {link.label}
                    </button>
                  ),
                )}
                <Button
                  onClick={() => handleNav("#audit")}
                  className="mt-1 gap-2 rounded-xl bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  Book Audit
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
