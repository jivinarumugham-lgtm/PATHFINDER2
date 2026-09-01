import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState } from "@/lib/app-state";
import { opportunityTypes, sectors } from "@/lib/mock-data";
import {
  ChipGroup,
  CheckRow,
  Field,
  OnboardingShell,
  SelectField,
  TextAreaField,
  UploadCard,
} from "@/components/pathfinder/OnboardingShell";

export const Route = createFileRoute("/onboarding/youth")({
  head: () => ({
    meta: [
      { title: "Young person onboarding — PathFinder" },
      {
        name: "description",
        content:
          "Set up your PathFinder profile: education, career interests, showcase and safeguarding preferences.",
      },
      { property: "og:title", content: "Young person onboarding — PathFinder" },
      {
        property: "og:description",
        content: "Tell us about your education, interests and the opportunities you want.",
      },
    ],
  }),
  component: YouthOnboarding,
});

const TOTAL = 6;

function YouthOnboarding() {
  const [step, setStep] = useState(1);
  const [opportunities, setOpportunities] = useState<string[]>(["Work Experience", "Mentoring"]);
  const [skills, setSkills] = useState<string[]>(["Problem Solving"]);
  const [workStyle, setWorkStyle] = useState<string[]>(["Hybrid"]);
  const [consents, setConsents] = useState<string[]>([]);
  const { completeOnboarding } = useAppState();
  const navigate = useNavigate();

  const toggle = (setter: (fn: (prev: string[]) => string[]) => void) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const meta = [
    { title: "Personal details", subtitle: "The basics so schools and mentors know who you are." },
    { title: "Education", subtitle: "Where you study and what you're working towards." },
    { title: "Career interests", subtitle: "What you want to do, and what you're good at." },
    { title: "Showcase yourself", subtitle: "Give professionals a reason to say yes." },
    { title: "Preferences", subtitle: "How and where you'd like to take part." },
    { title: "Safety & consent", subtitle: "Safeguarding comes first on PathFinder." },
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
        navigate({ to: "/youth" });
      }}
    >
      {step === 1 ? (
        <>
          <UploadCard title="Profile photo" hint="A clear headshot works best" />
          <Field label="Full name" placeholder="Kieran Doyle" />
          <Field label="Email" type="email" placeholder="you@school.ac.uk" />
          <Field label="Phone number" placeholder="07700 900123" />
          <Field label="Date of birth" type="date" />
          <SelectField
            label="Gender (optional)"
            options={["Female", "Male", "Non-binary", "Prefer not to say"]}
          />
          <Field label="Town / city" placeholder="Liverpool" />
          <Field label="County" placeholder="Merseyside" />
          <Field label="Postcode" placeholder="L1 8JQ" />
          <SelectField label="Country" options={["England", "Scotland", "Wales", "Northern Ireland"]} />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <SelectField
            label="Education type"
            options={[
              "Secondary School",
              "Sixth Form",
              "College",
              "University",
              "Apprenticeship",
              "Other",
            ]}
          />
          <Field label="School / college / university" placeholder="St Mary's Sixth Form" />
          <SelectField
            label="Current academic year"
            options={[
              "Year 10",
              "Year 11",
              "Year 12",
              "Year 13",
              "University Year 1",
              "University Year 2",
              "University Year 3",
              "University Year 4",
            ]}
          />
          <ChipGroup
            label="Qualification types"
            options={["GCSE", "A Levels", "BTEC", "T Levels", "Other"]}
            selected={skills}
            onToggle={toggle(setSkills)}
          />
          <TextAreaField label="Current studies" placeholder="Maths, Computer Science, Physics" />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <SelectField label="Career sector" options={sectors} />
          <Field label="Preferred industry" placeholder="Fintech" />
          <Field label="Dream job" placeholder="Software Engineer" />
          <TextAreaField label="Skills and strengths" placeholder="React, Python, public speaking" />
          <TextAreaField label="Career goals" placeholder="Land a degree apprenticeship in 2027" />
          <SelectField
            label="Personality type (optional)"
            options={["Analytical", "Creative", "Organiser", "Communicator", "Builder"]}
          />
          <ChipGroup
            label="Preferred opportunity types"
            options={[
              "Work Experience",
              "Internship",
              "Mentoring",
              "Networking",
              "Career Talk",
              "Job Shadowing",
              "Insight Day",
              "Graduate Scheme",
            ]}
            selected={opportunities}
            onToggle={toggle(setOpportunities)}
          />
        </>
      ) : null}

      {step === 4 ? (
        <>
          <UploadCard title="30 second video introduction" hint="Optional, but doubles responses" />
          <Field label="Portfolio link" placeholder="github.com/yourname" />
          <Field label="Personal website or Behance" placeholder="behance.net/yourname" />
          <UploadCard title="CV upload" hint="PDF, up to 5MB" />
          <TextAreaField label="Short biography" placeholder="Two or three sentences about you" />
          <Field label="Interests" placeholder="Football, robotics, music production" />
          <Field label="Languages" placeholder="English, Polish" />
        </>
      ) : null}

      {step === 5 ? (
        <>
          <SelectField
            label="Maximum commute"
            options={["Up to 30 minutes", "Up to 1 hour", "Up to 90 minutes", "Anywhere in the UK"]}
          />
          <ChipGroup
            label="Ways of working"
            options={["Remote", "Hybrid", "In Person"]}
            selected={workStyle}
            onToggle={toggle(setWorkStyle)}
          />
          <ChipGroup
            label="Availability"
            options={["Weekday evenings", "Weekends", "Half term", "Summer holidays"]}
            selected={workStyle}
            onToggle={toggle(setWorkStyle)}
          />
          <ChipGroup
            label="Opportunities you'd accept today"
            options={opportunityTypes}
            selected={opportunities}
            onToggle={toggle(setOpportunities)}
          />
        </>
      ) : null}

      {step === 6 ? (
        <>
          <Field label="Parent / guardian name (if under 18)" placeholder="Full name" />
          <Field label="Parent / guardian contact" placeholder="Email or phone" />
          <Field label="Emergency contact" placeholder="Name and number" />
          <div className="space-y-3 pt-1">
            {[
              { label: "I accept the Terms of Use" },
              { label: "I accept the Privacy Policy" },
              {
                label: "I consent to matching",
                description: "PathFinder can suggest relevant professionals to me.",
              },
              {
                label: "Share my contact details only after mutual acceptance",
                description: "Nothing is revealed until both sides accept a connection.",
              },
              { label: "I confirm my age is accurate" },
            ].map(({ label, description }) => (
              <CheckRow
                key={label}
                label={label}
                description={description}
                checked={consents.includes(label)}
                onToggle={() => toggle(setConsents)(label)}
              />
            ))}
          </div>
        </>
      ) : null}
      <div className="h-6" />
    </OnboardingShell>
  );
}
