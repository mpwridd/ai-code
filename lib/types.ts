export type Language =
  | "python"
  | "javascript"
  | "typescript"
  | "solidity"
  | "rust"
  | "go"
  | "java"
  | "cpp";

export type Mode = "generate" | "explain";

export interface HistoryItem {
  id: string;
  timestamp: number;
  mode: Mode;
  language: Language;
  prompt: string;
  code: string;
  explanation?: string;
}

export interface GenerateRequest {
  prompt: string;
  language: Language;
}

export interface ExplainRequest {
  code: string;
  language: Language;
}

export interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export const LANGUAGES: { value: Language; label: string; icon: string }[] = [
  { value: "python", label: "Python", icon: "🐍" },
  { value: "javascript", label: "JavaScript", icon: "⚡" },
  { value: "typescript", label: "TypeScript", icon: "🔷" },
  { value: "solidity", label: "Solidity", icon: "⛓️" },
  { value: "rust", label: "Rust", icon: "🦀" },
  { value: "go", label: "Go", icon: "🐹" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "⚙️" },
];

export const LANGUAGE_MAP: Record<Language, string> = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  solidity: "solidity",
  rust: "rust",
  go: "go",
  java: "java",
  cpp: "cpp",
};
