import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathFinder — UK Careers & Mentoring for Young People" },
      {
        name: "description",
        content:
          "PathFinder connects UK students with verified professionals for work experience, mentoring, internships and career introductions.",
      },
      { property: "og:title", content: "PathFinder — UK Careers & Mentoring for Young People" },
      {
        property: "og:description",
        content:
          "Connect with verified professionals for work experience, mentoring and career introductions.",
      },
    ],
  }),
  component: Welcome,
});

const highlights = [
  {
    icon: BadgeCheck,
    title: "Verified professionals",
    body: "Every mentor is checked through LinkedIn or a work email.",
  },
  {
    icon: Compass,
    title: "Real opportunities",
    body: "Coffee chats, CV reviews, shadowing days and internships.",
  },
  {
    icon: Sparkles,
    title: "Progress you can see",
    body: "Career readiness score, badges and logged outcomes.",
  },
];

function Welcome() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md">
      <section className="navy-gradient relative overflow-hidden px-6 pt-16 pb-14 text-navy-foreground">
        <div className="absolute -top-24 -right-16 size-56 rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute -bottom-20 -left-12 size-48 rounded-full bg-teal/15 blur-3xl" />
        <div className="relative animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <span className="size-1.5 rounded-full bg-teal" />
            UK social mobility platform
          </span>
          <h1 className="mt-6 text-4xl leading-tight font-semibold">
            Find the person who opens the door.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            PathFinder connects young people across the UK with professionals offering work
            experience, mentoring and honest career guidance.
          </p>
        </div>
      </section>

      <section className="space-y-3 px-5 py-6">
        {highlights.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-soft flex gap-3 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-foreground">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3 px-5 pb-12">
        <Link
          to="/register"
          className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-accent text-[15px] font-semibold text-accent-foreground shadow-lift transition-transform active:scale-[0.98]"
        >
          Create your account <ArrowRight className="size-4" />
        </Link>
        <Link
          to="/login"
          className="flex h-13 items-center justify-center rounded-2xl border border-border bg-card text-[15px] font-semibold transition-colors hover:bg-secondary"
        >
          I already have an account
        </Link>
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Free for students, schools, sixth forms and colleges.
        </p>
      </section>
    </div>
  );
}
