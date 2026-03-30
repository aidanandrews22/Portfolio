import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

function applyStoredTheme() {
  const storedTheme = localStorage.getItem("color-theme") as
    | "light"
    | "dark"
    | "system"
    | null;
  const next = storedTheme || "system";
  if (next === "system") {
    document.documentElement.classList.remove("force-light", "force-dark");
    localStorage.removeItem("color-theme");
  } else {
    document.documentElement.classList.remove("force-light", "force-dark");
    document.documentElement.classList.add(`force-${next}`);
    localStorage.setItem("color-theme", next);
  }
}

// Lazy load pages for better performance
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Research = lazy(() => import("./pages/Research"));
const Blog = lazy(() => import("./pages/Blog"));
const Papers = lazy(() => import("./pages/Papers"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Bookshelf = lazy(() => import("./pages/Bookshelf"));
const ProjectView = lazy(() => import("./pages/ProjectView"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Header = lazy(() => import("./components/Header"));
const NavigationBar = lazy(() => import("./components/NavigationBar"));
// Lazy load research pages
const G1Research = lazy(() => import("./components/research/g1"));

function AppContent() {
  const location = useLocation();
  const isResearchPage = location.pathname.startsWith("/research/");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-background focus:border focus:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]"
      >
        Skip to main content
      </a>
      {!isResearchPage && <Header />}
      <NavigationBar />

      <main
        id="main-content"
        className="container mx-auto px-4 md:px-6 lg:px-10 py-8 max-w-7xl"
        tabIndex={-1}
      >
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col justify-center items-center gap-3 h-40"
            >
              <span className="text-sm opacity-70">Loading…</span>
              <div
                className="rounded-full h-10 w-10 border-2 border-[color-mix(in_oklch,var(--color-primary)_35%,transparent)] border-t-[var(--color-primary)] motion-safe:animate-spin motion-reduce:animate-none"
                aria-hidden
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/g1" element={<G1Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectView />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/reading-list" element={<ReadingList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  useEffect(() => {
    applyStoredTheme();
  }, []);

  useEffect(() => {
    // Add class to enable adaptive theming
    document.documentElement.classList.add("color-scheme-adaptive");

    // Setup media query listener for dark mode changes
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    // Function to update theme variables when system preference changes
    const handleColorSchemeChange = () => {
      if (darkModeMediaQuery.matches) {
        document.documentElement.setAttribute("data-color-scheme", "dark");
      } else {
        document.documentElement.setAttribute("data-color-scheme", "light");
      }
    };

    // Initial theme setup
    handleColorSchemeChange();

    // Add listener for system preference changes
    darkModeMediaQuery.addEventListener("change", handleColorSchemeChange);

    // Cleanup
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleColorSchemeChange);
      document.documentElement.classList.remove("color-scheme-adaptive");
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans prose-adaptive w-full overflow-x-hidden">
        <AppContent />
      </div>
    </Router>
  );
}
