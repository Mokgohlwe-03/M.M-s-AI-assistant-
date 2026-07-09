import { createFileRoute } from "@tanstack/react-router";
import { Activity, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/session")({
  head: () => ({
    meta: [
      { title: "Current Session — M.M. AI Workplace Assistant" },
      {
        name: "description",
        content: "Guest session status and privacy controls.",
      },
    ],
  }),
  component: SessionPage,
});

function SessionPage() {
  const started =
    typeof window !== "undefined"
      ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "—";

  const clearLocal = () => {
    try {
      window.sessionStorage.clear();
      window.localStorage.clear();
      toast.success("Session data cleared");
    } catch {
      toast.error("Couldn't clear session");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:py-10">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Session
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Current Session</h1>
        <p className="text-sm text-muted-foreground">
          You're working in guest mode. Nothing is stored on our servers.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: Activity, label: "Status", value: "Active" },
          { icon: ShieldCheck, label: "Mode", value: "Guest" },
          { icon: Lock, label: "Started", value: started },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-elegant"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-brand">
              <Icon className="size-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </div>
              <div className="text-sm font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-elegant">
        <h2 className="text-sm font-semibold">Privacy</h2>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>• No account, login, or profile.</li>
          <li>• No database or cloud storage of your inputs or outputs.</li>
          <li>• AI content lives only in this browser session unless you copy or download it.</li>
          <li>• Closing this tab ends the session.</li>
        </ul>
        <div className="pt-2">
          <Button variant="outline" onClick={clearLocal} className="gap-2">
            <Trash2 className="size-3.5" />
            Clear local browser data
          </Button>
        </div>
      </section>
    </div>
  );
}
