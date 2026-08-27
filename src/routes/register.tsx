import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState } from "@/lib/app-state";
import { AuthLayout, GoogleButton, TextField } from "@/components/pathfinder/AuthLayout";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — PathFinder" },
      {
        name: "description",
        content:
          "Join PathFinder as a young person or professional and start building meaningful career connections.",
      },
      { property: "og:title", content: "Create your account — PathFinder" },
      {
        property: "og:description",
        content: "Join PathFinder as a young person or a professional mentor.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signIn } = useAppState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout
      title="Create account"
      subtitle="Two minutes to set up. Free, always."
      backTo="/"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          signIn(name || undefined);
          navigate({ to: "/role-selection" });
        }}
      >
        <TextField label="Full name" value={name} onChange={setName} placeholder="Kieran Doyle" />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@school.ac.uk"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          hint="Use a mix of letters and numbers."
        />
        <button
          type="submit"
          className="h-13 w-full rounded-2xl bg-accent text-[15px] font-semibold text-accent-foreground shadow-lift transition-transform active:scale-[0.98]"
        >
          Continue
        </button>
      </form>

      <GoogleButton label="Sign up with Google" />

      <p className="pt-4 text-center text-[13px] text-muted-foreground">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-foreground">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
