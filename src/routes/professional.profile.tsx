import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Award, BadgeCheck, LogOut, MapPin } from "lucide-react";
import { AppBar, Avatar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { professionals } from "@/lib/mock-data";

export const Route = createFileRoute("/professional/profile")({
  head: () => ({
    meta: [
      { title: "Mentor profile — PathFinder" },
      {
        name: "description",
        content:
          "Manage your mentor profile, verification badge and the opportunities you offer young people.",
      },
      { property: "og:title", content: "Mentor profile — PathFinder" },
      {
        property: "og:description",
        content: "Your verification, opportunities offered and mentoring availability.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyProfessionalProfile,
});

function MyProfessionalProfile() {
  const { displayName, signOut, availableForMentoring, toggleAvailability } = useAppState();
  const navigate = useNavigate();
  const me = professionals[0]!;

  return (
    <Screen>
      <AppBar title="Your profile" subtitle="How young people see you" />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft flex items-center gap-4 p-5">
          <Avatar name={displayName} size="lg" />
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-base font-semibold">
              {displayName}
              <BadgeCheck className="size-4 text-accent" />
            </p>
            <p className="text-xs text-muted-foreground">
              {me.jobTitle} · {me.company}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" /> {me.location}
            </p>
          </div>
        </section>

        <section className="card-soft flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-semibold">Available for mentoring</p>
            <p className="text-xs text-muted-foreground">
              {availableForMentoring ? "Visible in discovery." : "Hidden from discovery."}
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
          <SectionTitle>Biography</SectionTitle>
          <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
            {me.bio}
          </p>
        </section>

        <section>
          <SectionTitle>Opportunities offered</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {me.opportunities.map((o) => (
              <Pill key={o} tone="teal">
                {o}
              </Pill>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Achievements</SectionTitle>
          <div className="card-soft divide-y divide-border">
            {me.achievements.map((a) => (
              <p key={a} className="flex items-center gap-2 p-4 text-sm">
                <Award className="size-4 text-accent" /> {a}
              </p>
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
