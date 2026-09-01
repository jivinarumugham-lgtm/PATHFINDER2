import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Award, LogOut } from "lucide-react";
import { AppBar, Avatar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { badges, youths } from "@/lib/mock-data";

export const Route = createFileRoute("/youth/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — PathFinder" },
      {
        name: "description",
        content: "Manage your PathFinder profile, showcase your skills and track earned badges.",
      },
      { property: "og:title", content: "Your profile — PathFinder" },
      {
        property: "og:description",
        content: "Your skills, projects and career readiness badges.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: YouthProfile,
});

function YouthProfile() {
  const { displayName, signOut } = useAppState();
  const navigate = useNavigate();
  const me = youths[0]!;

  return (
    <Screen>
      <AppBar title="Your profile" subtitle="Visible to verified professionals" />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft flex items-center gap-4 p-5">
          <Avatar name={displayName} size="lg" tone="teal" />
          <div className="min-w-0">
            <p className="text-base font-semibold">{displayName}</p>
            <p className="text-xs text-muted-foreground">
              {me.academicYear} · {me.school}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill tone="teal">{me.sector}</Pill>
              <Pill>{me.dreamJob}</Pill>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>About you</SectionTitle>
          <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
            {me.bio}
          </p>
        </section>

        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {me.skills.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Badges</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.name}
                className={`card-soft p-4 ${b.earned ? "" : "opacity-50"}`}
              >
                <Award className={`size-5 ${b.earned ? "text-accent" : "text-muted-foreground"}`} />
                <p className="mt-2 text-sm font-semibold">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.earned ? "Earned" : "Locked"}</p>
              </div>
            ))}
          </div>
        </section>

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
      </div>
    </Screen>
  );
}
