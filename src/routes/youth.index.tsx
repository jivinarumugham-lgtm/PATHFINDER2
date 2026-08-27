import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  MessageCircle,
  Users,
} from "lucide-react";
import { AppBar, Avatar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { badges, professionals } from "@/lib/mock-data";

export const Route = createFileRoute("/youth/")({
  head: () => ({
    meta: [
      { title: "Your dashboard — PathFinder" },
      {
        name: "description",
        content:
          "Recommended professionals, opportunities, career progress and conversations in one place.",
      },
      { property: "og:title", content: "Your dashboard — PathFinder" },
      {
        property: "og:description",
        content: "Recommended mentors, opportunities and your career readiness progress.",
      },
    ],
  }),
  component: YouthDashboard,
});

function YouthDashboard() {
  const { displayName, connections } = useAppState();
  const accepted = connections.filter((c) => c.status === "accepted").length;
  const earned = badges.filter((b) => b.earned).length;
  const readiness = 48 + accepted * 6;

  return (
    <Screen>
      <AppBar
        title={`Hi, ${displayName.split(" ")[0]}`}
        subtitle="Two mentors match your interests today"
      />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Career readiness</p>
              <p className="text-xs text-muted-foreground">
                {earned} of {badges.length} badges earned
              </p>
            </div>
            <span className="font-display text-2xl font-semibold text-accent">{readiness}%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent" style={{ width: `${readiness}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.slice(0, 3).map((b) => (
              <Pill key={b.name} tone={b.earned ? "teal" : "outline"}>
                <Award className="size-3" /> {b.name}
              </Pill>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            action={
              <Link to="/discovery" className="text-[13px] font-semibold text-muted-foreground">
                See all
              </Link>
            }
          >
            Recommended professionals
          </SectionTitle>
          <div className="scrollbar-none -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
            {professionals.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to="/professionals/$id"
                params={{ id: p.id }}
                className="card-soft w-[220px] shrink-0 p-4"
              >
                <Avatar name={p.name} />
                <p className="mt-3 flex items-center gap-1 text-sm font-semibold">
                  {p.name}
                  {p.verified ? <BadgeCheck className="size-4 text-accent" /> : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  {p.jobTitle} · {p.company}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.opportunities.slice(0, 2).map((o) => (
                    <Pill key={o} tone="teal">
                      {o}
                    </Pill>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Recommended opportunities</SectionTitle>
          <div className="space-y-3">
            {[
              { title: "Insight day: life in commercial law", org: "Linklaters · London", when: "12 Oct" },
              { title: "Mock technical interview", org: "Monzo · Remote", when: "Flexible" },
              { title: "Portfolio review clinic", org: "Wieden+Kennedy · Bristol", when: "Half term" },
            ].map((o) => (
              <div key={o.title} className="card-soft flex items-center gap-3 p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-teal-soft text-teal-foreground">
                  <CalendarDays className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{o.title}</p>
                  <p className="text-xs text-muted-foreground">{o.org}</p>
                </div>
                <Pill>{o.when}</Pill>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            action={
              <Link to="/messages" className="text-[13px] font-semibold text-muted-foreground">
                Open chats
              </Link>
            }
          >
            Recent conversations
          </SectionTitle>
          <div className="card-soft divide-y divide-border">
            {connections
              .filter((c) => c.status === "accepted")
              .map((c) => {
                const pro = professionals.find((p) => p.id === c.professionalId);
                return (
                  <Link
                    key={c.id}
                    to="/messages/$id"
                    params={{ id: c.id }}
                    className="flex items-center gap-3 p-4"
                  >
                    <Avatar name={pro?.name ?? "PF"} size="sm" tone="teal" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{pro?.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        Send your draft answers over…
                      </p>
                    </div>
                    <MessageCircle className="size-4 text-muted-foreground" />
                  </Link>
                );
              })}
            {accepted === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                No conversations yet — send your first connection request.
              </p>
            ) : null}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="card-soft p-4">
            <Users className="size-5 text-accent" />
            <p className="mt-2 text-sm font-semibold">Community</p>
            <p className="text-xs text-muted-foreground">18 new posts this week</p>
          </div>
          <div className="card-soft p-4">
            <BookOpen className="size-5 text-accent" />
            <p className="mt-2 text-sm font-semibold">Resources</p>
            <p className="text-xs text-muted-foreground">CV, LinkedIn & interview guides</p>
          </div>
        </section>
      </div>
    </Screen>
  );
}
