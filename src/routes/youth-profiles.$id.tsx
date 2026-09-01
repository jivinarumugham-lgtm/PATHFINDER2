import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Link2, MapPin, Video } from "lucide-react";
import { AppBar, Avatar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { youths } from "@/lib/mock-data";

export const Route = createFileRoute("/youth-profiles/$id")({
  head: () => ({
    meta: [
      { title: "Student profile — PathFinder" },
      {
        name: "description",
        content:
          "Read a young person's ambitions, subjects, skills and projects before offering an opportunity.",
      },
      { property: "og:title", content: "Student profile — PathFinder" },
      {
        property: "og:description",
        content: "A young person's ambitions, subjects, skills and projects.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: YouthProfilePage,
});

function YouthProfilePage() {
  const { id } = Route.useParams();
  const youth = youths.find((y) => y.id === id);

  if (!youth) {
    return (
      <Screen>
        <AppBar title="Not found" backTo="/discovery" />
        <p className="p-5 text-sm text-muted-foreground">This profile no longer exists.</p>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppBar title={youth.name} subtitle={youth.academicYear} backTo="/discovery" />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft flex items-center gap-4 p-5">
          <Avatar name={youth.name} size="lg" tone="teal" />
          <div className="min-w-0">
            <p className="text-base font-semibold">{youth.name}</p>
            <p className="text-xs text-muted-foreground">{youth.school}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" /> {youth.location}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill tone="teal">{youth.sector}</Pill>
              <Pill>{youth.educationType}</Pill>
              {youth.hasVideoIntro ? (
                <Pill tone="outline">
                  <Video className="size-3" /> Video intro
                </Pill>
              ) : null}
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Ambition</SectionTitle>
          <p className="card-soft flex items-center gap-2 p-4 text-sm">
            <GraduationCap className="size-4 text-accent" /> {youth.dreamJob}
          </p>
        </section>

        <section>
          <SectionTitle>About</SectionTitle>
          <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
            {youth.bio}
          </p>
        </section>

        <section>
          <SectionTitle>Subjects</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {youth.subjects.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {youth.skills.map((s) => (
              <Pill key={s} tone="teal">
                {s}
              </Pill>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="card-soft divide-y divide-border">
            {youth.projects.map((p) => (
              <p key={p} className="p-4 text-sm">
                {p}
              </p>
            ))}
          </div>
        </section>

        {youth.portfolio ? (
          <section>
            <SectionTitle>Portfolio</SectionTitle>
            <p className="card-soft flex items-center gap-2 p-4 text-sm">
              <Link2 className="size-4 text-accent" /> {youth.portfolio}
            </p>
          </section>
        ) : null}
      </div>
    </Screen>
  );
}
