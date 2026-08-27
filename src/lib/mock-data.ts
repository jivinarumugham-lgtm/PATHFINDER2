export type Role = "youth" | "professional";

export type MicroOpportunity =
  | "Coffee Chat"
  | "CV Review"
  | "Interview Practice"
  | "Networking"
  | "Job Shadow"
  | "Internship"
  | "Mentoring"
  | "Career Talk";

export type Professional = {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  industry: string;
  location: string;
  verified: boolean;
  yearsExperience: number;
  bio: string;
  opportunities: MicroOpportunity[];
  skills: string[];
  achievements: string[];
  availability: "Remote" | "Hybrid" | "Office";
};

export type Youth = {
  id: string;
  name: string;
  educationType: string;
  school: string;
  academicYear: string;
  location: string;
  dreamJob: string;
  sector: string;
  bio: string;
  skills: string[];
  subjects: string[];
  hasVideoIntro: boolean;
  portfolio?: string;
  projects: string[];
};

export const professionals: Professional[] = [
  {
    id: "p1",
    name: "Amara Okafor",
    jobTitle: "Corporate Solicitor",
    company: "Linklaters",
    industry: "Law",
    location: "London, Greater London",
    verified: true,
    yearsExperience: 9,
    bio: "First in my family to go to university. I now help young people navigate routes into commercial law — training contracts, vac schemes and everything in between.",
    opportunities: ["Coffee Chat", "CV Review", "Interview Practice", "Job Shadow"],
    skills: ["Commercial Law", "Applications", "Interviewing", "Networking"],
    achievements: ["Social Mobility Champion 2025", "Mentored 42 students"],
    availability: "Hybrid",
  },
  {
    id: "p2",
    name: "Daniel Whitmore",
    jobTitle: "Senior Software Engineer",
    company: "Monzo",
    industry: "Technology",
    location: "Manchester, Greater Manchester",
    verified: true,
    yearsExperience: 7,
    bio: "Apprenticeship route into tech. Happy to review portfolios, run mock technical interviews and talk about breaking in without a CS degree.",
    opportunities: ["Mentoring", "CV Review", "Internship", "Career Talk"],
    skills: ["TypeScript", "System Design", "Apprenticeships", "Portfolio Review"],
    achievements: ["Runs Code Club Manchester", "Hired 12 apprentices"],
    availability: "Remote",
  },
  {
    id: "p3",
    name: "Priya Raman",
    jobTitle: "Investment Analyst",
    company: "Schroders",
    industry: "Finance",
    location: "Birmingham, West Midlands",
    verified: true,
    yearsExperience: 5,
    bio: "I demystify finance for state school students — spring weeks, insight days and how to actually read a job spec.",
    opportunities: ["Coffee Chat", "Networking", "Interview Practice"],
    skills: ["Equity Research", "Excel", "Assessment Centres"],
    achievements: ["Founded sixth form finance society"],
    availability: "Office",
  },
  {
    id: "p4",
    name: "Tom Bradshaw",
    jobTitle: "Consultant Paediatrician",
    company: "NHS Leeds Trust",
    industry: "Healthcare",
    location: "Leeds, West Yorkshire",
    verified: false,
    yearsExperience: 14,
    bio: "Medicine applications are a maze. I offer shadowing days and honest guidance on UCAT, personal statements and interviews.",
    opportunities: ["Job Shadow", "Mentoring", "Career Talk"],
    skills: ["Medical Applications", "UCAT", "Work Experience"],
    achievements: ["Widening participation lead"],
    availability: "Office",
  },
  {
    id: "p5",
    name: "Sofia Marchetti",
    jobTitle: "Creative Director",
    company: "Wieden+Kennedy",
    industry: "Creative & Media",
    location: "Bristol, Somerset",
    verified: true,
    yearsExperience: 11,
    bio: "Portfolios beat grades in the creative industries. I review work, give feedback and open doors to studio placements.",
    opportunities: ["CV Review", "Coffee Chat", "Internship", "Networking"],
    skills: ["Art Direction", "Portfolio Craft", "Brand Strategy"],
    achievements: ["D&AD New Blood judge"],
    availability: "Hybrid",
  },
];

export const youths: Youth[] = [
  {
    id: "y1",
    name: "Kieran Doyle",
    educationType: "Sixth Form",
    school: "St Mary's Sixth Form, Liverpool",
    academicYear: "Year 12",
    location: "Liverpool, Merseyside",
    dreamJob: "Software Engineer",
    sector: "Technology",
    bio: "Self-taught developer building small apps for local charities. Looking for a first taste of a real engineering team.",
    skills: ["React", "Python", "Problem Solving"],
    subjects: ["A Level Maths", "A Level Computer Science", "A Level Physics"],
    hasVideoIntro: true,
    portfolio: "github.com/kierandoyle",
    projects: ["Foodbank stock tracker", "School timetable app"],
  },
  {
    id: "y2",
    name: "Aisha Bello",
    educationType: "University",
    school: "University of Nottingham",
    academicYear: "University Year 2",
    location: "Nottingham, Nottinghamshire",
    dreamJob: "Corporate Solicitor",
    sector: "Law",
    bio: "Law student and debating captain. Applying for vacation schemes and would value a mock interview.",
    skills: ["Legal Research", "Public Speaking", "Negotiation"],
    subjects: ["LLB Law"],
    hasVideoIntro: true,
    projects: ["Street Law volunteering", "Mooting semi-finalist"],
  },
  {
    id: "y3",
    name: "Callum Reid",
    educationType: "College",
    school: "Gateshead College",
    academicYear: "Year 13",
    location: "Gateshead, Tyne and Wear",
    dreamJob: "Motion Designer",
    sector: "Creative & Media",
    bio: "BTEC digital media student. I animate everything — would love studio feedback on my reel.",
    skills: ["After Effects", "Illustration", "Storyboarding"],
    subjects: ["BTEC Digital Media"],
    hasVideoIntro: false,
    portfolio: "behance.net/callumreid",
    projects: ["Charity explainer animation", "Local band music video"],
  },
  {
    id: "y4",
    name: "Hannah Price",
    educationType: "Secondary School",
    school: "Ysgol Bryn Alyn, Wrexham",
    academicYear: "Year 11",
    location: "Wrexham, Clwyd",
    dreamJob: "Paediatrician",
    sector: "Healthcare",
    bio: "First in my family aiming for medicine. Volunteering at a care home and hoping for a shadowing day.",
    skills: ["Communication", "Biology", "Teamwork"],
    subjects: ["GCSE Triple Science", "GCSE Maths"],
    hasVideoIntro: false,
    projects: ["Care home volunteer, 80 hours"],
  },
];

export type ConnectionStatus = "pending" | "accepted" | "declined";

export type Connection = {
  id: string;
  professionalId: string;
  youthId: string;
  status: ConnectionStatus;
  message: string;
  sentAt: string;
  opportunity: MicroOpportunity;
};

export const seedConnections: Connection[] = [
  {
    id: "c1",
    professionalId: "p1",
    youthId: "y2",
    status: "accepted",
    message: "Hi Amara — I'm applying for vacation schemes and would love a mock interview.",
    sentAt: "2 days ago",
    opportunity: "Interview Practice",
  },
  {
    id: "c2",
    professionalId: "p2",
    youthId: "y1",
    status: "pending",
    message: "Hi Daniel, could I ask you three questions about apprenticeships in tech?",
    sentAt: "5 hours ago",
    opportunity: "Mentoring",
  },
  {
    id: "c3",
    professionalId: "p5",
    youthId: "y3",
    status: "pending",
    message: "Hi Sofia, would you review my motion reel? I'm applying for studio placements.",
    sentAt: "Yesterday",
    opportunity: "CV Review",
  },
];

export type ChatMessage = {
  id: string;
  connectionId: string;
  from: "me" | "them";
  text: string;
  time: string;
};

export const seedMessages: ChatMessage[] = [
  {
    id: "m1",
    connectionId: "c1",
    from: "them",
    text: "Hi! Happy to help — what are you applying for?",
    time: "09:14",
  },
  {
    id: "m2",
    connectionId: "c1",
    from: "me",
    text: "Vacation schemes at three City firms. Applications close in November.",
    time: "09:20",
  },
  {
    id: "m3",
    connectionId: "c1",
    from: "them",
    text: "Perfect. Send your draft answers over and let's book 30 minutes next week.",
    time: "09:22",
  },
];

export const icebreakers = [
  {
    title: "Ask Three Questions",
    text: "Hi! Thank you for connecting. Could I ask three quick questions about your route into the industry, a skill you'd prioritise at my age, and one thing you'd do differently?",
  },
  {
    title: "Request Coffee Chat",
    text: "Hi! Would you be open to a 20 minute virtual coffee chat in the next couple of weeks? I'd love to hear how you got started.",
  },
  {
    title: "Enquire About Job Shadowing",
    text: "Hi! I'm exploring your industry and wondered whether a shadowing day might be possible, even for a few hours during half term?",
  },
];

export const badges = [
  { name: "Profile Perfectionist", earned: true },
  { name: "Networking Starter", earned: true },
  { name: "First Connection", earned: true },
  { name: "First Mentor", earned: false },
  { name: "Career Explorer", earned: false },
  { name: "Feedback Champion", earned: false },
  { name: "Opportunity Seeker", earned: false },
  { name: "Internship Achiever", earned: false },
];

export const opportunityTypes: MicroOpportunity[] = [
  "Coffee Chat",
  "CV Review",
  "Interview Practice",
  "Networking",
  "Job Shadow",
  "Internship",
  "Mentoring",
  "Career Talk",
];

export const sectors = [
  "Technology",
  "Law",
  "Finance",
  "Healthcare",
  "Creative & Media",
  "Engineering",
  "Education",
  "Public Sector",
];

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}
