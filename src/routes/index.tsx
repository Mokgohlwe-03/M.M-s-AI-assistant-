import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileSearch,
  MessagesSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";
import { ResponsibleAiNotice } from "@/components/responsible-ai-notice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — M.M. AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Your private AI workspace. Draft emails, summarize research, and chat with a workplace assistant.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft polished workplace emails with tone control — formal, friendly, or persuasive.",
    tint: "bg-accent/10 text-accent",
  },
  {
    to: "/research" as const,
    icon: FileSearch,
    title: "AI Research Assistant",
    desc: "Turn topics, notes, or articles into executive summaries, insights, and next steps.",
    tint: "bg-success/10 text-success",
  },
  {
    to: "/chat" as const,
    icon: MessagesSquare,
    title: "AI Workplace Chatbot",
    desc: "Ask questions, improve emails, draft agendas, or explain policies conversationally.",
    tint: "bg-brand/10 text-brand",
  },
];

const status = [
  { icon: ShieldCheck, label: "Privacy", value: "Guest mode" },
  { icon: Lock, label: "Storage", value: "Session only" },
  { icon: Zap, label: "Assistant", value: "Ready" },
];

function Dashboard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:py-10">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {greeting}, Guest.
        </h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          Your private AI workspace. No account, no database, no history — everything you create
          lives only in this browser session.
        </p>
      </header>

      {/* Status strip */}
      <div className="grid grid-cols-3 gap-3">
        {status.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-elegant"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-brand">
              <Icon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </div>
              <div className="truncate text-xs font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link
            to="/email"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-elegant transition-transform active:scale-[0.98]"
          >
            <div className="rounded-lg bg-accent/10 p-2 text-accent">
              <Mail className="size-4" />
            </div>
            <span className="text-xs font-semibold">Draft Email</span>
          </Link>
          <Link
            to="/research"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-elegant transition-transform active:scale-[0.98]"
          >
            <div className="rounded-lg bg-success/10 p-2 text-success">
              <FileSearch className="size-4" />
            </div>
            <span className="text-xs font-semibold">Summarize</span>
          </Link>
          <Link
            to="/chat"
            className="group col-span-2 flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-elegant transition-transform active:scale-[0.98] sm:col-span-1"
          >
            <div className="rounded-lg bg-brand/10 p-2 text-brand">
              <MessagesSquare className="size-4" />
            </div>
            <span className="text-xs font-semibold">Ask Assistant</span>
          </Link>
        </div>
      </section>

      {/* Tool cards */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          AI tools
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant transition-colors hover:border-accent/30"
            >
              <div className={`inline-flex size-10 items-center justify-center rounded-xl ${t.tint}`}>
                <t.icon className="size-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                Open <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ResponsibleAiNotice />
    </div>
  );
}
