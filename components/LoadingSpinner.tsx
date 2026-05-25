"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      <div className="w-2 h-2 rounded-full bg-editor-accent animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 rounded-full bg-editor-accent animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 rounded-full bg-editor-accent animate-bounce" />
    </div>
  );
}
