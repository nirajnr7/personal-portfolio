"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import rough from "roughjs";
import { DATA } from "@/lib/data";

/* ==========================================================
   SVG ICONS — real brand icons
   ========================================================== */
function SvgIcon({ d, size = 20 }: { d: string; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d={d} /></svg>;
}

const ICON_PATHS: Record<string, string> = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
  codechef: "M11.007.001a3.09 3.09 0 0 0-.529.058c-.55.12-.95.464-1.2.825l-.072.106c-.297.472-.61.995-.835 1.562-.225.567-.393 1.19-.378 1.89a2.74 2.74 0 0 0 .263 1.128c-.12.258-.27.503-.44.735a4.65 4.65 0 0 1-.575.635c-.09.085-.12.107-.168.148l.012-.01c-.082.073-.165.145-.244.222a5.18 5.18 0 0 0-1.064 1.376 4.22 4.22 0 0 0-.467 1.473 4.14 4.14 0 0 0 .062 1.62c-.497.156-.935.392-1.253.727-.392.413-.6.97-.624 1.622-.024.65.15 1.397.55 2.125.8 1.456 2.475 2.87 5.267 3.256a15.39 15.39 0 0 0 1.97.152c.522.008 1.041-.012 1.548-.063a11.7 11.7 0 0 0 3.347-.82c1.542-.69 2.792-1.768 3.29-3.281.257-.783.315-1.62.138-2.432a4.12 4.12 0 0 0-1.023-1.977 5.65 5.65 0 0 0-.36-.349c.06-.108.097-.198.153-.312.223-.46.354-.989.37-1.525.018-.536-.1-1.083-.368-1.575a4.01 4.01 0 0 0-.448-.64l-.062-.07c.258-.263.484-.555.665-.872.293-.51.46-1.089.385-1.727a3.67 3.67 0 0 0-.245-.863 8.55 8.55 0 0 0-.595-1.134c-.38-.6-.84-1.156-1.233-1.606a3.43 3.43 0 0 0-.28-.288C15.82.2 14.962-.04 14.092.01a3.04 3.04 0 0 0-.938.201 2.96 2.96 0 0 0-1.137-.181c-.34-.015-.68-.015-1.01-.03z",
  codeforces: "M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5zm-9 0V7.5A1.5 1.5 0 0 0 13.5 6h-3A1.5 1.5 0 0 0 9 7.5v12a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5zm-9 0V15a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 0 15v4.5A1.5 1.5 0 0 0 1.5 21h3A1.5 1.5 0 0 0 6 19.5z",
  download: "M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
};

function PlatformIcon({ name, size = 20 }: { name: string; size?: number }) {
  return ICON_PATHS[name] ? <SvgIcon d={ICON_PATHS[name]} size={size} /> : null;
}

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: "#0A66C2",
  github: "#181717",
  leetcode: "#FFA116",
  codechef: "#5B4638",
  codeforces: "#1F8ACB",
};

/* Simple Icons CDN slugs + brand colors for tech tools */
const TECH_META: Record<string, { slug: string; color: string }> = {
  Java: { slug: "_local_", color: "#007396" },
  Python: { slug: "python", color: "#3776AB" },
  "C++": { slug: "cplusplus", color: "#00599C" },
  C: { slug: "c", color: "#A8B9CC" },
  JavaScript: { slug: "javascript", color: "#F7DF1E" },
  PHP: { slug: "php", color: "#777BB4" },
  "Spring Boot": { slug: "springboot", color: "#6DB33F" },
  Spring: { slug: "spring", color: "#6DB33F" },
  Hibernate: { slug: "hibernate", color: "#59666C" },
  Django: { slug: "django", color: "#092E20" },
  Flask: { slug: "flask", color: "#000000" },
  Streamlit: { slug: "streamlit", color: "#FF4B4B" },
  Redis: { slug: "redis", color: "#DC382D" },
  RabbitMQ: { slug: "rabbitmq", color: "#FF6600" },
  Docker: { slug: "docker", color: "#2496ED" },
  Maven: { slug: "apachemaven", color: "#C71A36" },
  Solr: { slug: "apachesolr", color: "#D9411E" },
  Git: { slug: "git", color: "#F05032" },
  "REST API": { slug: "openapiinitiative", color: "#6BA539" },
  MongoDB: { slug: "mongodb", color: "#47A248" },
  MySQL: { slug: "mysql", color: "#4479A1" },
  OpenCV: { slug: "opencv", color: "#5C3EE8" },
  NumPy: { slug: "numpy", color: "#013243" },
  Pandas: { slug: "pandas", color: "#150458" },
  AWS: { slug: "_local_", color: "#FF9900" },
};

/* ==========================================================
   LAYOUT
   ========================================================== */
const SVG_W = 1060, SVG_H = 520;

interface BoxDef {
  id: string; label: string; subtitle: string;
  x: number; y: number; w: number; h: number;
  light: string; dark: string;
}

const VISITOR: BoxDef = { id: "visitor", label: "You", subtitle: "incoming request", x: 420, y: 18, w: 180, h: 58, light: "#6b7280", dark: "#9ca3af" };
const GATEWAY: BoxDef = { id: "gateway", label: "Gateway", subtitle: `${DATA.name} \u00B7 routing`, x: 380, y: 155, w: 260, h: 65, light: "#4b5563", dark: "#d1d5db" };

const SERVICES: BoxDef[] = [
  { id: "about", label: "About", subtitle: "stateless service", x: 40, y: 360, w: 210, h: 82, light: "#0891b2", dark: "#22d3ee" },
  { id: "projects", label: "Projects", subtitle: "read-heavy, cached", x: 285, y: 360, w: 210, h: 82, light: "#cc46a0", dark: "#f472b6" },
  { id: "experience", label: "Experience", subtitle: "event-sourced", x: 540, y: 360, w: 210, h: 82, light: "#813dbb", dark: "#a78bfa" },
  { id: "contact", label: "Contact", subtitle: "async, via queue", x: 795, y: 360, w: 210, h: 82, light: "#4c5fca", dark: "#818cf8" },
];

interface ArrowDef { id: string; d: string; label: string; lx: number; ly: number; endX: number; endY: number; ctrlX: number; ctrlY: number; svcIdx: number; }

const ARROWS: ArrowDef[] = [
  { id: "a-v-g", d: "M 510 76 L 510 155", label: "GET /", lx: 548, ly: 122, endX: 510, endY: 155, ctrlX: 510, ctrlY: 76, svcIdx: -1 },
  { id: "a-g-about", d: "M 510 220 Q 270 285 145 360", label: "GET /about", lx: 270, ly: 275, endX: 145, endY: 360, ctrlX: 270, ctrlY: 285, svcIdx: 0 },
  { id: "a-g-proj", d: "M 510 220 Q 440 285 390 360", label: "/projects", lx: 432, ly: 275, endX: 390, endY: 360, ctrlX: 440, ctrlY: 285, svcIdx: 1 },
  { id: "a-g-exp", d: "M 510 220 Q 580 285 645 360", label: "/experience", lx: 598, ly: 275, endX: 645, endY: 360, ctrlX: 580, ctrlY: 285, svcIdx: 2 },
  { id: "a-g-contact", d: "M 510 220 Q 760 285 900 360", label: "POST /contact", lx: 760, ly: 275, endX: 900, endY: 360, ctrlX: 760, ctrlY: 285, svcIdx: 3 },
];

const ALL_BOXES = [VISITOR, GATEWAY, ...SERVICES];

/* ==========================================================
   THEME — GTA 6 Vice City neon
   ========================================================== */
function theme(dk: boolean) {
  return dk
    ? { stroke: "#c1c2c5", strokeMuted: "#5c5f66", bg: "#1e1e1e", surface: "#2a2a2a", alt: "#333333", text: "#e9ecef", muted: "#909296", accent: "#4dabf7", accentSoft: "#1a3a5c", chaos: "#ff8787", green: "#51cf66" }
    : { stroke: "#343a40", strokeMuted: "#adb5bd", bg: "#f8f9fa", surface: "#ffffff", alt: "#f1f3f5", text: "#212529", muted: "#6c757d", accent: "#228be6", accentSoft: "#d0ebff", chaos: "#ff6b6b", green: "#2b8a3e" };
}

function bc(b: BoxDef, dk: boolean) { return dk ? b.dark : b.light; }
function ac(a: ArrowDef, dk: boolean) { return a.svcIdx < 0 ? (dk ? "#9ca3af" : "#6b7280") : bc(SERVICES[a.svcIdx], dk); }

/* ==========================================================
   HOOKS
   ========================================================== */
function useTyping(text: string, speed = 35) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut(""); setDone(false);
    let i = 0;
    const t = setInterval(() => { if (i < text.length) { setOut(text.slice(0, ++i)); } else { setDone(true); clearInterval(t); } }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return { out, done };
}

function useUptime() {
  const start = useRef(0);
  const [up, setUp] = useState("0s");
  useEffect(() => {
    start.current = Date.now();
    const t = setInterval(() => {
      const s = Math.floor((Date.now() - start.current) / 1000);
      const m = Math.floor(s / 60);
      setUp(m > 0 ? `${m}m ${s % 60}s` : `${s}s`);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return up;
}

/* ==========================================================
   MAIN COMPONENT
   ========================================================== */
export default function ExcalidrawPortfolio() {
  const svgRef = useRef<SVGSVGElement>(null);
  const roughG = useRef<SVGGElement>(null);

  const [dk, setDk] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [chaos, setChaos] = useState<string | null>(null);
  const [palette, setPalette] = useState(false);
  const [palQ, setPalQ] = useState("");
  const [palIdx, setPalIdx] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [reqs, setReqs] = useState(0);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dS = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const c = theme(dk);
  const uptime = useUptime();

  const bump = useCallback(() => setReqs(r => r + 1), []);

  useEffect(() => { const mq = window.matchMedia("(prefers-color-scheme: dark)"); setDk(mq.matches); const fn = (e: MediaQueryListEvent) => setDk(e.matches); mq.addEventListener("change", fn); return () => mq.removeEventListener("change", fn); }, []);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  /* ---- rough.js ---- */
  useEffect(() => {
    const svg = svgRef.current, g = roughG.current;
    if (!svg || !g) return;
    while (g.firstChild) g.removeChild(g.firstChild);
    const rc = rough.svg(svg);

    for (const box of ALL_BOXES) {
      const col = bc(box, dk);
      const isAct = active === box.id, isC = chaos === box.id;
      const node = rc.rectangle(box.x, box.y, box.w, box.h, {
        roughness: 1.5, bowing: 1,
        stroke: isC ? c.chaos : col,
        strokeWidth: isAct ? 2.8 : 2,
        fill: isC ? c.chaos + "22" : isAct ? col + "18" : undefined,
        fillStyle: isC ? "cross-hatch" : "solid", fillWeight: isC ? 2 : 1,
      });
      if (isC) { const cx = box.x + box.w / 2, cy = box.y + box.h / 2; node.setAttribute("transform", `rotate(${(Math.random() * 6 - 3).toFixed(1)} ${cx} ${cy})`); }
      g.appendChild(node);
    }

    for (const a of ARROWS) {
      const col = ac(a, dk);
      g.appendChild(rc.path(a.d, { roughness: 0.7, stroke: col, strokeWidth: 1.6 }));
      const dx = a.endX - a.ctrlX, dy = a.endY - a.ctrlY, ang = Math.atan2(dy, dx), len = 10, sp = Math.PI / 6;
      g.appendChild(rc.line(a.endX, a.endY, a.endX - len * Math.cos(ang - sp), a.endY - len * Math.sin(ang - sp), { roughness: 0.3, stroke: col, strokeWidth: 1.6 }));
      g.appendChild(rc.line(a.endX, a.endY, a.endX - len * Math.cos(ang + sp), a.endY - len * Math.sin(ang + sp), { roughness: 0.3, stroke: col, strokeWidth: 1.6 }));
    }
  }, [dk, active, chaos, c]);

  const onWheel = useCallback((e: React.WheelEvent) => { e.stopPropagation(); setZoom(z => Math.min(Math.max(z - e.deltaY * 0.0008, 0.35), 2.5)); }, []);
  const onPD = useCallback((e: React.PointerEvent) => { if ((e.target as Element).closest('[role="button"]')) return; dragging.current = true; dS.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }; (e.target as Element).setPointerCapture?.(e.pointerId); }, [pan]);
  const onPM = useCallback((e: React.PointerEvent) => { if (!dragging.current) return; setPan({ x: dS.current.px + (e.clientX - dS.current.x), y: dS.current.py + (e.clientY - dS.current.y) }); }, []);
  const onPU = useCallback(() => { dragging.current = false; }, []);
  const resetV = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);
  const triggerChaos = useCallback(() => { bump(); const s = SERVICES[Math.floor(Math.random() * SERVICES.length)]; setChaos(s.id); setTimeout(() => setChaos(null), 3000); }, [bump]);
  const closePanel = useCallback(() => { setActive(null); resetV(); }, [resetV]);
  const openPanel = useCallback((id: string) => { bump(); setActive(prev => { if (prev === id) { resetV(); return null; } return id; }); }, [bump, resetV]);

  /* ---- keyboard ---- */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setPalette(p => !p); setPalQ(""); setPalIdx(0); }
      if (e.key === "Escape") { if (palette) setPalette(false); else if (active) closePanel(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, palette, closePanel]);

  const cmds = [
    { label: "About", action: () => openPanel("about") },
    { label: "Projects", action: () => openPanel("projects") },
    { label: "Experience", action: () => openPanel("experience") },
    { label: "Contact", action: () => openPanel("contact") },
    { label: dk ? "Whiteboard" : "Blackboard", action: () => { bump(); setDk(d => !d); } },
    { label: "Chaos Monkey", action: triggerChaos },
    { label: "Reset Zoom", action: resetV },
    { label: "Download Resume", action: () => window.open("/resume.pdf", "_blank") },
  ];
  const filt = palQ ? cmds.filter(x => x.label.toLowerCase().includes(palQ.toLowerCase())) : cmds;
  const runC = (i: number) => { filt[i]?.action(); setPalette(false); setPalQ(""); };

  /* ========== DIAGRAM VIEW ========== */
  return (
    <div data-theme={dk ? "dark" : "light"} className="min-h-screen flex flex-col dot-grid" style={{ backgroundColor: c.bg, color: c.text }}>
      <header className="px-5 pt-5 pb-1 z-10">
        <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap gap-3">
          <div><h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{DATA.name}</h1><p className="text-base mt-0.5" style={{ color: c.muted }}>{DATA.title}</p></div>
          <div className="flex items-center gap-3">
            <button onClick={() => { bump(); setDk(d => !d); }} className="p-2 rounded-lg border cursor-pointer transition-colors hover:opacity-80"
              style={{ borderColor: c.strokeMuted + "44", backgroundColor: c.surface }}
              aria-label={dk ? "Switch to light mode" : "Switch to dark mode"}>
              {dk
                ? <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
            </button>
            <ResumeBtn c={c} />
          </div>
        </div>
      </header>

      <div className={`flex-1 overflow-hidden relative canvas-grab ${dragging.current ? "is-panning" : ""}`}
        onWheel={onWheel} onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU}>
        {/* Tools — left side */}
        <div className="absolute left-4 top-3 z-10 flex flex-col gap-1.5">
          <button className="toolbar-btn flex items-center justify-center cursor-pointer" style={{ background: c.surface, border: `1.5px solid ${c.strokeMuted}55`, borderRadius: 10, width: 44, height: 44 }} onClick={() => { setPalette(true); setPalQ(""); setPalIdx(0); }} title="Ctrl+K">
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button className="toolbar-btn flex items-center justify-center cursor-pointer" style={{ background: c.surface, border: `1.5px solid ${c.strokeMuted}55`, borderRadius: 10, width: 44, height: 44 }} onClick={triggerChaos} title="Chaos Monkey">
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </button>
        </div>
        {/* Zoom controls — right side */}
        <div className="absolute right-4 top-3 z-10 flex flex-col gap-1.5">
          <button className="toolbar-btn flex items-center justify-center cursor-pointer" style={{ background: c.surface, border: `1.5px solid ${c.strokeMuted}55`, borderRadius: 10, width: 44, height: 44, fontSize: 20, fontWeight: 600 }} onClick={() => setZoom(z => Math.min(z + 0.15, 2.5))}>+</button>
          <button className="toolbar-btn flex items-center justify-center cursor-pointer" style={{ background: c.surface, border: `1.5px solid ${c.strokeMuted}55`, borderRadius: 10, width: 44, height: 44, fontSize: 20, fontWeight: 600 }} onClick={() => setZoom(z => Math.max(z - 0.15, 0.35))}>&minus;</button>
          <button className="toolbar-btn flex items-center justify-center cursor-pointer" style={{ background: c.surface, border: `1.5px solid ${c.strokeMuted}55`, borderRadius: 10, width: 44, height: 44, fontSize: 13, fontWeight: 600 }} onClick={resetV}>Fit</button>
        </div>
        <svg ref={svgRef} viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-6xl mx-auto select-none"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center top", maxHeight: active ? "48vh" : "60vh", opacity: ready ? 1 : 0, transition: dragging.current ? "opacity 0.4s" : "opacity 0.4s, transform 0.15s ease-out" }}
          role="img" aria-label="System architecture diagram">
          <defs>{ARROWS.map(a => <path key={a.id} id={a.id} d={a.d} fill="none" />)}</defs>
          <g ref={roughG} />

          {hover && !chaos && (() => { const b = SERVICES.find(s => s.id === hover); if (!b) return null; const col = bc(b, dk); return <rect x={b.x - 5} y={b.y - 5} width={b.w + 10} height={b.h + 10} rx="6" fill="none" stroke={col} strokeWidth="2.5" opacity="0.5" style={{ filter: `drop-shadow(0 0 12px ${col})` }} />; })()}

          {ALL_BOXES.map(box => { const col = bc(box, dk); return (
            <g key={box.id}>
              <text x={box.x + box.w / 2} y={box.y + box.h / 2 - 6} textAnchor="middle" dominantBaseline="central" fill={chaos === box.id ? c.chaos : c.text} style={{ fontFamily: "var(--font-hand)", fontSize: box.id === "visitor" || box.id === "gateway" ? 18 : 20, fontWeight: 600 }}>{chaos === box.id ? "503" : box.label}</text>
              <text x={box.x + box.w / 2} y={box.y + box.h / 2 + 16} textAnchor="middle" dominantBaseline="central" fill={chaos === box.id ? c.chaos : col} style={{ fontFamily: "var(--font-hand)", fontSize: 12, fontStyle: "italic" }}>{chaos === box.id ? "Service Unavailable" : box.subtitle}</text>
            </g>
          ); })}

          {ARROWS.map(a => <text key={a.id + "-l"} x={a.lx} y={a.ly} textAnchor="middle" fill={ac(a, dk)} style={{ fontFamily: "var(--font-mono)", fontSize: 10.5 }}>{a.label}</text>)}

          {ARROWS.map((a, i) => (
            <circle key={a.id + "-p"} r="4.5" fill={ac(a, dk)} opacity="0.7">
              <animateMotion dur={`${1.8 + i * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.25}s`}><mpath href={`#${a.id}`} /></animateMotion>
            </circle>
          ))}

          {SERVICES.map(box => (
            <rect key={box.id + "-c"} x={box.x} y={box.y} width={box.w} height={box.h} fill="transparent" className="cursor-pointer"
              role="button" tabIndex={0} aria-label={`Open ${box.label} panel`}
              onClick={() => openPanel(box.id)}
              onMouseEnter={() => setHover(box.id)} onMouseLeave={() => setHover(null)}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPanel(box.id); } }} />
          ))}

          <text x={VISITOR.x + VISITOR.w + 14} y={VISITOR.y + VISITOR.h / 2 + 2} fill={c.muted} style={{ fontFamily: "var(--font-hand)", fontSize: 13, fontStyle: "italic" }}>&larr; your request starts here</text>
          <text x={GATEWAY.x - 10} y={GATEWAY.y + GATEWAY.h / 2} textAnchor="end" fill={c.muted} style={{ fontFamily: "var(--font-hand)", fontSize: 12, fontStyle: "italic" }}>handles auth &amp; routing</text>
        </svg>
      </div>

      {active && (
        <div className="animate-slide-down px-4 pb-6 max-w-5xl mx-auto w-full">
          <div className="rounded-xl border-2 p-6" style={{ borderColor: bc(SERVICES.find(s => s.id === active)!, dk), backgroundColor: c.surface }}>
            <PanelHead id={active} dk={dk} c={c} onClose={closePanel} />
            <PanelBody id={active} c={c} dk={dk} />
          </div>
        </div>
      )}

      <StatusFooter chaos={chaos} c={c} uptime={uptime} reqs={reqs} />

      {palette && (
        <div className="palette-backdrop" onClick={() => setPalette(false)}>
          <div className="palette-box animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <input autoFocus className="palette-input" placeholder={"Type a command\u2026"} value={palQ}
              onChange={e => { setPalQ(e.target.value); setPalIdx(0); }}
              onKeyDown={e => { if (e.key === "ArrowDown") setPalIdx(i => Math.min(i + 1, filt.length - 1)); if (e.key === "ArrowUp") setPalIdx(i => Math.max(i - 1, 0)); if (e.key === "Enter") runC(palIdx); if (e.key === "Escape") setPalette(false); }} />
            <div className="py-1">
              {filt.map((cmd, i) => <div key={cmd.label} className={`palette-item ${i === palIdx ? "active" : ""}`} onClick={() => runC(i)}>{cmd.label}</div>)}
              {filt.length === 0 && <p className="px-5 py-3 text-sm" style={{ color: c.muted }}>No matches</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
   PANEL HEADER
   ========================================================== */
function PanelHead({ id, dk, c, onClose }: { id: string; dk: boolean; c: ReturnType<typeof theme>; onClose: () => void }) {
  const svc = SERVICES.find(s => s.id === id)!;
  const col = bc(svc, dk);
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        {svc.label}
        <span className="text-xs font-normal px-2.5 py-1 rounded-full" style={{ backgroundColor: col + "20", color: col, fontFamily: "var(--font-mono)" }}>200 OK</span>
      </h2>
      <button onClick={onClose} className="text-2xl leading-none cursor-pointer opacity-50 hover:opacity-100 transition-opacity">&times;</button>
    </div>
  );
}

/* ==========================================================
   PANELS
   ========================================================== */
function PanelBody({ id, c, dk }: { id: string; c: ReturnType<typeof theme>; dk: boolean }) {
  switch (id) {
    case "about": return <AboutPanel c={c} dk={dk} />;
    case "projects": return <ProjectsPanel c={c} dk={dk} />;
    case "experience": return <ExperiencePanel c={c} dk={dk} />;
    case "contact": return <ContactPanel c={c} dk={dk} />;
    default: return null;
  }
}

/* ---- ABOUT ---- */
function AboutPanel({ c, dk }: { c: ReturnType<typeof theme>; dk: boolean }) {
  const full = DATA.tagline.join("\n");
  const { out, done } = useTyping(full, 18);
  const lines = out.split("\n");

  return (
    <div className="space-y-6">
      <div className="text-base leading-relaxed min-h-[4.5em] space-y-1">
        {lines.map((line, i) => (
          <p key={i}>{line}{i === lines.length - 1 && <span style={{ opacity: done ? 0 : 1, animation: "blink 0.8s infinite" }}>|</span>}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {DATA.stats.map(s => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl px-5 py-4 border" style={{ backgroundColor: c.alt, borderColor: c.strokeMuted + "33" }}>
            <span className="text-3xl">{s.icon}</span>
            <div>
              <div className="text-2xl font-bold" style={{ color: c.accent }}>{s.value}</div>
              <div className="text-xs" style={{ color: c.muted, fontFamily: "var(--font-mono)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card c={c} title={"🎓 Education"}>
        <p className="font-semibold">{DATA.education.institution}</p>
        <p style={{ color: c.muted }}>{DATA.education.degree} &middot; CGPA {DATA.education.cgpa} &middot; {DATA.education.period}</p>
      </Card>

      <Card c={c} title={"💻 Language Proficiency"}>
        <div className="space-y-3 mt-2">
          {DATA.languages.map(l => <SkillBar key={l.name} name={l.name} level={l.level} dk={dk} />)}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(DATA.skills).map(([cat, items]) => {
          const ic: Record<string, string> = { Languages: "💬", "Frameworks & Libraries": "⚡", "Tools & Infra": "🔧", Databases: "🗄️", "ML & Data": "🧠", Cloud: "☁️" };
          return (
            <Card key={cat} c={c} title={`${ic[cat] || "📦"} ${cat}`}>
              <div className="flex flex-wrap gap-2 mt-1">
                {(items as string[]).map(name => <TechBadge key={name} name={name} dk={dk} c={c} />)}
              </div>
            </Card>
          );
        })}
      </div>

      <Card c={c} title={"🎮 Also Running"}>
        <div className="flex flex-wrap gap-3 mt-1">
          {DATA.interests.map(i => (
            <div key={i.name} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border" style={{ borderColor: c.accent + "33", backgroundColor: c.accentSoft + "44" }}>
              <span className="text-xl">{i.icon}</span>
              <div><div className="text-sm font-semibold">{i.name} Service</div><div className="text-xs" style={{ color: c.muted, fontFamily: "var(--font-mono)" }}>uptime: {i.uptime}</div></div>
            </div>
          ))}
        </div>
      </Card>

      <TradeOff c={c}>Specialized in Java + Spring for enterprise-scale. Python for prototyping and ML. MongoDB when the schema needs flexibility, MySQL when it needs rigour.</TradeOff>
    </div>
  );
}

/* ---- SKILL BAR ---- */
function SkillBar({ name, level, dk }: { name: string; level: number; dk: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const W = 200;
  useEffect(() => {
    const svg = svgRef.current, g = gRef.current;
    if (!svg || !g) return;
    while (g.firstChild) g.removeChild(g.firstChild);
    const rc = rough.svg(svg);
    g.appendChild(rc.rectangle(0, 1, W, 14, { roughness: 0.8, stroke: dk ? "#3a3a3a" : "#e9ecef", strokeWidth: 1, fill: dk ? "#2a2a2a" : "#e9ecef", fillStyle: "solid" }));
    g.appendChild(rc.rectangle(0, 1, W * (level / 100), 14, { roughness: 1.1, stroke: dk ? "#4dabf7" : "#228be6", strokeWidth: 1, fill: (dk ? "#4dabf7" : "#228be6") + "66", fillStyle: "solid" }));
  }, [name, level, dk, W]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm w-24 text-right" style={{ fontFamily: "var(--font-hand)" }}>{name}</span>
      <svg ref={svgRef} viewBox={`0 0 ${W} 16`} className="flex-1 max-w-[200px] h-[18px]"><g ref={gRef} /></svg>
      <span className="text-xs w-10 tabular-nums" style={{ color: dk ? "#909296" : "#6c757d", fontFamily: "var(--font-mono)" }}>{level}%</span>
    </div>
  );
}

/* ---- PROJECTS ---- */
function ProjectsPanel({ c, dk }: { c: ReturnType<typeof theme>; dk: boolean }) {
  return (
    <div className="space-y-6">
      {DATA.projects.map(proj => (
        <div key={proj.name} className="rounded-xl border p-6" style={{ borderColor: c.accent + "33" }}>
          {/* Project header */}
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl mt-0.5">{proj.icon}</span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{proj.name}</h3>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: c.muted }}>{proj.description}</p>
            </div>
          </div>

          {/* Metrics */}
          {proj.metrics && (
            <div className="flex flex-wrap gap-2.5 mb-5">
              {proj.metrics.map(m => (
                <span key={m.label} className="inline-flex flex-col px-3.5 py-2 rounded-lg border" style={{ borderColor: c.accent + "33", backgroundColor: c.accentSoft + "18" }}>
                  <span className="font-bold" style={{ color: c.accent, fontFamily: "var(--font-mono)", fontSize: 14 }}>{m.value}</span>
                  <span style={{ color: c.muted, fontSize: 10, marginTop: 2 }}>{m.label}</span>
                </span>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b" style={{ borderColor: c.strokeMuted + "22" }}>
            {proj.tech.map(t => <TechBadge key={t} name={t} dk={dk} c={c} />)}
          </div>

          {/* Architecture diagram */}
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.muted, letterSpacing: "0.08em" }}>Architecture</h4>
          <MiniArch flow={proj.flow} dk={dk} />

          {/* Highlights */}
          {proj.highlights && (
            <>
              <h4 className="text-xs font-semibold uppercase tracking-wider mt-5 mb-3" style={{ color: c.muted, letterSpacing: "0.08em" }}>How It Works</h4>
              <ul className="space-y-2">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed">
                    <span style={{ color: c.accent }} className="mt-0.5 shrink-0 font-bold">&rsaquo;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Live link */}
          {proj.link && (
            <a href={proj.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: c.accent + "15", color: c.accent, border: `1.5px solid ${c.accent}33` }}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
        </div>
      ))}
      <TradeOff c={c}>Both projects favor simplicity: H2 for zero-config persistence, Spring Boot for rapid API scaffolding.</TradeOff>
    </div>
  );
}

/* ---- SYSTEM DESIGN ICONS ---- */
const SD_ICONS: Record<string, { path: string; vb?: string }> = {
  database: { path: "M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2c4.42 0 8 1.57 8 3.5S16.42 11 12 11 4 9.43 4 7.5 7.58 4 12 4zM4 17.5v-3.27C5.97 15.79 8.84 17 12 17s6.03-1.21 8-2.77v3.27c0 1.93-3.58 3.5-8 3.5S4 19.43 4 17.5z" },
  cache: { path: "M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 1.16-.26 2.29-.73 3.33l1.47 1.47C21.54 15.26 22 13.67 22 12c0-5.18-3.95-9.45-9-9.95zM12 4C7.03 4 3 8.03 3 13s4.03 9 9 9c1.67 0 3.26-.46 4.6-1.27l-1.47-1.47A6.93 6.93 0 0112 20c-3.87 0-7-3.13-7-7s3.13-7 7-7V4zm-1 5v5l4.25 2.52.77-1.28L13 13.2V9h-2z" },
  script: { path: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-4h8v2H8v-2zm0-4h8v2H8v-2z" },
  queue: { path: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" },
  search: { path: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
  api: { path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10-4h2v6h-2v-6z" },
  cloud: { path: "M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" },
  image: { path: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" },
  video: { path: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" },
  gateway: { path: "M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66l.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" },
  output: { path: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" },
  service: { path: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z" },
  upload: { path: "M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" },
};

const SD_TYPE_COLORS: Record<string, { light: string; dark: string }> = {
  database: { light: "#4479A1", dark: "#74b9f7" },
  cache: { light: "#DC382D", dark: "#ff8787" },
  script: { light: "#6c757d", dark: "#adb5bd" },
  queue: { light: "#FF6600", dark: "#ffaa66" },
  search: { light: "#D9411E", dark: "#ff8866" },
  api: { light: "#228be6", dark: "#74c0fc" },
  cloud: { light: "#7c3aed", dark: "#c4b5fd" },
  image: { light: "#2b8a3e", dark: "#69db7c" },
  video: { light: "#e64980", dark: "#faa2c1" },
  gateway: { light: "#f59f00", dark: "#ffe066" },
  output: { light: "#2b8a3e", dark: "#69db7c" },
  service: { light: "#495057", dark: "#ced4da" },
  upload: { light: "#1098ad", dark: "#66d9e8" },
};

interface FlowNode { label: string; type: string; note?: string }
type FlowStep = FlowNode | FlowNode[];  // array = parallel branch

/* ---- layout helpers ---- */
interface LayoutNode { cx: number; cy: number; node: FlowNode }
interface LayoutCol { x: number; nodes: LayoutNode[]; w: number }

function layoutFlow(flow: FlowStep[], pad: number, colW: number, gap: number, rowH: number): { cols: LayoutCol[]; totalW: number; totalH: number } {
  let maxRows = 1;
  const cols: LayoutCol[] = [];
  let x = pad;
  for (const step of flow) {
    const items = Array.isArray(step) ? step : [step];
    if (items.length > maxRows) maxRows = items.length;
    const nodes: LayoutNode[] = items.map((n, j) => ({ cx: x + colW / 2, cy: 0, node: n }));
    cols.push({ x, nodes, w: colW });
    x += colW + gap;
  }
  const totalH = maxRows * rowH + 24;
  const midY = totalH / 2;
  for (const col of cols) {
    const n = col.nodes.length;
    const blockH = n * rowH;
    const startY = midY - blockH / 2 + rowH / 2;
    col.nodes.forEach((ln, j) => { ln.cy = startY + j * rowH; });
  }
  return { cols, totalW: x - gap + pad, totalH };
}

/* ---- MINI ARCH with system-design icons + parallel branches ---- */
function MiniArch({ flow, dk }: { flow: FlowStep[]; dk: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null), gRef = useRef<SVGGElement>(null);
  const colW = 82, gap = 38, pad = 10, rowH = 56, iconS = 26;
  const { cols, totalW, totalH } = layoutFlow(flow, pad, colW, gap, rowH);

  useEffect(() => {
    const svg = svgRef.current, g = gRef.current;
    if (!svg || !g) return;
    while (g.firstChild) g.removeChild(g.firstChild);
    const rc = rough.svg(svg);
    const lc = dk ? "#5c5f66" : "#adb5bd";

    for (let i = 0; i < cols.length - 1; i++) {
      const cur = cols[i], next = cols[i + 1];
      for (const src of cur.nodes) {
        for (const dst of next.nodes) {
          const x1 = src.cx + colW / 2 - 4, x2 = dst.cx - colW / 2 + 4;
          const y1 = src.cy - 6, y2 = dst.cy - 6;
          if (Math.abs(y1 - y2) < 2) {
            g.appendChild(rc.line(x1, y1, x2, y2, { roughness: 0.6, stroke: lc, strokeWidth: 1.3 }));
          } else {
            const mx = (x1 + x2) / 2;
            g.appendChild(rc.path(`M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`, { roughness: 0.5, stroke: lc, strokeWidth: 1.3, fill: "none" }));
          }
          // arrowhead
          g.appendChild(rc.line(x2, y2, x2 - 6, y2 - 3.5, { roughness: 0.2, stroke: lc, strokeWidth: 1.2 }));
          g.appendChild(rc.line(x2, y2, x2 - 6, y2 + 3.5, { roughness: 0.2, stroke: lc, strokeWidth: 1.2 }));
        }
      }
    }

    // dashed box around parallel groups
    for (const col of cols) {
      if (col.nodes.length > 1) {
        const py = col.nodes[0].cy - rowH / 2 - 2;
        const ph = col.nodes.length * rowH + 4;
        g.appendChild(rc.rectangle(col.x - 2, py, colW + 4, ph, {
          roughness: 1.2, stroke: dk ? "#4a4a55" : "#c9cdd2", strokeWidth: 1, fill: "none",
          strokeLineDash: [5, 4],
        }));
      }
    }
  }, [flow, dk, cols, colW, rowH, totalH]);

  return (
    <div className="overflow-x-auto rounded-xl py-3 px-2 my-2" style={{ backgroundColor: dk ? "#1e1e24" : "#f8f9fa", border: `1px solid ${dk ? "#333" : "#e9ecef"}` }}>
      <svg ref={svgRef} viewBox={`0 0 ${totalW} ${totalH}`} style={{ minWidth: totalW, height: totalH }}>
        <g ref={gRef} />
        {cols.map((col, ci) => col.nodes.map((ln, ni) => {
          const tc = SD_TYPE_COLORS[ln.node.type] || SD_TYPE_COLORS.service;
          const col2 = dk ? tc.dark : tc.light;
          const iconDef = SD_ICONS[ln.node.type] || SD_ICONS.service;
          return (
            <g key={`${ci}-${ni}`}>
              <rect x={ln.cx - iconS / 2 - 8} y={ln.cy - iconS / 2 - 12} width={iconS + 16} height={iconS + 8} rx={6} fill={col2 + "15"} stroke={col2 + "44"} strokeWidth={1} />
              <svg x={ln.cx - iconS / 2} y={ln.cy - iconS / 2 - 8} width={iconS} height={iconS} viewBox="0 0 24 24">
                <path d={iconDef.path} fill={col2} opacity={0.9} />
              </svg>
              <text x={ln.cx} y={ln.cy + iconS / 2 + 4} textAnchor="middle" dominantBaseline="central" fill={dk ? "#d1d5db" : "#1f2937"} style={{ fontFamily: "var(--font-hand)", fontSize: 9, fontWeight: 500 }}>{ln.node.label}</text>
              {ln.node.note && <text x={ln.cx} y={ln.cy + iconS / 2 + 16} textAnchor="middle" fill={col2} style={{ fontFamily: "var(--font-mono)", fontSize: 7.5, fontWeight: 600 }}>{ln.node.note}</text>}
            </g>
          );
        }))}
      </svg>
    </div>
  );
}

/* ---- EXPERIENCE ---- */
function ExperiencePanel({ c, dk }: { c: ReturnType<typeof theme>; dk: boolean }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl p-4 overflow-x-auto border" style={{ backgroundColor: c.alt, borderColor: c.strokeMuted + "33" }}>
        <div className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ fontFamily: "var(--font-mono)" }}>
          <PipeN c={c} label="👤 Client" sub="(you)" />
          <PipeA c={c} />
          <PipeN c={c} label="🚪 Gateway" sub="niraj.dev" />
          <PipeA c={c} />
          {DATA.experience.slice().reverse().map((exp, i, arr) => (
            <span key={exp.company} className="contents">
              <span className="inline-flex flex-col items-center border-2 rounded-lg px-3 py-1.5" style={{ borderColor: c.accent + "55", backgroundColor: c.accentSoft + "44" }}>
                <CompanyLogo name={exp.icon} size={24} />
                <span className="font-semibold text-xs mt-0.5">{exp.company.split(" ")[0]}</span>
                <span className="text-xs" style={{ color: c.muted }}>{exp.latency}</span>
              </span>
              {i < arr.length - 1 && <PipeA c={c} />}
            </span>
          ))}
          <PipeA c={c} />
          <PipeN c={c} label="✅ Response" sub="(now)" glow />
        </div>
      </div>

      {DATA.experience.map(exp => (
        <div key={exp.company} className="rounded-xl border p-6" style={{ borderColor: c.accent + "33" }}>
          {/* Company header */}
          <div className="flex items-center gap-4 mb-4">
            <CompanyLogo name={exp.icon} dk={dk} size={48} />
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{exp.company}</h3>
              <p className="text-sm mt-0.5" style={{ color: c.muted }}>{exp.role}</p>
              <p className="text-xs mt-0.5" style={{ color: c.muted, fontFamily: "var(--font-mono)" }}>{exp.period} &middot; {exp.location}</p>
            </div>
          </div>

          {/* Impact metrics */}
          {exp.metrics && (
            <div className="flex flex-wrap gap-2.5 mb-5">
              {exp.metrics.map(m => (
                <span key={m.label} className="inline-flex flex-col px-3.5 py-2 rounded-lg border" style={{ borderColor: c.accent + "33", backgroundColor: c.accentSoft + "18" }}>
                  <span className="font-bold" style={{ color: c.accent, fontFamily: "var(--font-mono)", fontSize: 14 }}>{m.value}</span>
                  <span style={{ color: c.muted, fontSize: 10, marginTop: 2 }}>{m.label}</span>
                </span>
              ))}
            </div>
          )}

          {/* Tech stack used */}
          {exp.stack && (
            <div className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b" style={{ borderColor: c.strokeMuted + "22" }}>
              {exp.stack.map(t => <TechBadge key={t} name={t} dk={dk} c={c} />)}
            </div>
          )}

          {/* Highlights */}
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: c.muted, letterSpacing: "0.08em" }}>Key Contributions</h4>
          <ul className="space-y-5">
            {exp.highlights.map((h, i) => (
              <li key={i}>
                <div className="flex gap-2 text-sm leading-relaxed">
                  <span style={{ color: c.accent }} className="mt-0.5 shrink-0 font-bold">&rsaquo;</span>
                  <span>{h.text}</span>
                </div>
                {h.flow && <div className="ml-5 mt-2"><MiniArch flow={h.flow} dk={dk} /></div>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <TradeOff c={c}>Career optimized for depth: mastered Java + Spring + Redis + Solr at scale before branching into energy-tech at Enphase.</TradeOff>
    </div>
  );
}

/* ---- CONTACT ---- */
function ContactPanel({ c, dk }: { c: ReturnType<typeof theme>; dk: boolean }) {
  const col = bc(SERVICES[3], dk);

  return (
    <div className="space-y-6">
      <p style={{ fontFamily: "var(--font-mono)", color: c.muted, fontSize: 14 }}>POST /contact &rarr; 200 OK</p>

      <pre className="rounded-xl p-5 overflow-x-auto text-sm border" style={{ backgroundColor: c.alt, fontFamily: "var(--font-mono)", lineHeight: 1.9, borderColor: c.strokeMuted + "33" }}>
        <span style={{ color: c.muted }}>{"// response.body\n"}</span>
        <span>{"{\n"}</span>
        {"  "}<span style={{ color: col }}>&quot;email&quot;</span>{": "}<span style={{ color: c.green }}>&quot;{DATA.email}&quot;</span>{",\n"}
        {"  "}<span style={{ color: col }}>&quot;phone&quot;</span>{": "}<span style={{ color: c.green }}>&quot;{DATA.phone}&quot;</span>{",\n"}
        {"  "}<span style={{ color: col }}>&quot;status&quot;</span>{": "}<span style={{ color: c.green }}>&quot;available&quot;</span>{",\n"}
        {"  "}<span style={{ color: col }}>&quot;preferred&quot;</span>{": "}<span style={{ color: c.green }}>&quot;email&quot;</span>{"\n"}
        <span>{"}"}</span>
      </pre>

      {/* Service Registry — quick links with real brand-colored icons */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: c.accent }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
          Service Registry
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(DATA.links).map(([key, val]) => {
            let brandColor = PLATFORM_COLORS[key] || c.accent;
            if (key === "github" && dk) brandColor = "#e9ecef";
            if (key === "codechef" && dk) brandColor = "#c4a882";
            return (
              <a key={key} href={val.url} target="_blank" rel="noopener noreferrer" className="neon-card">
                <span style={{ color: brandColor }}><PlatformIcon name={key} size={22} /></span>
                <div>
                  <div className="text-sm font-semibold capitalize">{key}</div>
                  <div className="text-xs truncate" style={{ color: c.muted, fontFamily: "var(--font-mono)", maxWidth: 200 }}>{val.url.replace("https://", "")}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <TradeOff c={c}>Preferred: email for async, LinkedIn DMs for quick pings. Best response latency on weekday evenings IST.</TradeOff>
    </div>
  );
}

/* ==========================================================
   SHARED COMPONENTS
   ========================================================== */
function CompanyLogo({ name, dk, size = 40 }: { name: string; dk?: boolean; size?: number }) {
  if (name === "enphase") {
    return (
      <span className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border" style={{ width: size, height: size, borderColor: dk ? "#555" : "#ddd", background: dk ? "#1a1a1a" : "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/enphase.svg" alt="Enphase Energy" width={size - 6} height={size - 6} style={{ objectFit: "contain" }} />
      </span>
    );
  }
  if (name === "99acres") {
    return (
      <span className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border" style={{ width: size, height: size, borderColor: dk ? "#555" : "#ddd", background: dk ? "#1a1a1a" : "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/99acres.png" alt="99acres" width={size - 4} height={size - 4} style={{ objectFit: "contain" }} />
      </span>
    );
  }
  return <span className="text-2xl">{name}</span>;
}

function ResumeBtn({ c }: { c: ReturnType<typeof theme> }) {
  return (
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)`, color: "#fff", boxShadow: `0 4px 16px ${c.accent}44`, fontFamily: "var(--font-hand)" }}>
      <PlatformIcon name="download" size={16} /> Resume
    </a>
  );
}

function SmBtn({ c, children, onClick }: { c: ReturnType<typeof theme>; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className="px-3 py-1.5 rounded-lg text-sm cursor-pointer border transition-colors hover:opacity-80" style={{ borderColor: c.strokeMuted + "44", backgroundColor: c.surface, color: c.text, fontFamily: "var(--font-hand)" }}>{children}</button>;
}

function Card({ c, title, children }: { c: ReturnType<typeof theme>; title: string; children: React.ReactNode }) {
  return <div className="rounded-xl p-4 border" style={{ backgroundColor: c.alt, borderColor: c.strokeMuted + "33" }}><h3 className="font-semibold mb-2">{title}</h3>{children}</div>;
}

function Tag({ c, children }: { c: ReturnType<typeof theme>; children: React.ReactNode }) {
  return <span className="inline-block px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: c.accent + "18", color: c.accent, fontFamily: "var(--font-mono)" }}>{children}</span>;
}

/* Local logo files for icons not on Simple Icons CDN */
const LOCAL_ICONS: Record<string, string> = {
  Java: "/logos/java.svg",
  AWS: "/logos/aws.svg",
};

function TechBadge({ name, dk, c }: { name: string; dk: boolean; c: ReturnType<typeof theme> }) {
  const meta = TECH_META[name];
  if (!meta) return <Tag c={c}>{name}</Tag>;
  const iconColor = dk ? "ffffff" : meta.color.replace("#", "");
  const localSrc = LOCAL_ICONS[name];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors"
      style={{ borderColor: meta.color + "33", backgroundColor: meta.color + "0d", fontFamily: "var(--font-mono)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={localSrc || `https://cdn.simpleicons.org/${meta.slug}/${iconColor}`} width={16} height={16} alt={name} loading="lazy" style={{ objectFit: "contain" }} />
      <span style={{ color: dk ? "#e9ecef" : meta.color }}>{name}</span>
    </span>
  );
}

function TradeOff({ c, children }: { c: ReturnType<typeof theme>; children: React.ReactNode }) {
  return <div className="border-l-4 pl-4 py-2 text-sm" style={{ borderColor: c.accent, color: c.muted, fontStyle: "italic" }}><span style={{ color: c.accent, fontWeight: 600, fontStyle: "normal" }}>Trade-off: </span>{children}</div>;
}

function PSect({ title, c, children }: { title: string; c: ReturnType<typeof theme>; children: React.ReactNode }) {
  return <section className="mb-10"><h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: c.strokeMuted + "22" }}>{title}</h2>{children}</section>;
}

function PipeN({ c, label, sub, glow }: { c: ReturnType<typeof theme>; label: string; sub: string; glow?: boolean }) {
  return <span className="inline-flex flex-col items-center border-2 rounded-lg px-3 py-1.5" style={{ borderColor: glow ? c.accent + "55" : c.strokeMuted + "44", backgroundColor: glow ? c.accentSoft + "44" : c.surface }}><span className="font-semibold text-sm">{label}</span><span className="text-xs" style={{ color: c.muted }}>{sub}</span></span>;
}

function PipeA({ c }: { c: ReturnType<typeof theme> }) {
  return <span className="text-lg select-none" style={{ color: c.accent }}>&rarr;</span>;
}

function StatusFooter({ chaos, c, uptime, reqs }: { chaos: string | null; c: ReturnType<typeof theme>; uptime: string; reqs: number }) {
  const svc = chaos ? SERVICES.find(s => s.id === chaos) : null;
  return (
    <footer className="text-center py-3 mt-auto border-t" style={{ borderColor: c.strokeMuted + "15", color: c.muted, fontFamily: "var(--font-mono)", fontSize: 11 }}>
      {chaos && svc ? (
        <span><span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: c.chaos, animation: "pulseDot 1s infinite" }} />Service degraded: {svc.label} is down &middot; Retrying&hellip;</span>
      ) : (
        <span>
          <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: c.green }} />
          All systems operational &middot; Uptime {uptime} &middot; {reqs} requests &middot; Open to opportunities
          <span className="hidden sm:inline"> &middot; Ctrl+K</span>
        </span>
      )}
    </footer>
  );
}
