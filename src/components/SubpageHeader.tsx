import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SubpageHeader() {
  return (
    <header className="container mx-auto px-4 py-4">
      <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Virtexa
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-[hsl(28,40%,76%)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </header>
  );
}
