import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateEmail } from "@/lib/ai.functions";
import { OutputPanel } from "@/components/output-panel";
import { ResponsibleAiNotice } from "@/components/responsible-ai-notice";
import { cn } from "@/lib/utils";

type Tone = "Formal" | "Friendly" | "Persuasive";
const tones: Tone[] = ["Formal", "Friendly", "Persuasive"];

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — M.M. AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with tone control. Edit, copy, regenerate, or download.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const fn = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!recipient.trim() || !purpose.trim()) {
      toast.error("Please add a recipient and purpose.");
      return;
    }
    setLoading(true);
    try {
      const res = await fn({ data: { recipient, subject, purpose, context, tone } });
      setOutput(res.text);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't generate. Please try again.");
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
        <h1 className="text-2xl font-bold tracking-tight">Smart Email Generator</h1>
        <p className="text-sm text-muted-foreground">
          Provide a few details and generate a polished, ready-to-send email.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Input
          </span>
          <span className="rounded bg-brand/5 px-2 py-0.5 text-[10px] font-medium italic text-muted-foreground">
            {loading ? "Drafting…" : "Ready"}
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Recipient
              </Label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Project Manager"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Subject (optional)
              </Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Q3 milestones update"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Purpose
            </Label>
            <Textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="What do you want this email to accomplish?"
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Additional context (optional)
            </Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Background, deadlines, prior conversation, tone notes…"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Tone
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={cn(
                    "rounded-md py-2 text-[11px] font-semibold transition-colors",
                    tone === t
                      ? "bg-brand text-brand-foreground"
                      : "border border-border bg-muted/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={generate}
            disabled={loading}
            className="w-full gap-2"
            size="lg"
          >
            <Sparkles className="size-4" />
            {loading ? "Generating…" : output ? "Regenerate email" : "Generate email"}
          </Button>
        </div>
      </section>

      <OutputPanel
        label="AI Generated Draft"
        value={output}
        onChange={setOutput}
        onRegenerate={generate}
        isLoading={loading}
        filename="email.txt"
        emptyState="Fill in the form and generate to see your email draft here."
      />

      <ResponsibleAiNotice />
    </div>
  );
}
