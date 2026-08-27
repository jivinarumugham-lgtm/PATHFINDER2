import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  backTo,
  children,
}: {
  title: string;
  subtitle: string;
  backTo: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md">
      <div className="navy-gradient px-6 pt-8 pb-12 text-navy-foreground">
        <Link
          to={backTo}
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full bg-white/10"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="mt-6 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-white/70">{subtitle}</p>
      </div>
      <div className="animate-rise -mt-6 rounded-t-3xl bg-background px-5 pt-7 pb-12">
        {children}
      </div>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-ink">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30"
      />
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <div className="pt-6">
      <div className="flex items-center gap-3 pb-5">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <button
        type="button"
        className="flex h-13 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card text-[15px] font-semibold transition-colors hover:bg-secondary"
      >
        <span className="font-display text-base">G</span>
        {label}
      </button>
    </div>
  );
}
