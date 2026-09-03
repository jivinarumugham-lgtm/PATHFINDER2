import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Star } from "lucide-react";
import { useState } from "react";
import { AppBar, Avatar, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { useAppState } from "@/lib/app-state";
import { outcomeOptions } from "@/lib/community-data";
import { professionals, youths } from "@/lib/mock-data";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share feedback — PathFinder" },
      {
        name: "description",
        content:
          "Rate a mentoring conversation, record the outcome and tell us whether you would recommend your match.",
      },
      { property: "og:title", content: "Share feedback — PathFinder" },
      {
        property: "og:description",
        content: "Rate your match, log the outcome and help us improve pairings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FeedbackScreen,
});

function FeedbackScreen() {
  const { connections, role, submitFeedback, feedbackEntries } = useAppState();
  const navigate = useNavigate();
  const accepted = connections.filter((c) => c.status === "accepted");

  const [connectionId, setConnectionId] = useState(accepted[0]?.id ?? "");
  const [rating, setRating] = useState(0);
  const [outcome, setOutcome] = useState(outcomeOptions[0]!);
  const [recommend, setRecommend] = useState(true);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);

  const nameFor = (id: string) => {
    const c = connections.find((x) => x.id === id);
    if (!c) return "your match";
    return role === "professional"
      ? (youths.find((y) => y.id === c.youthId)?.name ?? "Student")
      : (professionals.find((p) => p.id === c.professionalId)?.name ?? "Mentor");
  };

  if (done) {
    return (
      <Screen>
        <AppBar title="Thank you" subtitle="Your feedback shapes future matches" />
        <div className="-mt-4 space-y-4 rounded-t-3xl bg-background px-5 pt-10 text-center">
          <CheckCircle2 className="mx-auto size-12 text-accent" />
          <p className="text-base font-semibold">Feedback submitted</p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            You have shared {feedbackEntries.length} review
            {feedbackEntries.length === 1 ? "" : "s"}. Keep going to unlock the Feedback Champion
            badge.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: role === "professional" ? "/professional" : "/youth" })}
            className="h-12 w-full rounded-2xl bg-accent text-sm font-semibold text-accent-foreground"
          >
            Back to dashboard
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppBar title="Share feedback" subtitle="Takes less than a minute" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitFeedback({ connectionId, rating, outcome, recommend, comment });
          setDone(true);
        }}
        className="-mt-4 space-y-6 rounded-t-3xl bg-background px-5 pt-6"
      >
        <section>
          <SectionTitle>Which conversation?</SectionTitle>
          {accepted.length === 0 ? (
            <p className="card-soft p-4 text-[13px] text-muted-foreground">
              You have no accepted connections yet. Once a match is accepted you can review it here.
            </p>
          ) : (
            <ul className="space-y-3">
              {accepted.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setConnectionId(c.id)}
                    className={`card-soft flex w-full items-center gap-3 p-4 text-left transition-colors ${
                      connectionId === c.id ? "border-accent" : ""
                    }`}
                  >
                    <Avatar name={nameFor(c.id)} size="sm" tone="teal" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{nameFor(c.id)}</span>
                      <span className="block text-xs text-muted-foreground">{c.opportunity}</span>
                    </span>
                    {connectionId === c.id ? (
                      <CheckCircle2 className="size-4 shrink-0 text-accent" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <SectionTitle>How helpful was it?</SectionTitle>
          <div className="card-soft flex items-center justify-center gap-3 p-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star${n === 1 ? "" : "s"}`}
                onClick={() => setRating(n)}
              >
                <Star
                  className={`size-8 ${
                    n <= rating ? "fill-accent text-accent" : "text-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </section>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Outcome</span>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-accent"
          >
            {outcomeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        <section className="card-soft flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-semibold">Would you recommend this match?</p>
            <p className="text-xs text-muted-foreground">
              {recommend ? "Yes, recommend to others" : "Not this time"}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={recommend}
            aria-label="Toggle recommendation"
            onClick={() => setRecommend((v) => !v)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              recommend ? "bg-accent" : "bg-secondary"
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-card shadow transition-all ${
                recommend ? "left-6" : "left-1"
              }`}
            />
          </button>
        </section>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Anything else? (optional)</span>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What worked well, or what could be better?"
            className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none focus:border-accent"
          />
        </label>

        <button
          type="submit"
          disabled={rating === 0 || !connectionId}
          className="h-12 w-full rounded-2xl bg-accent text-sm font-semibold text-accent-foreground disabled:opacity-50"
        >
          Submit feedback
        </button>
      </form>
    </Screen>
  );
}
