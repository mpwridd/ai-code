"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CodeInput } from "@/components/CodeInput";
import { CodeOutput } from "@/components/CodeOutput";
import { HistorySidebar } from "@/components/HistorySidebar";
import { useCodeGenerator } from "@/hooks/useCodeGenerator";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { HistoryItem, Mode, Language } from "@/lib/types";

export default function Home() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    "code-history",
    []
  );

  const handleHistoryAdd = useCallback(
    (item: HistoryItem) => {
      setHistory((prev) => [item, ...prev].slice(0, 100));
    },
    [setHistory]
  );

  const {
    mode,
    setMode,
    language,
    setLanguage,
    prompt,
    setPrompt,
    inputCode,
    setInputCode,
    output,
    streamedOutput,
    isStreaming,
    error,
    generate,
    clear,
  } = useCodeGenerator({ onHistoryAdd: handleHistoryAdd });

  const handleHistoryItemClick = (item: HistoryItem) => {
    setMode(item.mode);
    setLanguage(item.language);
    if (item.mode === "generate") {
      setPrompt(item.prompt);
      setInputCode("");
    } else {
      setInputCode(item.prompt);
      setPrompt("");
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <HistorySidebar
          history={history}
          onItemClick={handleHistoryItemClick}
          onDeleteItem={handleDeleteHistoryItem}
          onClearAll={handleClearHistory}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-editor-border">
            <ModeToggle mode={mode} onModeChange={setMode} />
            <LanguageSelector
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <CodeInput
                mode={mode}
                prompt={prompt}
                onPromptChange={setPrompt}
                inputCode={inputCode}
                onInputChange={setInputCode}
                onGenerate={generate}
                onClear={clear}
                isStreaming={isStreaming}
              />

              <CodeOutput
                mode={mode}
                language={language}
                output={output}
                streamedOutput={streamedOutput}
                isStreaming={isStreaming}
                error={error}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
