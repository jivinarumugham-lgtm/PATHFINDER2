import { createFileRoute } from "@tanstack/react-router";
import { AppBar, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — PathFinder" },
      {
        name: "description",
        content:
          "How PathFinder collects, uses and protects student and professional data, including safeguarding and UK GDPR rights.",
      },
      { property: "og:title", content: "Privacy policy — PathFinder" },
      {
        property: "og:description",
        content: "What data we hold, why we hold it and the rights you have over it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyScreen,
});

const sections = [
  {
    title: "What we collect",
    body: "Account details (name, email, year group or job title), the profile information you choose to publish, connection requests, and messages exchanged inside PathFinder.",
  },
  {
    title: "Why we use it",
    body: "To match students with relevant professionals, to keep conversations safe, and to measure whether mentoring leads to real outcomes such as work experience or offers.",
  },
  {
    title: "Safeguarding",
    body: "Messages between an under-18 account and a professional are retained and may be reviewed by our safeguarding team when a report is raised. We never sell message content.",
  },
  {
    title: "Sharing",
    body: "Professionals see the profile fields you publish. Schools may see aggregate progress, never private messages. Verification checks are carried out with employers, not third-party advertisers.",
  },
  {
    title: "Your rights",
    body: "Under UK GDPR you can request a copy of your data, correct it, delete your account, or object to processing. Requests are handled within 30 days via privacy@pathfinder.example.",
  },
  {
    title: "Retention",
    body: "Account data is kept while your account is active and for 12 months afterwards. Safeguarding records tied to a report are kept for six years.",
  },
];

function PrivacyScreen() {
  return (
    <Screen>
      <AppBar title="Privacy policy" subtitle="Last updated September 2026" backTo="/settings" />

      <div className="-mt-4 space-y-5 rounded-t-3xl bg-background px-5 pt-6 pb-2">
        <p className="card-soft p-4 text-[13px] leading-relaxed text-muted-foreground">
          This is demonstration wording for the PathFinder prototype and is not legal advice.
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
