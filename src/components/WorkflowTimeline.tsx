import { useState, useEffect, ComponentType } from "react";
import { Upload, Cpu, FileText, BarChart3, Binary, ShieldAlert, BadgeCheck, Play, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WorkflowStepItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: ComponentType<any>;
  hudCode: string;
}

export default function WorkflowTimeline() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedPayload, setSelectedPayload] = useState<string>("video");
  const [scanState, setScanState] = useState<"idle" | "scanning" | "completed">("idle");
  const [currentScanStep, setCurrentScanStep] = useState<number>(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const workflowSteps: WorkflowStepItem[] = [
    {
      id: 1,
      title: "Upload Content",
      subtitle: "Secure Ingestion",
      description: "Secure and verify inputs via decentralized trust chains or direct secure API pipes. Supports videos, high-resolution photos, and audio waveforms.",
      icon: Upload,
      hudCode: "INGEST_PORT_2119_SUCCESS_UTF8"
    },
    {
      id: 2,
      title: "AiVerse Scan Engine",
      subtitle: "Parallel Deep Analysis",
      description: "We deploy neural network agents to perform localized raster analysis, frequency checks, and compression analysis simultaneously.",
      icon: Cpu,
      hudCode: "PARALLEL_CORE_ALLOC_92%"
    },
    {
      id: 3,
      title: "Metadata Analysis",
      subtitle: "EXIF & Camera Forensics",
      description: "Extracting complete EXIF header trails, camera physics properties, lens mismatch structures, and cryptographic ledger history profiles.",
      icon: FileText,
      hudCode: "LENS_EXIF_CRYPTO_TAGS_VALID"
    },
    {
      id: 4,
      title: "Pattern Recognition",
      subtitle: "Synthetic Artifact Seekers",
      description: "Exposes Generative Adversarial Network (GAN) fingerprints, stable diffusion noise gradients, and deep speech phase misalignment markers.",
      icon: Binary,
      hudCode: "GAN_NOISE_VECTOR_TRAIN_710"
    },
    {
      id: 5,
      title: "AI Detection Models",
      subtitle: "Deep Model Fingerprints",
      description: "Comparison check against known LLM, video generators, and clone speech styles (ElevenLabs, Sora, Midjourney, Flux, Kling, etc).",
      icon: Layers,
      hudCode: "FINGERPRINT_MATCH_DB_V4"
    },
    {
      id: 6,
      title: "Trust Scoring",
      subtitle: "Calculate Validity Vectors",
      description: "Algorithmic synthesis mathematically weighting all model certainty levels to formulate an unbiased global confidence factor score.",
      icon: BarChart3,
      hudCode: "ALGO_CONFIDENCE_WEIGHT_829"
    },
    {
      id: 7,
      title: "Report Generation",
      subtitle: "Secure Trust Certificate",
      description: "Exporting clean, court-admissible audit summaries, signed cryptographic ledger assertions, and threat classification hashes.",
      icon: BadgeCheck,
      hudCode: "CERTIFICATE_AIVERSE_SIGNED"
    },
  ];

  // Simulated scan engine runner
  useEffect(() => {
    if (scanState !== "scanning") return;

    if (currentScanStep < workflowSteps.length) {
      const timer = setTimeout(() => {
        const step = workflowSteps[currentScanStep];
        setActiveStep(step.id);
        
        let newLog = "";
        switch (step.id) {
          case 1:
            newLog = `Uploaded [${selectedPayload === "video" ? "Politician_Speech_X.mp4" : selectedPayload === "voice" ? "CEO_Urgent_Transfer.wav" : "Sovereign_Press_Release.png"}] securely. Payload size: 4.8MB.`;
            break;
          case 2:
            newLog = `Parallelizing scan queues. Spawning specialized sandboxed forensic model container... ONLINE.`;
            break;
          case 3:
            newLog = `Reading digital DNA. EXIF tags found: 12. Valid Cryptographic Ledger Stamp: ${selectedPayload === "image" ? "SECURE_MATCHED" : "MISSING_OR_CORRUPT"}.`;
            break;
          case 4:
            newLog = `Phase detection. GAN frequency anomaly found at ${selectedPayload === "voice" ? "4.1kHz region" : "pixel grid offsets"}. Probability of synthesised pixels: ${selectedPayload === "image" ? "88.4%" : selectedPayload === "video" ? "97.1%" : "99.8%"}.`;
            break;
          case 5:
            newLog = `Model Fingerprinting. High match probability with ${selectedPayload === "voice" ? "ElevenLabs Voice V2" : selectedPayload === "video" ? "Sora Video Engine Alpha" : "Flux Refined Generator"}.`;
            break;
          case 6:
            newLog = `Trust scoring final calculations. Authenticity Coefficient calculated at: ${selectedPayload === "image" ? "14.2%" : selectedPayload === "video" ? "3.2%" : "0.4%"}. SEVERITY: ULTRA CRITICAL RISK.`;
            break;
          case 7:
            newLog = `Verification Certificate successfully compiled & cryptographically stamped for forensic validation download.`;
            break;
        }

        setScanLogs(prev => [...prev, `[STEP ${step.id}] ${newLog}`]);
        setCurrentScanStep(prev => prev + 1);
      }, 1800);

      return () => clearTimeout(timer);
    } else {
      setScanState("completed");
    }
  }, [scanState, currentScanStep, selectedPayload]);

  const triggerScan = () => {
    setScanLogs([]);
    setCurrentScanStep(0);
    setActiveStep(1);
    setScanState("scanning");
  };

  const resetTimeline = () => {
    setScanState("idle");
    setCurrentScanStep(0);
    setActiveStep(1);
    setScanLogs([]);
  };

  return (
    <div className="space-y-12">
      {/* Simulation Sandbox Control Area */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              AIVERSE AUDIT ENGINE v4.21
            </div>
            <h4 className="text-xl font-display font-semibold text-slate-905">
              Interactive Forensic Scanning Sandbox
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Select a sample digital asset payload below to trigger the actual timeline scan. Watch each algorithm deploy.
            </p>
          </div>

          {/* Selector & Play Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white border border-slate-200 rounded-lg p-1 text-xs font-medium">
              <button
                disabled={scanState === "scanning"}
                onClick={() => setSelectedPayload("video")}
                className={`px-3 py-1.5 rounded transition-all ${selectedPayload === "video" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-600 hover:text-blue-600"}`}
              >
                🎥 Deepfake Speech (.mp4)
              </button>
              <button
                disabled={scanState === "scanning"}
                onClick={() => setSelectedPayload("voice")}
                className={`px-3 py-1.5 rounded transition-all ${selectedPayload === "voice" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-600 hover:text-blue-600"}`}
              >
                🎙️ CEO Voice Request (.wav)
              </button>
              <button
                disabled={scanState === "scanning"}
                onClick={() => setSelectedPayload("image")}
                className={`px-3 py-1.5 rounded transition-all ${selectedPayload === "image" ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-600 hover:text-blue-600"}`}
              >
                📸 Executive Identity Photo (.png)
              </button>
            </div>

            <div className="flex items-center gap-2">
              {scanState === "scanning" ? (
                <button
                  disabled
                  className="px-4 py-2 bg-slate-200 text-slate-500 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Forensics Running ({currentScanStep}/{workflowSteps.length})
                </button>
              ) : scanState === "completed" ? (
                <button
                  onClick={resetTimeline}
                  className="px-4 py-2 bg-emerald-650 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Ecosystem
                </button>
              ) : (
                <button
                  onClick={triggerScan}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Secure Ingest & Run
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live HUD Scan Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-500">
              <span>SCAN TELEMETRY SHIELD CONSOLE</span>
              <span className="text-slate-400">TIMESTAMP: 2026-06-06 UTC</span>
            </div>
            
            <div className="bg-slate-950 rounded-xl p-5 min-h-[220px] font-mono text-xs text-white overflow-y-auto space-y-2 border border-slate-800 shadow-inner">
              {scanLogs.length === 0 && (
                <div className="h-44 flex flex-col items-center justify-center text-slate-500 text-center">
                  <Cpu className="w-8 h-8 opacity-20 mb-2 animate-pulse text-blue-400" />
                  <p>System Idle.</p>
                  <p className="text-[10px] mt-1 text-slate-650">Select payload and choose "Secure Ingest & Run" to initiate parallel AI Trust checks.</p>
                </div>
              )}
              {scanLogs.map((log, index) => {
                const isFinal = index === scanLogs.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${isFinal ? "text-blue-400 font-bold" : "text-slate-300"}`}
                  >
                    <span className="text-emerald-500 font-bold mr-1">&gt; </span>
                    {log}
                    {isFinal && scanState === "scanning" && (
                      <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1 align-middle" />
                    )}
                  </motion.div>
                );
              })}
              {scanState === "scanning" && scanLogs.length < workflowSteps.length && (
                <div className="text-[10px] text-zinc-500 animate-pulse mt-3 font-semibold">
                  [PROCESSING STAGE {currentScanStep + 1} ... COMMENCING NEURAL HASHING PATTERNS]
                </div>
              )}

              {scanState === "completed" && (
                <div className="mt-4 pt-4 border-t border-zinc-850 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-500/10 p-2.5 rounded border border-rose-500/20">
                    <ShieldAlert className="w-4 h-4" />
                    <span>FORENSIC CONCLUSION REPORT: HIGHLY DISPARATE DEEPFAKE ARTIFACTS DISCOVERED</span>
                  </div>
                  <div className="grid grid-cols-2 bg-zinc-900 border border-zinc-800 p-2 rounded text-[11px] gap-2">
                    <div>
                      <span className="text-zinc-500 block">Trust Integrity Index:</span>
                      <strong className="text-rose-500 font-bold text-sm">
                        {selectedPayload === "video" ? "3.2%" : selectedPayload === "voice" ? "0.4%" : "14.2%"} [CRITICAL RISK]
                      </strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Signature:</span>
                      <strong className="text-zinc-400 uppercase">AiVerse Authenticated Ledger Reject</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Score Dial */}
          <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between items-center text-center">
            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Live Authenticity Gauge</span>
              <h5 className="text-sm font-semibold text-zinc-800 mt-1">Ecosystem Audit Rating</h5>
            </div>

            <div className="my-6 relative w-36 h-36 flex items-center justify-center">
              {/* Spinning background gauge */}
              <div className="absolute inset-0 border-4 border-dashed border-zinc-100 rounded-full animate-spin [animation-duration:40s]" />
              
              <div className="relative">
                {scanState === "scanning" ? (
                  <div className="text-center">
                    <RefreshCw className="w-7 h-7 animate-spin mx-auto text-indigo-600 mb-1" />
                    <span className="font-mono text-zinc-500 text-xs font-semibold">CALCULATING</span>
                  </div>
                ) : scanState === "completed" ? (
                  <div className="text-center space-y-0.5">
                    <span className="text-4xl font-display font-extrabold text-rose-600 tracking-tight">
                      {selectedPayload === "video" ? "3.2" : selectedPayload === "voice" ? "0.4" : "14.2"}%
                    </span>
                    <span className="block text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider">SUSPENDED</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-3xl font-display font-bold text-zinc-300">N/A</span>
                    <span className="block text-[9px] font-mono text-zinc-400">AWAITING INGEST</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 leading-relaxed font-mono">
              Confidence status is weighted using blockchain ledger authentication and 12 baseline pattern models.
            </div>
          </div>

        </div>
      </div>

      {/* Horizontal workflow timeline visualization */}
      <div className="relative overflow-x-auto pb-4 scrollbar-none">
        <div className="flex justify-between items-start min-w-[900px] px-4 relative">
          
          {/* Connector Line Background */}
          <div className="absolute top-6 left-12 right-12 h-0.5 bg-zinc-200/80 -z-10" />
          
          {/* Connecting Active fill */}
          <div 
            style={{ width: `${((activeStep - 1) / (workflowSteps.length - 1)) * 90}%` }}
            className="absolute top-6 left-12 h-0.5 bg-indigo-500 transition-all duration-500 -z-10" 
          />

          {workflowSteps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            const isCompleted = step.id < activeStep || scanState === "completed";
            
            return (
              <div
                key={step.id}
                className="flex-1 flex flex-col items-center text-center px-2 cursor-pointer group"
                onClick={() => {
                  if (scanState !== "scanning") {
                    setActiveStep(step.id);
                  }
                }}
              >
                {/* Graphic Indicator Circle */}
                <div 
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-glow scale-110" 
                      : isCompleted
                      ? "bg-emerald-50 text-emerald-600 border-emerald-500 shadow-sm"
                      : "bg-white text-zinc-400 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="mt-4">
                  <span className="block text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                    Step 0{step.id}
                  </span>
                  <h5 className={`text-xs font-semibold mt-1 transition-colors ${isActive ? "text-indigo-900 font-bold" : "text-zinc-700"}`}>
                    {step.title}
                  </h5>
                  <span className="block text-[9px] font-mono text-zinc-500 tracking-tight mt-0.5 max-w-[120px] mx-auto truncate text-ellipsis">
                    {step.subtitle}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Selected Step Detail Panel View on Scroll or click */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start justify-between"
        >
          <div className="flex-1 space-y-2">
            <span className="text-[10px] font-mono font-bold text-indigo-600 tracking-widest uppercase">
              RECONNAISSANCE STEP DETAILS &gt;&gt; STAGE 0{activeStep}
            </span>
            <h5 className="text-lg font-display font-semibold text-zinc-900">
              {workflowSteps[activeStep-1].title} – {workflowSteps[activeStep-1].subtitle}
            </h5>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
              {workflowSteps[activeStep-1].description}
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/80 p-4 rounded-xl font-mono text-[10px] text-zinc-500 w-full md:w-64">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200 mb-2 font-bold text-zinc-700">
              <span>SYSTEM ARTIFACT CODES</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <div>STATUS: <span className="text-emerald-600 font-bold">READY</span></div>
            <div>ENTRYPOINT: <span className="font-semibold text-zinc-800">/api/v4/trust/scan#{activeStep}</span></div>
            <div>HUD_REGISTER: <span className="font-semibold text-indigo-600">{workflowSteps[activeStep-1].hudCode}</span></div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
