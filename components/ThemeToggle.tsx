"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-editor-surface animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-xl flex items-center justify-center",
        "bg-editor-surface border border-editor-border",
        "hover:bg-editor-accent/10 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-editor-accent/50"
      )}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "w-5 h-5 transition-all duration-300",
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-yellow-500"
        )}
        style={{ position: "absolute" }}
      />
      <Moon
        className={cn(
          "w-5 h-5 transition-all duration-300",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-blue-400"
            : "-rotate-90 scale-0 opacity-0"
        )}
        style={{ position: "absolute" }}
      />
    </button>
  );
}
