import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

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
const ProjectIndicatorTest = lazy(
  () => import("./components/ProjectIndicatorTest"),
);

// Lazy load research pages
const G1Research = lazy(() => import("./components/research/g1"));

function AppContent() {
  const location = useLocation();
  const isResearchPage = location.pathname.startsWith("/research/");

  return (
    <>
      {!isResearchPage && <Header />}
      <NavigationBar />

      <main className="container mx-auto px-4 md:px-6 lg:px-10 py-8 max-w-7xl">
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
            <Route path="/research" element={<Research />} />
            <Route path="/research/g1" element={<G1Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectView />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/papers" element={<Papers />} />
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
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    // Check if user has a stored preference
    theme;
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
      <div className="min-h-screen bg-background text-foreground font-sans prose-adaptive w-full overflow-x-hidden">
        <AppContent />
      </div>
    </Router>
  );
}
