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
        className="border-b border-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] bg-background/80 backdrop-blur-sm relative z-50"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center items-center py-2 sm:py-3 min-h-14">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList className="max-w-full justify-start sm:justify-center overflow-x-auto overflow-y-visible nav-x-scroll touch-pan-x gap-1 sm:gap-2 pb-1">
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
                          location.pathname === "/about" && "font-semibold",
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
                            "font-semibold",
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
                            "font-semibold",
                        )}
                      />
                    )}
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(isWritingActive && "font-semibold")}
                  >
                    {displayText}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="m-0 flex list-none flex-col gap-0.5 p-1">
                      {writingSubLinks.length === 0 ? (
                        <li className="px-3 py-2 text-sm text-[color-mix(in_oklch,var(--color-text)_70%,transparent)]">
                          You’re on this section — pick another from the site
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
      </nav>
    </div>
  );
}
