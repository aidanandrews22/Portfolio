import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Determine if we're on the bookshelf or publications page
  const isBookshelf = location.pathname === "/bookshelf";
  const isPublications = location.pathname === "/publications";

  // Set the display text based on current route
  let displayText = "Publications";
  if (isBookshelf) {
    displayText = "Bookshelf";
  } else if (isPublications) {
    displayText = "Publications";
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="top-0 z-50">
      {/* Navigation Bar */}
      <nav className="border-b border-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-3">
            <div className="flex gap-8">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-all ${isActive ? "font-bold border-b-2 border-current" : "hover:text-[var(--color-primary)]"}`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `transition-all ${isActive ? "font-bold border-b-2 border-current" : "hover:text-[var(--color-primary)]"}`
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `transition-all ${isActive ? "font-bold border-b-2 border-current" : "hover:text-[var(--color-primary)]"}`
                }
              >
                Blog
              </NavLink>
              <div
                className="relative inline-flex items-center"
                ref={dropdownRef}
              >
                <NavLink
                  to={isBookshelf ? "/bookshelf" : "/publications"}
                  className={({ isActive }) =>
                    `transition-all ${isActive ? "font-bold border-b-2 border-current" : "hover:text-[var(--color-primary)]"}`
                  }
                >
                  {displayText}
                </NavLink>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="ml-1 text-current hover:text-[var(--color-primary)] focus:outline-none"
                  aria-label="Toggle publications menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 top-full mt-1
                    transition-all duration-200 ease-in-out origin-top transform
                    ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
                  `}
                >
                  <div className="bg-background backdrop-blur-sm border-l border-r border-b border-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] rounded-b-md min-w-fit whitespace-nowrap mt-2">
                    {!isPublications && (
                      <NavLink
                        to="/publications"
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-2 transition-all hover:text-[var(--color-primary)]"
                      >
                        Publications
                      </NavLink>
                    )}
                    {!isBookshelf && (
                      <NavLink
                        to="/bookshelf"
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-2 transition-all hover:text-[var(--color-primary)]"
                      >
                        Bookshelf
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
