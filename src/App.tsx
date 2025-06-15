import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

// Lazy load pages for better performance
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const Publications = lazy(() => import("./pages/Publications"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Bookshelf = lazy(() => import("./pages/Bookshelf"));
const ProjectView = lazy(() => import("./pages/ProjectView"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Header = lazy(() => import("./components/Header"));
const NavigationBar = lazy(() => import("./components/NavigationBar"));
const ProjectIndicatorTest = lazy(
  () => import("./components/ProjectIndicatorTest"),
);

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    // Check if user has a stored preference
    const storedTheme = localStorage.getItem("color-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Apply the theme
    applyTheme(storedTheme || "system");
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      // Remove any forced classes and follow system preference
      document.documentElement.classList.remove("force-light", "force-dark");
      localStorage.removeItem("color-theme");
    } else {
      // Apply specific theme
      document.documentElement.classList.remove("force-light", "force-dark");
      document.documentElement.classList.add(`force-${newTheme}`);
      localStorage.setItem("color-theme", newTheme);
    }
  };

  const toggleTheme = () => {
    let newTheme: "light" | "dark" | "system";

    // Cycle through themes: system -> light -> dark -> system
    if (theme === "system") newTheme = "light";
    else if (theme === "light") newTheme = "dark";
    else newTheme = "system";

    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Apply color scheme adaptive class to html element
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
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors group cursor-pointer"
        title={`Current theme: ${theme}. Click to toggle.`}
        aria-label="Toggle color theme"
      >
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
      </button>
      <div className="min-h-screen bg-background text-foreground font-sans prose-adaptive">
        <Header />
        <NavigationBar />

        <main className="container mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
              </div>
            }
          >
            <Routes>
              <Route path="*" element={<Navigate to="/about" replace />} />
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectView />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/reading-list" element={<ReadingList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/bookshelf" element={<Bookshelf />} />
              <Route
                path="/test/indicators"
                element={<ProjectIndicatorTest />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
