"use client";

import { Send, Loader2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/types";

interface CodeInputProps {
  mode: Mode;
  prompt: string;
  onPromptChange: (value: string) => void;
  inputCode: string;
  onInputChange: (value: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isStreaming: boolean;
}

export function CodeInput({
  mode,
  prompt,
  onPromptChange,
  inputCode,
  onInputChange,
  onGenerate,
  onClear,
  isStreaming,
}: CodeInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="space-y-4">
      {mode === "generate" ? (
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to build...&#10;&#10;Example: Create a REST API with Express.js that has user authentication using JWT tokens, including login, register, and protected routes."
            className={cn(
              "w-full min-h-[200px] p-4 rounded-xl resize-none",
              "bg-editor-surface border border-editor-border",
              "text-editor-text placeholder:text-editor-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-editor-accent/50 focus:border-editor-accent/50",
              "transition-all duration-200 font-mono text-sm leading-relaxed"
            )}
          />
          <div className="absolute bottom-3 right-3 text-xs text-editor-muted">
            ⌘ + Enter to generate
          </div>
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={inputCode}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste your code here to get an explanation..."
            className={cn(
              "w-full min-h-[200px] p-4 rounded-xl resize-none",
              "bg-editor-surface border border-editor-border",
              "text-editor-text placeholder:text-editor-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-editor-accent/50 focus:border-editor-accent/50",
              "transition-all duration-200 font-mono text-sm leading-relaxed"
            )}
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onGenerate}
          disabled={
            isStreaming ||
            (mode === "generate" ? !prompt.trim() : !inputCode.trim())
          }
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200",
            "bg-gradient-to-r from-editor-accent to-purple-600",
            "hover:shadow-lg hover:shadow-editor-accent/25 hover:scale-[1.02]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
            "text-white"
          )}
        >
          {isStreaming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {mode === "generate" ? "Generate Code" : "Explain Code"}
            </>
          )}
        </button>

        <button
          onClick={onClear}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl",
            "bg-editor-surface border border-editor-border",
            "text-editor-muted hover:text-editor-text hover:bg-editor-accent/10",
            "transition-all duration-200"
          )}
        >
          <Eraser className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  );
}
