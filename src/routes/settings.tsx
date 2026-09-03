import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  FileText,
  Info,
  LogOut,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { AppBar, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PathFinder" },
      {
        name: "description",
        content:
          "Manage notification preferences, safeguarding controls, legal information and your PathFinder account.",
      },
      { property: "og:title", content: "Settings — PathFinder" },
      {
        property: "og:description",
        content: "Notifications, safeguarding, legal pages and account controls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsScreen,
});

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={`Toggle ${label}`}
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          value ? "bg-accent" : "bg-secondary"
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-card shadow transition-all ${
            value ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsScreen() {
  const { signOut, role } = useAppState();
  const navigate = useNavigate();
  const [pushRequests, setPushRequests] = useState(true);
  const [pushMessages, setPushMessages] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [profileDiscoverable, setProfileDiscoverable] = useState(true);
  const [shareTranscripts, setShareTranscripts] = useState(true);

  const links = [
    { to: "/notifications", label: "Notifications", icon: Bell },
    { to: "/feedback", label: "Share feedback", icon: Star },
    { to: "/about", label: "About PathFinder", icon: Info },
    { to: "/privacy", label: "Privacy policy", icon: ShieldCheck },
    { to: "/terms", label: "Terms of use", icon: FileText },
  ];

  return (
    <Screen>
      <AppBar
        title="Settings"
        subtitle="Notifications, safety and legal"
        backTo={role === "professional" ? "/professional/profile" : "/youth/profile"}
      />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section>
          <SectionTitle>Notifications</SectionTitle>
          <div className="card-soft divide-y divide-border">
            <Toggle
              label="Connection requests"
              hint="Push alerts when someone requests or accepts a connection."
              value={pushRequests}
              onChange={() => setPushRequests((v) => !v)}
            />
            <Toggle
              label="New messages"
              hint="Push alerts for chat replies."
              value={pushMessages}
              onChange={() => setPushMessages((v) => !v)}
            />
            <Toggle
              label="Weekly email digest"
              hint="A summary of new mentors, events and resources."
              value={emailDigest}
              onChange={() => setEmailDigest((v) => !v)}
            />
          </div>
        </section>

        <section>
          <SectionTitle>Privacy & safeguarding</SectionTitle>
          <div className="card-soft divide-y divide-border">
            <Toggle
              label="Discoverable profile"
              hint="Appear in search and recommendations."
              value={profileDiscoverable}
              onChange={() => setProfileDiscoverable((v) => !v)}
            />
            <Toggle
              label="Safeguarding transcripts"
              hint="Keep chats reviewable by the moderation team. Recommended for under 18s."
              value={shareTranscripts}
              onChange={() => setShareTranscripts((v) => !v)}
            />
          </div>
        </section>

        <section>
          <SectionTitle>More</SectionTitle>
          <ul className="card-soft divide-y divide-border">
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link to={to} className="flex items-center gap-3 p-4">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border text-sm font-semibold"
          >
            <LogOut className="size-4" /> Sign out
          </button>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 text-sm font-semibold text-destructive"
          >
            <Trash2 className="size-4" /> Delete account
          </button>
          <p className="pb-2 text-center text-[11px] text-muted-foreground">
            PathFinder demo build · v0.1.0
          </p>
        </div>
      </div>
    </Screen>
  );
}
