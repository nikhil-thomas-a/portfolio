import { useState, useEffect } from "react";

const DARK = {
  bg:         "#0F0E0C",
  surface:    "#1A1814",
  card:       "#201E1A",
  border:     "#2E2B26",
  borderHi:   "#4A4540",
  gold:       "#C9A84C",
  goldDim:    "rgba(201,168,76,0.12)",
  goldBorder: "rgba(201,168,76,0.25)",
  red:        "#E5484D",
  green:      "#1A7A4A",
  white:      "#F0EBE3",
  muted:      "#8A8278",
  faint:      "#3A3530",
  ctaText:    "#0F0E0C",
  isDark:     true,
  serif:      "'Fraunces', serif",
  sans:       "'DM Sans', sans-serif",
  mono:       "'DM Mono', monospace",
};

const LIGHT = {
  bg:         "#F7F4EE",
  surface:    "#EDEAE2",
  card:       "#FFFFFF",
  border:     "#DDD6C4",
  borderHi:   "#B0A898",
  gold:       "#9A6E1A",
  goldDim:    "rgba(154,110,26,0.08)",
  goldBorder: "rgba(154,110,26,0.2)",
  red:        "#C8282B",
  green:      "#166038",
  white:      "#1C1810",
  muted:      "#6A6258",
  faint:      "#B0A898",
  ctaText:    "#FFFFFF",
  isDark:     false,
  serif:      "'Fraunces', serif",
  sans:       "'DM Sans', sans-serif",
  mono:       "'DM Mono', monospace",
};

const TOOLS = [
  {
    id:         "startup-ops",
    emoji:      "⚙️",
    colorKey:   "green",
    colorDim:   "rgba(26,122,74,0.1)",
    colorDimL:  "rgba(22,96,56,0.08)",
    colorBorder:"rgba(26,122,74,0.2)",
    colorBorderL:"rgba(22,96,56,0.15)",
    tag:        "Google Workspace",
    title:      "Startup Ops Toolkit",
    desc:       "Google Sheets templates and Apps Script automations for early-stage teams. Multi Mail Shooter, Document Generator, and more — copy, paste, run.",
    stats:      [{ n:"2", l:"Live tools" }, { n:"4+", l:"Coming soon" }, { n:"0", l:"Cost" }],
    url:        "https://nikhil-thomas-a.github.io/startup-ops-toolkit/",
    cta:        "Open Ops Toolkit",
  },
  {
    id:         "pm-ai-hub",
    emoji:      "🤖",
    colorKey:   "red",
    colorDim:   "rgba(229,72,77,0.1)",
    colorDimL:  "rgba(200,40,43,0.07)",
    colorBorder:"rgba(229,72,77,0.2)",
    colorBorderL:"rgba(200,40,43,0.15)",
    tag:        "AI Prompts",
    title:      "PM AI Hub",
    desc:       "13 ready-to-run AI prompts for Delivery PMs. Paste your data, get an exec-ready output, launch in Claude, ChatGPT or Gemini in one click.",
    stats:      [{ n:"13", l:"Prompts" }, { n:"3", l:"PM pain points" }, { n:"∞", l:"Hours saved" }],
    url:        "https://nikhil-thomas-a.github.io/pm-ai-hub/",
    cta:        "Open PM AI Hub",
  },
];

const SKILLS = [
  { icon:"🚀", label:"Delivery & Programme Management" },
  { icon:"📊", label:"Fractional Head of Data" },
  { icon:"🤖", label:"AI Workflows & Automation" },
  { icon:"🛠", label:"Google Workspace Engineering" },
  { icon:"📐", label:"Startup Operations Design" },
  { icon:"🤝", label:"Stakeholder & Exec Communication" },
];

function ToolCard({ tool, T }) {
  const [hovered, setHovered] = useState(false);
  const color = T[tool.colorKey];
  const colorDim = T.isDark ? tool.colorDim : tool.colorDimL;
  const colorBorder = T.isDark ? tool.colorBorder : tool.colorBorderL;
  return (
    <a
      href={tool.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hovered ? T.card : T.surface,
        border: `1.5px solid ${hovered ? color : T.border}`,
        borderRadius: 16,
        padding: "32px 36px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,${T.isDark?0.4:0.12}), 0 0 0 1px ${colorBorder}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at top left, ${colorDim} 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: color,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.2s",
        borderRadius: "16px 16px 0 0",
      }} />

      <div style={{ position: "relative" }}>
        {/* Header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 20 }}>
          <div style={{ display:"flex", alignItems:"center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{tool.emoji}</span>
            <span style={{
              fontFamily: C.mono, fontSize: 11, fontWeight: 700,
              color: color, background: colorDim,
              border: `1px solid ${colorBorder}`,
              padding: "3px 10px", borderRadius: 4,
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{tool.tag}</span>
          </div>
          <span style={{
            fontFamily: C.mono, fontSize: 13,
            color: hovered ? color : T.muted,
            transition: "color 0.2s",
          }}>↗</span>
        </div>

        <h3 style={{
          fontFamily: T.serif,
          fontSize: 28, fontWeight: 900,
          color: T.white, marginBottom: 12,
          lineHeight: 1.1,
        }}>{tool.title}</h3>

        <p style={{
          fontFamily: T.sans, fontSize: 15,
          color: T.muted, lineHeight: 1.75,
          marginBottom: 28,
        }}>{tool.desc}</p>

        {/* Stats */}
        <div style={{ display:"flex", gap: 28, marginBottom: 28 }}>
          {tool.stats.map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily: C.serif, fontSize: 28, fontWeight: 900, color: color, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.faint, textTransform:"uppercase", letterSpacing:"0.1em", marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap: 8,
          fontFamily: C.mono, fontSize: 12, fontWeight: 700,
          color: color,
          border: `1px solid ${colorBorder}`,
          padding: "9px 18px", borderRadius: 8,
          letterSpacing: "0.06em",
          background: hovered ? colorDim : "transparent",
          transition: "background 0.2s",
        }}>
          {tool.cta} →
        </div>
      </div>
    </a>
  );
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);
  const T = dark ? DARK : LIGHT;
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      background: T.bg,
      minHeight: "100vh",
      fontFamily: T.sans,
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.5s ease, background 0.3s",
    }}>
      <style>{`html,body,#root{background:${T.bg}!important;transition:background 0.3s;}`}</style>
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 100px" }}>

        {/* ── NAV ── */}
        <nav style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"24px 0",
          borderBottom: `1px solid ${T.border}`,
          marginBottom: 72,
        }}>
          <span style={{ fontFamily: T.mono, fontSize: 13, color: T.faint, letterSpacing:"0.08em" }}>
            nikhil-thomas-a.github.io
          </span>
          <a
            href="https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"
            target="_blank" rel="noopener noreferrer"
            style={{
              display:"flex", alignItems:"center", gap: 7,
              fontFamily: T.mono, fontSize: 11, fontWeight: 700,
              color: T.muted, textDecoration:"none",
              border: `1px solid ${T.border}`,
              padding:"6px 14px", borderRadius:6,
              letterSpacing:"0.08em",
              transition:"border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=T.borderHi; e.currentTarget.style.color=T.white; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.muted; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <button onClick={() => setDark(!dark)} style={{
            background: T.surface, border:`1px solid ${T.border}`,
            borderRadius:7, padding:"6px 13px", cursor:"pointer",
            display:"flex", alignItems:"center", gap:6,
            color: T.muted, fontSize:11, fontFamily:T.mono,
            fontWeight:700, letterSpacing:"0.06em", transition:"all 0.2s",
          }}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </nav>

        {/* ── HERO ── */}
        <div style={{ marginBottom: 80 }}>

          {/* Eyebrow */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:10,
            fontFamily: T.mono, fontSize: 12, fontWeight: 700,
            color: T.gold,
            marginBottom: 28,
          }}>
            <span style={{ display:"inline-block", width:32, height:1.5, background: T.gold, borderRadius:1 }} />
            Delivery PM · Fractional Head of Data
            <span style={{ display:"inline-block", width:32, height:1.5, background: T.gold, borderRadius:1 }} />
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: T.serif,
            fontSize: "clamp(52px, 10vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: T.white,
            marginBottom: 32,
          }}>
            Nikhil<br />
            <em style={{ color: T.gold, fontStyle:"italic" }}>Thomas A.</em>
          </h1>

          {/* Bio */}
          <p style={{
            fontFamily: T.sans,
            fontSize: 18,
            lineHeight: 1.8,
            color: T.muted,
            maxWidth: 560,
            marginBottom: 40,
          }}>
            I help startups and scale-ups move faster by automating the operational
            work that slows teams down — AI prompt systems, Google Workspace tools,
            and data infrastructure that founders actually use.
          </p>

          {/* Skills chips */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {SKILLS.map((s,i) => (
              <span key={i} style={{
                fontFamily: T.mono, fontSize: 11,
                color: T.muted,
                background: T.surface,
                border: `1px solid ${T.border}`,
                padding:"6px 14px", borderRadius:20,
                letterSpacing:"0.04em",
                display:"flex", alignItems:"center", gap:7,
              }}>
                <span>{s.icon}</span>{s.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{
          display:"flex", alignItems:"center", gap:16, marginBottom:48,
        }}>
          <div style={{ flex:1, height:1, background: T.border }} />
          <span style={{ fontFamily:T.mono, fontSize:11, color:T.faint, letterSpacing:"0.12em", textTransform:"uppercase" }}>
            Tools I've built
          </span>
          <div style={{ flex:1, height:1, background: T.border }} />
        </div>

        {/* ── TOOL CARDS ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:80 }}>
          {TOOLS.map(t => <ToolCard key={t.id} tool={t} T={T} />)}
        </div>

        {/* ── MORE COMING ── */}
        <div style={{
          background: T.surface,
          border: `1px dashed ${T.border}`,
          borderRadius:14,
          padding:"28px 32px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:16,
          marginBottom:80,
        }}>
          <div>
            <div style={{ fontFamily:T.mono, fontSize:11, color:T.faint, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>
              More in the pipeline
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {["Hiring Pipeline Tracker","Weekly KPI Emailer","Invoice Generator","Startup Dashboard"].map((t,i) => (
                <span key={i} style={{
                  fontFamily:T.mono, fontSize:11, color:T.faint,
                  background: T.card, border:`1px solid ${T.border}`,
                  padding:"4px 12px", borderRadius:4,
                }}>{t}</span>
              ))}
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily:T.mono, fontSize:12, fontWeight:700,
              color:T.gold, textDecoration:"none",
              border:`1px solid ${T.goldBorder}`,
              padding:"10px 20px", borderRadius:8,
              letterSpacing:"0.06em",
              whiteSpace:"nowrap",
            }}
          >Follow for updates →</a>
        </div>

        {/* ── CONTACT ── */}
        <div style={{
          background: `linear-gradient(135deg, ${T.surface} 0%, #1A1814 100%)`,
          border:`1.5px solid ${T.border}`,
          borderRadius:16,
          padding:"40px 40px",
          textAlign:"center",
          position:"relative",
          overflow:"hidden",
          marginBottom:64,
        }}>
          <div style={{
            position:"absolute", inset:0,
            background:`radial-gradient(ellipse at center top, ${T.goldDim} 0%, transparent 60%)`,
            pointerEvents:"none",
          }} />
          <div style={{ position:"relative" }}>
            <div style={{
              fontFamily:T.mono, fontSize:11, color:T.gold,
              letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:16,
            }}>
              Available for fractional & advisory roles
            </div>
            <h2 style={{
              fontFamily:T.serif, fontSize:36, fontWeight:900,
              color:T.white, marginBottom:16, lineHeight:1.1,
            }}>
              Let's build something<br />
              <em style={{ color:T.gold }}>that actually ships.</em>
            </h2>
            <p style={{
              fontFamily:T.sans, fontSize:15, color:T.muted,
              lineHeight:1.7, maxWidth:440, margin:"0 auto 28px",
            }}>
              If you're an early-stage team who needs operational systems,
              AI workflows, or a data foundation — I'd love to talk.
            </p>
            <a
              href="https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:9,
                fontFamily:T.mono, fontSize:13, fontWeight:700,
                color: T.ctaText,
                background:T.gold,
                padding:"13px 28px", borderRadius:9,
                textDecoration:"none", letterSpacing:"0.06em",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          borderTop:`1px solid ${T.border}`,
          paddingTop:28,
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:12,
        }}>
          <span style={{ fontFamily:T.serif, fontSize:16, fontWeight:700, color:T.white }}>
            Nikhil Thomas A
          </span>
          <div style={{ display:"flex", gap:20, alignItems:"center" }}>
            <a href="https://nikhil-thomas-a.github.io/pm-ai-hub/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:T.mono, fontSize:11, color:T.faint, textDecoration:"none", letterSpacing:"0.06em" }}>
              PM AI Hub
            </a>
            <span style={{ color:T.border }}>·</span>
            <a href="https://nikhil-thomas-a.github.io/startup-ops-toolkit/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:T.mono, fontSize:11, color:T.faint, textDecoration:"none", letterSpacing:"0.06em" }}>
              Startup Ops Toolkit
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
