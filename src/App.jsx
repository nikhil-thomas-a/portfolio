import { useState } from "react";

const tools = [
  {
    emoji: "⚙️",
    category: "Google Workspace",
    title: "Startup Ops Toolkit",
    description:
      "Google Sheets templates and Apps Script automations for early-stage teams. Multi Mail Shooter, Document Generator, and more — copy, paste, run.",
    stats: [
      { value: "3", label: "Live tools" },
      { value: "2+", label: "Coming soon" },
      { value: "0", label: "Cost" },
    ],
    link: "https://nikhil-thomas-a.github.io/startup-ops-toolkit/",
    linkLabel: "Open Ops Toolkit →",
  },
  {
    emoji: "🤖",
    category: "AI Prompts",
    title: "PM AI Hub",
    description:
      "14 ready-to-run AI prompts for Delivery PMs. Paste your data, get an exec-ready output, launch in Claude, ChatGPT or Gemini in one click.",
    stats: [
      { value: "14", label: "Prompts" },
      { value: "3", label: "PM pain points" },
      { value: "∞", label: "Hours saved" },
    ],
    link: "https://nikhil-thomas-a.github.io/pm-ai-hub/",
    linkLabel: "Open PM AI Hub →",
  },
  {
    emoji: "✦",
    category: "AI Writing Tools",
    title: "Tensaku 添削",
    description:
      "Free AI writing toolkit — grammar check, enhance, paraphrase, summarise, translate and more. Runs on Groq's free tier, no account needed, nothing stored server-side.",
    stats: [
      { value: "13", label: "Writing tools" },
      { value: "Free", label: "No account" },
      { value: "0", label: "Cost" },
    ],
    link: "https://nikhil-thomas-a.github.io/tensaku/",
    linkLabel: "Open Tensaku 添削 →",
  },
  {
    emoji: "🎯",
    category: "Chrome Extension",
    title: "Apply Radar",
    description:
      "Track every job application across Naukri, LinkedIn, and Internshala — all in one place. One-click save, Kanban board, ATS resume scorer, and follow-up reminders. Built for Indian job seekers.",
    stats: [
      { value: "3", label: "Job boards" },
      { value: "1-click", label: "Save" },
      { value: "Free", label: "Open source" },
    ],
    link: "https://github.com/nikhil-thomas-a/apply-radar",
    linkLabel: "View on GitHub →",
  },
];

const dataProjects = [
  {
    emoji: "🎤🏀",
    category: "Data Science",
    title: "Hip Hoop",
    description:
      "Does a hip-hop mention change how an NBA player performs? Full end-to-end analysis — real game logs, real lyrics, real math. Paired t-tests, sentiment scoring, and an interactive dashboard.",
    stats: [
      { value: "110", label: "Mentions" },
      { value: "1992–2022", label: "Span" },
      { value: "5", label: "Stat windows" },
    ],
    link: "https://nikhil-thomas-a.github.io/hip-hoop/",
    linkLabel: "Open Dashboard →",
    githubLink: "https://github.com/nikhil-thomas-a/hip-hoop",
  },
  {
    emoji: "📖",
    category: "Reference Guide",
    title: "AI Training Playbook",
    description:
      "A practitioner's guide to how AI models are trained, evaluated, and deployed — written for PMs, ops leads, and technical generalists. Training paradigms, eval metrics, data annotation, model monitoring, and cost tradeoffs.",
    stats: [
      { value: "5", label: "Chapters" },
      { value: "0", label: "ML background needed" },
      { value: "Free", label: "Open source" },
    ],
    link: "https://github.com/nikhil-thomas-a/ai-training-playbook",
    linkLabel: "Read the Playbook →",
  },
];

function ToolCard({ tool }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "28px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      transition: "box-shadow 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
            {tool.emoji} {tool.category}
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
            {tool.title}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
        {tool.description}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {tool.stats.map((stat, i) => (
          <div key={i} style={{
            background: "var(--pill-bg)",
            borderRadius: "8px",
            padding: "6px 12px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{stat.value}</div>
            <div style={{ fontSize: "11px", color: "var(--muted)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "var(--text)",
            color: "var(--bg)",
            borderRadius: "8px",
            padding: "10px 18px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {tool.linkLabel}
        </a>
        {tool.githubLink && (
          <a
            href={tool.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  const theme = dark
    ? {
        "--bg": "#0f0f0f",
        "--card-bg": "#1a1a1a",
        "--border": "#2a2a2a",
        "--text": "#f0ede6",
        "--muted": "#888",
        "--pill-bg": "#242424",
      }
    : {
        "--bg": "#F7F4EE",
        "--card-bg": "#FFFFFF",
        "--border": "#E8E3D9",
        "--text": "#1a1a1a",
        "--muted": "#666",
        "--pill-bg": "#F2EEE7",
      };

  return (
    <div style={{ ...theme, background: "var(--bg)", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", transition: "background 0.3s" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--muted)" }}>nikhil-thomas-a.github.io</span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a href="https://www.linkedin.com/in/nikhil-thomas-a/" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none", fontWeight: 500 }}>LinkedIn</a>
          <button
            onClick={() => setDark(!dark)}
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "72px 32px 56px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--muted)", marginBottom: "12px", letterSpacing: "0.05em" }}>
          Delivery PM · Fractional Head of Data
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.1, marginBottom: "20px" }}>
          Nikhil<br />Thomas A.
        </h1>
        <p style={{ fontSize: "17px", color: "var(--muted)", lineHeight: 1.65, maxWidth: "560px" }}>
          I help startups move faster by automating the operational work that slows teams down — AI prompt systems, Google Workspace tools, and data infrastructure that founders actually use.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" }}>
          {["🚀 Delivery & Programme Management", "📊 Fractional Head of Data", "🤖 AI Workflows & Automation", "🛠 Google Workspace Engineering", "📐 Startup Operations Design", "🤝 Stakeholder & Exec Communication"].map((tag) => (
            <span key={tag} style={{ fontSize: "13px", color: "var(--muted)", background: "var(--pill-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "6px 14px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 32px 80px" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "24px" }}>
          Tools I've built
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {tools.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>

        {/* Pipeline */}
        <div style={{ marginTop: "32px", padding: "20px 24px", border: "1px dashed var(--border)", borderRadius: "12px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            More in the pipeline
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Hiring Pipeline Tracker", "Invoice Generator", "Startup Dashboard"].map((item) => (
              <span key={item} style={{ fontSize: "13px", color: "var(--muted)", background: "var(--pill-bg)", borderRadius: "8px", padding: "5px 12px" }}>
                {item}
              </span>
            ))}
          </div>
          <a href="https://www.linkedin.com/in/nikhil-thomas-a/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: "12px", fontSize: "13px", color: "var(--muted)", textDecoration: "underline" }}>
            Follow for updates →
          </a>
        </div>
      </div>

      {/* Data Portfolio Section */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 32px 80px" }}>
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>
              Data Portfolio
            </h2>
            <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.6 }}>
              ML projects, data science work, and technical writing applied to delivery and ops problems.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {dataProjects.map((project) => (
              <ToolCard key={project.title} tool={project} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: "1px solid var(--border)", background: "var(--card-bg)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Available for fractional & advisory roles
          </div>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: "16px" }}>
            Let's build something<br />that actually ships.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "28px", lineHeight: 1.6 }}>
            If you're an early-stage team who needs operational systems, AI workflows, or a data foundation — I'd love to talk.
          </p>
          <a
            href="https://www.linkedin.com/in/nikhil-thomas-a/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "var(--text)", color: "var(--bg)", borderRadius: "10px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "20px 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 600 }}>Nikhil Thomas A</span>
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "Startup Ops Toolkit", href: "https://nikhil-thomas-a.github.io/startup-ops-toolkit/" },
            { label: "PM AI Hub", href: "https://nikhil-thomas-a.github.io/pm-ai-hub/" },
            { label: "Tensaku 添削", href: "https://nikhil-thomas-a.github.io/tensaku/" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
