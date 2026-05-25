"use client";

import { Code2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/types";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center bg-editor-surface rounded-xl p-1 border border-editor-border">
      <button
        onClick={() => onModeChange("generate")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          mode === "generate"
            ? "bg-editor-accent text-white shadow-lg shadow-editor-accent/25"
            : "text-editor-muted hover:text-editor-text hover:bg-editor-accent/10"
        )}
      >
        <Code2 className="w-4 h-4" />
        Generate
      </button>
      <button
        onClick={() => onModeChange("explain")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          mode === "explain"
            ? "bg-editor-accent text-white shadow-lg shadow-editor-accent/25"
            : "text-editor-muted hover:text-editor-text hover:bg-editor-accent/10"
        )}
      >
        <BookOpen className="w-4 h-4" />
        Explain
      </button>
    </div>
  );
}
