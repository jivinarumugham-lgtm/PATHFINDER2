import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { AppBar, Avatar, Screen } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { professionals, youths } from "@/lib/mock-data";

export const Route = createFileRoute("/messages/")({
  head: () => ({
    meta: [
      { title: "Your chats — PathFinder" },
      {
        name: "description",
        content: "All your accepted connections and conversations with mentors and mentees.",
      },
      { property: "og:title", content: "Your chats — PathFinder" },
      {
        property: "og:description",
        content: "Conversations with the mentors and mentees you are connected to.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MessagesList,
});

function MessagesList() {
  const { connections, messages, role } = useAppState();
  const isPro = role === "professional";
  const chats = connections.filter((c) => c.status === "accepted");

  return (
    <Screen>
      <AppBar title="Chats" subtitle={`${chats.length} active conversations`} />

      <div className="-mt-4 rounded-t-3xl bg-background px-5 pt-6">
        <div className="card-soft divide-y divide-border">
          {chats.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              Chats unlock once a connection is accepted.
            </p>
          ) : null}
          {chats.map((c) => {
            const other = isPro
              ? youths.find((y) => y.id === c.youthId)
              : professionals.find((p) => p.id === c.professionalId);
            const last = [...messages].reverse().find((m) => m.connectionId === c.id);
            return (
              <Link
                key={c.id}
                to="/messages/$id"
                params={{ id: c.id }}
                className="flex items-center gap-3 p-4"
              >
                <Avatar name={other?.name ?? "PF"} size="sm" tone={isPro ? "teal" : "navy"} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{other?.name ?? "Unknown"}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {last?.text ?? "Say hello with an icebreaker."}
                  </p>
                </div>
                <MessageCircle className="size-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
