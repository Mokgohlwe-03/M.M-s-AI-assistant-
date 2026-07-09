import { createFileRoute } from "@tanstack/react-router";
import { Mail, FileSearch, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — M.M. AI Workplace Assistant" },
      { name: "description", content: "How to use each AI tool in your workspace." },
    ],
  }),
  component: HelpPage,
});

const guides = [
  {
    icon: Mail,
    title: "Smart Email Generator",
    steps: [
      "Enter the recipient and (optionally) a subject.",
      "Describe the purpose of the email — the goal you want it to accomplish.",
      "Add any context or constraints (deadline, prior conversation, tone notes).",
      "Choose a tone: Formal, Friendly, or Persuasive.",
      "Generate. Edit inline, regenerate for alternatives, copy, or download.",
    ],
  },
  {
    icon: FileSearch,
    title: "AI Research Assistant",
    steps: [
      "Paste an article, notes, or a research topic in the input.",
      "Generate to receive an Executive Summary, Key Insights, Recommendations, and Next Steps.",
      "Edit the briefing in place; copy or download the Markdown output.",
    ],
  },
  {
    icon: MessagesSquare,
    title: "AI Workplace Chatbot",
    steps: [
      "Ask a workplace question or pick a suggestion.",
      "Press Enter to send. Shift + Enter creates a new line.",
      "Edit any earlier prompt to branch the conversation, or regenerate the last reply.",
      "Clear the conversation to start over. Chat history is session-only.",
    ],
  },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:py-10">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Help
        </p>
        <h1 className="text-2xl font-bold tracking-tight">How to use the workspace</h1>
        <p className="text-sm text-muted-foreground">
          Three tools, one consistent workflow: fill the input, generate, then edit or export.
        </p>
      </header>

      <div className="space-y-4">
        {guides.map(({ icon: Icon, title, steps }) => (
          <section
            key={title}
            className="rounded-2xl border border-border bg-card p-5 shadow-elegant"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="size-4" />
              </div>
              <h2 className="text-sm font-semibold">{title}</h2>
            </div>
            <ol className="space-y-2 text-sm text-foreground/80">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
