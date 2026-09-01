import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Award, BadgeCheck, Briefcase, MapPin } from "lucide-react";
import { AppBar, Avatar, Pill, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { icebreakers, professionals, type MicroOpportunity } from "@/lib/mock-data";

export const Route = createFileRoute("/professionals/$id")({
  head: () => ({
    meta: [
      { title: "Professional profile — PathFinder" },
      {
        name: "description",
        content:
          "See a mentor's route into their industry, the opportunities they offer and send a connection request.",
      },
      { property: "og:title", content: "Professional profile — PathFinder" },
      {
        property: "og:description",
        content: "A mentor's experience, opportunities offered and how to connect.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfessionalProfilePage,
});

function ProfessionalProfilePage() {
  const { id } = Route.useParams();
  const pro = professionals.find((p) => p.id === id);
  const { requestConnection } = useAppState();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<MicroOpportunity | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!pro) {
    return (
      <Screen>
        <AppBar title="Not found" backTo="/discovery" />
        <p className="p-5 text-sm text-muted-foreground">This professional no longer exists.</p>
      </Screen>
    );
  }

  const chosen = opportunity ?? pro.opportunities[0]!;

  return (
    <Screen>
      <AppBar title={pro.name} subtitle={`${pro.jobTitle} · ${pro.company}`} backTo="/discovery" />

      <div className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6">
        <section className="card-soft flex items-center gap-4 p-5">
          <Avatar name={pro.name} size="lg" />
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-base font-semibold">
              {pro.name}
              {pro.verified ? <BadgeCheck className="size-4 text-accent" /> : null}
            </p>
            <p className="text-xs text-muted-foreground">
              {pro.jobTitle} · {pro.company}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" /> {pro.location}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill tone="teal">{pro.industry}</Pill>
              <Pill>{pro.yearsExperience} yrs</Pill>
              <Pill tone="outline">{pro.availability}</Pill>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>About</SectionTitle>
          <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
            {pro.bio}
          </p>
        </section>

        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {pro.skills.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Achievements</SectionTitle>
          <div className="card-soft divide-y divide-border">
            {pro.achievements.map((a) => (
              <p key={a} className="flex items-center gap-2 p-4 text-sm">
                <Award className="size-4 text-accent" /> {a}
              </p>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Choose an opportunity</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {pro.opportunities.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOpportunity(o)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  chosen === o
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <span className="flex items-center gap-1">
                  <Briefcase className="size-3" /> {o}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Smart icebreakers</SectionTitle>
          <div className="space-y-2">
            {icebreakers.map((i) => (
              <button
                key={i.title}
                type="button"
                onClick={() => setMessage(i.text)}
                className="card-soft block w-full p-4 text-left"
              >
                <p className="text-sm font-semibold">{i.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{i.text}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle>Your message</SectionTitle>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Introduce yourself and be specific about what would help."
            className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
          />
          <button
            type="button"
            disabled={message.trim().length === 0 || sent}
            onClick={() => {
              requestConnection(pro.id, message.trim(), chosen);
              setSent(true);
              navigate({ to: "/requests" });
            }}
            className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {sent ? "Request sent" : `Send ${chosen} request`}
          </button>
        </section>
      </div>
    </Screen>
  );
}
