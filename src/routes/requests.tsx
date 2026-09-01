import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock, X } from "lucide-react";
import { AppBar, Avatar, Pill, Screen } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { professionals, youths, type ConnectionStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Connection requests — PathFinder" },
      {
        name: "description",
        content:
          "Track pending, accepted and declined connection requests between young people and professionals.",
      },
      { property: "og:title", content: "Connection requests — PathFinder" },
      {
        property: "og:description",
        content: "Pending, accepted and declined connection requests in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Requests,
});

const tabs: ConnectionStatus[] = ["pending", "accepted", "declined"];

function Requests() {
  const { connections, respondToConnection, role } = useAppState();
  const [tab, setTab] = useState<ConnectionStatus>("pending");
  const isPro = role === "professional";
  const list = connections.filter((c) => c.status === tab);

  return (
    <Screen>
      <AppBar title="Requests" subtitle={`${connections.length} connections in total`} />

      <div className="-mt-4 space-y-5 rounded-t-3xl bg-background px-5 pt-6">
        <div className="flex gap-2 rounded-2xl bg-secondary p-1">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`h-9 flex-1 rounded-xl text-xs font-semibold capitalize transition-colors ${
                tab === t ? "bg-card text-foreground shadow" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {list.length === 0 ? (
            <p className="card-soft p-4 text-sm text-muted-foreground">
              Nothing {tab} right now.
            </p>
          ) : null}
          {list.map((c) => {
            const other = isPro
              ? youths.find((y) => y.id === c.youthId)
              : professionals.find((p) => p.id === c.professionalId);
            return (
              <div key={c.id} className="card-soft p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={other?.name ?? "PF"} tone={isPro ? "teal" : "navy"} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{other?.name ?? "Unknown"}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {c.sentAt}
                    </p>
                  </div>
                  <Pill tone="teal">{c.opportunity}</Pill>
                </div>
                <p className="mt-3 rounded-xl bg-secondary p-3 text-[13px] leading-relaxed text-secondary-foreground">
                  “{c.message}”
                </p>
                {c.status === "pending" && isPro ? (
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => respondToConnection(c.id, "accepted")}
                      className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-semibold text-accent-foreground"
                    >
                      <Check className="size-4" /> Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => respondToConnection(c.id, "declined")}
                      className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border text-sm font-semibold"
                    >
                      <X className="size-4" /> Decline
                    </button>
                  </div>
                ) : null}
                {c.status === "accepted" ? (
                  <Link
                    to="/messages/$id"
                    params={{ id: c.id }}
                    className="mt-3 flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
                  >
                    Open chat
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
