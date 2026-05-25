"use client";

import { useState, useCallback } from "react";
import type { Mode, Language, HistoryItem } from "@/lib/types";
import { generateId, extractCode, extractExplanation } from "@/lib/utils";

interface UseCodeGeneratorOptions {
  onHistoryAdd?: (item: HistoryItem) => void;
}

export function useCodeGenerator(options?: UseCodeGeneratorOptions) {
  const [mode, setMode] = useState<Mode>("generate");
  const [language, setLanguage] = useState<Language>("python");
  const [prompt, setPrompt] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [output, setOutput] = useState("");
  const [streamedOutput, setStreamedOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (mode === "generate" && !prompt.trim()) return;
    if (mode === "explain" && !inputCode.trim()) return;

    setIsStreaming(true);
    setStreamedOutput("");
    setOutput("");
    setError(null);

    try {
      const endpoint =
        mode === "generate" ? "/api/generate" : "/api/explain";
      const body =
        mode === "generate"
          ? { prompt: prompt.trim(), language }
          : { code: inputCode.trim(), language };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate code");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || "";
              fullText += content;
              setStreamedOutput(fullText);
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      setOutput(fullText);

      const historyItem: HistoryItem = {
        id: generateId(),
        timestamp: Date.now(),
        mode,
        language,
        prompt: mode === "generate" ? prompt : inputCode,
        code:
          mode === "generate"
            ? extractCode(fullText)
            : inputCode,
        explanation:
          mode === "explain" ? extractExplanation(fullText) : undefined,
      };

      options?.onHistoryAdd?.(historyItem);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsStreaming(false);
    }
  }, [mode, language, prompt, inputCode, options]);

  const clear = useCallback(() => {
    setPrompt("");
    setInputCode("");
    setOutput("");
    setStreamedOutput("");
    setError(null);
  }, []);

  return {
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
  };
}
