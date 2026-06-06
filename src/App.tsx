import { useState, useEffect } from "react";
import { 
  ShieldAlert, ShieldCheck, Play, ArrowRight, Activity, 
  Cpu, FileCheck, Landmark, GitCommit, ChevronRight, AlertOctagon 
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

export default function App() {
  const { t } = useLanguage();
  const [contentScanned, setContentScanned] = useState(480000000);
  const [threatsDetected, setThreatsDetected] = useState(1950000);
  const [clientCount, setClientCount] = useState(105);
  const [showScannerPage, setShowScannerPage] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);

  // Custom listener for global scanner page open requests
  useEffect(() => {
    const handleOpenScanner = () => {
      setShowScannerPage(true);
      setShowAdminPage(false);
      // Ensure page scrolls to top nicely
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleOpenAdmin = () => {
      setShowAdminPage(true);
      setShowScannerPage(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("openScanWorkspace", handleOpenScanner);
    window.addEventListener("openAdminConsole", handleOpenAdmin);
    return () => {
      window.removeEventListener("openScanWorkspace", handleOpenScanner);
      window.removeEventListener("openAdminConsole", handleOpenAdmin);
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
