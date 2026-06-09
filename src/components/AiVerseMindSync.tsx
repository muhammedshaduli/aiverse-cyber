import { useState, useEffect, useRef } from "react";
import { 
  Brain, Shield, Sliders, Cpu, Eye, Activity, Database, Lock, 
  Trash2, Download, Play, Pause, ChevronRight, User, HelpCircle, 
  TrendingUp, BarChart2, Radio, UserCheck, AlertTriangle, Network,
  Briefcase, Landmark, RefreshCw, Layers, CheckCircle2, Search,
  Compass, ArrowRight, Settings, Sparkles, MessageSquare, Heart, Check,
  X, LockKeyhole, ShieldAlert, BookOpen, Globe, Layout, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ModuleSecurityGateway from "./ModuleSecurityGateway";

interface AiVerseMindSyncProps {
  onClose: () => void;
}

// ----------------------------------------------------
// DUMMY STATE GENERATORS (10,000+ behavioural events represented)
// ----------------------------------------------------
const REALISTIC_EVENTS = [
  { id: "ev-092", user: "Sarah Jenkins & 412 others", type: "Cognitive Shift", context: "Switching workspace layout directly prior to active meeting", timestamp: "Just now", action: "Recommend Zoom integration" },
  { id: "ev-091", user: "Dave Miller & 150 others", type: "Automation Pattern", context: "Exporting raw lead CSV repetitively at 17:00 UTC", timestamp: "2 mins ago", action: "Pre-compile automated pipeline" },
  { id: "ev-090", user: "Amara Al-Sayed & 89 others", type: "UI Preference Shift", context: "Reducing dashboard element padding during focus blocks", timestamp: "5 mins ago", action: "Auto-enable compact mode" },
  { id: "ev-089", user: "Enterprise Tenant node #44", type: "Predictive Intent", context: "Drafting Quarterly Financial Outline", timestamp: "12 mins ago", action: "Load previous financial schemas" },
  { id: "ev-088", user: "Gov Agency #03", type: "Policy Impact Check", context: "Analyzing citizen feedback logs", timestamp: "18 mins ago", action: "Optimize resource routing variables" },
  { id: "ev-087", user: "Marcus Vance", type: "Emotional Tone Drift", context: "Interaction frequency acceleration in slack sync channels", timestamp: "25 mins ago", action: "Flag focus fatigue block suggestion" }
];

export default function AiVerseMindSync({ onClose }: AiVerseMindSyncProps) {
  // Address bar / Router tab simulator
  const [activeUrl, setActiveUrl] = useState<string>("/mindsync");
  const [isCopilotOutput, setIsCopilotOutput] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // Interactive MindSync Settings
  const [learningEngaged, setLearningEngaged] = useState<boolean>(true);
  const [encryptionStatus, setEncryptionStatus] = useState<string>("AES-GCM-256 Enabled");
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(true);

  // Copilot Task Execution Simulation states
  const [executedTask, setExecutedTask] = useState<string | null>(null);
  const [memoryStore, setMemoryStore] = useState<any[]>([
    { id: "mem-1", key: "Dashboard Compact Layout", type: "UI Preference", entropy: "Low", date: "June 08, 2026" },
    { id: "mem-2", key: "Peak Productivity Window: 08:00 - 11:30", type: "Behavioral Track", entropy: "Stable", date: "June 07, 2026" },
    { id: "mem-3", key: "Sales Target CRM triggers", type: "Cognitive Intent", entropy: "High", date: "June 05, 2026" },
    { id: "mem-4", key: "Slack notification quiet hours", type: "Communication Preference", entropy: "Static", date: "June 04, 2026" },
    { id: "mem-5", key: "Executive report syntax style", type: "Writing Paradigm", entropy: "Evolving", date: "June 01, 2026" }
  ]);

  // Selected node details in the Interactive Neural Graph
  const [selectedGraphNode, setSelectedGraphNode] = useState<any>({
    id: "user-1",
    label: "Primary User Node (Self)",
    category: "Identity Core",
    connections: 5,
    details: "Universal user baseline mapping 1,420 cognitive features safely isolated at local premises."
  });

  // Emotional analysis active parameters
  const [emotionalSignalLog, setEmotionalSignalLog] = useState<{
    tone: string;
    focus: number;
    collaboration: number;
    engagement: number;
  }>({
    tone: "Focused & Analytical (Stable Balance)",
    focus: 94,
    collaboration: 88,
    engagement: 91
  });

  // Neural Brain Animation canvas ref
  const brainCanvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated live brain canvas interaction (Particle swarm that clusters on mousemove/ticks)
  useEffect(() => {
    const canvas = brainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 500);
    let height = (canvas.height = canvas.offsetHeight || 380);

    const particles: { x: number; y: number; originX: number; originY: number; vx: number; vy: number; radius: number; color: string; angle: number }[] = [];
    const numParticles = 120;

    // Create a circular neural path arrangement
    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2;
      // create neural structures: left hemisphere, right hemisphere & core stem
      const hemisphere = Math.random() > 0.5 ? 1 : -1;
      const r = (50 + Math.random() * 80);
      const x = width / 2 + Math.cos(angle) * r * (hemisphere * 1.2);
      const y = height / 2 + Math.sin(angle) * r * 0.75 + (Math.random() - 0.5) * 20;

      particles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: hemisphere > 0 ? "rgba(99, 102, 241, 0.7)" : "rgba(6, 182, 212, 0.7)",
        angle: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle backing brain geometry
      ctx.strokeStyle = "rgba(71, 85, 105, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Connect near particles with faint synapses
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.angle += 0.01;
        p1.x = p1.originX + Math.sin(p1.angle) * 8;
        p1.y = p1.originY + Math.cos(p1.angle) * 4;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 48) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 48)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // micro-glow for core thoughts
        if (Math.random() > 0.99) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.arc(p1.x, p1.y, p1.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw center interactive nucleus representation
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(6, 182, 212, 0.4)";
      ctx.fillStyle = "rgba(6, 182, 212, 0.85)";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth || 500;
      height = canvas.height = canvas.offsetHeight || 380;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const triggerCopilotAction = (taskName: string) => {
    setIsAnalyzing(true);
    setExecutedTask(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setExecutedTask(taskName);
      // Append a live synthetic history event
      const newEvent = {
        id: `ev-${Math.floor(Math.random() * 400 + 100)}`,
        user: "Sarah Jenkins (Self)",
        type: "Predictive Assistant",
        context: `Executed suggested macro for "${taskName}"`,
        timestamp: "Just now",
        action: "Automation Trigger Succeeded"
      };
      // Keep real events length fixed
      setMemoryStore(prev => [
        { id: `mem-${Date.now()}`, key: taskName, type: "Copilot Automation", entropy: "Stable", date: "Just now" },
        ...prev
      ]);
    }, 1200);
  };

  const deleteMemoryItem = (id: string) => {
    setMemoryStore(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Decorative cyber grids & glowing backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(6,182,212,0.08),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* TOP HEADER COMMAND STRIP */}
      <div className="border-b border-slate-800/65 bg-slate-900/40 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-650 text-white flex items-center justify-center shadow-lg shadow-indigo-950/40 border border-indigo-500/30">
            <Brain className="w-5.5 h-5.5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white font-mono">
                AiVerse MindSync™
              </h1>
              <span className="bg-cyan-900/50 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded text-[8px] font-mono font-black uppercase tracking-widest">
                ACTIVE COGNITION
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Ethical Behavioral Intelligence & Predictive Architecture
            </p>
          </div>
        </div>

        {/* Browser Mock Navigation Controls */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950 text-slate-500 px-3 py-1.5 rounded-full border border-slate-850 w-full max-w-lg mx-6">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[9px] font-mono pr-2 border-r border-slate-800 uppercase tracking-widest font-bold text-slate-400">HTTPS://AIVERSE.ONE</span>
          <span className="text-[11px] font-mono text-slate-300 select-all truncate">
            {activeUrl}
          </span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              // Direct URL swap to help the demo
              setActiveUrl("/mindsync/memory");
            }}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition relative"
            title="Stored Memory Layer Settings"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </button>
          
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold uppercase rounded-xl transition cursor-pointer"
          >
            Terminal Out
          </button>
        </div>
      </div>

      {/* LOWER NAVIGATION SIDEBAR */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR PANEL */}
        <aside className="w-68 border-r border-slate-850 bg-slate-950 p-4 space-y-6 flex-shrink-0 hidden lg:block overflow-y-auto">
          
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest block px-2">
              Sync Modules
            </span>
            <ul className="space-y-1">
              {[
                { label: "Overview Platform", path: "/mindsync", icon: Brain },
                { label: "Intent Engine", path: "/mindsync/intent-engine", icon: Sliders },
                { label: "Preference Modeling", path: "/mindsync/preference-engine", icon: Cpu },
                { label: "Cognitive Layer", path: "/mindsync/cognitive-layer", icon: Layers },
                { label: "Predictive Assistant", path: "/mindsync/predictive-assistant", icon: Eye },
                { label: "AI Memory Control", path: "/mindsync/memory", icon: Database },
                { label: "Relationship Graph", path: "/mindsync/relationship-graph", icon: Network },
                { label: "Emotional Signals", path: "/mindsync/emotional-signals", icon: Activity }
              ].map((item) => {
                const isActive = activeUrl === item.path;
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => setActiveUrl(item.path)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition text-xs font-mono font-bold ${
                        isActive 
                          ? "bg-indigo-600 border border-indigo-500 text-white shadow-lg shadow-indigo-950/20" 
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? "text-cyan-300" : "text-slate-550"}`} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-slate-900">
            <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest block px-2">
              Enterprise / Gov
            </span>
            <ul className="space-y-1">
              {[
                { label: "Enterprise MindSync", path: "/enterprise/mindsync", icon: Briefcase },
                { label: "Government MindSync", path: "/government/mindsync", icon: Landmark }
              ].map((item) => {
                const isActive = activeUrl === item.path;
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => setActiveUrl(item.path)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition text-xs font-mono font-bold ${
                        isActive 
                          ? "bg-indigo-600 border border-indigo-500 text-white shadow" 
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? "text-cyan-305" : "text-slate-550"}`} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ethics Status Widget in Sidebar */}
          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-3.5 select-none text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-bold">ETHIC-METRIC</span>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Behavioral tracking stays strictly on local isolated client profiles. Zero centralized leakage.
            </p>
            <div className="space-y-1 pt-1 border-t border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Encryption status:</span>
                <span className="text-cyan-400">GCM-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PII Redactor Core:</span>
                <span className="text-emerald-400">AirGapped</span>
              </div>
            </div>
          </div>

        </aside>

        {/* WORKSPACE CONTENT COMPONENT PANEL */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 select-none">
          
          {/* MOBILE DIRECT ROUTER CHIPS */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-3 border-b border-slate-850 select-none scrollbar-none">
            {[
              { label: "Overview", path: "/mindsync" },
              { label: "Intent Engine", path: "/mindsync/intent-engine" },
              { label: "Preferences", path: "/mindsync/preference-engine" },
              { label: "Cognitive", path: "/mindsync/cognitive-layer" },
              { label: "Assistant", path: "/mindsync/predictive-assistant" },
              { label: "Memory Log", path: "/mindsync/memory" },
              { label: "Graph Node", path: "/mindsync/relationship-graph" },
              { label: "Tone Signals", path: "/mindsync/emotional-signals" },
              { label: "Enterprise", path: "/enterprise/mindsync" },
              { label: "Gov Org", path: "/government/mindsync" }
            ].map((chip) => (
              <button
                key={chip.path}
                onClick={() => setActiveUrl(chip.path)}
                className={`px-3 py-1.5 rounded-lg text-2xs font-mono font-bold tracking-tight border whitespace-nowrap ${
                  activeUrl === chip.path 
                    ? "bg-indigo-650 border-indigo-500 text-white" 
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* RENDERING DYNAMIC SCENARIO VIEWS BASED ON SELECTED MOCK URL */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUrl}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >

              {/* 1. OVERVIEW PAGE (/mindsync) */}
              {activeUrl === "/mindsync" && (
                <div className="space-y-8">
                  
                  {/* LANDING SECTION HERO BANNER WITH NEURAL BRAIN MAP ANIMATION */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-slate-850 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
                    
                    {/* Left details */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-805 text-indigo-305 text-xs font-semibold font-mono animate-none">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Mindsync Platform Showcase</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                        "You Think. <br/>
                        <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                          AiVerse Knows."
                        </span>
                      </h2>

                      <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                        MindSync is not science-fiction mind reading. It is a highly sophisticated, ethically guarded Behavioral Intelligence Engine. By learning from systemic application context, prompt rhythms, and process patterns, MindSync predicts organizational and individual workflow needs to execute tasks proactively.
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button 
                          onClick={() => setActiveUrl("/mindsync/predictive-assistant")}
                          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-mono text-xs font-bold uppercase rounded-xl transition shadow shadow-indigo-950/50 flex items-center gap-2"
                        >
                          <span>Explore MindSync Engine</span>
                          <ArrowRight className="w-4 h-4 text-cyan-300" />
                        </button>
                        <button 
                          onClick={() => triggerCopilotAction("System Overview Scan")}
                          className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold uppercase rounded-xl transition cursor-default flex items-center gap-1.5"
                        >
                          <Play className="w-3 h-3 fill-slate-500 text-slate-550" />
                          <span>Watch Demo</span>
                        </button>
                      </div>

                      {/* Display metric cards requested */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-900">
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Prediction Accuracy</span>
                          <strong className="text-base text-cyan-400 font-mono block mt-0.5">99.4%</strong>
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Intent Score</span>
                          <strong className="text-base text-indigo-400 font-mono block mt-0.5">98.6%</strong>
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">AI Learning Hub</span>
                          <strong className="text-base text-emerald-400 font-mono block mt-0.5">10k ev/s</strong>
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">User Satisfaction</span>
                          <strong className="text-base text-white font-mono block mt-0.5">99.8%</strong>
                        </div>
                      </div>
                    </div>

                    {/* Right interactive Canvas Brain Animation represent */}
                    <div className="lg:col-span-5 relative flex items-center justify-center">
                      <canvas 
                        ref={brainCanvasRef}
                        className="w-full max-w-[420px] aspect-square rounded-full border border-slate-850/60 bg-slate-950/80 shadow-2xl relative z-10"
                      />
                    </div>
                  </div>

                  {/* HOW IT WORKS / ARCHITECTURE INTERACTIVE DIAGRAM FLOW */}
                  <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-2 pb-4 border-b border-slate-900">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">System Flowchart</span>
                        <h3 className="text-lg font-bold font-mono tracking-tight text-white block">
                          MindSync End-To-End Cognitive Architecture
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 border border-slate-800 bg-slate-900 px-2 py-1 rounded">
                        Offline Local Sandbox Mode: Secure Handshake
                      </span>
                    </div>

                    {/* Sequential Architecture Block list */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative select-none">
                      
                      {[
                        { title: "User Activity", tag: "Session raw inputs & prompt contexts", badge: "Collect", color: "border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300" },
                        { title: "Behavior Collection", tag: "PII scrubbed local metrics pipeline", badge: "Audit", color: "border-cyan-900 hover:border-cyan-700 bg-cyan-950/20 text-cyan-300" },
                        { title: "Intent Engine", tag: "Predict target task objectives (94% conf)", badge: "Correlate", color: "border-indigo-900 hover:border-indigo-700 bg-indigo-950/20 text-indigo-300" },
                        { title: "Preference Engine", tag: "Map layout, timezone, communication styles", badge: "Calibrate", color: "border-indigo-900 hover:border-indigo-700 bg-indigo-950/20 text-indigo-305" },
                        { title: "Cognitive Layer", tag: "Isolate pattern similarities & work routines", badge: "Weigh", color: "border-purple-900 hover:border-purple-700 bg-purple-950/20 text-purple-305" },
                        { title: "Predictive Assistant", tag: "Generate high-probability copilot action triggers", badge: "Synthesize", color: "border-emerald-900 hover:border-emerald-700 bg-emerald-950/20 text-emerald-305" },
                        { title: "Recommendation", tag: "Render proactive buttons for immediate automation", badge: "Resolve", color: "border-cyan-900/60 hover:border-cyan-700 bg-cyan-950/30 text-cyan-300" }
                      ].map((step, idx) => (
                        <div 
                          key={idx}
                          className={`border p-3.5 rounded-xl flex flex-col justify-between space-y-3 transition duration-200 group relative ${step.color}`}
                        >
                          <div>
                            <div className="flex justify-between items-center font-mono text-[9px] pb-1 border-b border-slate-900 mb-1.5 font-bold">
                              <span>STEP 0{idx + 1}</span>
                              <span className="text-slate-500 uppercase">{step.badge}</span>
                            </div>
                            <h4 className="text-xs font-black block leading-snug">{step.title}</h4>
                            <p className="text-[10px] text-slate-500 leading-snug mt-1">{step.tag}</p>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-500 font-bold group-hover:text-cyan-400">
                            <span>Diagnostic Active</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                  {/* HIGH VALUE INFO GRID: PRIVACY, ETHICS, ENTERPRISE, GOV APPLICATIONS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="p-5 bg-slate-905 border border-slate-850 rounded-2xl space-y-2">
                      <Lock className="w-5 h-5 text-cyan-400" />
                      <strong className="text-xs text-white block uppercase tracking-wide font-mono">100% Privacy Safeguarded</strong>
                      <p className="text-xs text-slate-450 leading-relaxed font-sans">
                        MindSync operates purely on isolated local browser containers and tenant-confined sandboxes. Zero prompt leakages, zero cloud tracking of raw text.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-905 border border-slate-850 rounded-2xl space-y-2">
                      <Activity className="w-5 h-5 text-indigo-400 font-bold" />
                      <strong className="text-xs text-white block uppercase tracking-wide font-mono">Continuous Calibration</strong>
                      <p className="text-xs text-slate-450 leading-relaxed font-sans">
                        Adapts silently as workflows shift. Automatically updates communication schedules and compaction levels without constant user prompts.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-905 border border-slate-850 rounded-2xl space-y-2">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                      <strong className="text-xs text-white block uppercase tracking-wide font-mono">Enterprise Optimization</strong>
                      <p className="text-xs text-slate-450 leading-relaxed font-sans">
                        Predicts system demand bottlenecks, impending high-probability team schedule fatigue, and custom lead pipeline conversions before spreadsheets compile.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-905 border border-slate-850 rounded-2xl space-y-2">
                      <Landmark className="w-5 h-5 text-emerald-400" />
                      <strong className="text-xs text-white block uppercase tracking-wide font-mono">Sovereign Compliance</strong>
                      <p className="text-xs text-slate-450 leading-relaxed font-sans">
                        Meets strict international data sovereignty specifications including UAE PDPL and GDPR compliance. Built for air-gapped secure agency structures.
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* 2. INTENT ENGINE SUBPAGE (/mindsync/intent-engine) */}
              {activeUrl === "/mindsync/intent-engine" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Intent Prediction Engine Console
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Map and predict logical user-context goals with advanced confidence ratios
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-cyan-950 text-cyan-300 font-mono text-[9px] uppercase tracking-wider font-bold rounded-full border border-cyan-800/80">
                      PII ANONYMIZED HANDSHAKE
                    </span>
                  </div>

                  {/* Core Diagnostic layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Predictor Control and Goal Detection Widget */}
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Active Target Context & Upcoming Task Predictions
                      </span>

                      {/* Large goal representation card */}
                      <div className="p-4 bg-indigo-950/30 border border-indigo-905 rounded-xl space-y-3">
                        <div className="flex justify-between items-center text-xs font-mono font-bold">
                          <span className="text-indigo-400">HIGHEST PROBABILITY TARGET GOAL DETECTED:</span>
                          <span className="text-emerald-400 font-extrabold px-2 py-0.5 bg-emerald-950/80 border border-emerald-900 text-[10px] rounded animate-pulse">
                            94% Confidence Rate
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-200">
                          "Generate Monthly Financial Sales Summary and Update CRM Lead Pipelines"
                        </h3>

                        <div className="space-y-2.5 pt-2 border-t border-slate-900 text-xs text-slate-350">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Predicted Action Stream Required:</span>
                          
                          <div className="flex items-center gap-2 font-mono text-[10.5px]">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>1. Query offline CRM local logs & export metadata profiles</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-[10.5px]">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>2. Isolate regional coordinate outliers and convert foreign currencies safely</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-[10.5px]">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 animate-pulse" />
                            <span>3. Render pristine PDF summary deck and stage the auto-sending portal list</span>
                          </div>
                        </div>

                        {/* Interactive trigger button */}
                        <div className="pt-3 flex justify-end">
                          <button
                            onClick={() => triggerCopilotAction("Compile Monthly Sales Summary Stack")}
                            disabled={isAnalyzing}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-90 text-white font-mono text-[10px] font-black uppercase tracking-wide rounded-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <Cpu className="w-3.5 h-3.5" />
                            <span>{isAnalyzing ? "Processing Synapses..." : "Pre-Compile This Automated Stack"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Display of upcoming timeline goals */}
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-slate-450 block">Next Predictive Queue</span>
                        
                        <div className="space-y-2">
                          {[
                            { name: "Schedule Q3 technical review with Engineering heads", probability: 87, type: "Calendar Sync", action: "Draft invites" },
                            { name: "Execute air-gapped system database index sanitation", probability: 79, type: "Data Architecture", action: "Stage sandbox" },
                            { name: "Generate executive draft outline regarding global deepfake anomalies", probability: 74, type: "Reporting Engine", action: "Load previous template" }
                          ].map((item, idx) => (
                            <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                              <div>
                                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block font-bold">{item.type}</span>
                                <p className="text-slate-300 font-bold block">{item.name}</p>
                              </div>
                              <div className="flex items-center gap-3 font-mono text-[9px] font-extrabold flex-shrink-0">
                                <span className="text-cyan-405">{item.probability}% Prob</span>
                                <button
                                  onClick={() => triggerCopilotAction(item.name)}
                                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 uppercase rounded hover:text-white transition"
                                >
                                  Trigger
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Analytics panel sidebar */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-6">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Intent Trends & Performance
                      </span>

                      <div className="space-y-4">
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-center">
                          <span className="text-[8.5px] font-mono text-slate-400 block font-black uppercase">Current User Intent Score</span>
                          <strong className="text-3xl text-cyan-403 block tracking-tight font-black font-mono mt-0.5">98.6%</strong>
                          <p className="text-[9px] text-slate-550 mt-1 leading-none">Goal Alignment Confidence Rate</p>
                        </div>

                        {/* Faux graph line (using simple SVG coordinate line) */}
                        <div className="space-y-1.5 font-mono text-[9px] text-slate-500">
                          <div className="flex justify-between font-bold">
                            <span>Intent Index Trend (Last 7 Days)</span>
                            <span className="text-emerald-400">+1.4% Variance</span>
                          </div>
                          
                          {/* Pristine Responsive Vector Chart Grid */}
                          <div className="h-24 bg-slate-900 border border-slate-850 rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden">
                            <svg className="w-full h-full absolute inset-0 text-cyan-500" viewBox="0 0 100 30" preserveAspectRatio="none">
                              <path 
                                d="M 0 25 Q 20 12 40 18 T 80 5 T 100 2" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                                className="animate-pulse"
                              />
                            </svg>
                            <div className="flex justify-between items-center text-[7px] text-slate-400 z-10 w-full pt-1">
                              <span>90% Baseline</span>
                              <span>96% Peak</span>
                            </div>
                            <div className="flex justify-between text-[7px] text-slate-550 z-10 w-full pt-6">
                              <span>Mon</span>
                              <span>Wed</span>
                              <span>Fri</span>
                              <span>Today</span>
                            </div>
                          </div>
                        </div>

                        {/* Work Activity Timeline summary logs */}
                        <div className="space-y-2">
                          <span className="text-[8px] font-mono font-black uppercase tracking-widest text-slate-450 block">Evaluation timeline logs</span>
                          <div className="space-y-1.5 font-mono text-[9px] text-slate-400">
                            <div className="flex gap-2">
                              <span className="text-slate-500 select-none">08:00</span>
                              <span>Analyze executive dashboard layout choices: calibrate compactness</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-slate-500 select-none">09:12</span>
                              <span>Detect redundant copy-paste patterns in leads registry: generate automation suggestion</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-slate-500 select-none">10:45</span>
                              <span>Coordinate meeting calendar: align with peak cognitive focus score</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 3. PREFERENCE ENGINE (/mindsync/preference-engine) */}
              {activeUrl === "/mindsync/preference-engine" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Preference Engine Configurator
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Silent learning logs tracing UI layouts, timezone working hours, and communication rulesets
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 select-none">
                    
                    {/* Primary lists of parameters with sliding bars (col-span-8) */}
                    <div className="lg:col-span-8 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-6">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Preferred Layout & Working Parameters Tracked
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        <div className="space-y-4">
                          <strong className="text-xs text-indigo-400 font-mono block">UI / Visual preferences</strong>
                          
                          <div className="space-y-2 font-mono text-[10.5px]">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                              <span>Dashboard Density preference:</span>
                              <span className="text-cyan-400">Compact (91%)</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyan-500 w-[91%] h-full rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-2 font-mono text-[10.5px]">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                              <span>Theme Temperature target:</span>
                              <span className="text-cyan-300">Cool Dark Space (84%)</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 w-[84%] h-full rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-2 font-mono text-[10.5px]">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                              <span>Notification frequency allowance:</span>
                              <span className="text-rose-400">Low/Minimal (12%)</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-rose-500 w-[12%] h-full rounded-full" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <strong className="text-xs text-indigo-405 font-mono block">Behavior & Working hours</strong>
                          
                          <div className="space-y-2 font-mono text-[10.5px]">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                              <span>Peak Focus window tracking:</span>
                              <span className="text-emerald-400">08:00 - 11:30 (Stable)</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 w-[95%] h-full rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-2 font-mono text-[10.5px]">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                              <span>Preferred communication channel:</span>
                              <span className="text-white">Slack Sync Async (74%)</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-400 w-[74%] h-full rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-2 font-mono text-[10.5px]">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                              <span>Active automation confidence minimum:</span>
                              <span className="text-cyan-405">85% Trigger threshold</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyan-400 w-[85%] h-full rounded-full" />
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-xl text-xs space-y-1.5 font-sans leading-relaxed">
                        <strong className="text-white font-semibold">Preference Modeling Notice:</strong>
                        <p className="text-slate-400 text-[11px]">
                          These configurations represent calibrated state variables compiled directly on your browser storage partition. If you delete cache or click "Delete Memory Layer", these preference variables reset instantly back to standard factory settings.
                        </p>
                      </div>

                    </div>

                    {/* Preferences Score widget (col-span-4) */}
                    <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Calibration Analysis
                      </span>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-center space-y-0.5">
                        <span className="text-[8.5px] font-mono text-slate-450 block font-black uppercase">AI Preference Calibration Index</span>
                        <strong className="text-3xl text-emerald-400 block tracking-tight font-black font-mono">92% Optimal</strong>
                        <p className="text-[9px] text-slate-550 mt-1">Calibrated from 1,400 behavioral variables</p>
                      </div>

                      <div className="space-y-3 pt-2 text-xs">
                        <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider block">LEARNING STATUS</span>
                        
                        <div className="flex justify-between items-center bg-slate-900/65 p-2.5 rounded-lg border border-slate-850 font-mono text-[10.5px]">
                          <span>Learn Mode Activity</span>
                          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold border border-emerald-900 rounded font-bold text-[9px] uppercase tracking-wide">
                            Active Sync
                          </span>
                        </div>

                        <div className="flex justify-between items-center bg-slate-900/65 p-2.5 rounded-lg border border-slate-850 font-mono text-[10.5px]">
                          <span>Preferred Device Focus</span>
                          <span className="text-slate-300 font-bold">Enterprise M1 Pro WorkStation</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 4. COGNITIVE LAYER (/mindsync/cognitive-layer) */}
              {activeUrl === "/mindsync/cognitive-layer" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Cognitive Pattern Evaluation Layer
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Audit workflow habits, repetitive schedules, and identify task automation pipelines
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Routine detection lists */}
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Workflow Habits & Repetitive Task Detection
                      </span>

                      <div className="space-y-3">
                        {[
                          { title: "Generate Sales Lead Summary CSV on CRM exit", frequency: "Daily at 17:00 UTC", similarity: 96, automationOpportunity: "Trigger air-gapped export task instantly" },
                          { title: "Verify email headers for suspicious celebrity profile spoofing", frequency: "Hourly context filter", similarity: 89, automationOpportunity: "Auto-invoke Verified Agent" },
                          { title: "Mute Slack system notifications during deep focus blocks", frequency: "Continuous schedule sync", similarity: 84, automationOpportunity: "Auto-enable quiet target profiles" },
                          { title: "Export server compliance audit reports monthly", frequency: "Ends monthly cycle", similarity: 72, automationOpportunity: "Generate draft logs via email copy" }
                        ].map((habit, idx) => (
                          <div key={idx} className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-2.5 hover:border-slate-800 transition">
                            <div className="flex justify-between items-start text-xs font-mono">
                              <div>
                                <span className="bg-indigo-950 text-indigo-300 text-[8.5px] border border-indigo-900 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider mr-2">{habit.frequency}</span>
                                <strong className="text-slate-100 text-sm font-semibold">{habit.title}</strong>
                              </div>
                              <span className="text-cyan-400 font-extrabold flex-shrink-0">{habit.similarity}% Repetitive</span>
                            </div>
                            <div className="flex justify-between items-center text-[10.5px] font-mono text-slate-450 border-t border-slate-850 pt-2 flex-wrap gap-2">
                              <span>Action Opportunity: <strong className="text-slate-300 font-bold">{habit.automationOpportunity}</strong></span>
                              <button
                                onClick={() => triggerCopilotAction(habit.title)}
                                className="px-2.5 py-1 bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-[8.5px] uppercase rounded transition"
                              >
                                Automate Node
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Cognitive Insights Summary cards */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Weekly Cognitive Insights
                      </span>

                      <div className="space-y-4">
                        <div className="border border-slate-800 p-4 rounded-xl bg-slate-905 space-y-2 text-xs">
                          <strong className="text-cyan-303 font-mono block uppercase">RHYTHM OBSERVATION:</strong>
                          <p className="text-slate-400 leading-relaxed">
                            "You achieve 94% focus optimization on calendar scheduling when booking team meetings directly prior to 11:30 local time. Booking afterward triggers a 22% delay pattern variance."
                          </p>
                        </div>

                        <div className="border border-slate-800 p-4 rounded-xl bg-slate-905 space-y-2 text-xs">
                          <strong className="text-indigo-305 font-mono block uppercase">AUTOMATION EFFICIENCY POTENTIAL:</strong>
                          <p className="text-slate-400 leading-relaxed">
                            "By allowing MindSync to automate the exporting of weekly CRM pipelines, you reduce repetitive administrative execution layouts by 1.8 hrs per cycle."
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 5. PREDICTIVE ASSISTANT (/mindsync/predictive-assistant) */}
              {activeUrl === "/mindsync/predictive-assistant" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Predictive CoPilot & Automation Sandbox
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Interact and trigger one-click automated executions calculated from current context variables
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
                    
                    {/* Suggested tasks buttons list */}
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Would you like MindSync to automate:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {[
                          { title: "Generate Monthly Sales Report SUMMARY", icon: BarChart2, confidence: 94, actions: "Export leads, structure layout templates, compile PDF", desc: "MindSync identified CRM lead changes matching monthly boundaries." },
                          { title: "Schedule Next Weekly Team Sync", icon: Radio, confidence: 88, actions: "Query Slack sync quiet hours, find optimal 09:30 slot, invite 12 team members", desc: "Previous alignment score peak observed on Monday morning blocks." },
                          { title: "Filter Suspicious Domain spoofing alerts", icon: AlertTriangle, confidence: 91, actions: "Invoke Verify Agent, launch watch-checks, compile domain trust report", desc: "Detected 4 upcoming threat alerts inside brand registry logs." },
                          { title: "Complete air-gapped system backups", icon: Database, confidence: 83, actions: "Initiate GCM-256 local database handshake, clear obsolete index caches", desc: "Routine detection outlines index backlog exceeds limits." }
                        ].map((copilotAction, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-750 transition"
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-start font-mono">
                                <div className="p-1.5 bg-slate-950 rounded border border-slate-800 text-cyan-400">
                                  <copilotAction.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] bg-indigo-950 text-indigo-300 font-bold border border-indigo-900 px-1.5 py-0.5 rounded">
                                  {copilotAction.confidence}% Confidence
                                </span>
                              </div>
                              <strong className="text-xs text-slate-100 block font-mono leading-snug">{copilotAction.title}</strong>
                              <p className="text-[10px] text-slate-450 leading-relaxed">{copilotAction.desc}</p>
                              
                              <div className="pt-2 border-t border-slate-850/60 font-mono text-[9px] text-slate-400">
                                <span className="block text-slate-500 font-black uppercase text-[8px] tracking-wider mb-0.5">Automating steps:</span>
                                <span>{copilotAction.actions}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => triggerCopilotAction(copilotAction.title)}
                              className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-600 text-white font-mono text-[9.5px] font-black uppercase rounded-lg cursor-pointer transition w-full"
                            >
                              One-Click Execute Action
                            </button>
                          </div>
                        ))}

                      </div>
                    </div>

                    {/* Automation simulation display */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                          Active Sandbox Logs
                        </span>

                        <div className="space-y-4 pt-4 text-xs font-mono relative">
                          {isAnalyzing ? (
                            <div className="py-12 text-center space-y-3">
                              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                              <p className="text-slate-400">Triggering agent routing networks...</p>
                              <p className="text-[9px] text-slate-550">Compiling behavioral metrics configuration safely</p>
                            </div>
                          ) : executedTask ? (
                            <div className="space-y-3 py-4 text-emerald-400 bg-slate-900/60 p-4 border border-emerald-950 rounded-xl">
                              <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                                <strong className="uppercase text-[10px] tracking-widest font-black">Automation Succeeded</strong>
                              </div>
                              <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                                Successfully routed predicted steps for <span className="font-mono text-cyan-300 font-bold">"{executedTask}"</span>. Task executed in local container sandbox with zero errors.
                              </p>
                            </div>
                          ) : (
                            <div className="py-12 text-center text-slate-500 font-sans space-y-1">
                              <Sliders className="w-6 h-6 text-slate-700 mx-auto" />
                              <p className="font-mono text-[10px] text-slate-550">Interactive Command console waiting...</p>
                              <p className="text-[9.5px]">Click any proactive action block on the left to see live compilation outcomes</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-850">
                        <span className="text-[8px] font-mono text-slate-550 block font-black uppercase">Copilot Core integration status:</span>
                        <div className="flex justify-between items-center text-[9.5px] font-mono text-slate-400 mt-1">
                          <span>Connection Type:</span>
                          <span className="text-emerald-400">HANDSHAKE OK</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 6. AI MEMORY LAYER (/mindsync/memory) */}
              {activeUrl === "/mindsync/memory" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        AI Memory Layer & Privacy Portal
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Securely manage, audit, export, or wipe cognitive records used in preference automation
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Database listing structure */}
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block">
                          Stored Identity Preferences & Context Records
                        </span>
                        <span className="text-[9.5px] font-mono text-cyan-404 font-bold flex items-center gap-1">
                          <Database className="w-3.5 h-3.5" /> Total: {memoryStore.length} Stored items
                        </span>
                      </div>

                      <div className="space-y-2 select-none">
                        {memoryStore.length === 0 ? (
                          <div className="py-12 text-center text-slate-500 font-mono space-y-1">
                            <Trash2 className="w-6 h-6 text-slate-800 mx-auto" />
                            <p className="text-slate-450 uppercase font-bold text-[10px]">Zero records in memory registry</p>
                            <p className="text-[9.5px] font-sans">Learning has been cleared or wiped securely.</p>
                          </div>
                        ) : (
                          memoryStore.map((item) => (
                            <div key={item.id} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs hover:border-slate-800 transition">
                              <div className="space-y-1 font-mono">
                                <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[8.5px] px-1.5 py-0.5 rounded mr-2 uppercase font-black tracking-wide">{item.type}</span>
                                <strong className="text-slate-100 font-semibold">{item.key}</strong>
                                <div className="flex gap-4 text-[8px] text-slate-500">
                                  <span>Entropy Index: <span className="text-cyan-400">{item.entropy}</span></span>
                                  <span>Logged: {item.date}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => deleteMemoryItem(item.id)}
                                className="p-1 text-slate-500 hover:text-rose-500 transition cursor-pointer"
                                title="Delete specific memory node"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Primary controls buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-900">
                        <button
                          onClick={() => setMemoryStore([])}
                          className="px-4 py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 font-mono text-[9.5px] font-black uppercase rounded-lg cursor-pointer border border-rose-800/80 transition"
                        >
                          Delete Entire Memory Layer
                        </button>
                        <button
                          onClick={() => {
                            // Seed backup simulation
                            alert("Pre-compiling encryption export package. Data exported safely as GCM encrypted JSON.");
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-[9.5px] font-black uppercase rounded-lg border border-slate-800 transition"
                        >
                          Export Anonymized Memory Stack
                        </button>
                      </div>

                    </div>

                    {/* Right privacy toggle inputs */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-6">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Memory Privacy Governors
                      </span>

                      <div className="space-y-4 text-xs font-mono">
                        
                        <div className="space-y-1 bg-slate-900 p-3.5 rounded-xl border border-slate-850">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-300">Continuous AI Learning:</span>
                            <button
                              onClick={() => setLearningEngaged(!learningEngaged)}
                              className={`w-10 h-6 rounded-full p-1 transition-all flex items-center ${learningEngaged ? "bg-emerald-600 justify-end" : "bg-slate-800 justify-start"}`}
                            >
                              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
                            </button>
                          </div>
                          <p className="text-[9.5px] text-slate-500 font-sans mt-0.5 leading-normal">
                            If paused, MindSync halts collection of user activity logs and retains historical slots.
                          </p>
                        </div>

                        <div className="space-y-1 bg-slate-900 p-3.5 rounded-xl border border-slate-850">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-300">AirGapped PII Redaction:</span>
                            <button
                              onClick={() => setPrivacyConsent(!privacyConsent)}
                              className={`w-10 h-6 rounded-full p-1 transition-all flex items-center ${privacyConsent ? "bg-emerald-600 justify-end" : "bg-slate-800 justify-start"}`}
                            >
                              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
                            </button>
                          </div>
                          <p className="text-[9.5px] text-slate-500 font-sans mt-0.5 leading-normal">
                            Guarantees automatic local masking of credit cards, Emirates IDs, or direct names prior to correlation modeling.
                          </p>
                        </div>

                        <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-850">
                          <span className="text-slate-500 font-black uppercase text-[8px] block tracking-wide">ACTIVE ENCRYPTION:</span>
                          <div className="flex justify-between text-[10.5px]">
                            <span>Crypto Standard:</span>
                            <span className="text-cyan-400 font-bold">{encryptionStatus}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 7. RELATIONSHIP GRAPH (/mindsync/relationship-graph) */}
              {activeUrl === "/mindsync/relationship-graph" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Context Relationship Topology Model (Self Core)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Interact and examine mapped links connecting Goals, Interests, Projects, Teams, and Behaviors
                      </p>
                    </div>
                  </div>

                  {/* Fully visual Neo4j Style Node Interactive Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-none">
                    
                    {/* Visual representation */}
                    <div className="lg:col-span-3 bg-slate-950 p-6 rounded-3xl border border-slate-850 space-y-4">
                      <div className="flex justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-900 pb-2.5">
                        <span>Neo4j Topology Navigator (Zoomable Handshake)</span>
                        <span className="text-cyan-404">Drag & Interact Nodes Live</span>
                      </div>

                      {/* Interactive SVG Node Chart */}
                      <div className="h-96 border border-slate-850 bg-slate-900/40 rounded-2xl relative overflow-hidden flex items-center justify-center">
                        {/* Interactive particles or absolute nodes represent */}
                        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                        
                        {/* Central primary user node */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setSelectedGraphNode({
                            id: "user-1",
                            label: "User Node Core (Sarah Jenkins)",
                            category: "Identity Core",
                            connections: 5,
                            details: "Baseline parameters compiled over 30 days. High focal stability tracked."
                          })}
                          className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-xs border-4 border-slate-950 text-white shadow-xl cursor-pointer"
                        >
                          User
                        </motion.button>

                        {/* Connected Orbit Nodes */}
                        {[
                          { id: "node-2", label: "FinSummary-Monthly", val: "Goal Spec", x: "12%", y: "20%", bg: "bg-emerald-950 border-emerald-800 text-emerald-400", details: "Target goal predicted matching CRM monthly boundaries (94% conf)." },
                          { id: "node-3", label: "M1 Pro WorkStation", val: "Hardware Layout", x: "78%", y: "15%", bg: "bg-slate-900 border-slate-700 text-slate-300", details: "Core local hardware sandbox used for GCM-256 computation." },
                          { id: "node-4", label: "Engineering Coordination", val: "Team Node", x: "82%", y: "70%", bg: "bg-indigo-950 border-indigo-800 text-indigo-400", details: "Includes 12 active participants mapped safely onto quiet hours criteria." },
                          { id: "node-5", label: "08:00 - 11:30 Peaks", val: "Peak Focus Block", x: "18%", y: "75%", bg: "bg-cyan-950 border-cyan-800 text-cyan-300", details: "Observes highest rhythmic schedule efficiency patterns weekly." },
                          { id: "node-6", label: "Slack Sync Async", val: "Comms Preference", x: "50%", y: "82%", bg: "bg-purple-950 border-purple-800 text-purple-403", details: "Mutes active notifications directly matching core focus parameters." }
                        ].map((nodeObj) => (
                          <motion.button
                            key={nodeObj.id}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedGraphNode({
                              id: nodeObj.id,
                              label: nodeObj.label,
                              category: nodeObj.val,
                              connections: 1,
                              details: nodeObj.details
                            })}
                            style={{ position: "absolute", left: nodeObj.x, top: nodeObj.y }}
                            className={`px-3 py-1.5 rounded-full border text-[10.5px] font-mono leading-none font-bold shadow-md cursor-pointer ${nodeObj.bg}`}
                          >
                            {nodeObj.label}
                          </motion.button>
                        ))}

                        {/* Faint connective SVG vector tracks to link orbits back to center */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-800" strokeWidth="0.75" fill="none">
                          <line x1="50%" y1="50%" x2="12%" y2="20%" />
                          <line x1="50%" y1="50%" x2="78%" y2="15%" />
                          <line x1="50%" y1="50%" x2="82%" y2="70%" />
                          <line x1="50%" y1="50%" x2="18%" y2="75%" />
                          <line x1="50%" y1="50%" x2="50%" y2="82%" />
                        </svg>

                      </div>
                    </div>

                    {/* Right side inspect window details */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Inspect Node Characteristics
                      </span>

                      {selectedGraphNode ? (
                        <div className="space-y-4 font-mono text-xs">
                          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                            <span className="text-[8.5px] text-slate-500 font-bold block uppercase tracking-wide">Category</span>
                            <span className="text-cyan-404 font-black text-[12px] uppercase block">{selectedGraphNode.category}</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8.5px] text-slate-500 font-bold block uppercase tracking-wide">Node Identity</span>
                            <span className="text-slate-200 font-semibold block text-[13px]">{selectedGraphNode.label}</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8.5px] text-slate-500 font-bold block uppercase tracking-wide">Active Connections</span>
                            <span className="text-indigo-400 font-bold block">{selectedGraphNode.connections} Synapse lanes</span>
                          </div>

                          <div className="space-y-2 border-t border-slate-900 pt-3 text-slate-400 leading-normal font-sans text-[11.5px]">
                            <strong className="text-slate-300 block font-mono text-[10px] font-bold uppercase">FORENSIC NOTES:</strong>
                            <p className="italic">"{selectedGraphNode.details}"</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12 text-center text-slate-600 text-xs">
                          Click any mapping node on the left to inspect variables
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* 8. EMOTIONAL SIGNALS (/mindsync/emotional-signals) */}
              {activeUrl === "/mindsync/emotional-signals" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Emotional Tone & Interaction Signal Monitor
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Important Notice: NOT medical tracking. Solely context-based behavioral assistance for workload pacing.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
                    
                    {/* Signal monitor scores */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Interaction Metrics
                      </span>

                      <div className="space-y-4">
                        <div className="p-4 bg-slate-905 border border-slate-850 rounded-xl space-y-1">
                          <span className="text-[8.5px] font-mono text-slate-500 block uppercase">Continuous Tone Analysis</span>
                          <span className="text-cyan-404 font-mono font-bold text-xs">{emotionalSignalLog.tone}</span>
                        </div>

                        {/* Focus / Collaboration bars */}
                        <div className="space-y-3 font-mono text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>Weekly Focus Continuity Index:</span>
                              <strong className="text-emerald-400">{emotionalSignalLog.focus}% Optimal</strong>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 w-[94%] h-full rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>Team Collaboration Frequency Score:</span>
                              <strong className="text-cyan-400">{emotionalSignalLog.collaboration}% Balance</strong>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyan-500 w-[88%] h-full rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>Continuous Engagement Timeline:</span>
                              <strong className="text-slate-300">{emotionalSignalLog.engagement}% Stable</strong>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 w-[91%] h-full rounded-full" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Timeline logs */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5 lg:col-span-2">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Behavior Mood Timeline & Pace suggestions
                      </span>

                      <div className="space-y-3">
                        {[
                          { time: "Monday 14:00 UTC", context: "Accelerated typing speeds and continuous workspace changes detected.", action: "Pacing advice: Focus blocks suggested to minimize workload fatigue", label: "Urgent Pace Shift" },
                          { time: "Tuesday 09:20 UTC", context: "Stable mouse trajectories matching peak productivity parameters.", action: "Calibration state: Keep quiet schedules to reinforce flow duration", label: "Optimal Rhythm" },
                          { time: "Wednesday 10:45 UTC", context: "High collaboration focus score over 1.5 hour sync channels.", action: "System recommendation: Recommend 10min buffer block directly now", label: "Break Buffer recomendation" }
                        ].map((logItem, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-slate-500">{logItem.time}</span>
                              <span className="text-cyan-405 font-bold uppercase text-[9px] tracking-wide">{logItem.label}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-normal">{logItem.context}</p>
                            <p className="text-[10.5px] font-mono text-emerald-400 border-t border-slate-850 pt-1.5 leading-none">
                              Advice: {logItem.action}
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* 9. ENTERPRISE MINDSYNC (/enterprise/mindsync) */}
              {activeUrl === "/enterprise/mindsync" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Enterprise Predictive Intelligence Command
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Predict customer churn profiles, high probability product demands, and conversion ratios
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl text-center space-y-1">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Predicted Customer Churn</span>
                      <strong className="text-xl text-rose-500 font-mono font-black block">1.4% Low Churn</strong>
                      <span className="text-[8.5px] font-mono text-emerald-405 block">0.8% reduction from prev week</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl text-center space-y-1">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Average Conversion Ratio</span>
                      <strong className="text-xl text-cyan-404 font-mono font-black block">18.4% predicted</strong>
                      <span className="text-[8.5px] font-mono text-cyan-405 block">94% goal confidence alignment</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl text-center space-y-1">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Projected Revenue Growth</span>
                      <strong className="text-xl text-emerald-400 font-mono font-black block">+$420,000 Q3 Target</strong>
                      <span className="text-[8.5px] font-mono text-emerald-400 block">+14.2% acceleration</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl text-center space-y-1">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Lead Funnel Activity Scale</span>
                      <strong className="text-xl text-white font-mono block">124,500 records/hr</strong>
                      <span className="text-[8.5px] font-mono text-slate-500 block">PII-scrubbed local analysis</span>
                    </div>
                  </div>

                  {/* High quality executive analytics table & charts */}
                  <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-6">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-900 flex-wrap gap-2 text-xs">
                      <strong className="font-mono text-sm uppercase tracking-tight text-white block">Predicted Regional Demand outliers</strong>
                      <span className="font-mono text-slate-500 uppercase">Analysis compiled Just Now</span>
                    </div>

                    <div className="overflow-x-auto select-none">
                      <table className="w-full text-left font-mono text-xs text-slate-350 divide-y divide-slate-850">
                        <thead>
                          <tr className="text-slate-550 text-[9.5px]">
                            <th className="pb-3 uppercase tracking-wider">Territorial Target Region</th>
                            <th className="pb-3 uppercase tracking-wider">Projected Churn Score</th>
                            <th className="pb-3 uppercase tracking-wider">Forecasted Demand Index</th>
                            <th className="pb-3 uppercase tracking-wider">Core Threat warnings</th>
                            <th className="pb-3 uppercase tracking-wider text-right">Trigger Intervention</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {[
                            { region: "Middles East / UAE Hub", churn: "0.4%", demand: "98% High Demand Forecast", threats: "Zero Warning", action: "Optimize Pipeline routing" },
                            { region: "Europe Core North (Zurich)", churn: "1.2%", demand: "84% Balanced", threats: "1 VPN configuration warn", action: "Calibrate localized syncs" },
                            { region: "Asia Pacific East Hub", churn: "2.8%", demand: "62% Minimal", threats: "Zero Warning", action: "Accelerate outreach" }
                          ].map((row, index) => (
                            <tr key={index} className="hover:bg-slate-900/40">
                              <td className="py-3.5 font-bold text-slate-205">{row.region}</td>
                              <td className="py-3.5 text-emerald-400">{row.churn}</td>
                              <td className="py-3.5 text-cyan-404 font-bold">{row.demand}</td>
                              <td className="py-3.5">
                                <span className={row.threats !== "Zero Warning" ? "text-rose-450 font-bold" : "text-slate-500"}>
                                  {row.threats}
                                </span>
                              </td>
                              <td className="py-3.5 text-right">
                                <button
                                  onClick={() => triggerCopilotAction(row.action)}
                                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:text-white rounded text-[10px] uppercase font-bold"
                                >
                                  Run Spec
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* 10. GOVERNMENT MINDSYNC (/government/mindsync) */}
              {activeUrl === "/government/mindsync" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Sovereign Government Service Intelligence Portal
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Sovereign data analytics modeling department resource metrics, feedback indexes, and policy monitoring
                      </p>
                    </div>
                  </div>

                  {/* Custom Government grade analytics widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Citizen Feedback Semantic Indexes
                      </span>

                      <div className="space-y-4 text-xs font-mono">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Service Satisfaction Level:</span>
                            <strong className="text-emerald-400 font-bold">97.8% Optimal</strong>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 w-[97.8%] h-full rounded-full" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Resource Latency Ratio:</span>
                            <strong className="text-cyan-400 font-bold">0.8s Target (98% efficient)</strong>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 w-[98%] h-full rounded-full" />
                          </div>
                        </div>

                        <div className="space-y-1.5 bg-slate-905 p-3 rounded-xl border border-slate-850">
                          <strong className="text-[10px] text-white block uppercase mb-1">Continuous Policy Impact check:</strong>
                          <p className="text-[11px] text-slate-404 font-sans leading-normal">
                            Autonomous correlation outlines a 14% dispatch latency improvement when routing local municipality queries safely onto localized nodes.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Municipality resources logs list */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4 lg:col-span-2">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-400 block border-b border-slate-900 pb-2">
                        Autonomous Department Policy & Resource Allocations
                      </span>

                      <div className="space-y-3">
                        {[
                          { dept: "Civil Protection & Rescue Registry", allocationIndex: "98% Stable", feedbackRating: "Optimal Handshake", triggerTask: "Audit Emergency response parameters" },
                          { dept: "Sovereign Identity and Residency Verification", allocationIndex: "92% Load capacity", feedbackRating: "High load rate detected", triggerTask: "Calibrate air-gapped identity gateways" },
                          { dept: "Municipality Resource routing", allocationIndex: "94% Clean allocation", feedbackRating: "Fully isolated data targets", triggerTask: "Align municipality parameters" }
                        ].map((govDept, dIdx) => (
                          <div key={dIdx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs font-mono">
                            <div>
                              <span className="text-slate-500 uppercase text-[8px] font-bold block">DEPARTMENT CORE</span>
                              <strong className="text-slate-105 block font-bold leading-snug">{govDept.dept}</strong>
                              <div className="flex gap-4 text-[9px] text-slate-400 mt-1">
                                <span>Core allocation Status: <span className="text-cyan-404 font-semibold">{govDept.allocationIndex}</span></span>
                                <span>Feedback rating: <span className="text-emerald-404">{govDept.feedbackRating}</span></span>
                              </div>
                            </div>

                            <button
                              onClick={() => triggerCopilotAction(govDept.triggerTask)}
                              className="px-3 py-1.5 bg-slate-95 w-32 border border-slate-800 text-slate-350 hover:bg-slate-800 hover:text-white transition rounded uppercase text-[9px] font-bold"
                            >
                              Run Audit
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* REALISTIC RAW EVENT EVENT LOG STREAM AT FOOTER (10,000+ behavioural metrics) */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-3.5 select-none font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[9px] tracking-widest uppercase text-slate-450 block font-bold">
                Live Behavioral Signal Event Loop (10,000+ event logs queue)
              </span>
              <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-900 px-2 py-0.5 rounded font-black anim-pulse uppercase tracking-wide">
                Engine calibrating
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REALISTIC_EVENTS.map((event) => (
                <div key={event.id} className="p-3 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                  <div className="flex justify-between text-[8px] text-slate-500">
                    <span>{event.id} • {event.type}</span>
                    <span>{event.timestamp}</span>
                  </div>
                  <strong className="text-slate-205 text-[11px] block text-cyan-304">{event.user}</strong>
                  <p className="text-[10px] text-slate-405 leading-snug">{event.context}</p>
                  <span className="text-[9.5px] text-indigo-400 block pt-1 border-t border-slate-900 mt-1.5">
                    Proactive Action: {event.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
