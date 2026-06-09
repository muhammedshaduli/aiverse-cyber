import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, Lock, Globe, RefreshCw, FileSignature, Cpu, CheckCircle2, 
  Hash, ShieldAlert, FileText, Fingerprint, Binary, Download, Layers,
  Activity, Check, AlertCircle, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface BlockchainBlock {
  index: number;
  timestamp: string;
  payload: string;
  hash: string;
  previousHash: string;
  status: "verified" | "signing";
}

interface ComplianceStandard {
  id: string;
  name: string;
  code: string;
  score: number;
  status: "Active" | "Warning" | "Pending";
  description: string;
  controls: { title: string; checked: boolean; desc: string }[];
}

export default function TrustComplianceCenter() {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [signing, setSigning] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<string>("soc2");
  const [watermarkScanActive, setWatermarkScanActive] = useState(false);
  const [watermarkType, setWatermarkType] = useState<"audio" | "image" | "meta">("meta");
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [scanResult, setScanResult] = useState<{
    status: "authentic" | "manipulated" | "none";
    metaTrace?: string;
    score?: number;
  } | null>(null);

  // Animated signature ledger state (initial default secure ledger blocks)
  const [ledger, setLedger] = useState<BlockchainBlock[]>([
    {
      index: 3,
      timestamp: "2026-06-06 18:04:15",
      payload: "Voice authentication biometric token validation",
      hash: "8f7c9a2d3b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
      previousHash: "2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
      status: "verified"
    },
    {
      index: 2,
      timestamp: "2026-06-06 17:45:30",
      payload: "NIST Security Profile Update - Zurich Cluster API Endpoint",
      hash: "2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
      previousHash: "f1e2d3c4b5a691827364554637281910a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7",
      status: "verified"
    },
    {
      index: 1,
      timestamp: "2026-06-06 17:00:12",
      payload: "Corporate Integrity Scan - Swiss Bank Executive Broadcast",
      hash: "f1e2d3c4b5a691827364554637281910a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7",
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      status: "verified"
    }
  ]);

  // Comprehensive Real-time Standards Mock Data
  const standards: ComplianceStandard[] = [
    {
      id: "soc2",
      name: "SOC 2 Type II Certified",
      code: "AICPA SOC-2",
      score: 100,
      status: "Active",
      description: "Rigorous independent audit of Trust Services Criteria focusing on security, availability, confidential protection, and deep sandbox privacy controls.",
      controls: [
        { title: "Continuous Threat Sandbox Ingestion", checked: true, desc: "Each ingested media payload runs isolated from core infrastructure." },
        { title: "TLS 1.3 & SHA-256 Multi-Region Ledger", checked: true, desc: "Digital signatures are hashed instantly and kept in physical immutable files." },
        { title: "Zero-Knowledge Biometric Custody", checked: true, desc: "Biometric voice profiles are checked but never persisted to disk storage." },
        { title: "Hourly Automated Key Rotation", checked: true, desc: "Symmetric cryptographic keys rotate automatically every 60 minutes." }
      ]
    },
    {
      id: "iso27001",
      name: "ISO/IEC 27001:2022 Verified",
      code: "ISO-27001",
      score: 100,
      status: "Active",
      description: "International standard for designing, establishing, maintaining, and continually improving corporate Information Security Management Systems (ISMS).",
      controls: [
        { title: "Annex A.8.2.1 Media Classification", checked: true, desc: "All client audio and visual pieces have automated cryptographic category tags." },
        { title: "Annex A.12.6.1 Vulnerability Scan", checked: true, desc: "Internal pipeline dependencies scanned for CVE issues down to package levels." },
        { title: "Annex A.10.1 Cryptographic Controls", checked: true, desc: "High-grade AES-256 GCM applied to server caching states." }
      ]
    },
    {
      id: "fedramp",
      name: "FedRAMP High Readiness",
      code: "FEDRAMP-H",
      score: 98.4,
      status: "Active",
      description: "US Federal Risk and Authorization Management Program standard designed to provide rigorous data assessment, defense against adversarial nation-states, and high security baselines.",
      controls: [
        { title: "NIST SP 800-53 Rev 5 Controls", checked: true, desc: "Full alignment across 17 control families for restricted space execution." },
        { title: "Multi-Zone Encrypted Failover", checked: true, desc: "Primary active Zurich center replicates instantly to London & Washington." },
        { title: "Hardware Root of Trust Audit", checked: true, desc: "Host hypervisors backed by certified secure hardware security modules." },
        { title: "FIPS 140-3 Validated Crypto Libraries", checked: false, desc: "Certification validation pending final hardware signature checks." }
      ]
    },
    {
      id: "gdpr",
      name: "EU GDPR & AI Act Compliance",
      code: "GDPR Act",
      score: 100,
      status: "Active",
      description: "Built strictly under Privacy By Design principles. Full user data erasure capability paired with synthetic media transparent watermark disclosures.",
      controls: [
        { title: "Immediate Ingress Erasure System", checked: true, desc: "Media files are destroyed from memory instantly after the forensic scan finishes." },
        { title: "EU AI Act Transparency Requirement", checked: true, desc: "Identified generated materials are stamped with mandatory warning labels." },
        { title: "Right to be Forgotten API Protocol", checked: true, desc: "Instant manual command erases telemetry reports from all databases." }
      ]
    },
    {
      id: "nist",
      name: "NIST AI Risk Management Framework",
      code: "NIST AI RMF",
      score: 99.1,
      status: "Active",
      description: "Guidelines framed by the National Institute of Standards and Technology to cultivate trustworthy AI systems, stressing accuracy, transparency, and safety.",
      controls: [
        { title: "Bias & False Positive Drift Tracking", checked: true, desc: "Maintains high confidence limits to limit false-positive classification blocks." },
        { title: "Adversarial Robustness Testing", checked: true, desc: "Platform validated daily against generative adversarial spoof networks." },
        { title: "Explainable AI Forensics outputs", checked: true, desc: "Provides granular logs indicating exactly why a sample is flagged as synthetic." }
      ]
    }
  ];

  // Simulated Web Audio API Waveform Visualizer
  useEffect(() => {
    const generateWave = () => {
      const data: number[] = [];
      const len = watermarkScanActive ? 32 : 16;
      for (let i = 0; i < len; i++) {
        data.push(Math.random() * (watermarkScanActive ? 90 : 30) + 10);
      }
      setWaveformData(data);
    };

    generateWave();
    const interval = setInterval(generateWave, watermarkScanActive ? 120 : 800);
    return () => clearInterval(interval);
  }, [watermarkScanActive]);

  // Handle Dynamic Cryptographic Signing
  const handleSignPayload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setSigning(true);
    
    // Simulate complex cryptographic hash calculation (SHA-256 equivalent feel)
    setTimeout(() => {
      // Calculate a funny mock SHA-256
      const randomHexChars = "abcdef0123456789";
      let generatedHash = "0000"; // Signature difficulty proof look
      for (let i = 0; i < 60; i++) {
        generatedHash += randomHexChars.charAt(Math.floor(Math.random() * randomHexChars.length));
      }

      const previousHash = ledger[0] ? ledger[0].hash : "0000000000000000000000000000";
      const now = new Date();
      const timestampString = now.toISOString().replace("T", " ").substring(0, 19);

      const newBlock: BlockchainBlock = {
        index: ledger.length + 1,
        timestamp: timestampString,
        payload: inputText,
        hash: generatedHash,
        previousHash: previousHash,
        status: "verified"
      };

      setLedger((prev) => [newBlock, ...prev]);
      setSigning(false);
      setInputText("");
    }, 1200);
  };

  // Watermark Detector simulation
  const handleWatermarkScan = (type: "audio" | "image" | "meta") => {
    setWatermarkType(type);
    setWatermarkScanActive(true);
    setScanResult(null);

    setTimeout(() => {
      setWatermarkScanActive(false);
      if (type === "meta") {
        setScanResult({
          status: "authentic",
          score: 99.85,
          metaTrace: "C2PA Header trace: MATCH. Signed by BBC Editorial Root Key. Trusted hardware origin."
        });
      } else if (type === "audio") {
        setScanResult({
          status: "manipulated",
          score: 11.24,
          metaTrace: "SynthID scan: FAILURE. Injected high-frequency phase anomaly signature detected around 16.5kHz."
        });
      } else {
        setScanResult({
          status: "manipulated",
          score: 4.88,
          metaTrace: "Spatial Pixel Scan: GAN Seams found on coordinates (x:142, y:492). Color channel mismatch."
        });
      }
    }, 2000);
  };

  const activeStandard = standards.find(s => s.id === selectedStandard) || standards[0];

  return (
    <section id="trust-compliance" className="py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full scroll-mt-20">
      
      {/* Title Header with Glowing Aura */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider select-none">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Section 05 // Global Credibility & Assurances</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-slate-900">
          World's Most Trusted <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 bg-clip-text text-transparent">Forensics Authority</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
          We combine physical HSM hardware roots-of-trust, cryptographic verification keys, and continuous compliance telemetry. Explore our active trust mechanics below.
        </p>
      </div>

      {/* THREE MODULE INTERACTIVE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* COMPONENT 1: CRYPTOGRAPHIC SIGNATURE & IMMUTABLE LEDGER (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 bg-white border border-slate-200/95 rounded-3xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <FileSignature className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 tracking-tight text-base">HSM Cryptographic Signature & Ledger</h3>
                  <p className="text-xs text-slate-450">Seal digital payloads onto the AiVerse verification history chain.</p>
                </div>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 text-emerald-400 font-mono text-[9px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                SECURE KEY: SHA-256
              </span>
            </div>

            {/* Interactive Sign Form */}
            <form onSubmit={handleSignPayload} className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Payload content or validation context:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g. Verified integrity scan tag for Reuters news broadcast #A04..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-slate-755 placeholder-slate-400 text-xs font-medium focus:outline-none transition-colors pr-10"
                    disabled={signing}
                  />
                  <div className="absolute right-3 top-3 text-slate-350">
                    <Binary className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-450 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-blue-500" />
                  <span>Sealed using HSM hardware key: ZUR-918-B5</span>
                </div>
                <button
                  type="submit"
                  disabled={signing || !inputText.trim()}
                  className={`px-5 py-2 rounded-xl text-xs font-bold tracking-tight shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    signing 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : !inputText.trim() 
                        ? "bg-slate-100 text-slate-350 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-650 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-[1.02]"
                  }`}
                >
                  {signing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sealing Node...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                      <span>Seal to Chain Block</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Simulated Live Ledger Timeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  IMMUTABLE PROOF LOG ({ledger.length} BLOCKS ACTIVE)
                </span>
                <span className="text-[9px] text-indigo-600 font-bold font-mono">STABILITY: 100.00%</span>
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {ledger.map((block, idx) => (
                    <motion.div
                      key={block.hash}
                      initial={idx === 0 && block.index > 3 ? { opacity: 0, y: -15, scale: 0.98 } : { opacity: 1 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center h-4 px-1.5 bg-blue-100 text-blue-650 font-mono text-[9px] font-bold rounded-md">
                            BLOCK #{block.index}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">{block.timestamp}</span>
                        </div>
                        <span className="flex items-center gap-0.5 text-[9px] text-emerald-600 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          VERIFIED
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-700 font-medium mt-1.5 line-clamp-1">
                        {block.payload}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mt-2 pt-1.5 border-t border-slate-200/50 text-[8.5px] font-mono">
                        <div className="text-slate-450 truncate">
                          <span className="text-slate-400">HASH:</span> {block.hash}
                        </div>
                        <div className="text-slate-450 truncate text-right">
                          <span className="text-slate-400">PREV HASH:</span> {block.previousHash}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Ledger status sync frequency: Realtime (Direct pipeline)</span>
            <span className="text-blue-500 font-semibold cursor-pointer hover:underline flex items-center gap-1">
              <Download className="w-3 h-3" /> Download Ledger Audit PDF
            </span>
          </div>

        </div>

        {/* COMPONENT 2: INTERACTIVE COMPLIANCE CONTROLS (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-white border border-slate-200/95 rounded-3xl shadow-sm hover:shadow-md transition-all relative">
          
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 tracking-tight text-base block">Continuous Compliance Controls</h3>
                <p className="text-xs text-slate-450">Interact to inspect our real-time audit control list.</p>
              </div>
            </div>

            {/* Standard Badges Tabs Row */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {standards.map((standard) => (
                <button
                  key={standard.id}
                  onClick={() => setSelectedStandard(standard.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${
                    selectedStandard === standard.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {standard.code}
                </button>
              ))}
            </div>

            {/* Selected Compliance Details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-4 animate-fade-in-up">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-xs">{activeStandard.name}</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-450 font-mono font-bold">SCORE:</span>
                  <span className="text-xs font-mono font-black text-emerald-600">{activeStandard.score}%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                {activeStandard.description}
              </p>

              {/* Verified Control Checkboxes */}
              <div className="space-y-2 mt-4">
                <span className="block text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  AUTOMATED CONTINUOUS AUDIT CONTROLS
                </span>
                {activeStandard.controls.map((control, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-150 shadow-2xs">
                    <div className="mt-0.5">
                      {control.checked ? (
                        <div className="h-4 w-4 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3px]" />
                        </div>
                      ) : (
                        <div className="h-4 w-4 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-2.5 h-2.5 stroke-[3px]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-900 leading-none mb-0.5">
                        {control.title}
                      </span>
                      <span className="block text-[9.5px] text-slate-500 leading-tight">
                        {control.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-3 border-t border-slate-100 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-450" />
            <span>Auditing Node Server Location: Bern Cluster (Swiss Sovereign)</span>
          </div>

        </div>

      </div>

      {/* COMPONENT 3: SPATIAL WATERMARK & BIOMETRIC NOISE SIGNATURE SPECTRUM (Bottom Bento Block - Wide) */}
      <div className="mt-8 p-6 md:p-8 bg-slate-900 text-white rounded-[32px] border border-slate-800 relative overflow-hidden">
        
        {/* Futuristic glowing node decoration */}
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute left-1/3 -bottom-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Signal Left explanation (col-span-4) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] font-mono font-bold tracking-wider uppercase">
              <Fingerprint className="w-3 h-3" /> Spatial Frequency Verifier
            </span>
            <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight">
              Cryptographic Watermark & Metadata Coherence Analyzer
            </h3>
            <p className="text-sm text-slate-450 leading-relaxed">
              Scan high-risk audio recordings, synthetic images, or text documents to trace physical origin. Our systems check active spatial C2PA meta-integrity and ElevenLabs/Midjourney passive digital voice watermarks.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => handleWatermarkScan("meta")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  watermarkType === "meta" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Binary className="w-3.5 h-3.5" />
                <span>C2PA Standard Metadata</span>
              </button>
              
              <button
                onClick={() => handleWatermarkScan("audio")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  watermarkType === "audio" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Audio biometric Phase</span>
              </button>

              <button
                onClick={() => handleWatermarkScan("image")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  watermarkType === "image" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>GAN Noise Fingerprint</span>
              </button>
            </div>
          </div>

          {/* Graphical Equalizer Waveform & Realtime scanner console (col-span-8) */}
          <div className="lg:col-span-7 bg-black/40 border border-slate-800 rounded-2xl p-5 relative overflow-hidden backdrop-blur-xs min-h-[260px] flex flex-col justify-between">
            
            {/* Header of diagnostic stream */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 capitalize tracking-wider uppercase">
                  ACTIVE TESTING MATRIX: {watermarkType} WATERMARK SCAN
                </span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">
                {watermarkScanActive ? "VERIFICATION IN PROGRESS..." : "STABLE IDLE PIPELINE"}
              </span>
            </div>

            {/* Dynamic Web Audio mock spectrum */}
            <div className="flex items-end justify-center gap-1 h-20 my-4 px-4">
              {waveformData.map((h, index) => (
                <div
                  key={index}
                  className={`w-2 max-w-[8px] rounded-t-xs transition-all duration-150 ${
                    watermarkScanActive 
                      ? "bg-gradient-to-t from-indigo-500 via-blue-500 to-sky-400" 
                      : "bg-slate-800"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Diagnostic Logs console feedback */}
            <div className="bg-black/70 border border-slate-850 rounded-xl p-3.5 font-mono text-[10.5px]">
              {watermarkScanActive ? (
                <div className="text-slate-300 space-y-1">
                  <p className="animate-pulse">⏳ Ingesting fast spatial Fourier transforms (FFT)...</p>
                  <p className="text-blue-400">⚡ Check vector match frequency signature coefficients.</p>
                </div>
              ) : scanResult ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold uppercase">DIAGNOSTIC RESOLUTION:</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      scanResult.status === "authentic" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}>
                      {scanResult.status === "authentic" ? "PASSED VALIDATION" : "FLAGGED ADVERSARIAL"}
                    </span>
                  </div>
                  <p className="text-zinc-300">{scanResult.metaTrace}</p>
                  <div className="flex items-center gap-1.5 text-[9px] text-zinc-400 pt-1.5 border-t border-slate-850">
                    <Hash className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Signature confidence level: <b>{scanResult.score}%</b>. Generated security certificate verified.</span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400/80 text-center py-2">
                  <p>Click any test signature model on the left to activate forensic spatial matching scan.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
