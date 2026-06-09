import { useState, useEffect } from "react";
import { 
  ShieldAlert, ShieldCheck, Play, ArrowRight, Activity, 
  Cpu, FileCheck, Landmark, GitCommit, ChevronRight, AlertOctagon,
  Fingerprint, Database, Lock, Brain, Layers, Sliders, Check, Terminal, Wifi, Sparkles, Zap, Radar
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
import SocialFakeDetectorWorkspace from "./components/SocialFakeDetectorWorkspace";
import AiVerseMindSync from "./components/AiVerseMindSync";
import AiVerseOne from "./components/AiVerseOne";
import ModuleSecurityGateway from "./components/ModuleSecurityGateway";

export default function App() {
  const { t } = useLanguage();
  const [unlockedModules, setUnlockedModules] = useState<Record<string, boolean>>({});
  const [contentScanned, setContentScanned] = useState(480000000);
  const [threatsDetected, setThreatsDetected] = useState(1950000);
  const [clientCount, setClientCount] = useState(105);
  const [showScannerPage, setShowScannerPage] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showSovereignPortal, setShowSovereignPortal] = useState(false);
  const [showSocialFakeDetector, setShowSocialFakeDetector] = useState(false);
  const [showMindSyncPage, setShowMindSyncPage] = useState(false);
  const [showAiVerseOnePage, setShowAiVerseOnePage] = useState(false);

  // --- Interactive MindSync Home Mockup State ---
  const [msFocusValue, setMsFocusValue] = useState<number>(94);
  const [msAutopilotActive, setMsAutopilotActive] = useState<boolean>(true);
  const [msActivePacing, setMsActivePacing] = useState<string>("Executive Deep Work Pacing");
  const [msLogInfo, setMsLogInfo] = useState<string>("Pacing stable. Local CPU node running AES-GCM-256.");
  const [msRecentCognitiveAction, setMsRecentCognitiveAction] = useState<string>("Synthesizing work pacing template for current task...");

  // --- Interactive ONE Home Mockup State ---
  const [oneOrchMode, setOneOrchMode] = useState<string>("sequential");
  const [oneExecutionStep, setOneExecutionStep] = useState<number>(-1);
  const [oneStatus, setOneStatus] = useState<string>("IDLE - Pipeline Armed");
  const [oneSimulatingLogs, setOneSimulatingLogs] = useState<string[]>([
    "Gateway security systems online.",
    "Bespoke Verify, Watch & Shield nodes loaded."
  ]);

  const handleRunOneMockupSimulation = () => {
    if (oneExecutionStep >= 0) return;
    setOneStatus("RUNNING");
    setOneExecutionStep(0);
    setOneSimulatingLogs([
      "Initiating Multi-Agent Threat Sweep Sequence...",
      "Matching query vectors against registry."
    ]);
    
    // Step 0: Watch Agent
    setTimeout(() => {
      setOneExecutionStep(1);
      setOneSimulatingLogs(prev => [...prev, "[Watch Node] Spoof surveillance sweep: 0 vulnerabilities."]);
      
      // Step 1: Verify Agent
      setTimeout(() => {
        setOneExecutionStep(2);
        setOneSimulatingLogs(prev => [...prev, "[Verify Node] Signature validated. Identity matching certified."]);
        
        // Step 2: Shield Agent
        setTimeout(() => {
          setOneExecutionStep(-1);
          setOneStatus("SUCCESS");
          setOneSimulatingLogs(prev => [
            ...prev,
            "[Shield Node] Boundary gate enforced. Raw leaking tokens neutralized.",
            "Sweep completed successfully. Latency check: 0.12s."
          ]);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Custom listener for global scanner page open requests
  useEffect(() => {
    const handleOpenScanner = () => {
      setShowScannerPage(true);
      setShowAdminPage(false);
      setShowSovereignPortal(false);
      setShowSocialFakeDetector(false);
      setShowMindSyncPage(false);
      setShowAiVerseOnePage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenAdmin = () => {
      setShowAdminPage(true);
      setShowScannerPage(false);
      setShowSovereignPortal(false);
      setShowSocialFakeDetector(false);
      setShowMindSyncPage(false);
      setShowAiVerseOnePage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenSovereign = () => {
      setShowSovereignPortal(true);
      setShowAdminPage(false);
      setShowScannerPage(false);
      setShowSocialFakeDetector(false);
      setShowMindSyncPage(false);
      setShowAiVerseOnePage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenSocialFakeDetector = () => {
      setShowSocialFakeDetector(true);
      setShowSovereignPortal(false);
      setShowAdminPage(false);
      setShowScannerPage(false);
      setShowMindSyncPage(false);
      setShowAiVerseOnePage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenMindSync = () => {
      setShowMindSyncPage(true);
      setShowAiVerseOnePage(false);
      setShowSocialFakeDetector(false);
      setShowSovereignPortal(false);
      setShowAdminPage(false);
      setShowScannerPage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenAiVerseOne = () => {
      setShowAiVerseOnePage(true);
      setShowMindSyncPage(false);
      setShowSocialFakeDetector(false);
      setShowSovereignPortal(false);
      setShowAdminPage(false);
      setShowScannerPage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("openScanWorkspace", handleOpenScanner);
    window.addEventListener("openAdminConsole", handleOpenAdmin);
    window.addEventListener("openSovereignPortal", handleOpenSovereign);
    window.addEventListener("openSocialFakeDetector", handleOpenSocialFakeDetector);
    window.addEventListener("openMindSync", handleOpenMindSync);
    window.addEventListener("openAiVerseOne", handleOpenAiVerseOne);
    return () => {
      window.removeEventListener("openScanWorkspace", handleOpenScanner);
      window.removeEventListener("openAdminConsole", handleOpenAdmin);
      window.removeEventListener("openSovereignPortal", handleOpenSovereign);
      window.removeEventListener("openSocialFakeDetector", handleOpenSocialFakeDetector);
      window.removeEventListener("openMindSync", handleOpenMindSync);
      window.removeEventListener("openWhiteone", handleOpenAiVerseOne);
      window.removeEventListener("openAiVerseOne", handleOpenAiVerseOne);
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
    if (!unlockedModules.admin) {
      return (
        <ModuleSecurityGateway
          sectionId="admin"
          sectionTitle="Admin Portal"
          onUnlock={() => setUnlockedModules(prev => ({ ...prev, admin: true }))}
          onClose={() => setShowAdminPage(false)}
        />
      );
    }
    return <AdminDashboard onClose={() => setShowAdminPage(false)} />;
  }

  if (showSovereignPortal) {
    if (!unlockedModules.cyber_privacy) {
      return (
        <ModuleSecurityGateway
          sectionId="cyber_privacy"
          sectionTitle="Cyber & Privacy Portal"
          onUnlock={() => setUnlockedModules(prev => ({ ...prev, cyber_privacy: true }))}
          onClose={() => setShowSovereignPortal(false)}
        />
      );
    }
    return <CyberPrivacyPortal onClose={() => setShowSovereignPortal(false)} />;
  }

  if (showScannerPage) {
    if (!unlockedModules.trust_scanner) {
      return (
        <ModuleSecurityGateway
          sectionId="trust_scanner"
          sectionTitle="Trust Scanner Workspace"
          onUnlock={() => setUnlockedModules(prev => ({ ...prev, trust_scanner: true }))}
          onClose={() => setShowScannerPage(false)}
        />
      );
    }
    return <TrustScannerWorkspace onClose={() => setShowScannerPage(false)} />;
  }

  if (showSocialFakeDetector) {
    if (!unlockedModules.social_fake) {
      return (
        <ModuleSecurityGateway
          sectionId="social_fake"
          sectionTitle="Social Fake Detector Workspace"
          onUnlock={() => setUnlockedModules(prev => ({ ...prev, social_fake: true }))}
          onClose={() => setShowSocialFakeDetector(false)}
        />
      );
    }
    return <SocialFakeDetectorWorkspace onClose={() => setShowSocialFakeDetector(false)} />;
  }

  if (showMindSyncPage) {
    if (!unlockedModules.mindsync) {
      return (
        <ModuleSecurityGateway
          sectionId="mindsync"
          sectionTitle="AiVerse MindSync"
          onUnlock={() => setUnlockedModules(prev => ({ ...prev, mindsync: true }))}
          onClose={() => setShowMindSyncPage(false)}
        />
      );
    }
    return <AiVerseMindSync onClose={() => setShowMindSyncPage(false)} />;
  }

  if (showAiVerseOnePage) {
    if (!unlockedModules.aiverse_one) {
      return (
        <ModuleSecurityGateway
          sectionId="aiverse_one"
          sectionTitle="AiVerse ONE"
          onUnlock={() => setUnlockedModules(prev => ({ ...prev, aiverse_one: true }))}
          onClose={() => setShowAiVerseOnePage(false)}
        />
      );
    }
    return <AiVerseOne onClose={() => setShowAiVerseOnePage(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-800 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between scroll-smooth relative bg-grid">
      
      {/* Dynamic Header & Scan workspace Modal */}
      <Navigation />

      {/* Reusable Animated Shader Hero - White Theme */}
      <Hero theme="light" className="relative">
        {/* Operations & Threat Intelligence Dashboard Container */}
        <section id="operations-dashboard" className="relative pt-24 pb-20 px-4 md:px-8 w-full max-w-none overflow-hidden scroll-mt-20 z-20">
          
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
      <section id="threats" className="py-24 px-4 md:px-8 w-full max-w-none scroll-mt-20">
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
      <section id="how-it-works" className="py-24 px-4 md:px-8 w-full max-w-none bg-zinc-5 bg-opacity-40 rounded-none border-y border-zinc-200/50 scroll-mt-20">
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
      <section id="modules" className="py-24 px-4 md:px-8 w-full max-w-none scroll-mt-20">
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
      <section id="cyber-privacy-showcase" className="py-24 px-4 md:px-8 w-full max-w-none bg-slate-50 border-y border-slate-200 rounded-none scroll-mt-20 overflow-hidden relative">
        
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

      {/* NEW SECTION: SOCIAL MEDIA FAKE PROFILE DETECTOR LANDER BLOCK */}
      <section id="social-fake-detector" className="py-24 px-4 md:px-8 w-full max-w-none bg-slate-50 border-y border-slate-200 rounded-none scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-100/30 blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-indigo-100/30 blur-[130px] -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text details block & Features (col-span-5) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-mono font-bold uppercase select-none">
              <Activity className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
              <span>Coordinated Influence Defense Layer</span>
            </div>

            <h2 className="text-3xl md:text-4.2xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              Social Media Fake Profile & Identity Theft Detector
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Protect your brand reputation and personal integrity. Scan the global social topology to isolate high-risk celebrity imposters, coordinate bot swarms, and synthetic AI generated avatars across all major worldwide platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase block tracking-wider">Multi-Platform Scanner</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Trace profiles across X/Twitter, Instagram, TikTok, LinkedIn, and more in a unified console.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-rose-500 uppercase block tracking-wider">Linguistic NLP Audit</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Identify automated LLM writing signatures, repetitive text-patterns, and botnet propagation.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-indigo-650 uppercase block tracking-wider">Synthetic Image Check</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Flag GAN generated avatars, synthetic eyelid mismatched configurations, and face filter masks.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase block tracking-wider">Behavioral Cadence</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Cross-examine 24-hour posting densities to distinguish organic human timing from server loops.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <button 
                onClick={() => {
                  setShowSocialFakeDetector(true);
                  window.dispatchEvent(new CustomEvent("openSocialFakeDetector"));
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-300/10 transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer font-mono"
              >
                <span>Launch Fake Detector</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Graphic mockup representations (col-span-6) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl relative overflow-hidden select-none hover:shadow-3xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 bg-red-500 text-white font-mono text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                COGNITIVE THREAT CONFIRMED
              </div>

              {/* Mock Header UI */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4 font-mono text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span>Forensic Specimen Scan: @ElonMusk_RealCoin</span>
              </div>

              {/* Mock Scan Profile Spec */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50/50 border border-red-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-100 text-red-650 flex items-center justify-center font-mono font-extrabold text-[10px]">
                      EL
                    </div>
                    <div className="leading-none">
                      <strong className="text-xs text-slate-900 block font-bold">Elon Musk [Free Coin Giveaway]</strong>
                      <span className="text-[10px] text-slate-445 font-mono">@ElonMusk_RealCoin • Platform: X</span>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-650 px-2 py-0.5 rounded text-[8.5px] font-mono font-black border border-red-200 animate-pulse">
                    97% RISK
                  </span>
                </div>

                {/* Cognitive bars */}
                <div className="space-y-2 font-mono text-[9px] text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <div className="flex justify-between items-center">
                    <span>Synthetic Avatar Probability:</span>
                    <strong className="text-red-500">88% HIGH</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[88%] h-full rounded-full" />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span>NLP Temporal Scripting Match:</span>
                    <strong className="text-red-500">92% CRITICAL</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-400 w-[92%] h-full rounded-full" />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span>Geographic Origin Match:</span>
                    <strong className="text-amber-500">VPN Proxy</strong>
                  </div>
                </div>

                {/* Micro warning notice */}
                <p className="text-[9.5px] font-mono text-slate-400 leading-normal pt-1 flex items-start gap-1.5">
                  <span className="text-red-500">⚠️</span>
                  <span>This sample demonstrates sybil coordination, targeting cryptocurrency transaction traps through generative likeness hijacking.</span>
                </p>

                {/* Primary click trigger to lead the user to search directly */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400">Scan Timeline Logs Live</span>
                  <button 
                    onClick={() => {
                      setShowSocialFakeDetector(true);
                      window.dispatchEvent(new CustomEvent("openSocialFakeDetector"));
                    }}
                    className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white font-mono font-bold text-[9px] rounded-lg tracking-wider uppercase transition cursor-pointer"
                  >
                    Interactive Audit
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* SECTIONS 5-13: FORENSICS PLAYGROUND CENTER & DASHBOARD DEMOS */}
      <section id="demo" className="py-24 px-4 md:px-8 w-full max-w-none scroll-mt-20">
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
      <section id="ecosystem" className="py-24 px-4 md:px-8 w-full max-w-none scroll-mt-20">
        <Ecosystem />
      </section>

      {/* SECTIONS 16-18: CASE STUDIES & METRICS */}
      <section id="metrics" className="py-24 px-4 md:px-8 w-full max-w-none scroll-mt-20">
        <SuccessDemosMetrics />
      </section>

      {/* DUAL PLATFORM MODULES PREMIUM DECK */}
      <section className="py-16 md:py-24 w-full space-y-24 scroll-mt-20">
        
        {/* SECTION A: MINDSYNC PREMIUM WORKSPACE */}
        <div id="mindsync-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-50/50 border-y border-zinc-200/50 py-16 px-4 md:px-8 relative overflow-hidden w-full max-w-none">
          
          {/* Subtle Pink Ambient Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-100/10 blur-[100px] pointer-events-none -z-10" />

          {/* Left Column: Details & Value Proposition */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="bg-pink-100 text-pink-600 border border-pink-200 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider select-none">
              FEATURED BEHAVIORAL COGNITIVE CORE
            </span>
            <h3 className="text-3xl md:text-4.5xl font-extrabold font-display tracking-tight text-slate-900 leading-none">
              AiVerse MindSync™
            </h3>
            <p className="text-slate-655 text-sm leading-relaxed font-medium">
              Anticipate user workspaces, adapt response templates, and schedule custom peak quiet hours based on ethical, high-privacy behavioral cognition paradigms. Keeping all user inputs encrypted locally, MindSync acts as a secure cognitive copilot.
            </p>

            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-100 flex-shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">1. Cognitive Behavior Synapses</strong>
                  <p className="text-[11px] text-zinc-500 leading-normal">Track user app paces, key repetitive macros, and application context to pre-configure custom template folders safely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-100 flex-shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">2. Intelligent Quiet-Hour Pacing</strong>
                  <p className="text-[11px] text-zinc-500 leading-normal">Automated timing parameters mute background clutter and optimize localized timezone workloads during deep focus windows.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-100 flex-shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">3. 100% On-Premise Confinement</strong>
                  <p className="text-[11px] text-zinc-500 leading-normal">Local database caching of key behavioral patterns protected with military-spec key algorithms (AES-GCM-256).</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openMindSync"))}
                className="w-full sm:w-auto px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-mono text-xs font-bold rounded-xl transition cursor-pointer shadow-lg shadow-pink-500/10 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>Enter MindSync Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] font-mono text-slate-550 border-l border-zinc-200 pl-4 py-1 flex items-center gap-1.5">
                <span>Avg Latency:</span>
                <span className="text-pink-605 font-bold">0.08ms</span>
              </div>
            </div>
          </div>

          {/* Right Column: MindSync Interactive Screen Demonstration Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-2xl border border-slate-900 shadow-2xl overflow-hidden hover:border-pink-900/30 transition duration-300">
              
              {/* Card Window Mock Header */}
              <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-900 flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 rounded-full h-2 bg-pink-500" />
                  <span className="w-2 rounded-full h-2 bg-zinc-700" />
                  <span className="w-2 rounded-full h-2 bg-zinc-700" />
                  <span className="text-[10px] text-slate-400 font-mono font-bold ml-2">mindsync-dashboard_v2.4.c</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-slate-950 px-2 py-0.5 border border-slate-850 rounded">
                    LOCAL COGNITIVE UNIT
                  </span>
                </div>
              </div>

              {/* Monitor Screen Context */}
              <div className="p-5 md:p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Metric: Focus Level with slider */}
                  <div className="p-4 bg-slate-900/35 border border-slate-900 rounded-xl space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 uppercase">
                      <span>USER FOCUS INDEX</span>
                      <span className="text-pink-400 font-bold">{msFocusValue}%</span>
                    </div>
                    <div className="font-display font-black text-2xl text-white tracking-tight">
                      {msFocusValue >= 90 ? "Deep Focus" : msFocusValue >= 70 ? "Balanced" : "Fatigued"}
                    </div>
                    <div className="pt-1 select-none">
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        value={msFocusValue} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setMsFocusValue(val);
                          if (val >= 90) {
                            setMsLogInfo("Focus lock verified. Recommending deep work quiet-hour configuration.");
                          } else if (val >= 70) {
                            setMsLogInfo("Moderate cognitive exertion. Suggesting routine desk stretch.");
                          } else {
                            setMsLogInfo("Focus drop detected. Recommendation: Coffee break / micro-session break.");
                          }
                        }}
                        className="w-full accent-pink-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer" 
                      />
                    </div>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      Drag slider to adjust user focus and simulate copilot reactions.
                    </span>
                  </div>

                  {/* Autopilot toggle */}
                  <div className="p-4 bg-slate-900/35 border border-slate-900 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 uppercase">
                      <span>AUTOPILOT COGNITION</span>
                      <span className={`h-2 w-2 rounded-full ${msAutopilotActive ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                    </div>
                    <div className="font-display font-semibold text-lg text-slate-200 mt-1">
                      {msAutopilotActive ? "Adaptive Mode Active" : "Manual Override"}
                    </div>
                    <div>
                      <button 
                        onClick={() => {
                          const nextState = !msAutopilotActive;
                          setMsAutopilotActive(nextState);
                          setMsLogInfo(nextState ? "Autopilot active. Re-engaging cognitive behavior networks." : "Autopilot disconnected. Reverting to manual user control templates.");
                        }}
                        className={`mt-2 w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-855 border border-slate-800 rounded-lg text-[10px] font-mono font-bold transition uppercase ${msAutopilotActive ? "text-pink-400 border-pink-900/50" : "text-slate-450"}`}
                      >
                        {msAutopilotActive ? "Disable Autopilot" : "Enable Autopilot"}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Cognitive Pacing Simulator Selector */}
                <div className="p-4 bg-slate-900/35 border border-slate-900 rounded-xl space-y-2">
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    ACTIVE PACING STRATEGY
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Executive Deep Work Pacing", "Productivity Acceleration Mode", "Quiet Hours Silence Loop"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setMsActivePacing(mode);
                          setMsRecentCognitiveAction(`Triggering: "${mode}" parameters...`);
                          setTimeout(() => {
                            setMsRecentCognitiveAction(`Workspace adaptation applied: Compact template rules running.`);
                          }, 1000);
                        }}
                        className={`text-[9.5px] font-mono font-bold py-1 px-2.5 border rounded-lg transition uppercase ${msActivePacing === mode ? "bg-pink-950/40 text-pink-400 border-pink-900/80" : "bg-slate-950 text-slate-400 border-slate-900 hover:border-slate-800"}`}
                      >
                        {mode.split(" ")[0]} Pacing
                      </button>
                    ))}
                  </div>
                  <p className="text-[9.5px] font-mono text-pink-405 leading-relaxed italic block pt-1">
                    {msRecentCognitiveAction}
                  </p>
                </div>

                {/* Behavioral Live Feed Console */}
                <div className="space-y-1.5">
                  <span className="text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    BEHAVIORAL EVENT LOG
                  </span>
                  <div className="h-14 font-mono text-[10px] text-zinc-400 bg-slate-990 border border-slate-900 p-2.5 rounded-xl flex items-center gap-2">
                    <span className="text-emerald-400 font-bold block shrink-0">[ENG]</span>
                    <span className="truncate leading-normal select-text">{msLogInfo}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* SECTION B: AIVERSE ONE MULTI-AGENT SENTINEL */}
        <div id="aiverseone-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-50/50 border border-zinc-100 py-16 px-4 md:px-8 relative overflow-hidden w-full max-w-none">
          
          {/* Subtle Cyan Ambient Glow */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-100/10 blur-[100px] pointer-events-none -z-10" />

          {/* Left Column: ONE Interactive Sentinel Demonstration Mockup */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="bg-slate-950 rounded-2xl border border-slate-900 shadow-2xl overflow-hidden hover:border-cyan-900/30 transition duration-300">
              
              {/* Card Window Mock Header */}
              <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-900 flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 rounded-full h-2 bg-cyan-500" />
                  <span className="w-2 rounded-full h-2 bg-zinc-700" />
                  <span className="w-2 rounded-full h-2 bg-zinc-700" />
                  <span className="text-[10px] text-slate-400 font-mono font-bold ml-2">autonomous-sentinel_v1.0.u</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 border border-slate-850 rounded">
                    ZURICH AIR-GAP LIVE
                  </span>
                </div>
              </div>

              {/* Monitor Screen Context */}
              <div className="p-5 md:p-6 space-y-5">
                
                {/* Visual Agent pipeline */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9.5px] font-mono font-bold text-slate-500 uppercase">
                    <span>Orchestrated Threat Pipeline Nodes</span>
                    <span className={`text-[9.5px] text-cyan-400 ${oneExecutionStep >= 0 ? "animate-pulse" : ""}`}>
                      STATUS: {oneStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900/30 border border-slate-900 p-4 rounded-xl">
                    
                    {/* Node 1: Watch Agent */}
                    <div className="flex flex-col items-center space-y-1.5 w-24 select-none">
                      <div className={`p-2 rounded-xl transition-all duration-300 ${oneExecutionStep === 0 ? "bg-cyan-950/40 border-cyan-400 border shadow-lg shadow-cyan-400/20 scale-110" : oneExecutionStep > 0 ? "bg-slate-900 border-emerald-500 border" : "bg-slate-950 border border-slate-850"}`}>
                        <Radar className={`w-4 h-4 ${oneExecutionStep === 0 ? "text-cyan-400 animate-spin" : oneExecutionStep > 0 ? "text-emerald-400" : "text-slate-500"}`} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-200">Watch Agent</span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-800" />

                    {/* Node 2: Verify Agent */}
                    <div className="flex flex-col items-center space-y-1.5 w-24 select-none">
                      <div className={`p-2 rounded-xl transition-all duration-300 ${oneExecutionStep === 1 ? "bg-cyan-950/40 border-cyan-400 border shadow-lg shadow-cyan-400/20 scale-110" : oneExecutionStep > 1 ? "bg-slate-900 border-emerald-500 border" : "bg-slate-950 border border-slate-850"}`}>
                        <ShieldCheck className={`w-4 h-4 ${oneExecutionStep === 1 ? "text-cyan-400 animate-pulse" : oneExecutionStep > 1 ? "text-emerald-400" : "text-slate-500"}`} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-200">Verify Agent</span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-800 text-slate-800" />

                    {/* Node 3: Shield Agent */}
                    <div className="flex flex-col items-center space-y-1.5 w-24 select-none">
                      <div className={`p-2 rounded-xl transition-all duration-300 ${oneExecutionStep === 2 ? "bg-cyan-950/40 border-cyan-400 border shadow-lg shadow-cyan-400/20 scale-110" : "bg-slate-950 border border-slate-850"}`}>
                        <Lock className={`w-4 h-4 ${oneExecutionStep === 2 ? "text-cyan-400 animate-bounce" : "text-slate-500"}`} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-200">Shield Agent</span>
                    </div>

                  </div>
                </div>

                {/* Configuration and Simulation Control Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Select Mode */}
                  <div className="p-3.5 bg-slate-900/35 border border-slate-900 rounded-xl space-y-1 select-none">
                    <label className="text-[8.5px] font-mono font-bold text-slate-500 uppercase block">
                      Orchestration Mode
                    </label>
                    <select
                      value={oneOrchMode}
                      onChange={(e) => setOneOrchMode(e.target.value)}
                      disabled={oneExecutionStep >= 0}
                      className="w-full bg-slate-950 border border-slate-850 py-1.5 px-2 rounded-lg text-[10.5px] font-mono font-bold text-slate-200 outline-none focus:border-cyan-500"
                    >
                      <option value="sequential">Sequential Pipeline</option>
                      <option value="concurrent">Dynamic Concurrent</option>
                    </select>
                  </div>

                  {/* Run Test Trigger */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleRunOneMockupSimulation}
                      disabled={oneExecutionStep >= 0}
                      className="w-full h-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-900 disabled:text-slate-500 border border-cyan-500 hover:border-cyan-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
                    >
                      {oneExecutionStep >= 0 ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping mr-1" />
                          <span>Sweeping...</span>
                        </>
                      ) : (
                        <>
                          <span>Run Gateway Audit</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Terminal secure output streams */}
                <div className="space-y-1.5">
                  <span className="text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    AGENT TRANSACTION LEDGER
                  </span>
                  <div className="h-28 overflow-y-auto bg-slate-990 border border-slate-900 p-3 rounded-xl font-mono text-[9.5px] text-zinc-400 space-y-1 leading-normal select-text scrollbar-thin">
                    {oneSimulatingLogs.map((log, lidx) => (
                      <div key={lidx} className="flex gap-2 items-start shrink-0">
                        <span className="text-slate-500 font-bold shrink-0">{`[0${lidx+1}]`}</span>
                        <span className={log.includes("[Shield Node]") || log.includes("SUCCESS") ? "text-emerald-400" : log.includes("Node]") ? "text-cyan-400" : "text-slate-400"}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Details & Value Proposition */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="bg-cyan-100 text-cyan-600 border border-cyan-200 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider select-none">
              SENTINEL MULTI-AGENT CONTROL GATEWAY
            </span>
            <h3 className="text-3xl md:text-4.5xl font-extrabold font-display tracking-tight text-slate-900 leading-none">
              AiVerse ONE™
            </h3>
            <p className="text-slate-655 text-sm leading-relaxed font-medium">
              Empower your administrators with autonomous Verify, Watch, and Shield agent pipelines. Map and orchestrate complex prompt security tasks live to deflect generative threats, credential leaks, and fake digital assets.
            </p>

            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100 flex-shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">1. Sovereign Multi-Agent Pipeline</strong>
                  <p className="text-[11px] text-zinc-500 leading-normal">Deploy automated agents checking public DNS patterns, social media spoofs, and code token leaks side-by-side.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100 flex-shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">2. LangGraph &amp; Temporal Visualizer</strong>
                  <p className="text-[11px] text-zinc-500 leading-normal">Visually map sequential, concurrent, or mesh flows with automated failovers and transaction replay logs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100 flex-shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-slate-900 font-bold block">3. Gateway PII Token Scrubbing</strong>
                  <p className="text-[11px] text-zinc-500 leading-normal">Instantly catch leaking Passports, Emirates IDs, or prompt injection patterns at the network gateway level.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openAiVerseOne"))}
                className="w-full sm:w-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold rounded-xl transition cursor-pointer shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>Launch ONE Gateway</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] font-mono text-slate-550 border-l border-zinc-200 pl-4 py-1 flex items-center gap-1.5">
                <span>Port Status:</span>
                <span className="text-emerald-650 font-bold animate-pulse">● Live 3000</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 19: PREMIUM CALL TO ACTION */}
      <section className="relative py-28 px-4 md:px-8 w-full max-w-none text-center overflow-hidden bg-zinc-900 text-white rounded-none border-t border-zinc-800 mb-0">
        
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
