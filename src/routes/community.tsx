import { createFileRoute } from "@tanstack/react-router";
import { Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { AppBar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { forumPosts, forumTopics, resources } from "@/lib/community-data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community & resources — PathFinder" },
      {
        name: "description",
        content:
          "Ask questions in a moderated forum and use guides, templates and checklists built for first-generation applicants.",
      },
      { property: "og:title", content: "Community & resources — PathFinder" },
      {
        property: "og:description",
        content: "A moderated forum plus practical career guides and templates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CommunityScreen,
});

function CommunityScreen() {
  const [tab, setTab] = useState<"forum" | "resources">("forum");
  const [topic, setTopic] = useState("All");
  const posts = topic === "All" ? forumPosts : forumPosts.filter((p) => p.topic === topic);

  return (
    <Screen>
      <AppBar title="Community" subtitle="Moderated by the PathFinder team" />

      <div className="-mt-4 space-y-5 rounded-t-3xl bg-background px-5 pt-6">
        <div className="flex rounded-2xl bg-secondary p-1">
          {(["forum", "resources"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold capitalize transition-colors ${
                tab === t ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "forum" ? (
          <>
            <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5">
              {forumTopics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    topic === t
                      ? "bg-accent text-accent-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <section>
              <SectionTitle>Discussions</SectionTitle>
              <ul className="space-y-3">
                {posts.map((p) => (
                  <li key={p.id} className="card-soft p-4">
                    <div className="flex items-center gap-2">
                      <Pill tone={p.role === "Professional" ? "teal" : "muted"}>{p.role}</Pill>
                      <Pill tone="outline">{p.topic}</Pill>
                    </div>
                    <p className="mt-2 text-sm font-semibold">{p.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                    <p className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{p.author}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="size-3" /> {p.replies} replies
                      </span>
                      <span>{p.time}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <section>
            <SectionTitle>Career resources</SectionTitle>
            <ul className="space-y-3">
              {resources.map((r) => (
                <li key={r.id} className="card-soft p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Pill tone="teal">{r.type}</Pill>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3" /> {r.minutes} min
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{r.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {r.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Screen>
  );
}
