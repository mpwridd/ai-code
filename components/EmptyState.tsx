"use client";

import { Sparkles, Code2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-editor-accent/20 to-purple-500/20 flex items-center justify-center">
          <Code2 className="w-10 h-10 text-editor-accent" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
      </div>

      <h3 className="text-xl font-semibold text-editor-text mb-2">
        Ready to Generate
      </h3>
      <p className="text-editor-muted text-center max-w-md">
        Describe what you want to build, select a language, and watch the AI
        create clean, production-ready code for you.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {[
          "REST API with authentication",
          "Binary search algorithm",
          "React hook for pagination",
          "Smart contract for ERC-20",
        ].map((example) => (
          <span
            key={example}
            className="px-3 py-1.5 text-xs bg-editor-surface border border-editor-border rounded-full text-editor-muted"
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}
