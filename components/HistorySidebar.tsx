"use client";

import { useState } from "react";
import {
  History,
  Code2,
  BookOpen,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { cn, formatTimestamp, truncateText, copyToClipboard } from "@/lib/utils";
import type { HistoryItem, Mode, Language } from "@/lib/types";
import { LANGUAGES } from "@/lib/types";

interface HistorySidebarProps {
  history: HistoryItem[];
  onItemClick: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export function HistorySidebar({
  history,
  onItemClick,
  onDeleteItem,
  onClearAll,
}: HistorySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getLanguageIcon = (lang: Language) => {
    return LANGUAGES.find((l) => l.value === lang)?.icon || "📄";
  };

  const handleCopy = async (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation();
    await copyToClipboard(item.code);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center py-4 gap-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-10 h-10 rounded-xl bg-editor-surface border border-editor-border flex items-center justify-center hover:bg-editor-accent/10 transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 text-editor-muted" />
        </button>
        <div className="flex flex-col items-center gap-2">
          <History className="w-5 h-5 text-editor-muted" />
          <span className="text-xs text-editor-muted writing-mode-vertical">
            {history.length}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-80 border-r border-editor-border bg-editor-bg/50">
      <div className="flex items-center justify-between p-4 border-b border-editor-border">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-editor-accent" />
          <h2 className="font-semibold text-editor-text">History</h2>
          <span className="text-xs text-editor-muted bg-editor-surface px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              onClick={onClearAll}
              className="p-2 rounded-lg text-editor-muted hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              title="Clear all history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 rounded-lg text-editor-muted hover:text-editor-text hover:bg-editor-accent/10 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="w-8 h-8 text-editor-muted mb-3" />
            <p className="text-sm text-editor-muted">No history yet</p>
            <p className="text-xs text-editor-muted/50 mt-1">
              Generated code will appear here
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className={cn(
                "group relative p-3 rounded-xl cursor-pointer",
                "hover:bg-editor-accent/5 transition-all duration-200",
                "border border-transparent hover:border-editor-border"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="text-lg">{getLanguageIcon(item.language)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.mode === "generate" ? (
                      <Code2 className="w-3.5 h-3.5 text-editor-accent" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    )}
                    <span className="text-xs font-medium text-editor-muted uppercase">
                      {item.mode}
                    </span>
                    <span className="text-xs text-editor-muted/50">•</span>
                    <span className="text-xs text-editor-muted">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-editor-text line-clamp-2">
                    {truncateText(item.prompt, 100)}
                  </p>
                </div>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => handleCopy(e, item)}
                  className={cn(
                    "p-1.5 rounded-lg text-xs transition-all duration-200",
                    copiedId === item.id
                      ? "text-green-400 bg-green-400/10"
                      : "text-editor-muted hover:text-editor-text hover:bg-editor-accent/10"
                  )}
                >
                  {copiedId === item.id ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
