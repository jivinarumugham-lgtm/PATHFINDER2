import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Check, Sparkles, X } from "lucide-react";
import { AppBar, Avatar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { youths } from "@/lib/mock-data";

export const Route = createFileRoute("/professional/")({
  head: () => ({
    meta: [
      { title: "Mentor dashboard — PathFinder" },
      {
        name: "description",
        content:
          "Review connection requests, manage mentees and track the impact of the opportunities you offer.",
      },
      { property: "og:title", content: "Mentor dashboard — PathFinder" },
      {
        property: "og:description",
        content: "Requests, mentees and your impact summary in one place.",
      },
    ],
  }),
  component: ProfessionalDashboard,
});

function ProfessionalDashboard() {
  const {
    displayName,
    connections,
    respondToConnection,
    availableForMentoring,
    toggleAvailability,
  } = useAppState();
  const pending = connections.filter((c) => c.status === "pending");
  const mentees = connections.filter((c) => c.status === "accepted");

  return (
    <Screen>
      <AppBar
        title={`Hi, ${displayName.split(" ")[0]}`}
        subtitle={`${pending.length} requests waiting for you`}
      />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-semibold">Available for mentoring</p>
            <p className="text-xs text-muted-foreground">
              {availableForMentoring
                ? "You appear in discovery for young people."
                : "You are hidden from discovery."}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={availableForMentoring}
            aria-label="Toggle availability"
            onClick={toggleAvailability}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              availableForMentoring ? "bg-accent" : "bg-secondary"
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-card shadow transition-all ${
                availableForMentoring ? "left-6" : "left-1"
              }`}
            />
          </button>
        </section>

        <section>
          <SectionTitle
            action={
              <Link to="/requests" className="text-[13px] font-semibold text-muted-foreground">
                See all
              </Link>
            }
          >
            Pending requests
          </SectionTitle>
          <div className="space-y-3">
            {pending.length === 0 ? (
              <p className="card-soft p-4 text-sm text-muted-foreground">
                No pending requests right now.
              </p>
            ) : null}
            {pending.map((c) => {
              const youth = youths.find((y) => y.id === c.youthId);
              return (
                <div key={c.id} className="card-soft p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={youth?.name ?? "PF"} tone="teal" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{youth?.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {youth?.academicYear} · {youth?.school}
                      </p>
                    </div>
                    <Pill tone="teal">{c.opportunity}</Pill>
                  </div>
                  <p className="mt-3 rounded-xl bg-secondary p-3 text-[13px] leading-relaxed text-secondary-foreground">
                    “{c.message}”
                  </p>
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
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <SectionTitle
            action={
              <Link to="/discovery" className="text-[13px] font-semibold text-muted-foreground">
                Browse
              </Link>
            }
          >
            Recommended young people
          </SectionTitle>
          <div className="scrollbar-none -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
            {youths.map((y) => (
              <Link
                key={y.id}
                to="/youth-profiles/$id"
                params={{ id: y.id }}
                className="card-soft w-[210px] shrink-0 p-4"
              >
                <Avatar name={y.name} tone="teal" />
                <p className="mt-3 text-sm font-semibold">{y.name}</p>
                <p className="text-xs text-muted-foreground">
                  {y.academicYear} · {y.sector}
                </p>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{y.bio}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Current mentees</SectionTitle>
          <div className="card-soft divide-y divide-border">
            {mentees.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">Accept a request to start mentoring.</p>
            ) : null}
            {mentees.map((c) => {
              const youth = youths.find((y) => y.id === c.youthId);
              return (
                <Link
                  key={c.id}
                  to="/messages/$id"
                  params={{ id: c.id }}
                  className="flex items-center gap-3 p-4"
                >
                  <Avatar name={youth?.name ?? "PF"} size="sm" tone="teal" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{youth?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.opportunity}</p>
                  </div>
                  <Pill>Active</Pill>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="card-soft p-4">
            <Sparkles className="size-5 text-accent" />
            <p className="mt-2 text-sm font-semibold">Impact summary</p>
            <p className="text-xs text-muted-foreground">
              {mentees.length} mentees · 6 sessions given
            </p>
          </div>
          <div className="card-soft p-4">
            <Activity className="size-5 text-accent" />
            <p className="mt-2 text-sm font-semibold">Recent activity</p>
            <p className="text-xs text-muted-foreground">2 CV reviews this month</p>
          </div>
        </section>
      </div>
    </Screen>
  );
}
