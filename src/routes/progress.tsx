import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Plus, Trophy } from "lucide-react";
import { AppBar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { badges } from "@/lib/mock-data";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Career progress — PathFinder" },
      {
        name: "description",
        content:
          "Track your career readiness score, badges earned and every opportunity you have logged.",
      },
      { property: "og:title", content: "Career progress — PathFinder" },
      {
        property: "og:description",
        content: "Readiness score, badge collection and logged experience in one view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressScreen,
});

const leaderboard = [
  { name: "Aisha R.", points: 480 },
  { name: "You", points: 420 },
  { name: "Tomasz W.", points: 385 },
  { name: "Leah B.", points: 310 },
];

function ProgressScreen() {
  const { connections, loggedOpportunities, feedbackEntries } = useAppState();
  const accepted = connections.filter((c) => c.status === "accepted").length;
  const earned = badges.filter((b) => b.earned).length;
  const readiness = Math.min(
    100,
    40 + accepted * 6 + loggedOpportunities.length * 5 + feedbackEntries.length * 4,
  );

  return (
    <Screen>
      <AppBar title="Career progress" subtitle="Every step counts towards readiness" />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Career readiness</p>
              <p className="text-xs text-muted-foreground">
                {earned} of {badges.length} badges · {accepted} mentor connections
              </p>
            </div>
            <span className="font-display text-3xl font-semibold text-accent">{readiness}%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent" style={{ width: `${readiness}%` }} />
          </div>
        </section>

        <section>
          <SectionTitle>Badge collection</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div key={b.name} className={`card-soft p-4 ${b.earned ? "" : "opacity-50"}`}>
                <Award className={`size-5 ${b.earned ? "text-accent" : "text-muted-foreground"}`} />
                <p className="mt-2 text-sm font-semibold">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.earned ? "Earned" : "Locked"}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            action={
              <Link
                to="/log-opportunity"
                className="flex items-center gap-1 text-[13px] font-semibold text-accent"
              >
                <Plus className="size-3.5" /> Log
              </Link>
            }
          >
            Logged opportunities
          </SectionTitle>
          <ul className="space-y-3">
            {loggedOpportunities.map((o) => (
              <li key={o.id} className="card-soft p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{o.title}</p>
                  <Pill tone="teal">{o.type}</Pill>
                </div>
                <p className="text-xs text-muted-foreground">
                  {o.organisation} · {o.date}
                </p>
                {o.reflection ? (
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {o.reflection}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>Leaderboard (your school)</SectionTitle>
          <ul className="card-soft divide-y divide-border">
            {leaderboard.map((row, i) => (
              <li key={row.name} className="flex items-center gap-3 p-4">
                <span className="w-5 text-sm font-semibold text-muted-foreground">{i + 1}</span>
                <Trophy
                  className={`size-4 ${i === 0 ? "text-accent" : "text-muted-foreground/50"}`}
                />
                <span className={`flex-1 text-sm ${row.name === "You" ? "font-semibold" : ""}`}>
                  {row.name}
                </span>
                <span className="text-sm text-muted-foreground">{row.points} pts</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Screen>
  );
}
