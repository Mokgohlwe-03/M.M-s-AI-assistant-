import { Info } from "lucide-react";

export function ResponsibleAiNotice() {
  return (
    <div className="rounded-xl border border-border bg-muted/60 p-4">
      <div className="flex gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Info className="size-3.5" />
        </div>
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Responsible AI Notice: </span>
          AI-generated content is intended to assist and should always be reviewed before being
          shared or used professionally. You remain responsible for verifying accuracy,
          completeness, and suitability of all outputs.
        </p>
      </div>
    </div>
  );
}
