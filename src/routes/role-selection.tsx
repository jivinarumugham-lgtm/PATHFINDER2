import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import type { Role } from "@/lib/mock-data";

export const Route = createFileRoute("/role-selection")({
  head: () => ({
    meta: [
      { title: "Choose your role — PathFinder" },
      {
        name: "description",
        content: "Join PathFinder as a young person seeking opportunities or a professional mentor.",
      },
      { property: "og:title", content: "Choose your role — PathFinder" },
      {
        property: "og:description",
        content: "Young person or professional? Pick the experience built for you.",
      },
    ],
  }),
  component: RoleSelectionPage,
});

const options: {
  role: Role;
  label: string;
  copy: string;
  icon: typeof GraduationCap;
  to: string;
}[] = [
  {
    role: "youth",
    label: "Young person",
    copy: "I'm looking for work experience, mentoring and career opportunities.",
    icon: GraduationCap,
    to: "/onboarding/youth",
  },
  {
    role: "professional",
    label: "Professional",
    copy: "I want to mentor young people and create opportunities.",
    icon: Briefcase,
    to: "/onboarding/professional",
  },
];

function RoleSelectionPage() {
  const { setRole } = useAppState();
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen w-full max-w-md">
      <div className="navy-gradient px-6 pt-14 pb-12 text-navy-foreground">
        <h1 className="text-3xl font-semibold">How will you use PathFinder?</h1>
        <p className="mt-3 text-sm text-white/70">
          You can change this later in settings. It shapes your dashboard and who you can discover.
        </p>
      </div>
      <div className="animate-rise -mt-6 space-y-4 rounded-t-3xl bg-background px-5 pt-7 pb-12">
        {options.map(({ role, label, copy, icon: Icon, to }) => (
          <button
            key={role}
            type="button"
            onClick={() => {
              setRole(role);
              navigate({ to });
            }}
            className="card-soft w-full p-5 text-left transition-all hover:shadow-lift active:scale-[0.99]"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-soft text-teal-foreground">
              <Icon className="size-6" />
            </span>
            <p className="mt-4 text-lg font-semibold">{label}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{copy}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
              Continue <ArrowRight className="size-4" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
