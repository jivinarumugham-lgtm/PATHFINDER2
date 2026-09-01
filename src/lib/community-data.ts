export type EventItem = {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  format: "Online" | "In person";
  sector: string;
};

export const events: EventItem[] = [
  {
    id: "e1",
    title: "Law Careers Q&A: routes without a legal family",
    host: "Amara Okafor · Linklaters",
    date: "Thu 10 Sep",
    time: "18:00 – 19:00",
    format: "Online",
    sector: "Law",
  },
  {
    id: "e2",
    title: "Insight morning: life as a software engineer",
    host: "Daniel Mensah · Monzo",
    date: "Sat 19 Sep",
    time: "10:00 – 12:00",
    format: "In person",
    sector: "Technology",
  },
  {
    id: "e3",
    title: "CV clinic for Year 12 and 13",
    host: "PathFinder mentors",
    date: "Tue 29 Sep",
    time: "17:30 – 18:30",
    format: "Online",
    sector: "All sectors",
  },
];

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "request" | "message" | "badge" | "event";
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Connection accepted",
    body: "Amara Okafor accepted your request for a coffee chat.",
    time: "12 min ago",
    kind: "request",
  },
  {
    id: "n2",
    title: "New message",
    body: "Daniel Mensah: happy to look over your CV this week.",
    time: "2 hours ago",
    kind: "message",
  },
  {
    id: "n3",
    title: "Badge earned",
    body: "You unlocked First Connection. Two more to reach Career Explorer.",
    time: "Yesterday",
    kind: "badge",
  },
  {
    id: "n4",
    title: "Event reminder",
    body: "Law Careers Q&A starts on Thursday at 18:00.",
    time: "2 days ago",
    kind: "event",
  },
];

export type ForumPost = {
  id: string;
  author: string;
  role: "Young person" | "Professional";
  topic: string;
  title: string;
  body: string;
  replies: number;
  time: string;
};

export const forumPosts: ForumPost[] = [
  {
    id: "f1",
    author: "Aisha R.",
    role: "Young person",
    topic: "Applications",
    title: "How do you write a personal statement with no work experience?",
    body: "I'm applying for a degree apprenticeship and everything I read assumes internships. What counts as experience?",
    replies: 14,
    time: "3 hours ago",
  },
  {
    id: "f2",
    author: "Priya Shah",
    role: "Professional",
    topic: "Interviews",
    title: "Three questions I always ask as an interviewer",
    body: "Prepare a story for each: a time you solved a problem, a time you worked in a team, and why this company.",
    replies: 22,
    time: "Yesterday",
  },
  {
    id: "f3",
    author: "Kieran D.",
    role: "Young person",
    topic: "Confidence",
    title: "Nervous about my first coffee chat — any advice?",
    body: "I've got a call booked with a solicitor next week and I don't want to waste her time.",
    replies: 9,
    time: "2 days ago",
  },
];

export const forumTopics = ["All", "Applications", "Interviews", "Confidence"];

export type Resource = {
  id: string;
  title: string;
  summary: string;
  type: "Guide" | "Template" | "Video" | "Checklist";
  minutes: number;
};

export const resources: Resource[] = [
  {
    id: "r1",
    title: "CV template for students with no paid work",
    summary: "A one-page layout that leads with projects, volunteering and school responsibilities.",
    type: "Template",
    minutes: 5,
  },
  {
    id: "r2",
    title: "How to email a professional you've never met",
    summary: "Structure, tone and a worked example you can adapt in two minutes.",
    type: "Guide",
    minutes: 6,
  },
  {
    id: "r3",
    title: "Interview practice: the STAR method",
    summary: "Turn any experience into a clear answer with situation, task, action, result.",
    type: "Video",
    minutes: 8,
  },
  {
    id: "r4",
    title: "Before your first work experience day",
    summary: "What to bring, what to ask and how to follow up so it leads somewhere.",
    type: "Checklist",
    minutes: 4,
  },
];

export const outcomeOptions = [
  "Gained new insight",
  "Improved my CV",
  "Practised interviewing",
  "Offered work experience",
  "Ongoing mentoring agreed",
  "No clear outcome yet",
];

export const outsideOpportunityTypes = [
  "Work experience",
  "Volunteering",
  "Part-time job",
  "Competition or hackathon",
  "Course or certificate",
  "School enrichment",
];
