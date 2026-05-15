import { useState, useEffect, useRef } from "react";

// ── PHOTO ─────────────────────────────────────────────────────
const PHOTO = '/photo.jpg';

// ── THEMES ────────────────────────────────────────────────────
const DARK = {
  bg:"#0F0E0C", surface:"#1A1814", card:"#201E1A",
  border:"#2E2B26", borderHi:"#4A4540",
  gold:"#C9A84C", goldDim:"rgba(201,168,76,0.12)", goldBorder:"rgba(201,168,76,0.25)",
  red:"#E5484D", green:"#2EAB68",
  text:"#F0EBE3", muted:"#8A8278", faint:"#3A3530",
  ctaBg:"#C9A84C", ctaText:"#0F0E0C",
  serif:"'Fraunces', serif", sans:"'DM Sans', sans-serif", mono:"'DM Mono', monospace",
  isDark:true,
};
const LIGHT = {
  bg:"#F7F4EE", surface:"#EDEAE2", card:"#FFFFFF",
  border:"#DDD6C4", borderHi:"#B0A898",
  gold:"#9A6E1A", goldDim:"rgba(154,110,26,0.08)", goldBorder:"rgba(154,110,26,0.2)",
  red:"#C8282B", green:"#166038",
  text:"#1C1810", muted:"#6A6258", faint:"#C0BAB0",
  ctaBg:"#9A6E1A", ctaText:"#FFFFFF",
  serif:"'Fraunces', serif", sans:"'DM Sans', sans-serif", mono:"'DM Mono', monospace",
  isDark:false,
};

// ── ANIMATION HOOKS ───────────────────────────────────────────
function useInView(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    willChange: visible ? 'auto' : 'opacity, transform',
  };
  return [ref, visible, style];
}

function useCountUp(target, active, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target, 10);
    if (isNaN(num) || num === 0) return;
    let rafId;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(p < 1 ? Math.floor(eased * num) : num);
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, duration]);
  return val;
}

function StatNum({ n, visible }) {
  const isInt = /^\d+$/.test(n) && parseInt(n, 10) > 0;
  const count = useCountUp(n, visible && isInt);
  return isInt ? String(count) : n;
}

// ── TOOLS — SoleHunt, Apply Radar, Tensaku, Startup Ops, PM AI Hub ──
const TOOLS = [
  {
    id:"solehunt", emoji:"👟", tag:"Shoe Discovery",
    title:"SoleHunt",
    desc:"Find your perfect shoe match. 9 biomechanics signals scored across 67 shoes in 14 categories — quiz, catalogue, and compare. Built with Next.js + TypeScript.",
    stats:[{n:"67",l:"Shoes"},{n:"9",l:"Fit signals"},{n:"14",l:"Categories"}],
    url:"https://solehunt-one.vercel.app/",
    cta:"Try it live",
    colorKey:"green",
    dimD:"rgba(46,171,104,0.1)", dimL:"rgba(22,96,56,0.07)",
    borD:"rgba(46,171,104,0.25)", borL:"rgba(22,96,56,0.18)",
  },
  {
    id:"apply-radar", emoji:"🎯", tag:"Chrome Extension",
    title:"Apply Radar",
    desc:"Track every job application across Naukri, LinkedIn, and Internshala — all in one place. One-click save, Kanban board, ATS resume scorer, and follow-up reminders. Built for Indian job seekers.",
    stats:[{n:"3",l:"Job boards"},{n:"1-click",l:"Save"},{n:"Free",l:"Open source"}],
    url:"https://github.com/nikhil-thomas-a/apply-radar",
    cta:"View on GitHub",
    colorKey:"red",
    dimD:"rgba(229,72,77,0.1)", dimL:"rgba(200,40,43,0.07)",
    borD:"rgba(229,72,77,0.25)", borL:"rgba(200,40,43,0.18)",
  },
  {
    id:"tensaku", emoji:"✦", tag:"AI Writing Tools",
    title:"Tensaku 添削",
    desc:"Free AI writing toolkit — grammar check, enhance, paraphrase, summarise, translate and more. Runs on Groq's free tier, no account needed, nothing stored server-side.",
    stats:[{n:"13",l:"Writing tools"},{n:"Free",l:"No account"},{n:"0",l:"Cost"}],
    url:"https://nikhil-thomas-a.github.io/tensaku-web/",
    cta:"Open Tensaku",
    colorKey:"gold",
    dimD:"rgba(201,168,76,0.1)", dimL:"rgba(154,110,26,0.07)",
    borD:"rgba(201,168,76,0.25)", borL:"rgba(154,110,26,0.18)",
  },
  {
    id:"startup-ops", emoji:"⚙️", tag:"Google Workspace",
    title:"Startup Ops Toolkit",
    desc:"Google Sheets templates and Apps Script automations for early-stage teams. Multi Mail Shooter, Document Generator, and more — copy, paste, run.",
    stats:[{n:"3",l:"Live tools"},{n:"2+",l:"Coming soon"},{n:"0",l:"Cost"}],
    url:"https://nikhil-thomas-a.github.io/startup-ops-toolkit/",
    cta:"Open Ops Toolkit",
    colorKey:"green",
    dimD:"rgba(46,171,104,0.1)", dimL:"rgba(22,96,56,0.07)",
    borD:"rgba(46,171,104,0.25)", borL:"rgba(22,96,56,0.18)",
  },
  {
    id:"pm-ai-hub", emoji:"🤖", tag:"AI Prompts",
    title:"PM AI Hub",
    desc:"14 ready-to-run AI prompts for Delivery PMs. Paste your data, get an exec-ready output, launch in Claude, ChatGPT or Gemini in one click.",
    stats:[{n:"14",l:"Prompts"},{n:"3",l:"PM pain points"},{n:"∞",l:"Hours saved"}],
    url:"https://nikhil-thomas-a.github.io/pm-ai-hub/",
    cta:"Open PM AI Hub",
    colorKey:"red",
    dimD:"rgba(229,72,77,0.1)", dimL:"rgba(200,40,43,0.07)",
    borD:"rgba(229,72,77,0.25)", borL:"rgba(200,40,43,0.18)",
  },
];

// ── DATA PORTFOLIO ────────────────────────────────────────────
const DATA_PROJECTS = [
  {
    id:"hip-hoop", emoji:"🎤🏀", tag:"Data Science",
    title:"Hip Hoop",
    desc:"Does a hip-hop mention change how an NBA player performs? Full end-to-end analysis — real game logs, real lyrics, real math. Paired t-tests, sentiment scoring, and an interactive dashboard.",
    stats:[{n:"110",l:"Mentions"},{n:"1992–2022",l:"Span"},{n:"5",l:"Stat windows"}],
    url:"https://nikhil-thomas-a.github.io/hip-hoop/",
    cta:"Open Dashboard",
    githubUrl:"https://github.com/nikhil-thomas-a/hip-hoop",
    colorKey:"gold",
    dimD:"rgba(201,168,76,0.1)", dimL:"rgba(154,110,26,0.07)",
    borD:"rgba(201,168,76,0.25)", borL:"rgba(154,110,26,0.18)",
  },
  {
    id:"data-portfolio", emoji:"📊", tag:"Data Analytics",
    title:"PM Data Portfolio",
    desc:"Three end-to-end analytics projects applied to PM and ops problems — Sprint Velocity Analyser, Startup KPI Dashboard, and a Delivery Risk Predictor built with scikit-learn.",
    stats:[{n:"3",l:"Projects"},{n:"Python",l:"Stack"},{n:"PM",l:"Use case"}],
    url:"https://github.com/nikhil-thomas-a/data-portfolio",
    cta:"View on GitHub",
    colorKey:"red",
    dimD:"rgba(229,72,77,0.1)", dimL:"rgba(200,40,43,0.07)",
    borD:"rgba(229,72,77,0.25)", borL:"rgba(200,40,43,0.18)",
  },
  {
    id:"ai-training-playbook", emoji:"📖", tag:"Reference Guide",
    title:"AI Training Playbook",
    desc:"A practitioner's guide to how AI models are trained, evaluated, and deployed — written for PMs, ops leads, and technical generalists. Training paradigms, eval metrics, data annotation, model monitoring, and cost tradeoffs.",
    stats:[{n:"5",l:"Chapters"},{n:"0",l:"ML background needed"},{n:"Free",l:"Open source"}],
    url:"https://github.com/nikhil-thomas-a/ai-training-playbook",
    cta:"Read the Playbook",
    colorKey:"green",
    dimD:"rgba(46,171,104,0.1)", dimL:"rgba(22,96,56,0.07)",
    borD:"rgba(46,171,104,0.25)", borL:"rgba(22,96,56,0.18)",
  },
];

const SKILLS = [
  {icon:"🚀",label:"Delivery & Programme Management"},
  {icon:"📊",label:"Fractional Head of Data"},
  {icon:"🤖",label:"AI Workflows & Automation"},
  {icon:"🛠",label:"Google Workspace Engineering"},
  {icon:"📐",label:"Startup Operations Design"},
  {icon:"🤝",label:"Stakeholder & Exec Communication"},
];

// ── TOOL CARD ─────────────────────────────────────────────────
function ToolCard({ tool, T, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const [cardRef, visible, animStyle] = useInView(delay);
  const color = T[tool.colorKey];
  const dim   = T.isDark ? tool.dimD : tool.dimL;
  const bor   = T.isDark ? tool.borD : tool.borL;
  return (
    <div ref={cardRef} style={animStyle}>
      <div className="portfolio-card" style={{
        background: hov ? T.card : T.surface,
        border:`1.5px solid ${hov ? color : T.border}`,
        borderRadius:16, padding:"32px 36px",
        transition:"all 0.2s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 12px 40px rgba(0,0,0,${T.isDark?0.4:0.1})` : "none",
        position:"relative", overflow:"hidden",
      }}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      >
        <div style={{
          position:"absolute", inset:0,
          background:`radial-gradient(ellipse at top left, ${dim} 0%, transparent 60%)`,
          opacity: hov ? 1 : 0, transition:"opacity 0.3s", pointerEvents:"none",
        }}/>
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:3,
          background:color, opacity: hov ? 1 : 0.35,
          transition:"opacity 0.2s", borderRadius:"16px 16px 0 0",
        }}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:28}}>{tool.emoji}</span>
              <span style={{
                fontFamily:T.mono, fontSize:11, fontWeight:700,
                color:color, background:dim, border:`1px solid ${bor}`,
                padding:"3px 10px", borderRadius:4,
                letterSpacing:"0.1em", textTransform:"uppercase",
              }}>{tool.tag}</span>
            </div>
          </div>
          <h3 style={{fontFamily:T.serif,fontSize:28,fontWeight:900,color:T.text,marginBottom:12,lineHeight:1.1}}>{tool.title}</h3>
          <p style={{fontFamily:T.sans,fontSize:15,color:T.muted,lineHeight:1.75,marginBottom:28}}>{tool.desc}</p>
          <div style={{display:"flex",gap:28,marginBottom:28}}>
            {tool.stats.map((s,i)=>(
              <div key={i}>
                <div style={{fontFamily:T.serif,fontSize:28,fontWeight:900,color,lineHeight:1}}>
                  <StatNum n={s.n} visible={visible}/>
                </div>
                <div style={{fontFamily:T.mono,fontSize:10,color:T.faint,textTransform:"uppercase",letterSpacing:"0.1em",marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              fontFamily:T.mono,fontSize:12,fontWeight:700,color,
              border:`1px solid ${bor}`, padding:"9px 18px", borderRadius:8,
              letterSpacing:"0.06em", textDecoration:"none",
              background: hov ? dim : "transparent", transition:"background 0.2s",
            }}>{tool.cta} →</a>
            {tool.githubUrl && (
              <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                display:"inline-flex",alignItems:"center",gap:6,
                fontFamily:T.mono,fontSize:12,fontWeight:600,
                color:T.muted,border:`1px solid ${T.border}`,
                padding:"9px 14px",borderRadius:8,textDecoration:"none",
                letterSpacing:"0.06em",transition:"border-color 0.2s,color 0.2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderHi;e.currentTarget.style.color=T.text;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.muted;}}
              >GitHub ↗</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────
export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved === 'dark';
    } catch {}
    return !!(window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  });
  const T = dark ? DARK : LIGHT;

  useEffect(() => setMounted(true), []);

  function toggleDark() {
    setDark(d => {
      const next = !d;
      try { localStorage.setItem('portfolio-theme', next ? 'dark' : 'light'); } catch {}
      return next;
    });
  }

  const [ctaRef, , ctaAnim] = useInView(0);

  return (
    <div style={{
      background:T.bg, minHeight:"100vh", fontFamily:T.sans,
      opacity:mounted?1:0, transition:"opacity 0.5s ease, background 0.3s",
    }}>
      <style>{[
        `html{scroll-behavior:smooth;} body,#root{background:`,T.bg,`!important;transition:background 0.3s;}`,
        `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}`,
        `a{transition:opacity 0.2s;}`,
        `::-webkit-scrollbar{width:4px;background:`,T.bg,`;}`,
        `::-webkit-scrollbar-thumb{background:`,T.border,`;border-radius:2px;}`,
        `@media(max-width:600px){`,
        `.portfolio-card{padding:22px 20px!important;}`,
        `.hero-photo{width:120px!important;height:120px!important;}`,
        `}`,
      ].join("")}</style>

      <div style={{maxWidth:840,margin:"0 auto",padding:"0 24px 100px"}}>

        {/* NAV */}
        <nav style={{
          display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"24px 0", borderBottom:`1px solid ${T.border}`, marginBottom:64,
        }}>
          <span style={{fontFamily:T.mono,fontSize:13,color:T.faint,letterSpacing:"0.08em"}}>
            nikhilthomasa.in
          </span>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={toggleDark} style={{
              background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:7, padding:"6px 13px", cursor:"pointer",
              display:"flex", alignItems:"center", gap:6,
              color:T.muted, fontSize:11, fontFamily:T.mono,
              fontWeight:700, letterSpacing:"0.06em", transition:"all 0.2s",
            }}>{dark ? "☀ Light" : "🌙 Dark"}</button>
            <a href="https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display:"flex",alignItems:"center",gap:7,
                fontFamily:T.mono,fontSize:11,fontWeight:700,
                color:T.muted,textDecoration:"none",
                border:`1px solid ${T.border}`,padding:"6px 14px",borderRadius:6,
                letterSpacing:"0.08em",transition:"border-color 0.2s,color 0.2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderHi;e.currentTarget.style.color=T.text;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.muted;}}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </nav>

        {/* HERO */}
        <div style={{
          display:"flex", gap:48, alignItems:"flex-start",
          marginBottom:72, flexWrap:"wrap",
        }}>
          <div style={{flexShrink:0}}>
            <div className="hero-photo" style={{
              width:160, height:160, borderRadius:"50%",
              overflow:"hidden",
              border:`3px solid ${T.gold}`,
              boxShadow:`0 0 0 6px ${T.goldDim}`,
            }}>
              <img src={PHOTO} alt="Nikhil Thomas A"
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            </div>
          </div>
          <div style={{flex:1, minWidth:260}}>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:10,
              fontFamily:T.mono,fontSize:12,fontWeight:700,color:T.gold,
              marginBottom:20,
            }}>
              <span style={{display:"inline-block",width:28,height:1.5,background:T.gold,borderRadius:1}}/>
              Delivery PM · Fractional Head of Data
              <span style={{display:"inline-block",width:28,height:1.5,background:T.gold,borderRadius:1}}/>
            </div>
            <h1 style={{
              fontFamily:T.serif,
              fontSize:"clamp(44px,8vw,80px)",
              fontWeight:900, lineHeight:0.95,
              letterSpacing:"-0.02em", color:T.text, marginBottom:24,
            }}>
              Nikhil<br/>
              <em style={{color:T.gold,fontStyle:"italic"}}>Thomas A.</em>
            </h1>
            <p style={{
              fontFamily:T.sans,fontSize:17,lineHeight:1.8,
              color:T.muted,maxWidth:500,marginBottom:28,
            }}>
              I help startups move faster by automating the operational work
              that slows teams down — AI prompt systems, Google Workspace tools,
              and data infrastructure that founders actually use.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {SKILLS.map((s,i)=>(
                <span key={i} style={{
                  fontFamily:T.mono,fontSize:11,color:T.muted,
                  background:T.surface,border:`1px solid ${T.border}`,
                  padding:"5px 12px",borderRadius:20,letterSpacing:"0.04em",
                  display:"flex",alignItems:"center",gap:6,
                }}>
                  <span>{s.icon}</span>{s.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TOOLS SECTION */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:40}}>
          <div style={{flex:1,height:1,background:T.border}}/>
          <span style={{fontFamily:T.mono,fontSize:11,color:T.faint,letterSpacing:"0.12em",textTransform:"uppercase"}}>
            Tools I've built
          </span>
          <div style={{flex:1,height:1,background:T.border}}/>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:72}}>
          {TOOLS.map((t,i)=><ToolCard key={t.id} tool={t} T={T} delay={i*80}/>)}
        </div>

        {/* COMING SOON */}
        <div style={{
          background:T.surface, border:`1px dashed ${T.border}`,
          borderRadius:14, padding:"24px 28px",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          flexWrap:"wrap",gap:14,marginBottom:72,
        }}>
          <div>
            <div style={{fontFamily:T.mono,fontSize:11,color:T.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>
              More in the pipeline
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {["Hiring Pipeline Tracker","Invoice Generator","Startup Dashboard"].map((t,i)=>(
                <span key={i} style={{fontFamily:T.mono,fontSize:11,color:T.muted,background:T.surface,border:`1px solid ${T.border}`,padding:"4px 12px",borderRadius:4}}>{t}</span>
              ))}
            </div>
          </div>
          <a href="https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"
            target="_blank" rel="noopener noreferrer"
            style={{fontFamily:T.mono,fontSize:12,fontWeight:700,color:T.gold,textDecoration:"none",border:`1px solid ${T.goldBorder}`,padding:"10px 20px",borderRadius:8,letterSpacing:"0.06em",whiteSpace:"nowrap",transition:"background 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=T.goldDim}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            Follow for updates →
          </a>
        </div>

        {/* DATA PORTFOLIO SECTION */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
          <div style={{flex:1,height:1,background:T.border}}/>
          <span style={{fontFamily:T.mono,fontSize:11,color:T.faint,letterSpacing:"0.12em",textTransform:"uppercase"}}>
            Data Portfolio
          </span>
          <div style={{flex:1,height:1,background:T.border}}/>
        </div>
        <p style={{fontFamily:T.sans,fontSize:14,color:T.muted,textAlign:"center",marginBottom:40,lineHeight:1.6}}>
          ML projects, data science work, and technical writing applied to delivery and ops problems.
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:72}}>
          {DATA_PROJECTS.map((t,i)=><ToolCard key={t.id} tool={t} T={T} delay={i*80}/>)}
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{
          ...ctaAnim,
          background:T.isDark?"#1A1814":T.surface,
          border:`1.5px solid ${T.border}`,
          borderRadius:16,padding:"40px",textAlign:"center",
          position:"relative",overflow:"hidden",marginBottom:60,
        }}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center top, ${T.goldDim} 0%, transparent 60%)`,pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{fontFamily:T.mono,fontSize:11,color:T.gold,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:16}}>
              Available for fractional &amp; advisory roles
            </div>
            <h2 style={{fontFamily:T.serif,fontSize:34,fontWeight:900,color:T.text,marginBottom:14,lineHeight:1.1}}>
              Let's build something<br/><em style={{color:T.gold}}>that actually ships.</em>
            </h2>
            <p style={{fontFamily:T.sans,fontSize:15,color:T.muted,lineHeight:1.7,maxWidth:420,margin:"0 auto 28px"}}>
              If you're an early-stage team who needs operational systems,
              AI workflows, or a data foundation — I'd love to talk.
            </p>
            <a href="https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex",alignItems:"center",gap:9,
                fontFamily:T.mono,fontSize:13,fontWeight:700,
                color:T.ctaText,background:T.ctaBg,
                padding:"13px 28px",borderRadius:9,textDecoration:"none",letterSpacing:"0.06em",
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{borderTop:`1px solid ${T.border}`,paddingTop:48}}>

          <div style={{display:"flex",gap:"48px 64px",flexWrap:"wrap",marginBottom:40}}>

            <div style={{flex:"1 1 160px",minWidth:140}}>
              <div style={{fontFamily:T.serif,fontSize:20,fontWeight:900,color:T.text,marginBottom:6}}>Nikhil Thomas A</div>
              <div style={{fontFamily:T.sans,fontSize:13,color:T.muted,lineHeight:1.7}}>
                Delivery PM<br/>Fractional Head of Data
              </div>
            </div>

            <div style={{flex:"1 1 160px",minWidth:140}}>
              <div style={{fontFamily:T.mono,fontSize:10,fontWeight:700,color:T.gold,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Work</div>
              {[
                {label:"SoleHunt",            href:"https://solehunt-one.vercel.app/"},
                {label:"Apply Radar",         href:"https://github.com/nikhil-thomas-a/apply-radar"},
                {label:"Tensaku 添削",          href:"https://nikhil-thomas-a.github.io/tensaku-web/"},
                {label:"Startup Ops Toolkit", href:"https://nikhil-thomas-a.github.io/startup-ops-toolkit/"},
                {label:"PM AI Hub",           href:"https://nikhil-thomas-a.github.io/pm-ai-hub/"},
                {label:"Hip Hoop",            href:"https://nikhil-thomas-a.github.io/hip-hoop/"},
              ].map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{display:"block",fontFamily:T.mono,fontSize:12,color:T.muted,textDecoration:"none",marginBottom:9,letterSpacing:"0.02em",transition:"color 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=T.text}
                  onMouseLeave={e=>e.currentTarget.style.color=T.muted}
                >{l.label}</a>
              ))}
            </div>

            <div style={{flex:"1 1 100px",minWidth:100}}>
              <div style={{fontFamily:T.mono,fontSize:10,fontWeight:700,color:T.gold,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Connect</div>
              {[
                {label:"LinkedIn", href:"https://www.linkedin.com/in/nikhil-thomas-a-58538117a/"},
                {label:"GitHub",   href:"https://github.com/nikhil-thomas-a"},
              ].map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{display:"block",fontFamily:T.mono,fontSize:12,color:T.muted,textDecoration:"none",marginBottom:9,letterSpacing:"0.02em",transition:"color 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=T.text}
                  onMouseLeave={e=>e.currentTarget.style.color=T.muted}
                >{l.label}</a>
              ))}
            </div>

          </div>

          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <span style={{fontFamily:T.mono,fontSize:11,color:T.faint,letterSpacing:"0.06em"}}>© 2026 Nikhil Thomas A</span>
            <span style={{fontFamily:T.mono,fontSize:11,color:T.faint,letterSpacing:"0.06em"}}>Built with React & Vite</span>
          </div>

        </div>

      </div>
    </div>
  );
}
