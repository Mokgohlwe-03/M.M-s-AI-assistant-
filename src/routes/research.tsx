import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateResearch } from "@/lib/ai.functions";
import { OutputPanel } from "@/components/output-panel";
import { ResponsibleAiNotice } from "@/components/responsible-ai-notice";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — M.M. AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn topics, articles, or notes into executive summaries, key insights, recommendations, and next steps.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(generateResearch);
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic, article, or notes.");
      return;
    }
    setLoading(true);
    try {
      const res = await fn({ data: { topic } });
      setOutput(res.text);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't generate the briefing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:py-10">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          AI Tool
        </p>
        <h1 className="text-2xl font-bold tracking-tight">AI Research Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Paste a topic, article, or notes and receive a structured executive briefing.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Input
          </span>
          <span className="rounded bg-brand/5 px-2 py-0.5 text-[10px] font-medium italic text-muted-foreground">
            {loading ? "Analyzing…" : "Ready"}
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Topic, article, or notes
            </Label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Paste an article, share your notes, or write a topic to research…"
              rows={10}
              className="resize-y font-mono text-[13px]"
            />
          </div>

          <Button onClick={generate} disabled={loading} className="w-full gap-2" size="lg">
            <Sparkles className="size-4" />
            {loading ? "Analyzing…" : output ? "Regenerate briefing" : "Generate briefing"}
          </Button>
        </div>
      </section>

      <OutputPanel
        label="Executive Briefing"
        value={output}
        onChange={setOutput}
        onRegenerate={generate}
        isLoading={loading}
        filename="research-briefing.md"
        renderMarkdown
        emptyState="Add input and generate to see summary, insights, recommendations, and next steps."
      />

      <ResponsibleAiNotice />
    </div>
  );
}
