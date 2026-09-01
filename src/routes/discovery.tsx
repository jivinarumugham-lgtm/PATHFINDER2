import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, MapPin, Search } from "lucide-react";
import { AppBar, Avatar, Pill, Screen } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { professionals, sectors, youths } from "@/lib/mock-data";

export const Route = createFileRoute("/discovery")({
  head: () => ({
    meta: [
      { title: "Discover mentors — PathFinder" },
      {
        name: "description",
        content:
          "Search verified professionals by industry, location and the opportunities they offer.",
      },
      { property: "og:title", content: "Discover mentors — PathFinder" },
      {
        property: "og:description",
        content: "Browse verified professionals and the opportunities they offer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Discovery,
});

function Discovery() {
  const { role } = useAppState();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string | null>(null);

  const isPro = role === "professional";

  const proResults = professionals.filter(
    (p) =>
      (!sector || p.industry === sector) &&
      `${p.name} ${p.jobTitle} ${p.company}`.toLowerCase().includes(query.toLowerCase()),
  );
  const youthResults = youths.filter(
    (y) =>
      (!sector || y.sector === sector) &&
      `${y.name} ${y.dreamJob} ${y.school}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Screen>
      <AppBar
        title="Discover"
        subtitle={isPro ? "Young people looking for support" : "Professionals ready to help"}
      />

      <div className="-mt-4 space-y-5 rounded-t-3xl bg-background px-5 pt-6">
        <label className="card-soft flex items-center gap-2 px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isPro ? "Search students" : "Search name, role or company"}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5">
          <button
            type="button"
            onClick={() => setSector(null)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
              sector === null ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            All sectors
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                sector === s ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {isPro ? (
          <div className="space-y-3">
            {youthResults.map((y) => (
              <Link
                key={y.id}
                to="/youth-profiles/$id"
                params={{ id: y.id }}
                className="card-soft block p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={y.name} tone="teal" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{y.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {y.academicYear} · {y.dreamJob}
                    </p>
                  </div>
                  <Pill tone="teal">{y.sector}</Pill>
                </div>
                <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{y.bio}</p>
              </Link>
            ))}
            {youthResults.length === 0 ? (
              <p className="card-soft p-4 text-sm text-muted-foreground">No matches yet.</p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-3">
            {proResults.map((p) => (
              <Link
                key={p.id}
                to="/professionals/$id"
                params={{ id: p.id }}
                className="card-soft block p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1 truncate text-sm font-semibold">
                      {p.name}
                      {p.verified ? <BadgeCheck className="size-4 shrink-0 text-accent" /> : null}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.jobTitle} · {p.company}
                    </p>
                  </div>
                  <Pill tone="teal">{p.industry}</Pill>
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" /> {p.location}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.opportunities.slice(0, 3).map((o) => (
                    <Pill key={o}>{o}</Pill>
                  ))}
                </div>
              </Link>
            ))}
            {proResults.length === 0 ? (
              <p className="card-soft p-4 text-sm text-muted-foreground">No matches yet.</p>
            ) : null}
          </div>
        )}
      </div>
    </Screen>
  );
}
