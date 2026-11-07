export const profile = {
  name: "Yashwanth A M",
  location: "Bengaluru, Karnataka, India",
  phone: "+91 63636 26713",
  email: "yashwanthyashum2003@gmail.com",
  summary:
    "Recent B.Tech graduate in Information Technology with hands-on experience developing full-stack web and offline-first mobile applications, REST APIs, dashboards, and AI-enabled solutions.",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Programming", items: ["Java", "JavaScript (ES6+)", "SQL", "Dart"] },
  {
    group: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "React.js",
      "Bootstrap",
      "Tailwind CSS",
      "React Router",
      "Responsive Design",
    ],
  },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { group: "Databases", items: ["MySQL", "SQLite (Drift)", "Firebase Firestore", "Supabase"] },
  { group: "Mobile & State", items: ["Flutter", "Riverpod"] },
  {
    group: "AI & Tools",
    items: [
      "Generative AI",
      "Prompt Engineering",
      "AI-Assisted Dev",
      "Git",
      "GitHub",
      "VS Code",
      "Eclipse",
      "Figma",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  liveUrl?: string;
  githubUrl?: string;
  stack: string[];
  points: string[];
};

export const projects: Project[] = [
  {
    id: "studyquest",
    title: "StudyQuest",
    tagline: "AI-powered exam preparation platform",
    liveUrl: "https://studyquestsss.netlify.app/",
    githubUrl: "https://github.com/YASHWANTH025/STUDYQUEST",
    stack: ["React.js", "JavaScript", "Vite", "Tailwind CSS", "React Router", "Context API"],
    points: [
      "Built a responsive learning platform with interactive quizzes, study materials, and an integrated AI tutor.",
      "Created reusable frontend components and multi-page navigation with React Router.",
      "Used Context API and LocalStorage for session persistence, bookmarking, quiz history, and progress tracking.",
      "Designed and tested responsive learning workflows across screen sizes.",
    ],
  },
  {
    id: "portal",
    title: "Annual Report Portal",
    tagline: "Full-stack university reporting system",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL", "Chart.js"],
    points: [
      "Departmental data collection, validation, and management.",
      "Role-based authentication with backend validation.",
      "Search and filtering across university records.",
      "Chart.js dashboard visualizations.",
      "Automated PDF and Excel report generation.",
    ],
  },
  {
    id: "resumeai",
    title: "ResumeAI",
    tagline: "AI-powered resume analyzer",
    stack: ["React.js", "JavaScript", "Node.js", "Express.js", "REST APIs"],
    points: [
      "Compares resumes against target job roles.",
      "Identifies matched skills and missing keywords.",
      "Skill-gap analysis with ATS-style scoring.",
      "Prompt-based recommendations through REST APIs.",
      "Insights dashboard presenting analysis results.",
    ],
  },
  {
    id: "insight",
    title: "Insight Tracker",
    tagline: "Offline-first expense & habit tracker",
    stack: ["Flutter", "Dart", "Drift", "SQLite", "Riverpod", "Supabase"],
    points: [
      "Expense logging with category-based filtering, search, and CSV export.",
      "Habit and streak tracking with daily completion insights.",
      "Spending insights: monthly totals, top categories, and six-month trends.",
      "Supabase authentication with cloud sync and Row Level Security.",
      "Fully offline-first — local data stays available without a connection.",
    ],
  },
];

export const experience = [
  {
    role: "Full Stack Java Developer Trainee",
    org: "TAP Academy",
    period: "Jul 2026 – Present",
    certificate: null,
    points: [
      "Building practical skills in Core Java, Spring Boot, SQL, frontend development, and REST API integration.",
      "Practising debugging, database operations, and application development through technical assignments.",
    ],
  },
  {
    role: "AI + Sustainability Virtual Intern",
    org: "IBM SkillsBuild / AICTE",
    period: "2025",
    certificate: null,
    points: [
      "Analyzed AI-based problem statements and developed structured solutions through project-based activities.",
      "Created technical documentation, workflow diagrams, and solution proposals.",
      "Applied AI concepts to explore sustainability challenges and communicate potential solutions.",
    ],
  },
  {
    role: "Industry Immersion Program",
    org: "Alliance School of Advanced Computing, Alliance University",
    period: "May 2025 – Jul 2025",
    certificate: "/industry-immersion-program-2025.pdf",
    points: ["Successfully completed the Industry Immersion Program."],
  },
];

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    by: "Oracle University",
    year: "2025",
    certificate: "/oracle-certified-foundations-associate.pdf",
  },
  { name: "React Front-End Development", by: "Coursera", year: "2025", certificate: null },
  { name: "Flutter Development", by: "Infosys", year: "2025", certificate: null },
  {
    name: "Strategic Communication for Sustainable Development",
    by: "NPTEL, IIT Kharagpur",
    year: "2025",
    certificate: "/strategic-communication-sustainable-development.pdf",
  },
];

export const education = {
  school: "Alliance College of Engineering and Design, Alliance University",
  degree: "B.Tech in Information Technology",
  period: "2022–2026",
  cgpa: "7.2 / 10.0",
};

export const achievements = [
  {
    title: "University Kabaddi Tournament – First Prize (2025), competing against 30+ teams",
    certificate: null,
  },
  {
    title: "Global Employability Test 2025 — 90 percentile",
    certificate: "/global-employability-test-2025.pdf",
  },
];
