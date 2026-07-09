import { useState, type ReactNode } from "react";
import { Copy, Check, Download, RefreshCw, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  isLoading?: boolean;
  filename?: string;
  emptyState?: ReactNode;
  renderMarkdown?: boolean;
};

export function OutputPanel({
  label,
  value,
  onChange,
  onRegenerate,
  isLoading,
  filename = "output.txt",
  emptyState,
  renderMarkdown,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const download = () => {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
      <header className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="flex items-center gap-1">
          {value && !isLoading && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-[11px] font-semibold"
                onClick={() => setEditing((e) => !e)}
              >
                {editing ? "Preview" : "Edit"}
              </Button>
              {onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 text-[11px] font-semibold text-accent hover:text-accent"
                  onClick={onRegenerate}
                >
                  <RefreshCw className="size-3" />
                  Regenerate
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 text-[11px] font-semibold"
                onClick={download}
              >
                <Download className="size-3" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 text-[11px] font-semibold"
                onClick={copy}
              >
                {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
                <span className="hidden sm:inline">Copy</span>
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="p-4">
        {isLoading ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="size-5 animate-spin text-accent" />
            <span className="text-xs font-medium">Generating…</span>
          </div>
        ) : !value ? (
          <div className="flex min-h-[200px] items-center justify-center text-center text-xs text-muted-foreground">
            {emptyState ?? "Your AI-generated output will appear here."}
          </div>
        ) : editing ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[300px] resize-y border-0 bg-muted/40 font-mono text-[13px] leading-relaxed focus-visible:ring-1"
          />
        ) : renderMarkdown ? (
          <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-p:text-foreground/85 prose-strong:text-foreground prose-li:text-foreground/85 prose-code:text-accent">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-foreground/85">
            {value}
          </pre>
        )}
      </div>
    </section>
  );
}
