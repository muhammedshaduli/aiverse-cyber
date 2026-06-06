import { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, ArrowRight, X, Upload, FileSignature, 
  Cpu, FileSearch, MessageSquareWarning, RefreshCw, BadgePercent, CheckCircle, HelpCircle, HardDrive,
  Globe, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage, LANGUAGES, LanguageCode } from "../context/LanguageContext";

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpenScanModal, setIsOpenScanModal] = useState(false);
  const [scanState, setScanState] = useState<"idle" | "indexing" | "finishing" | "success">("idle");
  const [fileType, setFileType] = useState<"image" | "voice" | "video" | "email">("image");
  const [textInput, setTextInput] = useState("");
  const [scanOutput, setScanOutput] = useState<{status: string, idx: number, sourceModel: string} | null>(null);
  
  // Local active language state
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Run simulated detailed scan
  const startTrustAnalysis = () => {
    setScanState("indexing");
    setScanOutput(null);

    // Initial load steps
    setTimeout(() => {
      setScanState("finishing");
    }, 1800);

    setTimeout(() => {
      setScanState("success");
      setScanOutput({
        status: fileType === "email" ? "SUSPECTED AI COGNITIVE POISONING" : "SYNTHETIC DEEPFAKE ARTIFACTS FOUND",
        idx: fileType === "email" ? 22.4 : fileType === "image" ? 14.8 : fileType === "voice" ? 1.2 : 4.4,
        sourceModel: fileType === "email" ? "PhishGPT-4 v2" : fileType === "video" ? "Sora Video Engine Alpha" : fileType === "voice" ? "ElevenLabs Voice V2" : "Flux Generative Engine"
      });
    }, 3200);
  };

  const closeAndClear = () => {
    setIsOpenScanModal(false);
    setScanState("idle");
    setScanOutput(null);
    setTextInput("");
  };

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Organization Branded Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-100/50">
              <ShieldCheck className="w-4.5 h-4.5 text-white animate-pulse" />
            </div>
            <div>
              <strong className="text-slate-900 text-sm font-display tracking-tight block leading-none pb-0.5">
                AiVerse
              </strong>
              <span className="text-[9px] font-mono font-bold text-blue-600 block leading-none">{t.nav.shLine}</span>
            </div>
          </div>

          {/* Desktop Middle Navigation menu (Single Screen boundaries) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-500">
            <a href="#threats" className="hover:text-slate-900 transition-colors">{t.nav.threats}</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">{t.nav.howItWorks}</a>
            <a href="#modules" className="hover:text-slate-900 transition-colors">{t.nav.modules}</a>
            <a href="#demo" className="hover:text-slate-900 transition-colors">{t.nav.playground}</a>
            <a href="#ecosystem" className="hover:text-slate-900 transition-colors">{t.nav.ecosystem}</a>
            <a href="#metrics" className="hover:text-slate-900 transition-colors font-bold text-blue-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
              {t.nav.ledger}
            </a>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openAdminConsole"));
              }}
              className="hover:text-indigo-650 font-bold text-indigo-600 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-xs"
            >
              <Cpu className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </nav>

          {/* Nav Right CTAs with Dropdown Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-205 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all font-mono pointer-events-auto cursor-pointer shadow-sm"
              >
                <span className="text-xs">{activeLang.flag}</span>
                <span className="uppercase text-[11px] font-bold text-slate-800">{activeLang.code}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-150 rounded-xl shadow-lg py-1.5 z-50 text-xs font-semibold"
                  >
                    <div className="px-3 py-1 text-[9px] font-mono text-slate-400 border-b border-slate-100 uppercase font-black tracking-wider mb-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-450" />
                      Select Region
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-50 transition ${language === lang.code ? "bg-slate-50/50 text-blue-600 font-bold" : "text-slate-600 font-medium"}`}
                      >
                        <span className="text-base select-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {language === lang.code && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openAdminConsole"));
              }}
              className="text-xs font-bold text-indigo-650 hover:text-indigo-800 border border-indigo-200 px-4 py-2 rounded-full bg-indigo-50/30 hover:bg-indigo-55 transition-all font-mono shadow-sm cursor-pointer"
            >
              Admin
            </button>

            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openScanWorkspace"));
              }}
              className="text-xs font-bold text-slate-650 hover:text-blue-600 border border-slate-200 px-4 py-2 rounded-full bg-white hover:bg-slate-50 transition-all font-mono shadow-sm cursor-pointer"
            >
              {t.nav.tunnel}
            </button>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openScanWorkspace"));
              }}
              className="text-xs font-semibold px-4.5 py-2.5 bg-slate-950 hover:bg-blue-605 text-white rounded-full transition-all flex items-center gap-1.5 shadow-md shadow-blue-50/50 tracking-tight cursor-pointer"
            >
              <span>{t.nav.launch}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Immersive Launch Trust Scan Workspace Modal */}
      <AnimatePresence>
        {isOpenScanModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl p-6 md:p-8 space-y-6 relative shadow-2xl my-8 text-slate-800"
            >
              <button
                onClick={closeAndClear}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition border bg-white"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 text-[10px] uppercase font-mono font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.scanModal.decentralized}
                </div>
                <h4 className="text-2xl font-display font-semibold tracking-tight text-slate-905">
                  {t.scanModal.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {t.scanModal.subtitle}
                </p>
              </div>

              {/* Asset Type Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-semibold text-slate-600 bg-slate-50 p-1 border border-slate-150 rounded-xl">
                <button
                  disabled={scanState !== "idle" && scanState !== "success"}
                  onClick={() => setFileType("image")}
                  className={`py-2 rounded-lg transition-all ${fileType === "image" ? "bg-blue-600 text-white font-bold shadow-sm" : "hover:text-slate-900"}`}
                >
                  {t.scanModal.imgBtn}
                </button>
                <button
                  disabled={scanState !== "idle" && scanState !== "success"}
                  onClick={() => setFileType("voice")}
                  className={`py-2 rounded-lg transition-all ${fileType === "voice" ? "bg-blue-600 text-white font-bold shadow-sm" : "hover:text-slate-900"}`}
                >
                  {t.scanModal.voiceBtn}
                </button>
                <button
                  disabled={scanState !== "idle" && scanState !== "success"}
                  onClick={() => setFileType("video")}
                  className={`py-2 rounded-lg transition-all ${fileType === "video" ? "bg-blue-600 text-white font-bold shadow-sm" : "hover:text-slate-900"}`}
                >
                  {t.scanModal.videoBtn}
                </button>
                <button
                  disabled={scanState !== "idle" && scanState !== "success"}
                  onClick={() => setFileType("email")}
                  className={`py-2 rounded-lg transition-all ${fileType === "email" ? "bg-blue-600 text-white font-bold shadow-sm" : "hover:text-slate-900"}`}
                >
                  {t.scanModal.emailBtn}
                </button>
              </div>

              {/* Custom input parameters & file simulated uploads */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">{t.scanModal.inputParams}</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold uppercase flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {t.scanModal.secureActive}
                  </span>
                </div>

                <div className="space-y-3">
                  <textarea
                    rows={fileType === "email" ? 4 : 3}
                    placeholder={
                      fileType === "image" 
                        ? "Paste verified image CDN endpoints or metadata logs (e.g. hash sha256: 4eac892...) to query."
                        : fileType === "voice"
                        ? "Paste voice envelope or ElevenLabs binary synthesiser identifier strings."
                        : fileType === "video"
                        ? "Enter suspect YouTube, X, or TikTok video URL coordinates for frame-by-frame analysis."
                        : "Paste full email header or semantic plain text coordinates to audit."
                    }
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    disabled={scanState === "indexing" || scanState === "finishing"}
                    className="w-full text-xs font-mono p-3 border rounded-lg bg-slate-50 outline-none focus:bg-white focus:border-blue-405"
                  />

                  {/* Simulated click-to-attach box */}
                  <div className="border border-dashed p-4 rounded-lg text-center bg-slate-50 border-slate-200">
                    <Upload className="w-5 h-5 mx-auto text-slate-400 mb-2 animate-bounce" />
                    <p className="text-[11px] text-slate-650 font-semibold selection:bg-blue-50">
                      {t.scanModal.dragDrop}
                    </p>
                    <p className="text-[9px] text-slate-400 font-mono mt-1">
                      {t.scanModal.dragSub}
                    </p>
                  </div>
                </div>

                {scanState === "idle" && (
                  <button
                    onClick={startTrustAnalysis}
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition font-mono shadow-sm"
                  >
                    {t.scanModal.ingestBtn}
                  </button>
                )}

                {/* Progress Indicators */}
                {(scanState === "indexing" || scanState === "finishing") && (
                  <div className="space-y-3 pt-2 font-mono">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-blue-600 font-sans">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        {scanState === "indexing" ? t.scanModal.stage1 : t.scanModal.stage2}
                      </span>
                      <span>{scanState === "indexing" ? "42%" : "89%"}</span>
                    </div>
                    <div className="w-full bg-slate-105 rounded-full h-1.5 overflow-hidden">
                      <div 
                        style={{ width: scanState === "indexing" ? "42%" : "89%" }}
                        className="h-full bg-blue-600 transition-all duration-300"
                      />
                    </div>
                  </div>
                )}

                {/* Final Diagnostic Summary Output */}
                {scanState === "success" && scanOutput && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-3 text-xs"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-rose-100">
                      <div className="flex items-center gap-2 text-rose-700 font-bold font-mono">
                        <MessageSquareWarning className="w-4 h-4 text-rose-600 animate-pulse" />
                        <span>{scanOutput.status}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                        {t.scanModal.criticalTitle}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-650 py-1 font-mono">
                      <div>
                        <span className="text-[9px] text-slate-450 block font-bold">{t.scanModal.authScore}</span>
                        <strong className="text-rose-600 text-lg font-bold">{scanOutput.idx}% {t.scanModal.lowScore}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-450 block font-bold">{t.scanModal.classification}</span>
                        <strong className="text-slate-800 uppercase">{scanOutput.sourceModel}</strong>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <span className="text-[9px] text-slate-450 block font-bold">{t.scanModal.legalAdmissible}</span>
                        <strong className="text-emerald-600">{t.scanModal.certificate}</strong>
                      </div>
                    </div>

                    <p className="text-slate-500 font-mono text-[10px] leading-relaxed pt-2 border-t border-rose-100">
                      <strong>{t.scanModal.outputTitle}</strong> {t.scanModal.outputMsg}
                    </p>
                  </motion.div>
                )}

              </div>

              {scanState === "success" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setScanState("idle");
                      setScanOutput(null);
                    }}
                    className="flex-1 py-2 border rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition font-mono"
                  >
                    {t.scanModal.ingestNext}
                  </button>
                  <button
                    onClick={closeAndClear}
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition font-mono shadow-sm"
                  >
                    {t.scanModal.closeWorkspace}
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

