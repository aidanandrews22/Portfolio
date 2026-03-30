import { NavLink, useLocation } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu-1";
import { cn } from "@/lib/utils";

const WRITING_ROUTES = [
  { to: "/papers", label: "Papers" },
  { to: "/reading-list", label: "Reading List" },
  { to: "/bookshelf", label: "Bookshelf" },
  { to: "/blog", label: "Blog" },
] as const;

export default function NavigationBar() {
  const location = useLocation();

  const isBookshelf = location.pathname === "/bookshelf";
  const isPublications = location.pathname === "/papers";
  const isReadingList = location.pathname === "/reading-list";
  const isBlog = location.pathname === "/blog";

  let displayText = "Papers";
  if (isBookshelf) displayText = "Bookshelf";
  else if (isPublications) displayText = "Papers";
  else if (isReadingList) displayText = "Reading List";
  else if (isBlog) displayText = "Blog";

  const writingSubLinks = WRITING_ROUTES.filter((r) => {
    if (r.to === "/papers" && isPublications) return false;
    if (r.to === "/reading-list" && isReadingList) return false;
    if (r.to === "/bookshelf" && isBookshelf) return false;
    if (r.to === "/blog" && isBlog) return false;
    return true;
  });

  const isWritingActive =
    isPublications || isReadingList || isBookshelf || isBlog;

  return (
    <div className="top-0">
      <nav
        aria-label="Primary"
        className="relative z-50 bg-transparent py-3 sm:py-4"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-center">
            <div className="inline-flex max-w-full rounded-full border border-adaptive bg-background/80 p-1 shadow-[0_1px_3px_oklch(0_0_0/0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList className="max-w-full items-center justify-start gap-0.5 overflow-x-auto overflow-y-visible nav-x-scroll touch-pan-x px-0.5 sm:justify-center sm:gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    active={location.pathname === "/about"}
                    closeOnClick
                    className={cn(
                      "!flex-row items-center gap-0 min-h-11",
                      navigationMenuTriggerStyle(),
                    )}
                    render={(props) => (
                      <NavLink
                        {...props}
                        to="/about"
                        end
                        className={cn(
                          props.className,
                          "no-underline",
                          location.pathname === "/about" && "font-semibold text-[var(--color-text)]",
                        )}
                      />
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    active={location.pathname.startsWith("/research")}
                    closeOnClick
                    className={cn(
                      "!flex-row items-center gap-0 min-h-11",
                      navigationMenuTriggerStyle(),
                    )}
                    render={(props) => (
                      <NavLink
                        {...props}
                        to="/research"
                        className={cn(
                          props.className,
                          "no-underline",
                          location.pathname.startsWith("/research") &&
                            "font-semibold text-[var(--color-text)]",
                        )}
                      />
                    )}
                  >
                    Research
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    active={location.pathname.startsWith("/projects")}
                    closeOnClick
                    className={cn(
                      "!flex-row items-center gap-0 min-h-11",
                      navigationMenuTriggerStyle(),
                    )}
                    render={(props) => (
                      <NavLink
                        {...props}
                        to="/projects"
                        className={cn(
                          props.className,
                          "no-underline",
                          location.pathname.startsWith("/projects") &&
                            "font-semibold text-[var(--color-text)]",
                        )}
                      />
                    )}
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      isWritingActive && "font-semibold text-[var(--color-text)]",
                    )}
                  >
                    {displayText}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="m-0 flex list-none flex-col gap-0.5 p-1">
                      {writingSubLinks.length === 0 ? (
                        <li className="px-3 py-2 text-sm text-[color-mix(in_oklch,var(--color-text)_58%,transparent)]">
                          You're on this section — pick another from the site
                          menu.
                        </li>
                      ) : (
                        writingSubLinks.map(({ to, label }) => (
                          <li key={to}>
                            <NavigationMenuLink
                              active={location.pathname === to}
                              closeOnClick
                              className="!min-h-11 !w-full !flex-row !items-center !gap-2 !py-2.5 !px-3"
                              render={(props) => (
                                <NavLink
                                  {...props}
                                  to={to}
                                  className={cn(
                                    props.className,
                                    "no-underline",
                                  )}
                                />
                              )}
                            >
                              {label}
                            </NavigationMenuLink>
                          </li>
                        ))
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>

              <NavigationMenuPositioner>
                <NavigationMenuPopup />
              </NavigationMenuPositioner>
            </NavigationMenu>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
