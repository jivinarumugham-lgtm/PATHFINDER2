import { createFileRoute } from "@tanstack/react-router";
import { AppBar, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — PathFinder" },
      {
        name: "description",
        content:
          "The rules for using PathFinder: eligibility, expected conduct for students and mentors, and how accounts can be suspended.",
      },
      { property: "og:title", content: "Terms of use — PathFinder" },
      {
        property: "og:description",
        content: "Eligibility, conduct expectations and account rules for PathFinder members.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsScreen,
});

const sections = [
  {
    title: "Eligibility",
    body: "Students must be aged 14 or over and enrolled at a UK school, college or training provider. Professionals must hold a verifiable role at a registered organisation.",
  },
  {
    title: "Verification",
    body: "Professionals agree to employer verification. Misrepresenting your role or organisation results in immediate removal.",
  },
  {
    title: "Conduct",
    body: "Keep conversations career focused and inside PathFinder. Requests for personal contact details, money, or meetings without a guardian's knowledge are prohibited.",
  },
  {
    title: "Reporting",
    body: "Any member can report a message or profile. Reports are reviewed by the safeguarding team, usually within one working day.",
  },
  {
    title: "Opportunities",
    body: "Mentoring, shadowing and work experience are offered voluntarily by professionals. PathFinder does not guarantee placements, offers or employment.",
  },
  {
    title: "Suspension",
    body: "We may suspend or delete accounts that breach these terms, and will cooperate with schools and authorities where a young person is at risk.",
  },
];

function TermsScreen() {
  return (
    <Screen>
      <AppBar title="Terms of use" subtitle="Last updated September 2026" backTo="/settings" />

      <div className="-mt-4 space-y-5 rounded-t-3xl bg-background px-5 pt-6 pb-2">
        <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
          Demonstration wording for the PathFinder prototype. Not legal advice.
        </p>
        {sections.map((s) => (
          <section key={s.title}>
            <SectionTitle>{s.title}</SectionTitle>
            <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </Screen>
  );
}
