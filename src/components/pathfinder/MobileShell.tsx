import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Compass, Home, Inbox, MessageCircle, User } from "lucide-react";
import type { ReactNode } from "react";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export function AppBar({
  title,
  subtitle,
  backTo,
  action,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  action?: ReactNode;
}) {
  return (
    <header className="navy-gradient sticky top-0 z-20 px-5 pt-5 pb-6 text-navy-foreground">
      <div className="flex items-center gap-3">
        {backTo ? (
          <Link
            to={backTo}
            aria-label="Go back"
            className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="size-4" />
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold">{title}</h1>
          {subtitle ? <p className="truncate text-sm text-white/70">{subtitle}</p> : null}
        </div>
        {action}
      </div>
    </header>
  );
}

export function Screen({
  children,
  className,
  withNav = true,
}: {
  children: ReactNode;
  className?: string;
  withNav?: boolean;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background">
      <div className={cn("animate-fade-in", withNav && "pb-24", className)}>{children}</div>
      {withNav ? <BottomNav /> : null}
    </div>
  );
}

const youthNav = [
  { to: "/youth", label: "Home", icon: Home },
  { to: "/discovery", label: "Discover", icon: Compass },
  { to: "/requests", label: "Requests", icon: Inbox },
  { to: "/messages", label: "Chats", icon: MessageCircle },
  { to: "/youth/profile", label: "Profile", icon: User },
];

const proNav = [
  { to: "/professional", label: "Home", icon: Home },
  { to: "/discovery", label: "Discover", icon: Compass },
  { to: "/requests", label: "Requests", icon: Inbox },
  { to: "/messages", label: "Chats", icon: MessageCircle },
  { to: "/professional/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { role } = useAppState();
  const { pathname } = useLocation();
  const items = role === "professional" ? proNav : youthNav;

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur">
      <ul className="flex items-stretch justify-between px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl transition-colors",
                    active && "bg-teal-soft text-teal-foreground",
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="text-base font-semibold">{children}</h2>
      {action}
    </div>
  );
}

export function Avatar({
  name,
  size = "md",
  tone = "navy",
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "navy" | "teal";
}) {
  const sizes = {
    sm: "size-9 text-xs",
    md: "size-12 text-sm",
    lg: "size-16 text-lg",
    xl: "size-24 text-2xl",
  } as const;
  const inits = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl font-semibold",
        tone === "navy" ? "navy-gradient text-navy-foreground" : "bg-teal-soft text-teal-foreground",
        sizes[size],
      )}
    >
      {inits}
    </span>
  );
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "teal" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
        tone === "teal" && "bg-teal-soft text-teal-foreground",
        tone === "muted" && "bg-secondary text-secondary-foreground",
        tone === "outline" && "border border-border text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
