"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/types";
import type { Language } from "@/lib/types";

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  language,
  onLanguageChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = LANGUAGES.find((l) => l.value === language);

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
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl",
          "bg-editor-surface border border-editor-border",
          "hover:border-editor-accent/50 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-editor-accent/50",
          "min-w-[160px] justify-between"
        )}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{selectedLanguage?.icon}</span>
          <span className="text-sm font-medium text-editor-text">
            {selectedLanguage?.label}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-editor-muted transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 w-full min-w-[180px]",
            "bg-editor-surface border border-editor-border rounded-xl",
            "shadow-xl shadow-black/20 overflow-hidden z-50",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                onLanguageChange(lang.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 text-left",
                "hover:bg-editor-accent/10 transition-colors duration-150",
                language === lang.value
                  ? "bg-editor-accent/20 text-editor-accent"
                  : "text-editor-text"
              )}
            >
              <span className="text-lg">{lang.icon}</span>
              <span className="text-sm font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
