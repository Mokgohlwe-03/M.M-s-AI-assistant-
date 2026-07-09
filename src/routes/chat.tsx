import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Send, Trash2, RefreshCw, Copy, Check, Pencil, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { chat } from "@/lib/ai.functions";
import { ResponsibleAiNotice } from "@/components/responsible-ai-notice";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — M.M. AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant to improve emails, draft agendas, explain policies, and more.",
      },
    ],
  }),
  component: ChatPage,
});

const suggestions = [
  "Improve this email for tone and clarity",
  "Draft a meeting agenda for a project kickoff",
  "Summarize our company's remote work policy",
  "Write a status update for stakeholders",
];

function ChatPage() {
  const fn = useServerFn(chat);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (history: Msg[]) => {
    setLoading(true);
    try {
      const res = await fn({ data: { messages: history } });
      setMessages([...history, { role: "assistant", content: res.text }]);
    } catch (e) {
      console.error(e);
      toast.error("The assistant couldn't respond. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    await send(next);
  };

  const regenerate = async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    // Trim everything after last user message
    const idx = messages.map((m) => m.role).lastIndexOf("user");
    const trimmed = messages.slice(0, idx + 1);
    setMessages(trimmed);
    await send(trimmed);
  };

  const clear = () => {
    setMessages([]);
    setInput("");
    toast.success("Conversation cleared");
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const beginEdit = (i: number, content: string) => {
    setEditingIdx(i);
    setEditDraft(content);
  };

  const submitEdit = async () => {
    if (editingIdx === null) return;
    const trimmed = messages.slice(0, editingIdx);
    const edited: Msg[] = [...trimmed, { role: "user", content: editDraft }];
    setEditingIdx(null);
    setEditDraft("");
    setMessages(edited);
    await send(edited);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-4xl flex-col px-4 py-4 sm:py-6">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Tool
          </p>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">AI Workplace Chatbot</h1>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="gap-1.5 text-[11px] font-semibold text-muted-foreground"
          >
            <Trash2 className="size-3.5" />
            Clear
          </Button>
        )}
      </header>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Sparkles className="size-5" />
              </div>
              <div className="max-w-sm space-y-1.5">
                <h2 className="text-sm font-semibold">How can I help with your work today?</h2>
                <p className="text-xs text-muted-foreground">
                  Ask a question, improve a draft, or start with a suggestion below.
                </p>
              </div>
              <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="rounded-lg border border-border bg-muted/40 p-3 text-left text-[11px] font-medium text-foreground/80 transition-colors hover:border-accent/30 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "group flex flex-col gap-1",
                  m.role === "user" ? "items-end" : "items-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-brand text-brand-foreground"
                      : "bg-muted/60 text-foreground",
                  )}
                >
                  {editingIdx === i ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editDraft}
                        onChange={(e) => setEditDraft(e.target.value)}
                        rows={3}
                        className="bg-background text-foreground"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={submitEdit}>
                          Send
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingIdx(null)}
                          className="text-brand-foreground/80 hover:text-brand-foreground"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:font-semibold prose-ul:my-1.5 prose-ol:my-1.5">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  )}
                </div>
                {editingIdx !== i && (
                  <div className="flex gap-1 px-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => copy(m.content)}
                      className="rounded p-1 text-muted-foreground hover:text-foreground"
                      aria-label="Copy"
                    >
                      <Copy className="size-3" />
                    </button>
                    {m.role === "user" && (
                      <button
                        onClick={() => beginEdit(i, m.content)}
                        className="rounded p-1 text-muted-foreground hover:text-foreground"
                        aria-label="Edit"
                      >
                        <Pencil className="size-3" />
                      </button>
                    )}
                    {m.role === "assistant" && i === messages.length - 1 && (
                      <button
                        onClick={regenerate}
                        className="rounded p-1 text-muted-foreground hover:text-foreground"
                        aria-label="Regenerate"
                      >
                        <RefreshCw className="size-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-start">
              <div className="rounded-2xl bg-muted/60 px-4 py-3">
                <div className="flex gap-1">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-muted/30 p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="Ask about emails, agendas, policies, reports…"
              rows={1}
              className="max-h-40 min-h-[44px] resize-none bg-card"
            />
            <Button
              onClick={submit}
              disabled={loading || !input.trim()}
              size="icon"
              className="size-11 shrink-0"
            >
              <Send className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Session-only history. Nothing is stored server-side.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <ResponsibleAiNotice />
      </div>
    </div>
  );
}

// keep unused import happy
void Check;
