import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function extractCode(text: string): string {
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g;
  const matches: string[] = [];
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    matches.push(match[1].trim());
  }

  if (matches.length > 0) {
    return matches.join("\n\n");
  }

  return text.trim();
}

export function extractExplanation(text: string): string {
  const codeBlockRegex = /```(?:\w+)?\n[\s\S]*?```/g;
  return text.replace(codeBlockRegex, "").trim();
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  return new Promise((resolve, reject) => {
    document.execCommand("copy") ? resolve() : reject();
    textArea.remove();
  });
}

export const SYSTEM_PROMPTS = {
  generate: (language: string) =>
    `You are an expert ${language} developer. Generate clean, production-ready code based on the user's description. 

Rules:
- Output ONLY the code inside a single code block
- Include all necessary imports
- Add brief comments for complex logic
- Follow ${language} best practices and conventions
- Make the code complete and runnable
- Do NOT include explanations outside the code block`,

  explain: (language: string) =>
    `You are an expert ${language} developer and teacher. Explain the given code in a clear, structured way.

Rules:
- Start with a brief overview of what the code does
- Explain key concepts and patterns used
- Break down complex sections
- Mention any potential issues or improvements
- Use markdown formatting for readability
- Do NOT repeat the entire code block in your explanation`,
};
