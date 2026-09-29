import { Link, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import { usePageSeo } from "@/lib/usePageSeo";

const NotFound = () => {
  const location = useLocation();
  usePageSeo({
    title: "Page Not Found | Virtexa Solutions",
    description: "The page you are looking for could not be found.",
    path: location.pathname,
    noindex: true,
  });

  return (
    <div className="relative min-h-screen bg-background">
      <SubpageHeader />
      <main className="container mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
          404
        </p>
        <h1
          className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold">
          <Link
            to="/"
            className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
          >
            Go to the home page
          </Link>
          <Link
            to="/blog"
            className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
          >
            Read the blog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
