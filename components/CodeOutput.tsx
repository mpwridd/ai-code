"use client";

import { cn, extractCode } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { LoadingSpinner } from "./LoadingSpinner";
import { EmptyState } from "./EmptyState";
import { AlertCircle, Sparkles } from "lucide-react";
import type { Mode, Language } from "@/lib/types";

interface CodeOutputProps {
  mode: Mode;
  language: Language;
  output: string;
  streamedOutput: string;
  isStreaming: boolean;
  error: string | null;
}

export function CodeOutput({
  mode,
  language,
  output,
  streamedOutput,
  isStreaming,
  error,
}: CodeOutputProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-red-400 mb-2">
          Generation Failed
        </h3>
        <p className="text-editor-muted text-center max-w-md text-sm">
          {error}
        </p>
      </div>
    );
  }

  if (isStreaming) {
    const displayText = streamedOutput || output;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-editor-accent">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">
            {mode === "generate" ? "Generating code..." : "Analyzing code..."}
          </span>
        </div>
        <div className="relative">
          {mode === "generate" ? (
            <CodeBlock
              code={extractCode(displayText) || displayText}
              language={language}
            />
          ) : (
            <div className="p-4 rounded-xl bg-editor-surface border border-editor-border">
              <div className="prose prose-invert max-w-none text-sm text-editor-text leading-relaxed whitespace-pre-wrap">
                {displayText}
                <span className="inline-block w-2 h-4 bg-editor-accent animate-pulse ml-0.5" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!output) {
    return <EmptyState />;
  }

  if (mode === "generate") {
    return (
      <div className="space-y-4">
        <CodeBlock code={extractCode(output)} language={language} />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-editor-surface border border-editor-border">
      <div className="prose prose-invert max-w-none text-sm text-editor-text leading-relaxed whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
}
