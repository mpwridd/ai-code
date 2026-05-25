"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Download } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";
import type { Language } from "@/lib/types";
import { LANGUAGE_MAP } from "@/lib/types";

interface CodeBlockProps {
  code: string;
  language: Language;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<Language, string> = {
      python: ".py",
      javascript: ".js",
      typescript: ".ts",
      solidity: ".sol",
      rust: ".rs",
      go: ".go",
      java: ".java",
      cpp: ".cpp",
    };

    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generated-code${extensions[language]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-editor-border">
      <div className="flex items-center justify-between px-4 py-2 bg-editor-surface border-b border-editor-border">
        <span className="text-xs font-medium text-editor-muted uppercase tracking-wider">
          {language}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs",
              "text-editor-muted hover:text-editor-text hover:bg-editor-accent/10",
              "transition-all duration-200"
            )}
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs",
              "transition-all duration-200",
              copied
                ? "text-green-400 bg-green-400/10"
                : "text-editor-muted hover:text-editor-text hover:bg-editor-accent/10"
            )}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={LANGUAGE_MAP[language]}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "transparent",
          fontSize: "0.875rem",
          lineHeight: "1.7",
        }}
        showLineNumbers
        lineNumberStyle={{
          color: "var(--editor-muted)",
          opacity: 0.5,
          paddingRight: "1rem",
          minWidth: "2.5rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
