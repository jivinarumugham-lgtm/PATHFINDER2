import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MailCheck } from "lucide-react";
import { AuthLayout, TextField } from "@/components/pathfinder/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — PathFinder" },
      { name: "description", content: "Request a PathFinder password reset link by email." },
      { property: "og:title", content: "Reset your password — PathFinder" },
      { property: "og:description", content: "Request a password reset link by email." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We'll email you a secure reset link."
      backTo="/login"
    >
      {sent ? (
        <div className="card-soft animate-rise p-6 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-teal-soft text-teal-foreground">
            <MailCheck className="size-6" />
          </span>
          <p className="mt-4 text-sm font-semibold">Check your inbox</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            If an account exists for {email || "that address"}, a reset link is on its way.
          </p>
          <Link
            to="/login"
            className="mt-5 flex h-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@school.ac.uk"
          />
          <button
            type="submit"
            className="h-13 w-full rounded-2xl bg-accent text-[15px] font-semibold text-accent-foreground shadow-lift"
          >
            Send reset link
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
