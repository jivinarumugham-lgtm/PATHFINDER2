import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { AppBar, Avatar, Pill, Screen } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { icebreakers, professionals, youths } from "@/lib/mock-data";

export const Route = createFileRoute("/messages/$id")({
  head: () => ({
    meta: [
      { title: "Conversation — PathFinder" },
      {
        name: "description",
        content:
          "Chat with your mentor or mentee, use smart icebreakers and arrange your next session.",
      },
      { property: "og:title", content: "Conversation — PathFinder" },
      {
        property: "og:description",
        content: "Message your mentor or mentee and arrange your next session.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Conversation,
});

function Conversation() {
  const { id } = Route.useParams();
  const { connections, messages, sendMessage, role } = useAppState();
  const [draft, setDraft] = useState("");
  const connection = connections.find((c) => c.id === id);
  const isPro = role === "professional";

  if (!connection) {
    return (
      <Screen>
        <AppBar title="Conversation" backTo="/messages" />
        <p className="p-5 text-sm text-muted-foreground">This conversation no longer exists.</p>
      </Screen>
    );
  }

  const other = isPro
    ? youths.find((y) => y.id === connection.youthId)
    : professionals.find((p) => p.id === connection.professionalId);
  const thread = messages.filter((m) => m.connectionId === connection.id);

  return (
    <Screen>
      <AppBar
        title={other?.name ?? "Conversation"}
        subtitle={connection.opportunity}
        backTo="/messages"
        action={<Avatar name={other?.name ?? "PF"} size="sm" tone={isPro ? "teal" : "navy"} />}
      />

      <div className="-mt-4 space-y-4 rounded-t-3xl bg-background px-5 pt-6">
        <div className="space-y-3">
          {thread.length === 0 ? (
            <p className="card-soft p-4 text-sm text-muted-foreground">
              No messages yet — try an icebreaker below.
            </p>
          ) : null}
          {thread.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                  m.from === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {m.text}
                <span className="mt-1 block text-[10px] opacity-70">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5">
          {icebreakers.map((i) => (
            <button
              key={i.title}
              type="button"
              onClick={() => setDraft(i.text)}
              className="shrink-0"
            >
              <Pill tone="outline">{i.title}</Pill>
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            sendMessage(connection.id, draft.trim());
            setDraft("");
          }}
          className="sticky bottom-24 flex items-center gap-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message"
            className="h-12 flex-1 rounded-2xl border border-border bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </Screen>
  );
}
