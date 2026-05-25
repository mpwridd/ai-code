"use client";

import { Terminal, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-editor-border bg-editor-bg/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-editor-accent to-purple-600 flex items-center justify-center shadow-lg shadow-editor-accent/25">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-editor-text to-editor-accent bg-clip-text text-transparent">
              AI Code Generator
            </h1>
            <p className="text-xs text-editor-muted">
              Powered by Mimo V2.5 Pro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-editor-surface border border-editor-border hover:bg-editor-accent/10 transition-all duration-200"
          >
            <Github className="w-5 h-5 text-editor-muted" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
