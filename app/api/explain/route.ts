import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPTS } from "@/lib/utils";
import type { Language } from "@/lib/types";

const openai = new OpenAI({
  baseURL: process.env.MIMO_API_BASE_URL || "http://100.91.112.121:8317/v1",
  apiKey: process.env.MIMO_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const { code, language } = (await request.json()) as {
      code: string;
      language: Language;
    };

    if (!code?.trim()) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    const stream = await openai.chat.completions.create({
      model: process.env.MIMO_MODEL || "Mimo-V2.5-Pro",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.explain(language || "python") },
        {
          role: "user",
          content: `Please explain this ${language || "python"} code:\n\n\`\`\`${language || "python"}\n${code}\n\`\`\``,
        },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 4096,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Explain error:", error);
    return NextResponse.json(
      { error: "Failed to explain code" },
      { status: 500 }
    );
  }
}
