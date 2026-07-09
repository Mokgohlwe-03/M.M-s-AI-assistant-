import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — M.M. AI Workplace Assistant" },
      { name: "description", content: "Workspace preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:py-10">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Preferences
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          There's nothing to configure — this is a privacy-first guest workspace.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-elegant">
        <h2 className="text-sm font-semibold">Workspace</h2>
        <dl className="mt-3 divide-y divide-border text-sm">
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-muted-foreground">Account</dt>
            <dd className="font-medium">Guest (no login)</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-muted-foreground">History</dt>
            <dd className="font-medium">Session only</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-muted-foreground">Assistant</dt>
            <dd className="font-medium">Workplace productivity</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-muted-foreground">Storage</dt>
            <dd className="font-medium">None</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
