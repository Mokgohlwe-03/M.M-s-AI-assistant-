import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileSearch,
  MessagesSquare,
  Activity,
  Settings,
  HelpCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const workspace = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Smart Email Generator", url: "/email", icon: Mail },
  { title: "AI Research Assistant", url: "/research", icon: FileSearch },
  { title: "AI Workplace Chatbot", url: "/chat", icon: MessagesSquare },
];

const account = [
  { title: "Current Session", url: "/session", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground shadow-sm">
            <div className="size-2.5 rounded-full bg-background" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight">M.M. Assistant</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Workplace AI
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Session</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {account.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-md bg-success/10 px-2.5 py-2 group-data-[collapsible=icon]:justify-center">
          <span className="relative flex size-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-success group-data-[collapsible=icon]:hidden">
            Live Session
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
