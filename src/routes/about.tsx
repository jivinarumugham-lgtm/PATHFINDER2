import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Target, Users } from "lucide-react";
import { AppBar, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PathFinder — closing the network gap" },
      {
        name: "description",
        content:
          "PathFinder connects UK students from under-represented backgrounds with verified professionals for mentoring and work experience.",
      },
      { property: "og:title", content: "About PathFinder — closing the network gap" },
      {
        property: "og:description",
        content: "Our mission, how matching works and how we keep young people safe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutScreen,
});

const pillars = [
  {
    icon: Target,
    title: "Our mission",
    body: "Talent is spread evenly across the UK; opportunity is not. PathFinder gives young people without professional networks a direct route to people doing the jobs they want.",
  },
  {
    icon: Users,
    title: "How matching works",
    body: "Students share their interests, subjects and goals. We surface verified professionals in those sectors who offer short, realistic commitments — coffee chats, CV reviews, shadowing days.",
  },
  {
    icon: HeartHandshake,
    title: "Safety first",
    body: "Every professional is verified against their employer. Conversations stay inside PathFinder so our safeguarding team can review reports, and under-18 accounts have contact limits by default.",
  },
];

function AboutScreen() {
  return (
    <Screen>
      <AppBar title="About PathFinder" subtitle="Closing the network gap" backTo="/settings" />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft p-5">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            PathFinder is a UK social mobility platform. Half of professional roles are still filled
            through personal networks — we make those networks available to everyone, not just those
            who inherit them.
          </p>
        </section>

        {pillars.map(({ icon: Icon, title, body }) => (
          <section key={title}>
            <SectionTitle>
              <span className="flex items-center gap-2">
                <Icon className="size-4 text-accent" /> {title}
              </span>
            </SectionTitle>
            <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
              {body}
            </p>
          </section>
        ))}

        <section>
          <SectionTitle>Impact so far</SectionTitle>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "12k", label: "Students" },
              { value: "3.4k", label: "Mentors" },
              { value: "28k", label: "Conversations" },
            ].map((s) => (
              <div key={s.label} className="card-soft p-4 text-center">
                <p className="font-display text-xl font-semibold text-accent">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Illustrative figures in this demo build.
          </p>
        </section>

        <div className="flex gap-3 pb-2">
          <Link
            to="/privacy"
            className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-border text-sm font-semibold"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-border text-sm font-semibold"
          >
            Terms
          </Link>
        </div>
      </div>
    </Screen>
  );
}
