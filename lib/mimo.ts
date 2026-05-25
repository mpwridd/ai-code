import OpenAI from "openai";
import { SYSTEM_PROMPTS } from "./utils";
import type { Language } from "./types";

const openai = new OpenAI({
  baseURL: process.env.MIMO_API_BASE_URL || "http://100.91.112.121:8317/v1",
  apiKey: process.env.MIMO_API_KEY || "",
});

const MODEL = process.env.MIMO_MODEL || "Mimo-V2.5-Pro";

export async function generateCode(
  prompt: string,
  language: Language,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const stream = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.generate(language) },
      { role: "user", content: prompt },
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 4096,
  });

  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    fullResponse += content;
    onChunk?.(content);
  }

  return fullResponse;
}

export async function explainCode(
  code: string,
  language: Language,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const stream = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.explain(language) },
      {
        role: "user",
        content: `Please explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      },
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 4096,
  });

  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    fullResponse += content;
    onChunk?.(content);
  }

  return fullResponse;
}
