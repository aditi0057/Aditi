import { useState, useEffect, createContext, useContext } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Aditi",
  location: "Gurugram, India",
  email: "aditi.17204@gmail.com",
  resumeUrl: "https://drive.google.com/your-resume-link-here",
  links: {
    linkedin: "https://www.linkedin.com/in/aditi-147b72213/",
    github: "https://github.com/aditi0057",
    leetcode: "https://leetcode.com/u/aditi057/",
    x: "https://x.com/girl_gottagrind",
  },
  identities: ["Backend Engineer", "AI Builder", "Consultant in Training", "Perpetual Learner"],
  tagline: "Growth begins where comfort ends.",
  availability: "Open to work that makes a dent.",
  about: [
    "I'm a final-year Engineer. I've built serverless backends serving 10K+ users, automated business workflows at one of the world's top consulting firms, and I'm only getting started.",
    "I'm on a journey — learning everything, building things that matter, and becoming someone people can count on. Not because I have it all figured out. Because I show up every day and figure out.",
  ],
  currentlyObsessing: [
    "AI agents, Automations & LangChain", "Silicon Valley funding landscape", "Options trading basics",
    "RAG architectures", "Indian startup ecosystem", "Databricks",
    "Open source LLMs", "Investment Matrix", 
  ],
  experience: [
    {
      company: "ZS Associates",
      role: "Business Technology Solution Associate Intern",
      period: "Feb 2026 – Present",
      bullets: [
        "Constructed ETL pipelines using PySpark & SQL on Azure Databricks and ADLS; collaborated with cross-functional teams to process 100K–300K records/day with 98–99% data accuracy across 3–5 datasets.",
        "Automated user access workflows using AI-driven agents resolving 15–25 tickets/week, cutting manual effort by 15–20%; debugged and troubleshot data ingestion issues across pipelines.",
        "Maintained clean, well-documented code standards through SSMS operations, ingestion validation, and cross-team collaboration workflows.",
      ],
      tags: ["PySpark", "SQL", "Azure Databricks", "ADLS", "AI Agents", "SSMS"],
    },
    {
      company: "Success Numbers",
      role: "Software Development Engineer Intern",
      period: "Jun 2025 – Jan 2026",
      bullets: [
        "Designed, developed, and tested a serverless backend (AWS CDK: Lambda, API Gateway, DynamoDB, S3) supporting 10K+ users, focusing on scalable architecture, code quality, and maintainability.",
        "Engineered an event-driven notification system (SNS → SQS → Lambda → SES/FCM), achieving 99.9% delivery reliability through systematic testing and validation workflows.",
        "Implemented SFCC backend solutions (OCAPI, Business Manager) accelerating content operations by 50%; participated in code reviews and technical discussions to uphold engineering standards.",
      ],
      tags: ["AWS CDK", "Lambda", "DynamoDB", "S3", "SNS", "SQS", "SFCC", "OCAPI"],
    },
    {
      company: "Schenck Rotec India Limited",
      role: "Software Engineering Intern Trainee",
      period: "Jul 2024 – Aug 2024",
      bullets: [
        "Collaborated with a cross-functional team to design, develop, and test a full-stack event management system; delivered calendar & gallery modules with Multer/Cloudinary RESTful API integration.",
      ],
      tags: ["Node.js", "REST APIs", "Cloudinary", "Multer", "Full Stack"],
    },
  ],
  projects: [
    {
      name: "EventM — Corporate Event Management Portal",
      problem: "No centralized tool for internal events, team celebrations, polls, and shared memories.",
      built: "Corporate portal with event management, team calendar, polls, moderated gallery, announcements, and an admin dashboard with role-based access.",
      impact: "One workspace — auto-surfacing birthdays, work anniversaries, and company events.",
      tags: ["Full Stack", "Role-Based Auth", "Admin Dashboard", "REST API"],
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      live: "https://github.com/aditi0057/Event_M",
      github: "https://github.com/aditi0057/Event_M", wip: false,
    },
    {
      name: "PayCraft",
      problem: "Payroll teams were spending hours manually processing Excel sheets — error-prone, slow, and painful.",
      built: "Automated .xlsx ingestion module with a data pipeline injecting parsed employee data into custom .docx templates.",
      impact: "95% reduction in payroll processing time",
      tags: ["Full Stack", "Backend"],
      tech: ["React", "Node.js", "Express.js", "ExcelJS", "Mammoth.js", "Tailwind"],
      live: "https://pay-craft.vercel.app/", github: "https://github.com/aditi0057/PayCraft", wip: false,
    },
    {
      name: "EcoSaver",
      problem: "Businesses had no fast way to evaluate the sustainability profile of their product catalogue.",
      built: "Sustainability analytics platform generating EcoScores for 1,000+ SKUs across 6+ environmental metrics.",
      impact: "90% reduction in report generation time",
      tags: ["Full Stack", "Analytics"],
      tech: ["React", "FastAPI", "Python", "Tailwind"],
      live: "https://eco-saver-ten.vercel.app/", github: "https://github.com/aditi0057/EcoSaver", wip: false,
    },
    {
      name: "RAG Application",
      problem: "Most knowledge bases are static and unsearchable by meaning — only by keyword.",
      built: "Retrieval-augmented generation app for intelligent document querying using LangChain and vector embeddings.",
      impact: "In progress — dropping soon",
      tags: ["AI", "Backend"],
      tech: ["LangChain", "ChromaDB", "Python", "Claude API"],
      live: null, github: null, wip: true,
    },
  ],
  skills: [
    { name: "Python", level: 3 }, { name: "JavaScript", level: 3 }, { name: "SQL", level: 3 },
    { name: "React", level: 3 }, { name: "Node.js", level: 3 }, { name: "REST APIs", level: 3 }, { name: "Git", level: 3 },
    { name: "TypeScript", level: 2 }, { name: "C++", level: 2 }, { name: "FastAPI", level: 2 },
    { name: "PySpark", level: 2 }, { name: "AWS", level: 3 }, { name: "Azure Databricks", level: 2 },
    { name: "Docker", level: 2 }, { name: "PostgreSQL", level: 2 },
    { name: "Java", level: 1 }, { name: "Spring Boot", level: 1 }, { name: "LangChain", level: 1 },
  ],
  unfinished: [
    { category: "Learning", item: "AWS Certified Developer – Associate", completed: false },
    { category: "Learning", item: "Databricks Gen AI Certification", completed: true },
    { category: "Learning", item: "LangChain & RAG architectures", completed: false },
    { category: "Learning", item: "Options trading fundamentals", completed: false },
    { category: "Learning", item: "Guitar — still bad, still going", completed: true },
    { category: "Building", item: "RAG application (LangChain + ChromaDB)", completed: false },
    { category: "Building", item: "Finance Portfolio", completed: false },
    { category: "Building", item: "First blog post", completed: false },
    { category: "Competing", item: "ICPC regional rounds", completed: false },
    { category: "Competing", item: "Kaggle — first competition", completed: false },
    { category: "Competing", item: "BCG Case Cracker", completed: false },
    { category: "Going", item: "San Francisco — someday soon", completed: false },
    { category: "Going", item: "Trekking", completed: true },
    { category: "Going", item: "First real investment", completed: true },
    { category: "Learning", item: "5 km Run", completed: true },
    { category: "Building", item: "Networking Everyday", completed: true },
  ],
  growth: [
    { area: "Physical", commitment: "Gym every morning before work. Non-negotiable. It's the foundation everything else is built on." },
    { area: "Financial", commitment: "Studying markets, reading every day. Building the knowledge base before I touch real money. Patience is the strategy." },
    { area: "Creative", commitment: "Learning guitar badly and consistently. Writing blogs in my head — putting them on paper soon. The craft takes time." },
    { area: "Adventurous", commitment: "Travel to places that surprise me. Light adventure, real memories. Heights scare me — I go anyway." },
    { area: "Intellectual", commitment: "Never the clueless person in the room. Reading about AI, markets, geopolitics, startups. Forming opinions worth sharing." },
    { area: "Social", commitment: "Better conversations, deeper relationships. Listening more, speaking with intent. Becoming someone worth remembering." },
  ],
  achievements: [
    { label: "Merit Scholarship", detail: "₹1.5L · 3 consecutive years · 2022–2025", description: "Awarded for academic excellence across three consecutive years — not once, not twice. Consistency is a skill too." },
    { label: "CGPA 9.23 / 10", detail: "Thapar Institute of Engineering & Technology", description: "Electronics & Computer Engineering. The kind of degree that teaches you how to think, not just what to build." },
    { label: "Myntra HackerRamp: WeForShe 2024", detail: "Top 4% · 30,000+ contestants nationwide", description: "Competed against 30,000+ teams nationally and placed in the top 4%. Built fast, thought sharp, delivered." },
    { label: "Joint Secretary, ECON Club", detail: "Technical Lead · Operations Head · 2+ years", description: "Led a 10-member tech team for 2+ years — built websites for high-visibility events like Wolf of Dalal Street and Strategem, each impacting 500+ participants. Simultaneously ran operations for a 3-day IPL-UEFA Auction, managing two parallel finance-themed events without dropping a ball. Took the stage 10+ times to run workshops on tech and financial literacy for 100+ students. This wasn't a title. It was real ownership." },
  ],
  techRadar: [
    { topic: "AI Agents", opinion: "The most underestimated shift happening right now. Not chatbots — actual autonomous work replacing workflows." },
    { topic: "Open Source LLMs", opinion: "The gap with closed models is closing fast. Llama, Mistral — this changes who controls AI." },
    { topic: "RAG over Fine-tuning", opinion: "For most business problems, RAG wins. Fine-tuning is expensive, brittle, and slow to update." },
    { topic: "Indian Startup Ecosystem", opinion: "Finally building for India, not copying Silicon Valley. Most interesting it's ever been." },
    { topic: "Serverless at Scale", opinion: "AWS Lambda changed how I think about infrastructure. Events-first architecture is deeply underrated." },
    { topic: "The Compute Wars", opinion: "Whoever controls chips controls the future. NVIDIA's moat is real but more fragile than it looks." },
  ],
};

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const DARK = {
  bg: "#080808", bgCard: "#0c0a07", bgCardHover: "#100e0a",
  border: "#141414", borderSubtle: "#0f0f0f", borderAccent: "#2a2118",
  text: "#e8e0d0", textMuted: "#666", textDim: "#444", textFaint: "#373030",
  accent: "#c9b99a", accentBorder: "#45403b", accentBg: "#0b0906",
  navBg: "rgba(8,8,8,0.95)", scrollThumb: "#1a1a1a",
};
const LIGHT = {
  bg: "#faf8f5", bgCard: "#f3ede6", bgCardHover: "#ede5db",
  border: "#e0d4c4", borderSubtle: "#e8e0d4", borderAccent: "#c9b99a",
  text: "#1a1410", textMuted: "#7a6e62", textDim: "#a09080", textFaint: "#c8bfb0",
  accent: "#8a6a3a", accentBorder: "#c9b99a", accentBg: "#f5ede0",
  navBg: "rgba(250,248,245,0.95)", scrollThumb: "#d0c4b4",
};

const ThemeCtx = createContext({ t: DARK, isDark: true });
const useT = () => useContext(ThemeCtx);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const PAGES = ["Home", "Work", "Me", "Thinking", "Contact"];
const FILTER_TAGS = ["All", "AI", "Backend", "Full Stack", "Analytics"];

function useTypewriter(words, speed = 75, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    let timer;
    if (!deleting && charIdx < word.length) timer = setTimeout(() => setCharIdx(c => c + 1), speed);
    else if (!deleting && charIdx === word.length) timer = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0) timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  const { t } = useT();
  return (
    <div style={{ paddingTop: "4px" }}>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.15em", color: t.accent, textTransform: "uppercase", marginBottom: "8px" }}>{children}</p>
      <div style={{ width: "32px", height: "1px", background: t.accent }} />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, toggleTheme }) {
  const { t, isDark } = useT();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: t.navBg, backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${t.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 3rem", height: "54px",
    }}>
      <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", outline: "none" }}>
        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "20px", color: t.text }}>A.</span>
      </button>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {PAGES.map(p => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
            color: page === p ? t.accent : t.textDim, transition: "color 0.3s",
            padding: "0", position: "relative", display: "flex", flexDirection: "column", alignItems: "center",
            outline: "none", boxShadow: "none", WebkitTapHighlightColor: "transparent",
          }}
            onMouseEnter={e => { if (page !== p) e.currentTarget.style.color = t.textMuted; }}
            onMouseLeave={e => { if (page !== p) e.currentTarget.style.color = t.textDim; }}
          >
            {p}
            <span style={{ display: "block", width: page === p ? "100%" : "0%", height: "1px", background: t.accent, transition: "width 0.35s ease", position: "absolute", bottom: "-18px" }} />
          </button>
        ))}
        <button onClick={toggleTheme} style={{
          background: "none", border: `1px solid ${t.border}`, cursor: "pointer", outline: "none",
          padding: "5px 10px", fontFamily: "'DM Mono',monospace", fontSize: "11px",
          color: t.textDim, letterSpacing: "0.08em", transition: "all 0.2s", marginLeft: "0.5rem",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textDim; }}
        >
          {isDark ? "☀" : "◑"}
        </button>
      </div>
    </nav>
  );
}

// ─── PAGE: HOME ──────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const { t } = useT();
  const identity = useTypewriter(DATA.identities);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 3rem" }}>
      <div style={{ maxWidth: "680px" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.15em", color: t.accent, marginBottom: "1.75rem", textTransform: "uppercase" }}>
          {DATA.location} · {DATA.availability}
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(64px,9vw,108px)", color: t.text, margin: "0 0 1rem", lineHeight: 0.95, fontWeight: 400, letterSpacing: "-0.02em" }}>
          {DATA.name}
        </h1>
        <div style={{ height: "48px", margin: "1.5rem 0" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(14px,2vw,18px)", color: t.textMuted, letterSpacing: "0.03em" }}>
            {identity}
            <span style={{ borderRight: `2px solid ${t.accent}`, marginLeft: "2px", animation: "blink 1s step-end infinite" }} />
          </span>
        </div>
        <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(16px,1.8vw,20px)", color: t.textFaint, fontStyle: "italic", marginBottom: "2.5rem", lineHeight: 1.6, maxWidth: "520px" }}>
          "{DATA.tagline}"
        </p>

        {/* CTAs — right under tagline */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("Work")} style={{
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", background: "none", color: t.accent,
            border: `1px solid ${t.accent}`, borderRadius: 0, padding: "11px 26px", cursor: "pointer", transition: "all 0.25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.color = t.bg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = t.accent; }}
          >
            See My Work →
          </button>
          <button onClick={() => setPage("Me")} style={{
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", background: "none", color: t.textDim,
            border: `1px solid ${t.border}`, borderRadius: 0, padding: "11px 26px", cursor: "pointer", transition: "all 0.25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = t.textMuted; e.currentTarget.style.borderColor = t.textMuted; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.textDim; e.currentTarget.style.borderColor = t.border; }}
          >
            Who I Am
          </button>
          <a href={DATA.resumeUrl} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", color: t.textDim, textDecoration: "none", transition: "color 0.2s", padding: "11px 4px",
          }}
            onMouseEnter={e => e.currentTarget.style.color = t.accent}
            onMouseLeave={e => e.currentTarget.style.color = t.textDim}
          >
            Resume ↗
          </a>
        </div>
      </div>

      {/* Bottom-left — CTAs */}
      {/* <div style={{ position: "fixed", bottom: "2rem", left: "3rem", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("Work")} style={{
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", background: "none", color: t.accent,
            border: `1px solid ${t.accent}`, borderRadius: 0, padding: "11px 26px", cursor: "pointer", transition: "all 0.25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.color = t.bg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = t.accent; }}
          >
            See My Work →
          </button>
          <button onClick={() => setPage("Me")} style={{
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", background: "none", color: t.textDim,
            border: `1px solid ${t.border}`, borderRadius: 0, padding: "11px 26px", cursor: "pointer", transition: "all 0.25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = t.textMuted; e.currentTarget.style.borderColor = t.textMuted; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.textDim; e.currentTarget.style.borderColor = t.border; }}
          >
            Who I Am
          </button>
          <a href={DATA.resumeUrl} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", color: t.textDim, textDecoration: "none", transition: "color 0.2s", padding: "11px 4px",
          }}
            onMouseEnter={e => e.currentTarget.style.color = t.accent}
            onMouseLeave={e => e.currentTarget.style.color = t.textDim}
          >
            Resume ↗
          </a>
      </div> */}

      {/* Bottom-right — Currently at + socials */}
      <div style={{ position: "fixed", bottom: "3rem", right: "3rem", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.25rem" }}>
        <div style={{ borderRight: `2px solid ${t.accentBorder}`, paddingRight: "1.5rem", textAlign: "right" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.14em", color: t.textDim, textTransform: "uppercase", marginBottom: "3px" }}>Currently at</p>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "20px", color: t.text, margin: "0 0 2px", fontWeight: 400 }}>ZS Associates</p>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: t.textMuted, margin: 0,marginBottom: 25, letterSpacing: "0.02em" }}>Business Technology Solution Associate Intern</p>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {/* <a href={DATA.resumeUrl} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.1em",
            textTransform: "uppercase", color: t.accent, textDecoration: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Resume ↗
          </a> */}
          <span style={{ width: "4px", height: "14px", background: t.border }} />
          {Object.entries(DATA.links).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Mono',monospace", fontSize: "14px", letterSpacing: "0.1em",
              textTransform: "uppercase", color: t.textDim, textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = t.accent}
              onMouseLeave={e => e.currentTarget.style.color = t.textDim}
            >
              {key === "x" ? "X" : key}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: WORK ───────────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  const { t, isDark } = useT();
  const [hovered, setHovered] = useState(false);
  const cardBg = hovered ? t.bgCardHover : t.bgCard;
  const hoverOverlay = isDark ? "rgba(8,8,8,0.82)" : "rgba(250,248,245,0.88)";

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: "relative", overflow: "hidden", border: `1px solid ${hovered ? t.accentBorder : t.border}`,
      cursor: "default", minHeight: "280px", transition: "border-color 0.3s, background 0.2s", background: cardBg,
    }}>
      {p.live && (
        <div style={{ position: "absolute", inset: 0, transition: "opacity 0.4s", opacity: hovered ? 1 : 0, pointerEvents: "none" }}>
          <iframe src={p.live} title={p.name} style={{ width: "200%", height: "200%", transform: "scale(0.5)", transformOrigin: "top left", border: "none", pointerEvents: "none" }} sandbox="allow-scripts allow-same-origin" />
          <div style={{ position: "absolute", inset: 0, background: hoverOverlay }} />
        </div>
      )}
      {p.wip && (
        <div style={{ position: "absolute", inset: 0, opacity: hovered ? 0.6 : 0, transition: "opacity 0.4s",
          background: isDark ? "repeating-linear-gradient(45deg,#0d0d0d,#0d0d0d 10px,#080808 10px,#080808 20px)"
          : "repeating-linear-gradient(45deg,#ede5db,#ede5db 10px,#f3ede6 10px,#f3ede6 20px)" }} />
      )}

      {/* Default */}
      <div style={{ position: "relative", padding: "2rem", transition: "opacity 0.3s", opacity: hovered ? 0 : 1 }}>
        {p.wip && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.15em", color: t.accent, border: `1px solid ${t.accentBorder}`, padding: "3px 8px", display: "inline-block", marginBottom: "1rem" }}>IN PROGRESS</span>}
        <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "26px", color: t.text, margin: "0 0 0.75rem", fontWeight: 400 }}>{p.name}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textMuted, margin: "0 0 1.5rem", lineHeight: 1.6 }}>{p.problem}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {p.tech.map((t2, j) => <span key={j} style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textDim, border: `1px solid ${t.border}`, padding: "3px 8px" }}>{t2}</span>)}
        </div>
      </div>

      {/* Hover case study */}
      <div style={{ position: "absolute", inset: 0, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity 0.35s" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.12em", color: t.accent, textTransform: "uppercase", marginBottom: "0.4rem" }}>The Problem</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textMuted, marginBottom: "1.1rem", lineHeight: 1.5 }}>{p.problem}</p>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.12em", color: t.accent, textTransform: "uppercase", marginBottom: "0.4rem" }}>What I Built</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textMuted, marginBottom: "1.1rem", lineHeight: 1.5 }}>{p.built}</p>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: t.text, marginBottom: "1.25rem" }}>↑ {p.impact}</p>
        {!p.wip && (
          <div style={{ display: "flex", gap: "1rem" }}>
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: t.accent, textDecoration: "none", letterSpacing: "0.08em" }}>LIVE ↗</a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: t.textMuted, textDecoration: "none", letterSpacing: "0.08em" }}>GITHUB ↗</a>}
          </div>
        )}
      </div>
    </div>
  );
}

function WorkPage() {
  const { t } = useT();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? DATA.projects : DATA.projects.filter(p => p.tags.includes(filter));

  return (
    <div style={{ padding: "5rem 3rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Experience */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <SectionLabel>Experience</SectionLabel>
        <div>
          {DATA.experience.map((exp, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${t.borderSubtle}`, paddingBottom: "2.5rem", marginBottom: "2.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "22px", color: t.text, margin: "0 0 6px", fontWeight: 400 }}>{exp.company}</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textDim, margin: 0, letterSpacing: "0.06em" }}>{exp.role} · {exp.period}</p>
              </div>
              {exp.bullets.map((b, j) => (
                <div key={j} style={{ display: "flex", gap: "12px", marginBottom: "0.75rem" }}>
                  <span style={{ color: t.accent, flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: "11px", marginTop: "3px" }}>→</span>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: t.textMuted, margin: 0, lineHeight: 1.7 }}>{b}</p>
                </div>
              ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.25rem" }}>
                {exp.tags.map((tag, j) => <span key={j} style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textDim, border: `1px solid ${t.border}`, padding: "3px 10px" }}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <div>
          <SectionLabel>Projects</SectionLabel>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "6px" }}>
            {FILTER_TAGS.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.08em",
                textTransform: "uppercase", background: "none", cursor: "pointer", textAlign: "left",
                border: "none", color: filter === tag ? t.accent : t.textDim, padding: "4px 0", transition: "color 0.2s", outline: "none",
              }}>
                {filter === tag ? "→ " : "  "}{tag}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1px", background: t.border }}>
          {filtered.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem" }}>
        <SectionLabel>Skills</SectionLabel>
        <div>
          {[3, 2, 1].map(level => {
            const labels = { 3: "Strong", 2: "Proficient", 1: "Learning" };
            return (
              <div key={level} style={{ marginBottom: "2rem" }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.14em", color: t.textDim, textTransform: "uppercase", marginBottom: "0.75rem" }}>{labels[level]}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {DATA.skills.filter(s => s.level === level).map((s, i) => (
                    <span key={i} style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: level === 3 ? "13px" : level === 2 ? "11px" : "10px",
                      color: level === 3 ? t.text : level === 2 ? t.textMuted : t.textDim,
                      border: `1px solid ${level === 3 ? t.accentBorder : t.border}`,
                      padding: level === 3 ? "8px 16px" : level === 2 ? "6px 12px" : "5px 10px",
                      background: level === 3 ? t.accentBg : "none",
                    }}>{s.name}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: ME ─────────────────────────────────────────────────────────────────
function MePage() {
  const { t } = useT();
  return (
    <div style={{ padding: "5rem 3rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* About */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <SectionLabel>About</SectionLabel>
        <div>
          {DATA.about.map((p, i) => (
            <p key={i} style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: i === 0 ? "clamp(18px,2.2vw,24px)" : "clamp(15px,1.8vw,19px)",
              color: i === 0 ? t.text : t.textMuted, lineHeight: 1.75, marginBottom: "1.5rem", fontWeight: 400,
            }}>{p}</p>
          ))}
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Currently obsessing over</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {DATA.currentlyObsessing.map((item, i) => (
                <span key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: t.accent, border: `1px solid ${t.accentBorder}`, padding: "6px 14px", background: t.accentBg }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Building Myself */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <div>
          <SectionLabel>Building Myself</SectionLabel>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "13px", color: t.textDim, fontStyle: "italic", lineHeight: 1.7, marginTop: "1.25rem" }}>
            Same way I build software — deliberately, consistently, always raising the bar.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: t.border }}>
          {DATA.growth.map((item, i) => (
            <div key={i} style={{ background: t.bgCard, padding: "2rem", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = t.bgCardHover}
              onMouseLeave={e => e.currentTarget.style.background = t.bgCard}
            >
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.14em", color: t.accent, textTransform: "uppercase", marginBottom: "0.75rem" }}>{item.area}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textMuted, margin: 0, lineHeight: 1.7 }}>{item.commitment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem" }}>
        <SectionLabel>Achievements</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: t.border }}>
          {DATA.achievements.map((a, i) => (
            <div key={i} style={{ background: t.bgCard, padding: "2rem", transition: "background 0.2s, border-color 0.2s", borderLeft: "2px solid transparent" }}
              onMouseEnter={e => { e.currentTarget.style.background = t.bgCardHover; e.currentTarget.style.borderLeftColor = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = t.bgCard; e.currentTarget.style.borderLeftColor = "transparent"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "18px", color: t.text, margin: 0, fontWeight: 400 }}>{a.label}</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.accent, margin: 0, letterSpacing: "0.06em" }}>{a.detail}</p>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textMuted, margin: 0, lineHeight: 1.7 }}>{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: THINKING ───────────────────────────────────────────────────────────
function ThinkingPage() {
  const { t } = useT();
  const completed = DATA.unfinished.filter(i => i.completed);
  const inProgress = DATA.unfinished.filter(i => !i.completed);
  const categories = [...new Set(inProgress.map(i => i.category))];

  return (
    <div style={{ padding: "5rem 3rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* The List */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <div>
          <SectionLabel>The List</SectionLabel>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "13px", color: t.textDim, fontStyle: "italic", lineHeight: 1.7, marginTop: "1.25rem", marginBottom: "1.5rem" }}>
            I set the bar high, finish it, then set it higher. This is what's on the board right now.
          </p>
          <div style={{ border: `1px solid ${t.border}`, padding: "1rem", background: t.bgCard }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textDim }}>IN PROGRESS</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: t.text }}>{inProgress.length}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textDim }}>COMPLETED</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: t.accent }}>{completed.length}</span>
            </div>
            <div style={{ height: "2px", background: t.border, marginTop: "0.5rem" }}>
              <div style={{ height: "100%", background: t.accent, width: `${(completed.length / DATA.unfinished.length) * 100}%`, transition: "width 0.5s" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.12em", color: t.textDim, textTransform: "uppercase", marginBottom: "1.25rem", borderBottom: `1px solid ${t.borderSubtle}`, paddingBottom: "0.75rem" }}>In Progress</p>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: t.accentBorder, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{cat}</p>
                {inProgress.filter(i => i.category === cat).map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "0.6rem", alignItems: "start" }}>
                    <span style={{ color: t.border, fontFamily: "'DM Mono',monospace", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>○</span>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textMuted, margin: 0, lineHeight: 1.5 }}>{item.item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.12em", color: t.textDim, textTransform: "uppercase", marginBottom: "1.25rem", borderBottom: `1px solid ${t.borderSubtle}`, paddingBottom: "0.75rem" }}>Completed</p>
            {completed.length === 0
              ? <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "13px", color: t.textFaint, fontStyle: "italic" }}>Nothing here yet. Give it time.</p>
              : completed.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "0.6rem", alignItems: "start" }}>
                  <span style={{ color: t.accent, fontFamily: "'DM Mono',monospace", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.textDim, margin: 0, lineHeight: 1.5, textDecoration: "line-through" }}>{item.item}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Tech Radar */}
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem" }}>
        <div>
          <SectionLabel>Tech Radar</SectionLabel>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "13px", color: t.textDim, fontStyle: "italic", lineHeight: 1.7, marginTop: "1.25rem" }}>
            What I'm watching. What I think. Opinions subject to revision.
          </p>
        </div>
        <div>
          {DATA.techRadar.map((item, i) => (
            <div key={i} style={{ padding: "1.5rem 0", borderBottom: `1px solid ${t.borderSubtle}` }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: t.accent, margin: "0 0 0.5rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.topic}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: t.textMuted, margin: 0, lineHeight: 1.65 }}>{item.opinion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: CONTACT ─────────────────────────────────────────────────────────────
function ContactPage() {
  const { t } = useT();
  return (
    <div style={{ minHeight: "calc(100vh - 54px)", display: "flex", alignItems: "center", padding: "5rem 3rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", alignItems: "start" }}>
        <SectionLabel>Contact</SectionLabel>
        <div>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,5vw,52px)", color: t.accent, margin: "0 0 0.25rem", fontWeight: 400, lineHeight: 1.2 }}>
            If something here excited you —
          </p>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,5vw,52px)", color: t.text, margin: "0 0 3.5rem", fontWeight: 400, fontStyle: "italic", lineHeight: 1.2 }}>
            let's talk.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: t.border, maxWidth: "560px", marginBottom: "3rem" }}>
            {[
              { label: "Email", value: DATA.email, href: `mailto:${DATA.email}` },
              { label: "LinkedIn", value: "Connect", href: DATA.links.linkedin },
              { label: "GitHub", value: "See my code", href: DATA.links.github },
              { label: "X / Twitter", value: "Follow along", href: DATA.links.x },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{
                background: t.bgCard, padding: "1.5rem", textDecoration: "none", transition: "background 0.2s", display: "block",
              }}
                onMouseEnter={e => e.currentTarget.style.background = t.bgCardHover}
                onMouseLeave={e => e.currentTarget.style.background = t.bgCard}
              >
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.14em", color: t.textDim, textTransform: "uppercase", margin: "0 0 6px" }}>{c.label}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: t.accent, margin: 0 }}>{c.value} ↗</p>
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: t.textFaint, letterSpacing: "0.08em" }}>
            DESIGNED & BUILT BY ADITI · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [page, setPage] = useState("Home");
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(d => !d);
  const t = isDark ? DARK : LIGHT;

  const renderPage = () => {
    switch (page) {
      case "Home": return <HomePage setPage={setPage} />;
      case "Work": return <WorkPage />;
      case "Me": return <MePage />;
      case "Thinking": return <ThinkingPage />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <ThemeCtx.Provider value={{ t, isDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: ${t.bg}; color: ${t.text}; -webkit-font-smoothing: antialiased; overflow-x: hidden; transition: background 0.3s, color 0.3s; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; }
        button { outline: none; } button:focus { outline: none; } button:focus-visible { outline: none; }
      `}</style>
      <Nav page={page} setPage={setPage} toggleTheme={toggleTheme} />
      <main style={{ paddingTop: "54px", minHeight: "100vh", background: t.bg, transition: "background 0.3s" }}>
        {renderPage()}
      </main>
    </ThemeCtx.Provider>
  );
}
