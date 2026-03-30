import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

interface FilterDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  label: string;
  paramName?: string;
}

export default function FilterDropdown({
  options,
  selectedOption,
  onSelect,
  label,
  paramName,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const listId = useId();
  const reduceMotion = useReducedMotion();

  const handleSelect = (option: string) => {
    onSelect(option);
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (option) {
        newSearchParams.set(paramName, option);
      } else {
        newSearchParams.delete(paramName);
      }
      setSearchParams(newSearchParams);
    }
    setIsOpen(false);
  };

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
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2.5 min-h-11 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]
                 hover:border-[color-mix(in_oklch,var(--color-primary)_40%,transparent)] transition-[border-color,background-color] duration-200
                 flex items-center justify-between min-w-[120px] sm:min-w-[160px] max-w-[min(100vw-2rem,20rem)] bg-background text-sm sm:text-base cursor-pointer
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`${label} filter, ${selectedOption || "All"} selected`}
      >
        <span className="mr-2 truncate">{label}:</span>
        <span className="font-medium truncate">{selectedOption || "All"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 shrink-0 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            id={listId}
            role="listbox"
            aria-label={`${label} options`}
            className="absolute z-[1] w-full mt-2 bg-background overscroll-contain
                     border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] rounded-lg shadow-lg"
          >
            <ul className="py-1 max-h-[60vh] overflow-y-auto">
              <li role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={!selectedOption}
                  onClick={() => handleSelect("")}
                  className={`w-full px-4 py-2.5 min-h-11 text-left transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] text-sm sm:text-base
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]
                           ${!selectedOption ? "bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]" : ""}`}
                >
                  All
                </button>
              </li>
              {options.map((option) => (
                <li key={option} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedOption === option}
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-2.5 min-h-11 text-left transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] text-sm sm:text-base
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]
                             ${selectedOption === option ? "bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]" : ""}`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
