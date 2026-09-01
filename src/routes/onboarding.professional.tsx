import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { opportunityTypes, sectors } from "@/lib/mock-data";
import {
  ChipGroup,
  Field,
  OnboardingShell,
  SelectField,
  TextAreaField,
  UploadCard,
} from "@/components/pathfinder/OnboardingShell";

export const Route = createFileRoute("/onboarding/professional")({
  head: () => ({
    meta: [
      { title: "Professional onboarding — PathFinder" },
      {
        name: "description",
        content:
          "Set up your professional PathFinder profile, get verified and choose the opportunities you can offer.",
      },
      { property: "og:title", content: "Professional onboarding — PathFinder" },
      {
        property: "og:description",
        content: "Get verified and choose the opportunities you can offer young people.",
      },
    ],
  }),
  component: ProfessionalOnboarding,
});

const TOTAL = 4;

function ProfessionalOnboarding() {
  const [step, setStep] = useState(1);
  const [offers, setOffers] = useState<string[]>(["Coffee Chat", "CV Review"]);
  const [availability, setAvailability] = useState<string[]>(["Remote"]);
  const [verified, setVerified] = useState(false);
  const { completeOnboarding } = useAppState();
  const navigate = useNavigate();

  const toggle = (setter: (fn: (prev: string[]) => string[]) => void) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const meta = [
    { title: "Personal details", subtitle: "How young people will recognise you." },
    { title: "Professional details", subtitle: "Your role, industry and experience." },
    { title: "Verification", subtitle: "Verified mentors get 3x more requests." },
    { title: "Opportunities offered", subtitle: "Choose what you can realistically give." },
  ][step - 1];

  return (
    <OnboardingShell
      step={step}
      totalSteps={TOTAL}
      title={meta?.title ?? ""}
      subtitle={meta?.subtitle ?? ""}
      onBack={() => setStep((s) => Math.max(1, s - 1))}
      nextLabel={step === TOTAL ? "Finish and open dashboard" : "Continue"}
      onNext={() => {
        if (step < TOTAL) {
          setStep((s) => s + 1);
          return;
        }
        completeOnboarding();
        navigate({ to: "/professional" });
      }}
    >
      {step === 1 ? (
        <>
          <UploadCard title="Profile photo" hint="Professional headshot" />
          <Field label="Full name" placeholder="Amara Okafor" />
          <Field label="Work email" type="email" placeholder="you@company.com" />
          <Field label="Phone" placeholder="07700 900456" />
          <Field label="Town / city" placeholder="London" />
          <Field label="County" placeholder="Greater London" />
          <Field label="Postcode" placeholder="EC2A 4NE" />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Field label="Company" placeholder="Linklaters" />
          <SelectField label="Industry" options={sectors} />
          <Field label="Department" placeholder="Corporate" />
          <Field label="Job title" placeholder="Corporate Solicitor" />
          <SelectField
            label="Years of experience"
            options={["1-2", "3-5", "6-10", "11-15", "16+"]}
          />
          <TextAreaField
            label="Professional biography"
            placeholder="Your route in, and how you can help."
          />
          <Field label="LinkedIn" placeholder="linkedin.com/in/yourname" />
          <Field label="Company website" placeholder="company.com" />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Field label="LinkedIn profile URL" placeholder="linkedin.com/in/yourname" />
          <p className="text-center text-xs text-muted-foreground">or</p>
          <Field label="Work email for verification" type="email" placeholder="you@company.com" />
          <button
            type="button"
            onClick={() => setVerified(true)}
            className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            {verified ? "Verification complete" : "Verify me"}
          </button>
          {verified ? (
            <div className="card-soft animate-rise flex items-center gap-3 p-4">
              <BadgeCheck className="size-6 text-accent" />
              <div>
                <p className="text-sm font-semibold">Verified Professional</p>
                <p className="text-xs text-muted-foreground">
                  This badge now appears on your profile and cards.
                </p>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {step === 4 ? (
        <>
          <ChipGroup
            label="Opportunities you can offer"
            options={[
              ...opportunityTypes,
              "Career Talks",
              "Work Experience",
              "Graduate Opportunities",
            ]}
            selected={offers}
            onToggle={toggle(setOffers)}
          />
          <SelectField
            label="Maximum students at once"
            options={["1", "2", "3", "5", "10+"]}
          />
          <ChipGroup
            label="Availability"
            options={["Remote", "Hybrid", "Office"]}
            selected={availability}
            onToggle={toggle(setAvailability)}
          />
          <SelectField
            label="Travel radius"
            options={["Local only", "Up to 25 miles", "Up to 50 miles", "Nationwide"]}
          />
        </>
      ) : null}
      <div className="h-6" />
    </OnboardingShell>
  );
}
