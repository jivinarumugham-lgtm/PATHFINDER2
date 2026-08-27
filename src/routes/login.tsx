import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState } from "@/lib/app-state";
import { AuthLayout, GoogleButton, TextField } from "@/components/pathfinder/AuthLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — PathFinder" },
      { name: "description", content: "Sign in to PathFinder to continue your career journey." },
      { property: "og:title", content: "Sign in — PathFinder" },
      { property: "og:description", content: "Sign in to continue your PathFinder journey." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAppState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("kieran.doyle@stmarys.sch.uk");
  const [password, setPassword] = useState("pathfinder");

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      backTo="/"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
          navigate({ to: "/role-selection" });
        }}
      >
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
          placeholder="••••••••"
        />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-[13px] font-medium text-muted-foreground">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="h-13 w-full rounded-2xl bg-accent text-[15px] font-semibold text-accent-foreground shadow-lift transition-transform active:scale-[0.98]"
        >
          Sign in
        </button>
      </form>

      <GoogleButton label="Continue with Google" />

      <p className="pt-4 text-center text-[13px] text-muted-foreground">
        New to PathFinder?{" "}
        <Link to="/register" className="font-semibold text-foreground">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
