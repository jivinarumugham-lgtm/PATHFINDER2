import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OnboardingShell({
  step,
  totalSteps,
  title,
  subtitle,
  onBack,
  onNext,
  nextLabel,
  children,
}: {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      <div className="navy-gradient px-5 pt-6 pb-10 text-navy-foreground">
        <div className="flex items-center gap-3">
          {step === 1 ? (
            <Link
              to="/role-selection"
              aria-label="Go back"
              className="flex size-9 items-center justify-center rounded-full bg-white/10"
            >
              <ArrowLeft className="size-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onBack}
              aria-label="Previous step"
              className="flex size-9 items-center justify-center rounded-full bg-white/10"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}
          <p className="text-xs font-medium text-white/70">
            Step {step} of {totalSteps}
          </p>
        </div>
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i < step ? "bg-teal" : "bg-white/20",
              )}
            />
          ))}
        </div>
        <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
        <p className="mt-1.5 text-sm text-white/70">{subtitle}</p>
      </div>

      <div key={step} className="animate-rise -mt-5 space-y-4 rounded-t-3xl bg-background px-5 pt-6">
        {children}
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 px-5 py-4 backdrop-blur">
        <button
          type="button"
          onClick={onNext}
          className="h-13 w-full rounded-2xl bg-accent text-[15px] font-semibold text-accent-foreground shadow-lift transition-transform active:scale-[0.98]"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

export function Field({
  label,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30"
      />
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function TextAreaField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-ink">{label}</span>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-card p-4 text-[15px] outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}

export function SelectField({
  label,
  options,
}: {
  label: string;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-ink">{label}</span>
      <select className="h-12 w-full appearance-none rounded-xl border border-input bg-card px-4 text-[15px] outline-none focus:border-accent focus:ring-2 focus:ring-ring/30">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-[13px] font-medium text-slate-ink">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "border-accent bg-teal-soft text-teal-foreground"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CheckRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description?: string | undefined;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="card-soft flex w-full items-start gap-3 p-4 text-left"
    >
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
          checked ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card",
        )}
      >
        {checked ? <Check className="size-3.5" /> : null}
      </span>
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </button>
  );
}

export function UploadCard({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-4">
      <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-lg">
        +
      </span>
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
    </div>
  );
}
