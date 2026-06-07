import { useState, useEffect } from "react";
import { 
  ShieldAlert, ShieldCheck, Play, ArrowRight, Activity, 
  Cpu, FileCheck, Landmark, GitCommit, ChevronRight, AlertOctagon,
  Fingerprint, Database, Lock
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "./context/LanguageContext";

// Ingest custom components
import Navigation from "./components/Navigation";
import NetworkGlobe from "./components/NetworkGlobe";
import ThreatLandscape from "./components/ThreatLandscape";
import WorkflowTimeline from "./components/WorkflowTimeline";
import PlatformModules from "./components/PlatformModules";
import DemoCenter from "./components/DemoCenter";
import Ecosystem from "./components/Ecosystem";
import SuccessDemosMetrics from "./components/SuccessDemosMetrics";
import Footer from "./components/Footer";
import TrustScannerWorkspace from "./components/TrustScannerWorkspace";
import AdminDashboard from "./components/AdminDashboard";
import Hero from "./components/ui/animated-shader-hero";
import TrustComplianceCenter from "./components/TrustComplianceCenter";
import CyberPrivacyPortal from "./components/CyberPrivacyPortal";

export default function App() {
  const { t } = useLanguage();
  const [contentScanned, setContentScanned] = useState(480000000);
  const [threatsDetected, setThreatsDetected] = useState(1950000);
  const [clientCount, setClientCount] = useState(105);
  const [showScannerPage, setShowScannerPage] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showSovereignPortal, setShowSovereignPortal] = useState(false);

  // Custom listener for global scanner page open requests
  useEffect(() => {
    const handleOpenScanner = () => {
      setShowScannerPage(true);
      setShowAdminPage(false);
      setShowSovereignPortal(false);
      // Ensure page scrolls to top nicely
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenAdmin = () => {
      setShowAdminPage(true);
      setShowScannerPage(false);
      setShowSovereignPortal(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenSovereign = () => {
      setShowSovereignPortal(true);
      setShowAdminPage(false);
      setShowScannerPage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("openScanWorkspace", handleOpenScanner);
    window.addEventListener("openAdminConsole", handleOpenAdmin);
    window.addEventListener("openSovereignPortal", handleOpenSovereign);
    return () => {
      window.removeEventListener("openScanWorkspace", handleOpenScanner);
      window.removeEventListener("openAdminConsole", handleOpenAdmin);
      window.removeEventListener("openSovereignPortal", handleOpenSovereign);
    };
  }, []);

  // Counter Incrementor Animation
  useEffect(() => {
    const timer = setInterval(() => {
      setContentScanned((prev) => (prev < 500000000 ? prev + 1250000 : 500000000));
      setThreatsDetected((prev) => (prev < 2000000 ? prev + 3100 : 2000000));
      setClientCount((prev) => (prev < 120 ? prev + 1 : 120));
    }, 45);
    return () => clearInterval(timer);
  }, []);

  if (showAdminPage) {
    return <AdminDashboard onClose={() => setShowAdminPage(false)} />;
  }

  if (showSovereignPortal) {
    return <CyberPrivacyPortal onClose={() => setShowSovereignPortal(false)} />;
  }

  if (showScannerPage) {
    return <TrustScannerWorkspace onClose={() => setShowScannerPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-800 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between scroll-smooth relative bg-grid">
      
      {/* Dynamic Header & Scan workspace Modal */}
      <Navigation />

      {/* Reusable Animated Shader Hero - White Theme */}
      <Hero theme="light" className="relative">
        {/* Operations & Threat Intelligence Dashboard Container */}
        <section id="operations-dashboard" className="relative pt-24 pb-20 px-6 md:px-8 max-w-7xl mx-auto w-full overflow-hidden scroll-mt-20 z-20">
          
          {/* Soft floating blur circles behind */}
          <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-50/60 blur-[130px] -z-10 pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-50/60 blur-[130px] -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero left text block (col-span-5) */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-blue-605 text-xs font-semibold select-none animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span>{t.hero.securing}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-slate-905 leading-[1.02]">
                {t.hero.titlePre}<span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-800 bg-clip-text text-transparent">{t.hero.titleSpan}</span>
              </h1>

              <p className="text-slate-650 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("openScanWorkspace"));
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-650 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 tracking-tight group cursor-pointer"
                >
                  <span>{t.hero.ctasScan}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a 
                  href="#threats"
                  className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-750 font-bold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-500 text-slate-500 border-none" />
                  <span>{t.hero.ctasDemo}</span>
                </a>
              </div>

              {/* Micro warning tag */}
              <p className="text-[10px] font-mono font-bold text-slate-400 max-w-sm mx-auto lg:mx-0 leading-none">
                {t.hero.monitoring}
              </p>
            </div>

            {/* Hero center: Network Globe (col-span-4) */}
            <div className="lg:col-span-4 relative flex justify-center items-center">
              <NetworkGlobe />
            </div>

            {/* Hero right: Threat Intelligence Feed sidebar widget (col-span-3) */}
            <div className="lg:col-span-3">
              <aside className="w-full border border-slate-200 bg-white/75 backdrop-blur-md flex flex-col rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-white/90 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">{t.hero.threatIntel}</span>
                    <p className="text-[11px] text-slate-500 font-medium">{t.hero.monitoringActive}</p>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                </div>
                
                <div className="flex-1 overflow-hidden p-3 space-y-2.5 max-h-[300px]">
                  <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-sm">
                    <div className="text-[10px] font-semibold text-red-650 font-mono mb-1">{t.hero.deepfakeDet}</div>
                    <div className="text-[11px] text-slate-700 leading-snug">{t.hero.deepfakeDetMsg}</div>
                    <div className="mt-2 text-[9px] text-slate-445 font-mono">{t.hero.justNow}</div>
                  </div>
                  <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-sm opacity-90">
                    <div className="text-[10px] font-semibold text-amber-655 font-mono mb-1">{t.hero.voiceAnomaly}</div>
                    <div className="text-[11px] text-slate-700 leading-snug">{t.hero.voiceAnomalyMsg}</div>
                    <div className="mt-1.5 text-[9px] text-slate-445 font-mono">{t.hero.twoMAgo}</div>
                  </div>
                  <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-sm opacity-70">
                    <div className="text-[10px] font-semibold text-blue-600 font-mono mb-1">{t.hero.originVerified}</div>
                    <div className="text-[11px] text-slate-700 leading-snug">{t.hero.originVerifiedMsg}</div>
                    <div className="mt-1.5 text-[9px] text-slate-445 font-mono">{t.hero.fiveMAgo}</div>
                  </div>
                </div>

                <div className="mt-auto p-4 bg-slate-900 text-white rounded-b-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">{t.hero.trustScore}</div>
                  <div className="text-2xl font-bold font-mono">98.7%</div>
                  <div className="w-full bg-slate-755 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-500 w-[98.7%] h-full rounded-full"></div>
                  </div>
                </div>
              </aside>
            </div>

          </div>

          {/* Counter statistic meters bar */}
          <div className="border border-slate-150 py-6 mt-16 bg-white/70 backdrop-blur-md rounded-2xl px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-450 font-bold leading-none">
                  {t.hero.scannedContent}
                </span>
                <strong className="text-3xl md:text-3.5xl font-display font-extrabold text-blue-650 tracking-tight block font-mono">
                  {(contentScanned / 1e6).toFixed(0)}M+
                </strong>
                <p className="text-[10px] text-slate-450 leading-none">{t.hero.scannedSub}</p>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-450 font-bold leading-none">
                  {t.hero.threatsIsolated}
                </span>
                <strong className="text-3xl md:text-3.5xl font-display font-extrabold text-rose-600 tracking-tight block font-mono">
                  {(threatsDetected / 1e6).toFixed(2)}M+
                </strong>
                <p className="text-[10px] text-slate-450 leading-none">{t.hero.threatsSub}</p>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-450 font-bold leading-none">
                  {t.hero.accuracyVector}
                </span>
                <strong className="text-3xl md:text-3.5xl font-display font-extrabold text-emerald-600 tracking-tight block font-mono">
                  98.7%
                </strong>
                <p className="text-[10px] text-slate-450 leading-none">{t.hero.accuracySub}</p>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-450 font-bold leading-none">
                  {t.hero.enterpriseCovered}
                </span>
                <strong className="text-3xl md:text-3.5xl font-display font-extrabold text-slate-800 tracking-tight block font-mono">
                  {clientCount}+
                </strong>
                <p className="text-[10px] text-slate-450 leading-none">{t.hero.enterpriseSub}</p>
              </div>

            </div>
          </div>

        </section>
      </Hero>

      {/* SECTION 2: THE AI THREAT LANDSCAPE */}
      <section id="threats" className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-405 font-bold">
            {t.threats.category}
          </span>
          <h2 className="text-2xl md:text-3.5xl font-display font-semibold text-zinc-900 tracking-tight">
            {t.threats.title}
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto">
            {t.threats.subtitle}
          </p>
        </div>

        <ThreatLandscape />
      </section>

      {/* SECTION 3: HOW AIVERSE WORKS */}
      <section id="how-it-works" className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full bg-zinc-5 bg-opacity-40 rounded-[40px] scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-405 font-bold">
            {t.workflow.category}
          </span>
          <h2 className="text-2xl md:text-3.5xl font-display font-semibold text-zinc-900 tracking-tight">
            {t.workflow.title}
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto">
            {t.workflow.subtitle}
          </p>
        </div>

        <WorkflowTimeline />
      </section>

      {/* SECTION 4: PLATFORM MODULES */}
      <section id="modules" className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[10.5px] uppercase font-mono tracking-widest text-zinc-405 font-bold">
            {t.modules.category}
          </span>
          <h2 className="text-2xl md:text-3.5xl font-display font-semibold text-zinc-900 tracking-tight">
            {t.modules.title}
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            {t.modules.subtitle}
          </p>
        </div>

        <PlatformModules />
      </section>

      {/* SECTION 4.2: SOVEREIGN CYBERSECURITY & PRIVACY PORTAL DISPLAY WITH LIVE SCREENSHOT MOCKUP */}
      <section id="cyber-privacy-showcase" className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full bg-slate-50 border border-slate-200 rounded-[40px] scroll-mt-20 overflow-hidden relative">
        
        {/* Soft background glow circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text and Pillars Block (col-span-5) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-105 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold uppercase select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Sovereign Local Hardware Deployment</span>
            </div>

            <h2 className="text-3xl md:text-4.2xl font-display font-bold text-slate-900 tracking-tight leading-none">
              The Sovereign Trust, Cyber & Privacy Operating System
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Deploy AiVerse directly onto your company premises, private cloud infrastructure, or internal personal workspace. Keep 100% of sensitive employee files, biometric tracks, credentials, and LLM prompt tokens in absolute air-gapped confinement.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-blue-600 flex-shrink-0 shadow-sm">
                  <Fingerprint className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">1. AiVerse Identity Shielding</strong>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Audit leaking passwords, active dark web forum raids, and social media deepfakes targeting executive profiles without releasing raw data externally.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-650 flex-shrink-0 shadow-sm">
                  <Database className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">2. AiVerse PII Guardian</strong>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Identify sensitive Emirates IDs, physical Passports, and personal credit cards stored insecurely inside directories using local offline regex blocks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-emerald-650 flex-shrink-0 shadow-sm">
                  <Lock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">3. AI & Prompt Governance</strong>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Regulate employee prompts sent to external models (ChatGPT, Gemini, Claude). Filter source-code leaks and jailbreaks instantly at the gateway level.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openSovereignPortal"));
                }}
                className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer font-mono"
              >
                <span>Launch Demo & Onboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openSovereignPortal"));
                }}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase"
              >
                <span>Sovereign Sandbox</span>
              </button>
            </div>
          </div>

          {/* Right Layout Screenshot Mockup container (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-2xl relative overflow-hidden select-none select-none hover:shadow-3xl transition-all">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-slate-400 ml-2 font-semibold">AiVerse-Sovereign-Portal_v3.5</span>
                </div>
                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-black uppercase">NODE ACTIVE</span>
              </div>

              {/* Mockup Screen content - 100% Light Theme styling */}
              <div className="space-y-4">
                
                {/* Header overview row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-blue-600 block font-bold">Local Intranet Node</span>
                    <strong className="text-slate-800 text-xs block font-bold">Sovereign AirGapped Hub - Zurich</strong>
                  </div>
                  <div className="flex gap-4 font-mono text-[9.5px]">
                    <div>
                      <span className="text-slate-400 block font-bold text-[8px] uppercase">Compliance</span>
                      <span className="text-emerald-600 font-black">UAE PDPL (97%)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[8px] uppercase">Threat Indicators</span>
                      <span className="text-red-500 font-extrabold">2 High Warnings</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Core stats charts */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-slate-150 p-2.5 rounded-xl bg-white text-center">
                    <span className="text-[8px] font-mono text-slate-400 block font-black uppercase">Identity Score</span>
                    <strong className="text-xs text-emerald-600 block font-mono">14% Low Risk</strong>
                  </div>
                  <div className="border border-slate-150 p-2.5 rounded-xl bg-white text-center">
                    <span className="text-[8px] font-mono text-slate-400 block font-black uppercase">Exposed Files</span>
                    <strong className="text-xs text-rose-500 block font-mono">3 Files Flagged</strong>
                  </div>
                  <div className="border border-slate-150 p-2.5 rounded-xl bg-white text-center">
                    <span className="text-[8px] font-mono text-slate-400 block font-black uppercase">Network Nodes</span>
                    <strong className="text-xs text-slate-800 block font-mono">12 Active LAN</strong>
                  </div>
                </div>

                {/* Real-time telemetry feed mockup in action */}
                <div className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50">
                  <div className="p-2 border-b border-slate-150 bg-white flex justify-between items-center font-mono">
                    <span className="text-[8.5px] font-bold uppercase text-slate-400">Exposed Emirates PII Streams</span>
                    <span className="text-[8px] text-blue-600 font-extrabold uppercase">Live Scan Loop</span>
                  </div>
                  <div className="p-2.5 divide-y divide-slate-150 font-mono text-[9.5px] space-y-1.5">
                    
                    <div className="flex items-center justify-between py-1 text-slate-705">
                      <span className="font-bold text-slate-850">emirates_id_vip-member.pdf</span>
                      <span className="bg-rose-50 text-rose-600 font-bold border border-rose-100 px-1.5 py-0.5 rounded text-[8.5px]">Identified ID: 784-1992-...</span>
                      <button 
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("openSovereignPortal"));
                        }} 
                        className="text-blue-600 hover:underline hover:text-blue-850 cursor-pointer font-bold"
                      >
                        Quarantine
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-1 text-slate-705">
                      <span className="font-bold text-slate-855">passport_copy_executive-01.jpg</span>
                      <span className="bg-rose-50 text-rose-600 font-bold border border-rose-100 px-1.5 py-0.5 rounded text-[8.5px]">Identified Passport Spec</span>
                      <button 
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("openSovereignPortal"));
                        }} 
                        className="text-blue-600 hover:underline hover:text-blue-850 cursor-pointer font-bold"
                      >
                        Quarantine
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-1 text-slate-705">
                      <span className="font-bold text-slate-850">financial_plan_q3_draft.zip</span>
                      <span className="bg-emerald-50 text-emerald-600 font-bold border border-emerald-100 px-1.5 py-0.5 rounded text-[8.5px]">Encrypted & Sealed on premises</span>
                      <span className="text-emerald-600 font-bold text-[8.5px]">Resolved</span>
                    </div>

                  </div>
                </div>

                {/* Absolute overlay preview shield banner on screenshot */}
                <div className="absolute inset-0 bg-slate-950/5 backdrop-blur-[1px] hover:backdrop-blur-none transition-all flex items-center justify-center p-4 rounded-xl group/click">
                  <div className="bg-white p-4 rounded-2xl shadow-xl max-w-xs text-center border border-slate-200 select-none group-hover/click:scale-105 transition duration-350">
                    <Lock className="w-5 h-5 mx-auto text-blue-650 animate-bounce mb-2" />
                    <strong className="text-xs text-slate-900 block font-bold uppercase tracking-tight">Interactive Local Sandbox</strong>
                    <p className="text-[10px] text-slate-500 leading-normal my-1">
                      Click to explore registration & view details of all 22 core modules with full pre-populated forensic data matrices.
                    </p>
                    <button 
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent("openSovereignPortal"));
                      }}
                      className="mt-2.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-[9px] rounded-lg cursor-pointer transition flex items-center gap-1 mx-auto justify-center"
                    >
                      <span>Interactive Login</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* SECTION 4.5: IMMUTABLE TRUST & REGULATORY COMPLIANCE SYSTEM */}
      <TrustComplianceCenter />

      {/* SECTIONS 5-13: FORENSICS PLAYGROUND CENTER & DASHBOARD DEMOS */}
      <section id="demo" className="py-24 px-6 md:px-8 max-w-[1340px] mx-auto w-full scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-405 font-bold">
            {t.demo.category}
          </span>
          <h2 className="text-2xl md:text-3.5xl font-display font-semibold text-zinc-900 tracking-tight">
            {t.demo.title}
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            {t.demo.subtitle}
          </p>
        </div>

        <DemoCenter />
      </section>

      {/* SECTIONS 14-15: ECOSYSTEM TOPOLOGY */}
      <section id="ecosystem" className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
        <Ecosystem />
      </section>

      {/* SECTIONS 16-18: CASE STUDIES & METRICS */}
      <section id="metrics" className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
        <SuccessDemosMetrics />
      </section>

      {/* SECTION 19: PREMIUM CALL TO ACTION */}
      <section className="relative py-28 px-6 md:px-8 max-w-7xl mx-auto w-full text-center overflow-hidden bg-zinc-900 text-white rounded-3xl mb-24">
        
        {/* Soft dark grids */}
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="relative min-h-[220px] flex flex-col justify-center items-center space-y-6 z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-blue-300" />
            <span>MAKE AI ACCOUNTABLE & TRUSTWORTHY</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Protect What Matters Most
          </h2>

          <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
            Build trust, detect generative threats, verify content authenticity, and stay ahead of AI-powered deception today.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-4">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openScanWorkspace"));
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white text-zinc-900 font-bold text-xs rounded-xl hover:bg-zinc-100 transition shadow-lg tracking-tight cursor-pointer"
            >
              Start Free Scan
            </button>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openScanWorkspace"));
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 text-white hover:bg-white/20 font-semibold text-xs border border-white/20 rounded-xl transition cursor-pointer"
            >
              Schedule Enterprise Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer Area with ISO indicators */}
      <Footer />

    </div>
  );
}
