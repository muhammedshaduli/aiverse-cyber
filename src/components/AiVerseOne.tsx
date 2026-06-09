import React, { useState, useEffect } from "react";
import { 
  Play, Shield, ShieldCheck, Cpu, HardDrive, Terminal, Layers, 
  Settings, Download, Activity, Radar, Compass, Radio, Search, 
  Send, User, FileText, CheckCircle2, AlertOctagon, HelpCircle, 
  TrendingUp, BarChart2, Check, RefreshCw, Key, Users, BookOpen, 
  Database, Eye, Lock, ArrowRight, Sparkles, MessageSquare, Plus,
  ChevronRight, Brain, AlertTriangle, Trash2, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ModuleSecurityGateway from "./ModuleSecurityGateway";

interface AiVerseOneProps {
  onClose: () => void;
}

// ----------------------------------------------------
// DUMMY DATABASES (1,000+ users, 250+ orgs, 5,000+ tasks represented)
// ----------------------------------------------------
const MOCK_AGENTS_SUMMARY = [
  { id: "verify-ag", name: "Verify Agent", icon: ShieldCheck, desc: "Authenticity & Domain checks, company spoofing prevention, signature validates.", path: "/one/agents/verify", execs: 1420, responseTime: "0.18s", successRate: "99.8%", status: "ONLINE" },
  { id: "watch-ag", name: "Watch Agent", icon: Radar, desc: "Continuous brand & social web topology monitoring, threat incident trackers.", path: "/one/agents/watch", execs: 2110, responseTime: "0.45s", successRate: "98.4%", status: "ONLINE" },
  { id: "shield-ag", name: "Shield Agent", icon: Shield, desc: "Cybersecurity risk audits, threat mapping, active LAN network shielding logs.", path: "/one/agents/shield", execs: 980, responseTime: "0.12s", successRate: "99.9%", status: "GUARDING" },
  { id: "guardian-ag", name: "Guardian Agent", icon: Compass, desc: "Identity protection, executive security profiles, active threat isolation scans.", path: "/one/agents/guardian", execs: 730, responseTime: "0.32s", successRate: "99.1%", status: "STANDBY" },
  { id: "sentinel-ag", name: "Sentinel Agent", icon: Terminal, desc: "Enterprise intelligence gatherers, threat intel reports, policy impact summaries.", path: "/one/agents/sentinel", execs: 1105, responseTime: "0.22s", successRate: "99.5%", status: "ONLINE" },
  { id: "mindsync-ag", name: "MindSync Agent", icon: Brain, desc: "Cognitive behavior modeling, user patterns & workspace pacing algorithms.", path: "/one/agents/mindsync", execs: 2150, responseTime: "0.08s", successRate: "99.4%", status: "ONLINE" }
];

export const AVAILABLE_SIM_AGENTS = [
  { id: "verify-ag", name: "Verify Agent", icon: ShieldCheck, desc: "Symmetry authentication & signature validator", latency: 0.18, success: 99.8, color: "text-emerald-400 bg-emerald-950/40 border-emerald-900/60", log: "Executing deep identity verification. DNS and TXT records matched. Cryptographic signature certified." },
  { id: "watch-ag", name: "Watch Agent", icon: Radar, desc: "Web brand, social profiles & spoof surveillance", latency: 0.45, success: 98.4, color: "text-blue-400 bg-blue-950/40 border-blue-900/60", log: "Watch Agent querying social topology. Threat alert: Identified spoof company support handle." },
  { id: "shield-ag", name: "Shield Agent", icon: Shield, desc: "Cybersecurity boundary gate & threat barrier", latency: 0.12, success: 99.9, color: "text-amber-400 bg-amber-950/40 border-amber-900/60", log: "Shield Agent blocking raw token leak. Enforcing TLS 1.3 socket and checking for raw credentials." },
  { id: "guardian-ag", name: "Guardian Agent", icon: Compass, desc: "Reputational threat isolated & VIP identity lock", latency: 0.32, success: 99.1, color: "text-cyan-400 bg-cyan-950/40 border-cyan-900/60", log: "Guardian Agent monitoring high-profile credentials. Active VIP identity protection lock initialized." },
  { id: "sentinel-ag", name: "Sentinel Agent", icon: Terminal, desc: "Strategic compliance ledger & security reports", latency: 0.22, success: 99.5, color: "text-indigo-400 bg-indigo-950/40 border-indigo-900/60", log: "Sentinel Agent scanning audit logs. Formulated UAE compliance and regulatory data report." },
  { id: "mindsync-ag", name: "MindSync Agent", icon: Brain, desc: "Contextual pacing & personalized workspace timing", latency: 0.08, success: 99.4, color: "text-pink-400 bg-pink-950/40 border-pink-900/60", log: "MindSync workspace adaptation applied. Compressed live layout density to focus-safe mode." }
];

export default function AiVerseOne({ onClose }: AiVerseOneProps) {
  // Navigation / Tab Router
  const [activeUrl, setActiveUrl] = useState<string>("/one");
  
  // Natural Language Prompt State
  const [chatPrompt, setChatPrompt] = useState<string>("Check if someone is impersonating my company.");
  const [isPromptRunning, setIsPromptRunning] = useState<boolean>(false);
  const [promptStep, setPromptStep] = useState<number>(0);
  
  // Custom Flow Orchestrator State (Drag and Drop / Connection blocks representation)
  const [workflowNodes, setWorkflowNodes] = useState<any[]>([
    { id: "n-1", label: "Intent Parser", x: "80px", y: "40px", status: "completed", details: "Extract target task directives safely" },
    { id: "n-2", label: "Agent Routing", x: "280px", y: "40px", status: "running", details: "Route commands to Watch & Verify Agents" },
    { id: "n-3", label: "Threat Scanner", x: "480px", y: "40px", status: "idle", details: "Execute deep internet signature audit" },
    { id: "n-4", label: "Secure Report Output", x: "680px", y: "40px", status: "idle", details: "Render final compliance credentials" }
  ]);

  // Analytics view category selection
  const [analyticsMetric, setAnalyticsMetric] = useState<string>("accuracy");

  // Threat detections state
  const [threatDetections, setThreatDetections] = useState<any[]>([
    { id: "dt-402", agent: "Watch Agent", title: "Target Domain Imposter", targetPath: "maestro-support-aiverse.co.ae", severity: "Critical", risk: 97, status: "Investigating" },
    { id: "dt-401", agent: "Shield Agent", title: "Emirates ID Raw Token Leak", targetPath: "sftp_backups/raw_passwords_vip.txt", severity: "High", risk: 89, status: "Isolated" },
    { id: "dt-400", agent: "Watch Agent", title: "Celebrity Profile Imposter - X", targetPath: "@SarahJenkins_AiVerseReal", severity: "Medium", risk: 62, status: "Resolved" },
    { id: "dt-399", agent: "Verify Agent", title: "Coordinated Bot Swan Pattern", targetPath: "IP Range 142.12.18.xxx", severity: "High", risk: 84, status: "Quarantined" }
  ]);

  // --- MULTI-AGENT EXECUTION SIMULATOR STATES & APIS ---
  const [simulatorAgents, setSimulatorAgents] = useState<any[]>([
    { id: "watch-ag", name: "Watch Agent", icon: Radar, desc: "Web brand, social profiles & spoof surveillance", latency: 0.45, success: 98.4, color: "text-blue-400 bg-blue-950/40 border-blue-900/60", log: "Watch Agent scanning public DNS tables, social vectors, and registry files for spoofs...", instanceId: "init-watch-1" },
    { id: "verify-ag", name: "Verify Agent", icon: ShieldCheck, desc: "Symmetry authentication & signature validator", latency: 0.18, success: 99.8, color: "text-emerald-400 bg-emerald-950/40 border-emerald-900/60", log: "Verify Agent invoking cryptographic validations on domain txt records...", instanceId: "init-verify-2" },
    { id: "shield-ag", name: "Shield Agent", icon: Shield, desc: "Cybersecurity boundary gate & threat barrier", latency: 0.12, success: 99.9, color: "text-amber-400 bg-amber-950/40 border-amber-900/60", log: "Shield Agent filtering payload structures, shielding PII indexes, and securing leakage...", instanceId: "init-shield-3" }
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [simulationLogs, setSimulationLogs] = useState<any[]>([
    { type: "system", text: "Multi-Agent Simulator initialized. Drop agents or choose a preset loop." }
  ]);
  const [simulatorPrompt, setSimulatorPrompt] = useState<string>("Audit corporate registry assets, quarantine social brand vectors, and enforce local sandbox port shielding.");
  const [executionMode, setExecutionMode] = useState<string>("sequential"); // sequential, concurrent, mesh
  const [simSummary, setSimSummary] = useState<any>(null);

  const applySimulatorPreset = (presetName: string) => {
    if (isSimulating) return;
    if (presetName === "brand-watch") {
      setSimulatorAgents([
        { id: "watch-ag", name: "Watch Agent", icon: Radar, desc: "Web brand, social profiles & spoof surveillance", latency: 0.45, success: 98.4, color: "text-blue-400 bg-blue-950/40 border-blue-900/60", log: "Watch Agent scanning public DNS tables, social vectors, and registry files for spoofs...", instanceId: "prs-watch-" + Date.now() },
        { id: "guardian-ag", name: "Guardian Agent", icon: Compass, desc: "Reputational threat isolated & VIP identity lock", latency: 0.32, success: 99.1, color: "text-cyan-400 bg-cyan-950/40 border-cyan-900/60", log: "Guardian Agent monitoring high-profile credentials. Active VIP identity protection lock initialized.", instanceId: "prs-guard-" + Date.now() },
        { id: "sentinel-ag", name: "Sentinel Agent", icon: Terminal, desc: "Strategic compliance ledger & security reports", latency: 0.22, success: 99.5, color: "text-indigo-400 bg-indigo-950/40 border-indigo-900/60", log: "Sentinel Agent scanning audit logs. Formulated UAE compliance and regulatory data report.", instanceId: "prs-sentinel-" + Date.now() }
      ]);
      setSimulationLogs([{ type: "system", text: "Preset applied: 'Brand & Reputation Watch'. Pipeline updated." }]);
    } else if (presetName === "network-shield") {
      setSimulatorAgents([
        { id: "verify-ag", name: "Verify Agent", icon: ShieldCheck, desc: "Symmetry authentication & signature validator", latency: 0.18, success: 99.8, color: "text-emerald-400 bg-emerald-950/40 border-emerald-900/60", log: "Executing deep identity verification. DNS and TXT records matched. Cryptographic signature certified.", instanceId: "prs-verify-" + Date.now() },
        { id: "shield-ag", name: "Shield Agent", icon: Shield, desc: "Cybersecurity boundary gate & threat barrier", latency: 0.12, success: 99.9, color: "text-amber-400 bg-amber-950/40 border-amber-900/60", log: "Shield Agent filtering payload structures, shielding PII indexes, and securing leakage...", instanceId: "prs-shield-" + Date.now() },
        { id: "mindsync-ag", name: "MindSync Agent", icon: Brain, desc: "Contextual pacing & personalized workspace timing", latency: 0.08, success: 99.4, color: "text-pink-400 bg-pink-950/40 border-pink-900/60", log: "MindSync workspace adaptation applied. Compressed live layout density to focus-safe mode.", instanceId: "prs-mindsync-" + Date.now() }
      ]);
      setSimulationLogs([{ type: "system", text: "Preset applied: 'Air-gapped Core Shielding'. Core pipeline initialized." }]);
    } else {
      setSimulatorAgents([
        { id: "watch-ag", name: "Watch Agent", icon: Radar, desc: "Web brand, social profiles & spoof surveillance", latency: 0.45, success: 98.4, color: "text-blue-400 bg-blue-950/40 border-blue-900/60", log: "Watch Agent scanning public DNS tables, social vectors, and registry files for spoofs...", instanceId: "prs-init-1" },
        { id: "verify-ag", name: "Verify Agent", icon: ShieldCheck, desc: "Symmetry authentication & signature validator", latency: 0.18, success: 99.8, color: "text-emerald-400 bg-emerald-950/40 border-emerald-900/60", log: "Executing deep identity verification. DNS and TXT records matched. Cryptographic signature certified.", instanceId: "prs-init-2" },
        { id: "shield-ag", name: "Shield Agent", icon: Shield, desc: "Cybersecurity boundary gate & threat barrier", latency: 0.12, success: 99.9, color: "text-amber-400 bg-amber-950/40 border-amber-900/60", log: "Shield Agent filtering payload structures, shielding PII indexes, and securing leakage...", instanceId: "prs-init-3" },
        { id: "guardian-ag", name: "Guardian Agent", icon: Compass, desc: "Reputational threat isolated & VIP identity lock", latency: 0.32, success: 99.1, color: "text-cyan-400 bg-cyan-950/40 border-cyan-900/60", log: "Guardian Agent monitoring high-profile credentials. Active VIP identity protection lock initialized.", instanceId: "prs-init-4" }
      ]);
      setSimulationLogs([{ type: "system", text: "Preset applied: 'Full Cyber Sovereign Suite'. 4 agents mapped." }]);
    }
    setSimulationStep(-1);
    setSimSummary(null);
  };

  const handleDragStartAgent = (e: React.DragEvent, agentTemplate: any) => {
    e.dataTransfer.setData("application/json", JSON.stringify(agentTemplate));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDropOnPipeline = (e: React.DragEvent) => {
    e.preventDefault();
    if (isSimulating) return;
    try {
      const dataStr = e.dataTransfer.getData("application/json");
      if (!dataStr) return;
      const agentTemplate = JSON.parse(dataStr);
      const newInstance = {
        ...agentTemplate,
        instanceId: `inst-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      };
      setSimulatorAgents(prev => [...prev, newInstance]);
      setSimulationLogs(prev => [...prev, { type: "info", text: `Success: Appended ${agentTemplate.name} to the pipeline Drop Zone.` }]);
    } catch (err) {
      console.error(err);
    }
  };

  const addAgentToPipeline = (agentTemplate: any) => {
    if (isSimulating) return;
    const newInstance = {
      ...agentTemplate,
      instanceId: `inst-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };
    setSimulatorAgents(prev => [...prev, newInstance]);
    setSimulationLogs(prev => [...prev, { type: "info", text: `Added ${agentTemplate.name} to active sequence via direct selector.` }]);
  };

  const deletePipelineAgent = (index: number) => {
    if (isSimulating) return;
    setSimulatorAgents(prev => {
      const copy = [...prev];
      const removed = copy.splice(index, 1);
      setSimulationLogs(old => [...old, { type: "info", text: `Removed ${removed[0]?.name || "Agent"} from flow workspace.` }]);
      return copy;
    });
  };

  const movePipelineAgent = (index: number, direction: "left" | "right") => {
    if (isSimulating) return;
    setSimulatorAgents(prev => {
      const copy = [...prev];
      const targetIndex = direction === "left" ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < copy.length) {
        const temp = copy[index];
        copy[index] = copy[targetIndex];
        copy[targetIndex] = temp;
      }
      return copy;
    });
  };

  const clearPipeline = () => {
    if (isSimulating) return;
    setSimulatorAgents([]);
    setSimulationStep(-1);
    setSimSummary(null);
    setSimulationLogs([{ type: "system", text: "Pipeline cleared completely. Assemble new agents." }]);
  };

  const runSimulatorPipeline = () => {
    if (isSimulating) return;
    if (simulatorAgents.length === 0) {
      alert("Please assemble at least one Agent into your pipeline drop zone first!");
      return;
    }

    setIsSimulating(true);
    setSimulationStep(0);
    setSimSummary(null);

    const initialLogs = [
      { type: "system", text: "--- PRE-FLIGHT DEPLOYMENT GATE VERIFIED ---" },
      { type: "system", text: `Prompt Context: "${simulatorPrompt}"` },
      { type: "system", text: `Modality: Dynamic ${executionMode.toUpperCase()} Orchestration Framework.` },
      { type: "info", text: `Configuring internal routers for ${simulatorAgents.length} sequential nodes.` }
    ];
    setSimulationLogs(initialLogs);

    let idx = 0;
    const executeStep = () => {
      if (idx >= simulatorAgents.length) {
        setTimeout(() => {
          setIsSimulating(false);
          setSimulationStep(-1);

          // Calculate final metrics
          let calculatedLatency = simulatorAgents.reduce((sum, a) => sum + parseFloat(a.latency || 0), 0);
          if (executionMode === "concurrent") {
            calculatedLatency = Math.max(...simulatorAgents.map(a => parseFloat(a.latency || 0)), 0.1) + 0.04;
          } else if (executionMode === "mesh") {
            calculatedLatency = calculatedLatency * 0.72;
          }

          const minSucc = Math.min(...simulatorAgents.map(a => parseFloat(a.success || 100)));
          const summaryRating = (100 - (100 - minSucc) * 0.25).toFixed(2);

          setSimSummary({
            latency: calculatedLatency.toFixed(2),
            success: summaryRating,
            detectionsCount: Math.floor(Math.random() * 3) + 1,
            nodesExecuted: simulatorAgents.length
          });

          setSimulationLogs(prev => [
            ...prev,
            { type: "success", text: "--- SAAS WORKFLOW EXECUTION COMPLETE ---" },
            { type: "success", text: `Consolidated delay: ${calculatedLatency.toFixed(2)}s. Defensive seal reliability: ${summaryRating}%.` },
            { type: "success", text: "Status: PERSISTENT THREATS QUARANTINED | COMPLIANCE GREEN" }
          ]);
        }, 1200);
        return;
      }

      setSimulationStep(idx);
      const activeAgent = simulatorAgents[idx];

      setSimulationLogs(prev => [
        ...prev,
        { type: "agent", agent: activeAgent.name, text: `[Active Node 0${idx + 1}] Processing simulated pipeline query context...` },
        { type: "info", text: activeAgent.log || `Securing active records with latency ${activeAgent.latency}s...` }
      ]);

      setTimeout(() => {
        setSimulationLogs(prev => [
          ...prev,
          { type: "success", agent: activeAgent.name, text: `[Node 0${idx + 1} Success] Executed cleanly. Latency: ${activeAgent.latency}s, Success Score: ${activeAgent.success}%` }
        ]);
        idx++;
        executeStep();
      }, 1800);
    };

    setTimeout(() => {
      executeStep();
    }, 1000);
  };

  const runNaturalLanguageWorkflow = () => {
    setIsPromptRunning(true);
    setPromptStep(1);

    // Step-by-step progress simulation
    setTimeout(() => setPromptStep(2), 1500);
    setTimeout(() => setPromptStep(3), 3000);
    setTimeout(() => setPromptStep(4), 4500);
    setTimeout(() => setPromptStep(5), 6000);
    setTimeout(() => {
      setIsPromptRunning(false);
      alert("Verification task executed completely! 1 Threat Isolated. Check live logs inside the dashboard below.");
      // Append threat to list
      setThreatDetections(prev => [
        { id: `dt-${Date.now().toString().slice(-3)}`, agent: "Watch Agent", title: "Identified Domain Hijacker Spoofing", targetPath: "maestro-support-aiverse.net", severity: "Critical", risk: 94, status: "Investigating" },
        ...prev
      ]);
    }, 7500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Dynamic Backing glow layers */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* COMPACT SAAS TOP HEADER BAR */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/10 border border-blue-500/20">
            <Cpu className="w-5.5 h-5.5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white font-mono leading-none">
                AiVerse ONE™
              </h1>
              <span className="bg-blue-950 text-blue-400 border border-blue-900 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                CONTROL CENTER
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Natural Language Autonomous Multi-Agent Orchestration Gateway
            </p>
          </div>
        </div>

        {/* Address bar simulation */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950 text-slate-500 px-3 py-1.5 rounded-full border border-slate-900 w-full max-w-md mx-6 text-xs">
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[9px] font-mono pr-2 border-r border-slate-800 uppercase tracking-widest font-black text-slate-400 text-[8px]">HTTPS://MAESTRO.AI/ONE</span>
          <span className="text-[11px] font-mono text-slate-300 truncate">
            {activeUrl}
          </span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Side Actions */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setActiveUrl("/one/orchestration")}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition relative"
            title="SaaS Orchestration designer"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-blue-400" />
          </button>
          
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold uppercase rounded-xl transition cursor-pointer"
          >
            Logout Node
          </button>
        </div>
      </header>

      {/* SAAS WORKSPACE WRAPPER */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* DESKTOP SIDE NAVIGATION PANELS */}
        <aside className="w-64 border-r border-slate-900 bg-slate-950 p-4 space-y-6 flex-shrink-0 hidden lg:block overflow-y-auto">
          
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest block px-2">
              AiVerse One Apps
            </span>
            <ul className="space-y-1">
              {[
                { label: "Central Brain", path: "/one", icon: Cpu },
                { label: "Agent Controls", path: "/one/agents", icon: Settings },
                { label: "Workflows/Builder", path: "/one/orchestration", icon: Layers }
              ].map((item) => {
                const isActive = activeUrl === item.path || (item.path === "/one/agents" && activeUrl.startsWith("/one/agents"));
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => setActiveUrl(item.path)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition text-xs font-mono font-bold ${
                        isActive 
                          ? "bg-blue-600 border border-blue-500 text-white shadow-lg shadow-blue-905/20" 
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-slate-900">
            <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest block px-2">
              Agent Registry
            </span>
            <ul className="space-y-1">
              {[
                { label: "Verify Agent", path: "/one/agents/verify" },
                { label: "Watch Agent", path: "/one/agents/watch" },
                { label: "Shield Agent", path: "/one/agents/shield" },
                { label: "Guardian Agent", path: "/one/agents/guardian" },
                { label: "Sentinel Agent", path: "/one/agents/sentinel" },
                { label: "MindSync Agent", path: "/one/agents/mindsync" }
              ].map((agent) => {
                const isActive = activeUrl === agent.path;
                return (
                  <li key={agent.path}>
                    <button
                      onClick={() => setActiveUrl(agent.path)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-2xs font-mono font-bold ${
                        isActive 
                          ? "bg-slate-900 border border-slate-800 text-blue-400" 
                          : "text-slate-500 hover:text-slate-200"
                      }`}
                    >
                      <span>• {agent.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-slate-900">
            <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest block px-2">
              Management
            </span>
            <ul className="space-y-1">
              {[
                { label: "AI Analytics Center", path: "/one/analytics", icon: BarChart2 },
                { label: "Reporting Center", path: "/one/reports", icon: FileText },
                { label: "System Administration", path: "/one/admin", icon: Users }
              ].map((mng) => {
                const isActive = activeUrl === mng.path;
                return (
                  <li key={mng.path}>
                    <button
                      onClick={() => setActiveUrl(mng.path)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition text-xs font-mono font-bold ${
                        isActive 
                          ? "bg-slate-900 text-white" 
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                      }`}
                    >
                      <mng.icon className="w-4 h-4 text-slate-500" />
                      <span>{mng.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Core Telemetry status widget */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-850 space-y-2 select-none text-[10px] font-mono">
            <div className="flex justify-between items-center text-slate-400 font-bold uppercase">
              <span>Tenant Indexing</span>
              <span className="text-emerald-450">Active</span>
            </div>
            <div className="space-y-1 pt-1 border-t border-slate-850 text-slate-500 font-semibold">
              <div className="flex justify-between">
                <span>Orgs Tracked:</span>
                <span className="text-slate-300">250 Active</span>
              </div>
              <div className="flex justify-between">
                <span>Threat Vectors:</span>
                <span className="text-rose-500 font-bold">500 Identified</span>
              </div>
            </div>
          </div>

        </aside>

        {/* COMPONENT CENTRAL WORKSPACE (select-none enabled) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 select-none">
          
          {/* MOBILE NAVIGATION DIRECT BAR */}
          <div className="flex lg:hidden gap-1.5 overflow-x-auto pb-3 border-b border-slate-900 select-none scrollbar-none">
            {[
              { label: "Brain", path: "/one" },
              { label: "Agents", path: "/one/agents" },
              { label: "Orchestration", path: "/one/orchestration" },
              { label: "Analytics", path: "/one/analytics" },
              { label: "Reports", path: "/one/reports" },
              { label: "Admin Console", path: "/one/admin" }
            ].map((mobTab) => (
              <button
                key={mobTab.path}
                onClick={() => setActiveUrl(mobTab.path)}
                className={`px-3 py-1.5 rounded-lg text-2xs font-mono font-bold tracking-tight whitespace-nowrap border ${
                  activeUrl === mobTab.path 
                    ? "bg-blue-600 border-blue-500 text-white" 
                    : "bg-slate-900 border-slate-850 text-slate-400"
                }`}
              >
                {mobTab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeUrl}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.18 }}
              className="space-y-8"
            >

              {/* 1. CENTRAL BRAIN PORTAL (/one / URL) */}
              {activeUrl === "/one" && (
                <div className="space-y-8">
                  
                  {/* PRODUCT SHOWCASE: LANDING PAGE SEGMENT WRAPPER */}
                  <div className="bg-gradient-to-br from-blue-950/20 via-slate-950 to-slate-900 p-6 md:p-8 rounded-3xl border border-slate-900 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="max-w-2xl space-y-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-950 text-blue-300 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-900 animate-none">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Command Showcase</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-4.5xl font-display font-extrabold tracking-tight text-white leading-tight">
                        AiVerse ONE™ <br/>
                        <span className="text-slate-400 font-medium text-lg md:text-2xl font-sans">
                          Natural Language Control Center & Sentinel Agent Network
                        </span>
                      </h2>

                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        Control your entire enterprise cybersecurity footprint, brand protection audits, and behavioral pacing structures from a single, air-gapped natural language interface.
                      </p>
                    </div>

                    {/* NATURAL LANGUAGE USER CASE WORKFLOW DEMO */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4 select-none relative">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block">
                        Interactive Natural Language Query Simulator
                      </span>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatPrompt}
                          onChange={(e) => setChatPrompt(e.target.value)}
                          disabled={isPromptRunning}
                          placeholder="Type security query..."
                          className="flex-1 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={runNaturalLanguageWorkflow}
                          disabled={isPromptRunning}
                          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>{isPromptRunning ? "Running..." : "Query"}</span>
                        </button>
                      </div>

                      {/* Simulation process graph indicators */}
                      {isPromptRunning && (
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-850 space-y-3 font-mono text-xs">
                          <span className="text-[9px] text-blue-400 block font-bold uppercase">Executing Task Pipeline:</span>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 select-none text-[10px]">
                            {[
                              { label: "Intent Analysis", step: 1 },
                              { label: "Launch Watch Agent", step: 2 },
                              { label: "Internet Scan", step: 3 },
                              { label: "Threat Analysis", step: 4 },
                              { label: "Report Generation", step: 5 },
                              { label: "Recommended action", step: 6 }
                            ].map((wState) => {
                              const checked = promptStep >= wState.step;
                              const active = promptStep === wState.step;
                              return (
                                <div 
                                  key={wState.step}
                                  className={`p-2.5 rounded-lg border text-center transition ${
                                    checked 
                                      ? "border-emerald-900 bg-emerald-950/20 text-emerald-300" 
                                      : active 
                                      ? "border-blue-900 bg-blue-950/40 text-blue-300 animate-pulse" 
                                      : "border-slate-900 bg-slate-950 text-slate-600"
                                  }`}
                                >
                                  <span className="font-bold block text-[9.5px]">0{wState.step}</span>
                                  <span>{wState.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* STATS COUNT OVERVIEW GRIDS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-900">
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Active Agents</span>
                        <strong className="text-base text-blue-400 font-mono block mt-0.5">6 Core Agents</strong>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Completed Tasks</span>
                        <strong className="text-base text-cyan-400 font-mono block mt-0.5">5,000+ Executed</strong>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Threat Detections</span>
                        <strong className="text-base text-rose-500 font-mono block mt-0.5">500 Isolated</strong>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Automation Loop Acc</span>
                        <strong className="text-base text-white font-mono block mt-0.5">99.8% Perfect</strong>
                      </div>
                    </div>

                  </div>

                  {/* THREAT DETECTION EVENTS SUMMARY TABLE */}
                  <div className="bg-slate-950 border border-slate-900 p-6 rounded-3xl space-y-4">
                    <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                      Recent Isolated Threat incidents (500 Detected Total)
                    </span>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs text-slate-400 divide-y divide-slate-900">
                        <thead>
                          <tr className="text-slate-650 text-[9px] uppercase tracking-wide">
                            <th className="pb-3">Incident Target</th>
                            <th className="pb-3">Target Coordinate Path</th>
                            <th className="pb-3 text-center">Severity</th>
                            <th className="pb-3 text-center">Risk Score</th>
                            <th className="pb-3 text-center">Audit Source</th>
                            <th className="pb-3 text-right">Audit Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 font-medium">
                          {threatDetections.map((dt) => (
                            <tr key={dt.id} className="hover:bg-slate-900/40">
                              <td className="py-3 text-slate-201 block font-bold">{dt.title}</td>
                              <td className="py-3 text-slate-450">{dt.targetPath}</td>
                              <td className="py-3 text-center">
                                <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                                  dt.severity === "Critical" ? "bg-rose-950 text-rose-455" : "bg-amber-950 text-amber-455"
                                }`}>
                                  {dt.severity}
                                </span>
                              </td>
                              <td className="py-3 text-center font-bold text-slate-302">{dt.risk}%</td>
                              <td className="py-3 text-center text-blue-405">{dt.agent}</td>
                              <td className="py-3 text-right font-bold text-emerald-400">{dt.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* 2. MULTI AGENT CONTROL CENTER (/one/agents) */}
              {activeUrl === "/one/agents" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Sentinel Multi-Agent command center
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Configure status registries, individual execution loads, and performance ratios for all autonomous nodes
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_AGENTS_SUMMARY.map((ag) => (
                      <div 
                        key={ag.id}
                        className="bg-slate-950 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-800 transition"
                      >
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center">
                            <div className="p-2 bg-slate-900 rounded-lg text-blue-400 border border-slate-850">
                              <ag.icon className="w-5 h-5" />
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[8.5px] rounded border border-emerald-900/60 font-mono font-bold animate-pulse">
                              {ag.status}
                            </span>
                          </div>

                          <strong className="text-xs text-white block uppercase tracking-wide font-mono font-black">{ag.name}</strong>
                          <p className="text-slate-400 text-xs leading-relaxed">{ag.desc}</p>
                          
                          <div className="grid grid-cols-3 gap-2 font-mono text-[9px] text-slate-450 border-t border-slate-900 pt-2.5">
                            <div>
                              <span className="text-slate-600 block text-[7px] uppercase tracking-wide">Executions</span>
                              <strong className="text-slate-300 font-bold block">{ag.execs}+</strong>
                            </div>
                            <div>
                              <span className="text-slate-600 block text-[7px] uppercase tracking-wide">Latencies</span>
                              <strong className="text-cyan-404 font-bold block">{ag.responseTime}</strong>
                            </div>
                            <div>
                              <span className="text-slate-600 block text-[7px] uppercase tracking-wide">Success Rate</span>
                              <strong className="text-emerald-450 font-bold block">{ag.successRate}</strong>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveUrl(ag.path)}
                          className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-[10px] font-mono font-bold uppercase rounded-lg transition"
                        >
                          Configure Node Agent
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. VERIFY AGENT VIEW (/one/agents/verify) */}
              {activeUrl === "/one/agents/verify" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Verify Agent (Identity & Brand validation Layer)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Domain verification requests, trust authenticity scores, and certificate validations
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block">
                        Recent Authenticity Check requests
                      </span>

                      <div className="space-y-2 text-xs font-mono">
                        {[
                          { target: "Emirates Corporate Signature verification", score: 99.8, status: "Verified & Sealed", assetType: "Corporate PDF" },
                          { target: "Maestro Support Web Domain check", score: 14.2, status: "SOCIALLY COMPROMISED", assetType: "Domain Address" },
                          { target: "Senior Staff Biometric Voice Check", score: 98.7, status: "Verified Flow", assetType: "ElevenLabs track" }
                        ].map((vReq, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
                            <div>
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">{vReq.assetType}</span>
                              <strong className="text-slate-205 block font-bold">{vReq.target}</strong>
                            </div>
                            <div className="text-right font-mono text-[10px] flex items-center gap-4">
                              <span>Trust: <strong className={vReq.score > 80 ? "text-emerald-400 font-bold" : "text-rose-405 font-bold"}>{vReq.score}%</strong></span>
                              <span className="text-slate-402">{vReq.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Verify Performance
                      </span>

                      <div className="bg-slate-905 p-4 rounded-xl border border-slate-850 text-center space-y-1">
                        <span className="text-[8.5px] font-mono text-slate-450 block uppercase">Continuous Verifications Total</span>
                        <strong className="text-2xl text-blue-400 font-mono block">1,420 Done</strong>
                        <span className="text-[8.5px] text-emerald-450 font-mono">99.8% Success Match</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. WATCH AGENT VIEW (/one/agents/watch) */}
              {activeUrl === "/one/agents/watch" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Watch Agent (Global Internet Surveillance Console)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Monitor brand mentions, social coordinates, and isolate coordinated synthetic account raids
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block">
                        Recent Web Alert Events
                      </span>

                      <div className="space-y-2 text-xs font-mono">
                        {[
                          { event: "Target social impersonation account detected targeting Emirates audience", scale: "Critical", time: "Just now", action: "Triggering Guardian Agent" },
                          { event: "Repetitive brand metadata copying detected matching spoof signatures", scale: "High", time: "12 mins ago", action: "Logged in quarantine register" },
                          { event: "Sybil swarm X bot interaction frequency anomalies detected", scale: "Medium", time: "32 mins ago", action: "Alert dispatched to PR heads" }
                        ].map((wAlert, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-901 border border-slate-850 rounded-xl space-y-1.5 hover:border-slate-800 transition">
                            <div className="flex justify-between text-xs font-mono font-bold">
                              <span className="text-rose-455 font-bold uppercase">{wAlert.scale} priority threat</span>
                              <span className="text-slate-500">{wAlert.time}</span>
                            </div>
                            <p className="text-slate-300 leading-normal">{wAlert.event}</p>
                            <span className="text-[9px] text-blue-400 block pt-1.5 border-t border-slate-850">
                              Response step: <span className="font-bold">{wAlert.action}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Watch statistics
                      </span>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 flex justify-between">
                          <span>Total domain monitored:</span>
                          <span className="font-bold text-white">420 addresses</span>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 flex justify-between">
                          <span>Active scan interval:</span>
                          <span className="text-cyan-404">Realtime logs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SHIELD AGENT VIEW (/one/agents/shield) */}
              {activeUrl === "/one/agents/shield" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Shield Agent (Cybersecurity Gateway Hub)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Active LAN network shielding, sensitive PII data-leak prevention registers, and prompt regulation
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block">
                        Network Shield gateway intercepts
                      </span>

                      <div className="space-y-2 text-xs font-mono">
                        {[
                          { endpoint: "SFTP Data export folder copy attempt", outcome: "PII Shield redacted credit logs", severity: "High" },
                          { endpoint: "Municipal API payload prompt sync", outcome: "Jailbreak threat isolated", severity: "Critical" },
                          { endpoint: "Continuous LAN scanning loop", outcome: "No unencrypted tokens found", severity: "Stable" }
                        ].map((vShield, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <span className="text-slate-500 block text-[8px] font-bold">INTERCEPT LOG</span>
                              <strong className="text-slate-205 block font-bold leading-none pb-1">{vShield.endpoint}</strong>
                              <span className="text-slate-450 block text-[10.5px]">Outcomes: {vShield.outcome}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[8.5px] uppercase font-bold tracking-wide ${vShield.severity === "Critical" ? "bg-rose-950 text-rose-405" : "bg-slate-900 text-slate-400"}`}>
                              {vShield.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Shield core configuration
                      </span>

                      <div className="space-y-1.5 font-mono text-[9.5px]">
                        <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex justify-between">
                          <span>LAN protection:</span>
                          <span className="text-emerald-450 font-bold">Enabled</span>
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex justify-between">
                          <span>Regex PII Redactor:</span>
                          <span className="text-emerald-455 font-bold">Active Local</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5.1 GUARDIAN AGENT VIEW (/one/agents/guardian) */}
              {activeUrl === "/one/agents/guardian" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Guardian Agent (Brand Imposter & Reputation Protection)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Active identity theft monitoring, asset hijacking checks, and automated triage
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block">
                        Identity Imposter Incidents (Brand-Surveillance)
                      </span>

                      <div className="space-y-2 text-xs font-mono">
                        {[
                          { imposterName: "@SarahJenkins_OfficialCoin", riskScore: 94, status: "Investigating" },
                          { imposterName: "maestro-support-aiverse.net", riskScore: 97, status: "Investigating" },
                          { imposterName: "@ElonMusk_RealCoin", riskScore: 92, status: "Resolved (Quarantined)" }
                        ].map((vGuard, idx) => (
                          <div key={idx} className="p-3 bg-slate-905 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <span className="text-slate-500 block text-[8px] font-bold">ISOLATED THREAT PROFILE</span>
                              <strong className="text-slate-205 block font-mono font-bold leading-snug">{vGuard.imposterName}</strong>
                              <span className="text-slate-450 block text-[10.5px]">Identified risk: {vGuard.riskScore}% Serious Fraud</span>
                            </div>
                            <span className="text-emerald-400 font-bold font-mono">{vGuard.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Guardian Performance
                      </span>

                      <div className="bg-slate-905 p-4 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8.5px] font-mono text-slate-450 block uppercase">Total Identity Cases Logged</span>
                        <strong className="text-2xl text-blue-400 font-mono block">730 Cases</strong>
                        <span className="text-[8.5px] text-emerald-450 font-mono">99.1% Isolation Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5.2 SENTINEL AGENT VIEW (/one/agents/sentinel) */}
              {activeUrl === "/one/agents/sentinel" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Sentinel Agent (Strategic Intelligence & Audit Logger)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Executive security reports, historical logs, and risk intelligence audits
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block text-[10px]">
                        Recent Strategic Intelligence Audits
                      </span>

                      <div className="space-y-2 text-xs font-mono">
                        {[
                          { title: "Sovereign tenant UAE regulation impact audit", date: "Just now", classification: "Executive Class" },
                          { title: "Continuous GCM encrypted transaction loop", date: "12 mins ago", classification: "Compliance Lock" },
                          { title: "Annual Threat Landscape Forecast compilation", date: "42 mins ago", classification: "Intelligence deck" }
                        ].map((vSentinel, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <span className="text-slate-500 block text-[8px] font-bold">SENTINEL DATED ARCHIVE</span>
                              <strong className="text-slate-105 block font-bold leading-normal">{vSentinel.title}</strong>
                              <span className="text-slate-450 block text-[10px]">Classification level: {vSentinel.classification}</span>
                            </div>
                            <span className="text-emerald-405 text-right flex-shrink-0">{vSentinel.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Sentinel load scale
                      </span>

                      <div className="bg-slate-905 p-4 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8.5px] font-mono text-slate-450 block uppercase font-bold">Total Intel Audits Done</span>
                        <strong className="text-2xl text-blue-400 font-mono block">1,105 Runs</strong>
                        <span className="text-[8.5px] text-emerald-450 font-mono">99.5% Success Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5.3 MINDSYNC AGENT VIEW (/one/agents/mindsync) */}
              {activeUrl === "/one/agents/mindsync" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        MindSync Agent (Contextual Adaptation Engine)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Synthesizes contextual workspace preferences, schedules relative quiet hours, and updates layout templates
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block">
                        Recent MindSync Adaptation Metrics (Synchronous context loops)
                      </span>

                      <div className="space-y-2 text-xs font-mono">
                        {[
                          { targetModule: "Dashboard compaction density calibration", calibratedMetric: "Compact (91%) applied", latencyRatio: "0.08s speed" },
                          { targetModule: "Peak Focus calendar scheduling check", calibratedMetric: "08:00 - 11:30 Peaks mapped", latencyRatio: "Stable focus" },
                          { targetModule: "Slack mute quiet hours trigger", calibratedMetric: "Minimized redundant noise", latencyRatio: "Muted async" }
                        ].map((vMind, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <span className="text-slate-500 block text-[8px] font-bold">MODULE CORE CALIBRATION</span>
                              <strong className="text-slate-205 block font-bold leading-normal">{vMind.targetModule}</strong>
                              <span className="text-slate-450 block text-[10px]">Applied state: {vMind.calibratedMetric}</span>
                            </div>
                            <span className="text-cyan-404 font-bold text-right flex-shrink-0">{vMind.latencyRatio}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        MindSync performance
                      </span>

                      <div className="bg-slate-905 p-4 rounded-xl border border-slate-850 text-center">
                        <span className="text-[8.5px] font-mono text-slate-450 block uppercase font-bold">Total Adaptations Done</span>
                        <strong className="text-2xl text-blue-400 font-mono block">2,150 Synced</strong>
                        <span className="text-[8.5px] text-emerald-450 font-mono">99.4% alignment score</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. ORCHESTRATION LAYER VIEW (/one/orchestration) */}
              {activeUrl === "/one/orchestration" && (
                <div className="space-y-6">
                  {/* Top bar header */}
                  <div className="flex justify-between items-center flex-wrap gap-4 pb-4 border-b border-slate-900">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest bg-blue-950 text-blue-400 border border-blue-900 rounded-full">
                          SIMULATOR V2.4
                        </span>
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                          Sovereign Orchestration Sandbox
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-white leading-none">
                        Multi-Agent Execution Simulator
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 max-w-xl leading-normal font-sans">
                        Experiment with multi-agent pipelines. Drag & drop agents or select presets to model cybersecurity orchestration flows, track data streams, and simulate executive agent tasks.
                      </p>
                    </div>

                    <div className="flex gap-2 font-mono text-[10px]">
                      <button
                        onClick={() => applySimulatorPreset("brand-watch")}
                        disabled={isSimulating}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg hover:text-white transition disabled:opacity-50"
                      >
                        Preset: Brand Surveillance
                      </button>
                      <button
                        onClick={() => applySimulatorPreset("network-shield")}
                        disabled={isSimulating}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg hover:text-white transition disabled:opacity-50"
                      >
                        Preset: Gateway Shield
                      </button>
                      <button
                        onClick={() => applySimulatorPreset("all-agents")}
                        disabled={isSimulating}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg hover:text-white transition disabled:opacity-50"
                      >
                        Preset: All-In-One Gate
                      </button>
                    </div>
                  </div>

                  {/* Main Simulator Grid Workspaces */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                    {/* Left Sidebar Pane: AVAILABLE AGENTS MODULE (4 cols) */}
                    <div className="xl:col-span-4 bg-slate-950 border border-slate-900 p-5 rounded-3xl space-y-4">
                      <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
                        <span className="text-[10px] font-mono tracking-wider uppercase font-black text-slate-500 block">
                          Available Sentinel Agents
                        </span>
                        <span className="text-[9px] font-mono text-slate-450 font-bold">
                          Drag Card or Click (+)
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-0.5">
                        Select from the ethical behavioral agent catalog below. Each excels at distinct threat audits.
                      </p>

                      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                        {AVAILABLE_SIM_AGENTS.map((agent) => {
                          const IconComp = agent.icon;
                          return (
                            <div
                              key={agent.id}
                              draggable={!isSimulating}
                              onDragStart={(e) => handleDragStartAgent(e, agent)}
                              className={`p-3 rounded-xl border border-slate-850 bg-slate-900/40 select-none transition ${
                                isSimulating 
                                  ? "opacity-60 cursor-not-allowed" 
                                  : "hover:border-blue-600/70 cursor-grab active:cursor-grabbing hover:bg-slate-905"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2.5">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-850 ${agent.color}`}>
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-mono font-bold text-white leading-tight">
                                      {agent.name}
                                    </h4>
                                    <span className="text-[8.5px] font-mono text-slate-450 font-medium block mt-0.5">
                                      Latency: {agent.latency}s • Efficacy: {agent.success}%
                                    </span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => addAgentToPipeline(agent)}
                                  disabled={isSimulating}
                                  className="p-1 rounded bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition disabled:opacity-55"
                                  title="Add to pipeline"
                                >
                                  <Plus className="w-3.5 h-3.5 text-blue-400" />
                                </button>
                              </div>
                              <p className="text-[10.5px] font-sans text-slate-400 leading-normal mt-2 pl-0.5">
                                {agent.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Sandbox Workspace (8 cols) */}
                    <div className="xl:col-span-8 flex flex-col gap-6">

                      {/* Drop Workspace Canvas */}
                      <div className="bg-slate-950 border border-slate-900 p-5 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-900 pb-2.5">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Layers className="w-4 h-4 text-blue-400" />
                            Active Pipeline Canvas ({simulatorAgents.length} Nodes Loaded)
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={clearPipeline}
                              disabled={isSimulating || simulatorAgents.length === 0}
                              className="px-2 py-1 text-[9.5px] border border-slate-850 hover:bg-slate-900 font-mono font-bold text-rose-450 rounded transition disabled:opacity-45"
                            >
                              Clear Pipeline
                            </button>
                          </div>
                        </div>

                        {/* Drop Zone Box */}
                        <div
                          onDragOver={(e) => {
                            if (!isSimulating) {
                              e.preventDefault();
                              e.dataTransfer.dropEffect = "copy";
                            }
                          }}
                          onDrop={handleDropOnPipeline}
                          className={`min-h-[224px] p-6 border-2 border-dashed rounded-2xl relative flex flex-col justify-center transition-all ${
                            isSimulating 
                              ? "border-slate-900 bg-slate-950" 
                              : "border-slate-850 bg-slate-905/30 hover:border-blue-900/60 hover:bg-slate-905/60"
                          }`}
                        >
                          <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />

                          {simulatorAgents.length === 0 ? (
                            <div className="text-center space-y-2 py-8 relative z-10">
                              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto">
                                <Plus className="w-5 h-5 text-slate-500 animate-pulse" />
                              </div>
                              <p className="text-xs font-mono font-bold text-slate-400">
                                PIPELINE CANVAS IS EMPTY
                              </p>
                              <p className="text-[11px] font-sans text-slate-500 max-w-sm mx-auto leading-relaxed">
                                Drag cards from the left panel and drop them inside this area to construct your custom pipeline, or click the preset buttons above.
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-3 relative z-10 py-2">
                              {simulatorAgents.map((agent, index) => {
                                const IconComp = agent.icon;
                                const isCurrentNode = isSimulating && simulationStep === index;
                                const isCompletedNode = isSimulating && index < simulationStep;

                                return (
                                  <div key={agent.instanceId || index} className="flex items-center gap-2">
                                    
                                    {/* Action node item */}
                                    <div 
                                      className={`w-40 p-3.5 rounded-xl border relative transition ${
                                        isCurrentNode 
                                          ? "bg-slate-950 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500" 
                                          : isCompletedNode 
                                            ? "bg-slate-900/80 border-emerald-800" 
                                            : "bg-slate-950 border-slate-850 hover:border-slate-800"
                                      }`}
                                    >
                                      {/* Block marker title */}
                                      <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase border-b border-slate-900 pb-1 mb-2 font-bold">
                                        <span>NODE 0{index + 1}</span>
                                        <span className={`h-1.5 w-1.5 rounded-full ${
                                          isCurrentNode 
                                            ? "bg-blue-400 animate-ping" 
                                            : isCompletedNode 
                                              ? "bg-emerald-400" 
                                              : "bg-slate-700"
                                        }`} />
                                      </div>

                                      <div className="flex items-center gap-1.5">
                                        <div className={`p-1 rounded bg-slate-900 border border-slate-850 ${agent.color}`}>
                                          <IconComp className="w-3.5 h-3.5" />
                                        </div>
                                        <strong className="text-xs font-mono font-bold text-white truncate block max-w-[95px]">
                                          {agent.name.split(' ')[0]} Agent
                                        </strong>
                                      </div>

                                      <p className="text-[9px] font-sans text-slate-450 leading-tight mt-1 truncate">
                                        {agent.desc.split('&')[0]}
                                      </p>

                                      {/* Node action buttons (reorder, delete) */}
                                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-900">
                                        <div className="flex gap-1.5">
                                          <button
                                            type="button"
                                            disabled={isSimulating || index === 0}
                                            onClick={() => movePipelineAgent(index, "left")}
                                            className="p-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white transition disabled:opacity-30"
                                            title="Move Left"
                                          >
                                            <ArrowLeft className="w-3 h-3" />
                                          </button>
                                          <button
                                            type="button"
                                            disabled={isSimulating || index === simulatorAgents.length - 1}
                                            onClick={() => movePipelineAgent(index, "right")}
                                            className="p-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white transition disabled:opacity-30"
                                            title="Move Right"
                                          >
                                            <ArrowRight className="w-3 h-3" />
                                          </button>
                                        </div>
                                        <button
                                          type="button"
                                          disabled={isSimulating}
                                          onClick={() => deletePipelineAgent(index)}
                                          className="p-0.5 rounded bg-slate-900/60 hover:bg-red-950/80 border border-slate-850 hover:border-red-900 text-slate-550 hover:text-rose-400 transition disabled:opacity-30"
                                          title="Remove node"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Connection pointer arrow */}
                                    {index < simulatorAgents.length - 1 && (
                                      <ChevronRight className="w-4 h-4 text-slate-700 mx-0.5 shrink-0" />
                                    )}

                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Simulator Console, Query Prompt and Mode Controls */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Prompt & Config Card */}
                        <div className="bg-slate-950 border border-slate-900 p-5 rounded-3xl space-y-4">
                          <span className="text-[10px] font-mono tracking-wider uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                            Configure Query parameters
                          </span>

                          <div className="space-y-3.5">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-slate-400 block font-bold">
                                Instruction Query Context:
                              </label>
                              <textarea
                                value={simulatorPrompt}
                                onChange={(e) => setSimulatorPrompt(e.target.value)}
                                disabled={isSimulating}
                                rows={2}
                                className="w-full text-xs font-sans bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-blue-600 resize-none disabled:opacity-60"
                                placeholder="State target threat, security task context, or compliance boundaries."
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                              <div className="space-y-1">
                                <label className="text-slate-500 text-[8.5px] font-bold block">
                                  ORCHESTRATION MODE:
                                </label>
                                <select
                                  value={executionMode}
                                  onChange={(e) => setExecutionMode(e.target.value)}
                                  disabled={isSimulating}
                                  className="w-full bg-slate-900 border border-slate-850 py-2 px-1.5 rounded-lg text-slate-200 outline-none focus:border-blue-600 font-bold"
                                >
                                  <option value="sequential">Sequential Pipeline</option>
                                  <option value="concurrent">Dynamic Concurrent</option>
                                  <option value="mesh">P2P Mesh Network</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-slate-500 text-[8.5px] font-bold block">
                                  AIR-GAP DEPLOYMENT:
                                </label>
                                <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-lg text-emerald-400 font-bold flex items-center gap-1.5 select-none text-[9.5px]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>Enabled (Zurich)</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-2">
                              <button
                                onClick={runSimulatorPipeline}
                                disabled={isSimulating || simulatorAgents.length === 0}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-900 disabled:text-slate-500 border border-blue-500 hover:border-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                              >
                                {isSimulating ? (
                                  <>
                                    <RefreshCw className="w-4 h-4 text-white animate-spin" />
                                    <span>Simulating Node 0{simulationStep + 1}...</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3.5 h-3.5 fill-white" />
                                    <span>Launch Executive Pipeline</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Sandbox Live Secure Terminal logs and results */}
                        <div className="bg-slate-950 border border-slate-900 p-5 rounded-3xl flex flex-col justify-between space-y-4">
                          <div>
                            <span className="text-[10px] font-mono tracking-wider uppercase font-black text-slate-500 block border-b border-slate-900 pb-2 flex justify-between items-center">
                              <span>Secure Terminal Feed outputs</span>
                              <span className="text-[9px] text-blue-400 font-normal">Active PORT 3000</span>
                            </span>

                            <div className="h-40 overflow-y-auto bg-slate-980 border border-slate-900/80 rounded-xl p-3 font-mono text-[10px] space-y-2 mt-2 select-text scrollbar-thin scrollbar-thumb-slate-800">
                              {simulationLogs.map((log, lidx) => (
                                <div key={lidx} className="leading-relaxed">
                                  {log.type === "system" && (
                                    <span className="text-slate-500 font-bold block">{`[SYS] ${log.text}`}</span>
                                  )}
                                  {log.type === "info" && (
                                    <span className="text-slate-400 block">{`[INF] ${log.text}`}</span>
                                  )}
                                  {log.type === "agent" && (
                                    <span className="text-blue-400 font-bold block">{`[${log.agent}] ${log.text}`}</span>
                                  )}
                                  {log.type === "success" && (
                                    <span className="text-emerald-400 font-bold block">{log.agent ? `[${log.agent}] ${log.text}` : log.text}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Simulation Result summaries */}
                          {simSummary && (
                            <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2.5 font-mono text-[10px] relative">
                              <div className="absolute top-2.5 right-2 px-1.5 py-0.5 rounded text-[8.5px] font-bold text-emerald-400 border border-emerald-990 bg-emerald-950/80">
                                COMPLETE
                              </div>
                              <span className="text-[9px] font-black uppercase text-slate-500 font-mono block">
                                Calculated Pipeline Metrics:
                              </span>
                              
                              <div className="grid grid-cols-3 gap-2 text-center select-none pt-0.5">
                                <div className="p-1.5 bg-slate-950 rounded-lg border border-slate-850">
                                  <span className="text-[7.5px] text-slate-500 font-bold block">DURATION</span>
                                  <strong className="text-slate-205 text-xs font-bold font-mono">{simSummary.latency}s</strong>
                                </div>
                                <div className="p-1.5 bg-slate-950 rounded-lg border border-slate-850">
                                  <span className="text-[7.5px] text-slate-500 font-bold block">DEFLECT SCALE</span>
                                  <strong className="text-emerald-400 text-xs font-bold font-mono">{simSummary.success}%</strong>
                                </div>
                                <div className="p-1.5 bg-slate-950 rounded-lg border border-slate-850">
                                  <span className="text-[7.5px] text-slate-550 font-bold block">THREATS SECURED</span>
                                  <strong className="text-cyan-400 text-xs font-bold font-mono">{simSummary.detectionsCount} Isolated</strong>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* 7. AI ANALYTICS CENTER VIEW (/one/analytics) */}
              {activeUrl === "/one/analytics" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        AI Analytics & Performance Center
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        High level metrics evaluating prediction thresholds, threat detection indices, and systemic memory utilization ratios
                      </p>
                    </div>
                  </div>

                  {/* High level selector tabs */}
                  <div className="flex gap-2 border-b border-slate-900 pb-3 font-mono text-[10.5px]">
                    {[
                      { key: "accuracy", label: "Intent Prediction accuracy" },
                      { key: "performance", label: "Agent latency profiles" },
                      { key: "memory", label: "Tenant memory allocation scale" }
                    ].map((met) => (
                      <button
                        key={met.key}
                        onClick={() => setAnalyticsMetric(met.key)}
                        className={`px-3 py-1.5 rounded-lg border ${
                          analyticsMetric === met.key 
                            ? "bg-slate-900 border-slate-700 text-blue-400" 
                            : "bg-transparent border-transparent text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {met.label}
                      </button>
                    ))}
                  </div>

                  {/* Render simulated analytics layout charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
                    <div className="lg:col-span-2 bg-slate-950 p-6 border border-slate-900 rounded-3xl space-y-4">
                      
                      <div className="flex justify-between text-xs font-mono font-bold uppercase text-slate-500 border-b border-slate-900 pb-2">
                        <span>Metric Trend (Last 30 Days)</span>
                        <span className="text-emerald-450">+2.4% Optimal Growth</span>
                      </div>

                      {/* Vector simulation of rich graph curves */}
                      <div className="h-64 border border-slate-850 bg-slate-900/30 rounded-2xl relative p-4 flex flex-col justify-between overflow-hidden">
                        <svg className="w-full h-full absolute inset-0 text-indigo-500" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <path 
                            d="M 0 35 L 20 28 L 40 32 L 60 12 L 80 18 L 100 4" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.75"
                          />
                        </svg>

                        <div className="flex justify-between items-center text-[7px] text-slate-400 z-10 pr-2">
                          <span>92% Minimum</span>
                          <span>99.8% Peak efficiency</span>
                        </div>

                        <div className="flex justify-between text-[7px] text-slate-550 z-10 w-full pt-48">
                          <span>June 01</span>
                          <span>June 10</span>
                          <span>June 20</span>
                          <span>Today</span>
                        </div>
                      </div>

                    </div>

                    <div className="bg-slate-950 p-6 border border-slate-900 rounded-3xl space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        System Load Metrics
                      </span>

                      <div className="space-y-4 font-mono text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-405">
                            <span>Threat Detection Rate:</span>
                            <strong className="text-rose-500">97.4% High isolated</strong>
                          </div>
                          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                            <div className="bg-rose-500 w-[97%] h-full rounded-full" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-405">
                            <span>User Engagements total:</span>
                            <strong className="text-cyan-404">10,000+ Events queue</strong>
                          </div>
                          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 w-[91%] h-full rounded-full" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-900 space-y-1 text-slate-450 leading-relaxed text-[11px] font-sans">
                          <strong className="text-slate-300 font-mono text-[9px] block">ANALYTICS NOTICE:</strong>
                          <p>
                            All intelligence metrics evaluated above map directly onto tenant-isolated private sandboxes. Absolute separation from external central models is guaranteed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. REPORTING CENTER VIEW (/one/reports) */}
              {activeUrl === "/one/reports" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        Reporting Center & Audit exporters
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Download, configure, and compile structured compliance PDF files or executive threat summaries
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                    {[
                      { title: "Executive Threat Landscape", size: "1.4 MB", type: "Security Briefing", date: "Just now" },
                      { title: "Behavioral Cognitive Pacing Report", size: "840 KB", type: "Pacing parameters", date: "June 08, 2026" },
                      { title: "Sovereign UAE PDPL Compliance", size: "2.1 MB", type: "Regulatory Check", date: "June 06, 2026" },
                      { title: "Monthly Sales Conversion Prediction", size: "1.8 MB", type: "Forecasting Brief", date: "June 01, 2026" }
                    ].map((rep, idx) => (
                      <div key={idx} className="p-4 bg-slate-905 border border-slate-850 rounded-2xl space-y-3 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-slate-500 text-[8px] font-bold uppercase block">{rep.type}</span>
                          <strong className="text-slate-108 block font-bold leading-snug">{rep.title}</strong>
                          <div className="flex gap-4 text-[9px] text-slate-500">
                            <span>Size: {rep.size}</span>
                            <span>Compiled: {rep.date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            alert(`Compiling file "${rep.title}" into certified PDF output... download triggered.`);
                          }}
                          className="w-full py-1.5 bg-slate-90 w-full hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-[10px] font-bold uppercase rounded-lg transition"
                        >
                          Generate PDF Report
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. SYSTEM ADMINISTRATION VIEW (/one/admin) */}
              {activeUrl === "/one/admin" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                        System Administration Panel
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Configure organizational credentials, subscription tiers, API access keys, and secure memory policies
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs font-mono">
                    
                    {/* Security credentials list config */}
                    <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Active Credentials & Access Keys (250 Orgs Total)
                      </span>

                      <div className="space-y-3">
                        {[
                          { pathName: "Sovereign-Zurich Node integration (AES-GCM-256)", keyID: "ak-zurich-xxx", level: "Tenant Master Override" },
                          { pathName: "Verify-Agent Domain Validator API Connector", keyID: "ak-verify-xxx", level: "Regional Domain scope" },
                          { pathName: "Slack webhook quiet hours connector", keyID: "ak-slack-xxx", level: "Communication Scope" }
                        ].map((cKey, idx) => (
                          <div key={idx} className="p-3 bg-slate-901 border border-slate-850 rounded-xl flex items-center justify-between">
                            <div>
                              <span className="text-slate-500 block text-[8px] font-bold">API KEY PROTOCOL</span>
                              <strong className="text-slate-205 block font-mono font-bold leading-sm">{cKey.pathName}</strong>
                              <span className="text-slate-450 block text-[10.5px]">Scope Level: {cKey.level}</span>
                            </div>

                            <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-[9.5px] rounded select-all font-bold text-cyan-404">
                              {cKey.keyID}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right organizational configs */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-black text-slate-500 block border-b border-slate-900 pb-2">
                        Organizational Settings
                      </span>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 text-[8.5px] font-bold block">Current Organization Name:</label>
                          <span className="font-bold text-slate-300 block text-xs">AiVerse Command Zurich</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 text-[8.5px] font-bold block">Active Subscription Tier:</label>
                          <span className="text-indigo-404 font-bold block text-xs">Sovereign Tier Platinum Edge</span>
                        </div>
                        <div className="space-y-1 pt-1.5 border-t border-slate-900">
                          <label className="text-slate-500 text-[8.5px] font-bold block">Deployment Type status:</label>
                          <span className="text-emerald-455 font-bold block">Sovereign air-gapped container LAN</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* EVENTS LOOPS LOGS TICKER */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-3 select-none text-xs font-mono">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[9px] tracking-widest uppercase text-slate-500 block font-bold">
                Unified Live Agent Execution Ticker (5,000+ task queue logs)
              </span>
              <span className="text-[8.5px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-900/60 px-2 py-0.5 rounded animate-pulse">
                Agent Sync Stable
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px] text-slate-400">
              <div className="p-2.5 bg-slate-901 border border-slate-850 rounded-xl">
                <span className="text-slate-600 block text-[8px] font-bold">06:22:15 UTC • ACTIVE ROUTE</span>
                <p className="text-slate-205">Verify Agent executed signature checks for UAE-PDPL compliance templates.</p>
              </div>
              <div className="p-2.5 bg-slate-901 border border-slate-850 rounded-xl">
                <span className="text-slate-600 block text-[8px] font-bold">06:33:42 UTC • THREAT ALERT</span>
                <p className="text-slate-205">Watch Agent isolated 4 imposter domains spoofing company support avenues.</p>
              </div>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
