import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MODEL = "google/gemini-3-flash-preview";

async function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  return createLovableAiGatewayProvider(key)(MODEL);
}

async function runGenerate(args: Parameters<typeof import("ai").generateText>[0]) {
  const { generateText } = await import("ai");
  return generateText(args);
}

const EmailInput = z.object({
  recipient: z.string().min(1),
  subject: z.string().default(""),
  purpose: z.string().min(1),
  context: z.string().default(""),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const system =
      "You are an expert workplace communication assistant. Draft polished, ready-to-send business emails. Return ONLY the email itself (Subject line, then a blank line, then the body). Do not include commentary, markdown fences, or instructions.";
    const prompt = `Write a ${data.tone.toLowerCase()} workplace email.

Recipient: ${data.recipient}
Subject hint: ${data.subject || "(propose one)"}
Purpose: ${data.purpose}
Additional context: ${data.context || "(none)"}

Rules:
- Start with "Subject: <clear subject>" on the first line.
- Then a blank line, then a professional greeting.
- Keep it concise, clear, well-structured, and grammatically correct.
- Sign off appropriately.`;

    const { text } = await generateText({ model: getModel(), system, prompt });
    return { text: text.trim() };
  });

const ResearchInput = z.object({
  topic: z.string().min(1),
});

export const generateResearch = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) => {
    const system =
      "You are a workplace research analyst. Produce clear, professional, well-organized briefings in Markdown.";
    const prompt = `Analyze the following topic / article / notes and produce a structured briefing.

INPUT:
"""
${data.topic}
"""

Output in Markdown with these exact section headings, in this order:

## Executive Summary
A 3-5 sentence overview.

## Key Insights
5-7 bullet points, each substantive and specific.

## Recommendations
4-6 actionable bullet points.

## Suggested Next Steps
A short numbered list of concrete next actions.`;

    const { text } = await generateText({ model: getModel(), system, prompt });
    return { text: text.trim() };
  });

const ChatInput = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    }),
  ),
});

export const chat = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ChatInput.parse(d))
  .handler(async ({ data }) => {
    const system =
      "You are an AI Workplace Assistant. Help professionals improve emails, explain policies, create meeting agendas, draft reports, and answer workplace questions. Be clear, professional, concise, and helpful. Use Markdown for structure when useful.";
    const { text } = await generateText({
      model: getModel(),
      system,
      messages: data.messages,
    });
    return { text: text.trim() };
  });
