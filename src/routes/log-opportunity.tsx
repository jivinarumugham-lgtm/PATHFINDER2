import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppBar, Screen } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { outsideOpportunityTypes } from "@/lib/community-data";

export const Route = createFileRoute("/log-opportunity")({
  head: () => ({
    meta: [
      { title: "Log an outside opportunity — PathFinder" },
      {
        name: "description",
        content:
          "Record work experience, volunteering or courses you found outside PathFinder so your progress stays complete.",
      },
      { property: "og:title", content: "Log an outside opportunity — PathFinder" },
      {
        property: "og:description",
        content: "Add experience you gained elsewhere to your career record.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LogOpportunity,
});

const inputClass =
  "h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-accent";

function LogOpportunity() {
  const { addLoggedOpportunity } = useAppState();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [type, setType] = useState(outsideOpportunityTypes[0]!);
  const [date, setDate] = useState("");
  const [reflection, setReflection] = useState("");

  return (
    <Screen>
      <AppBar
        title="Log an opportunity"
        subtitle="Experience you found outside PathFinder"
        backTo="/progress"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLoggedOpportunity({ title, organisation, type, date, reflection });
          navigate({ to: "/progress" });
        }}
        className="-mt-4 space-y-4 rounded-t-3xl bg-background px-5 pt-6"
      >
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">What did you do?</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Two-week placement in a design studio"
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Organisation</span>
          <input
            required
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder="e.g. Southwark Council"
            className={inputClass}
          />
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Type</legend>
          <div className="flex flex-wrap gap-2">
            {outsideOpportunityTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  type === t
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">When</span>
          <input
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g. Aug 2026"
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">What did you learn?</span>
          <textarea
            rows={4}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="One or two sentences you can reuse in applications."
            className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none focus:border-accent"
          />
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-2xl bg-accent text-sm font-semibold text-accent-foreground"
        >
          Save to my progress
        </button>
      </form>
    </Screen>
  );
}
