import { useState } from "react";
import { 
  Play, CheckCircle, ShieldAlert, Award, ArrowUpRight, TrendingUp, 
  Clock, Flame, Cpu, Users, Globe2, Sparkles, AlertOctagon, X 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DemoCard {
  id: string;
  category: string;
  title: string;
  description: string;
  accuracy: string;
  velocity: string;
  videoThumb: string; // Representing a premium mockup container
}

export default function SuccessDemosMetrics() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeCaseStudyIdx, setActiveCaseStudyIdx] = useState<number>(0);
  const [demoState, setDemoState] = useState<"idle" | "running" | "ready">("idle");
  const [demoProgress, setDemoProgress] = useState(0);

  const demoCards: DemoCard[] = [
    {
      id: "img_det",
      category: "Fake Image Detection",
      title: "Pixel Interference Scanner Demo",
      description: "Step-by-step raster frequency audit isolating GAN artifacts, face-swapping seam layers, and stable diffusion model fingerprints.",
      accuracy: "98.7% Accuracy",
      velocity: "1.2s Scan",
      videoThumb: "bg-gradient-to-br from-slate-50 to-blue-50 border-blue-100"
    },
    {
      id: "v_det",
      category: "Deepfake Video Analysis",
      title: "Biometric Facial Incoherence Tracer",
      description: "Frame-by-frame blinking patterns mapping, facial shadow angle calculations, and deep synthesis audio-to-lip divergence tracking.",
      accuracy: "99.2% Accuracy",
      velocity: "3.5s Scan",
      videoThumb: "bg-gradient-to-br from-rose-50 to-amber-50 border-rose-100"
    },
    {
      id: "voice_scam",
      category: "Voice Scam Protection",
      title: "Audio Envelope Fingerprinter Demo",
      description: "Scans corporate voice profiles against known synthesizers (Vocoder-22, ElevenLabs) to isolate AI executive cloning attempts.",
      accuracy: "99.8% Accuracy",
      velocity: "500ms Scan",
      videoThumb: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"
    },
    {
      id: "soc_mon",
      category: "Social Media Monitoring",
      title: "Sovereign Disinformation CommandCenter",
      description: "Tracks cascading replication spikes across TikTok, YouTube, and X, pinning automated bot amplification vectors instantly.",
      accuracy: "95.5% Accuracy",
      velocity: "< 3m Alerts",
      videoThumb: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100"
    },
    {
      id: "cy_thr",
      category: "Cyber Threat Detection",
      title: "Malignant Semantic Email Auditor",
      description: "Deconstructs social engineering email campaigns, isolating malicious LLM writing parameters and server spoof registers.",
      accuracy: "99.9% Accuracy",
      velocity: "15ms Block",
      videoThumb: "bg-gradient-to-br from-blue-50 to-slate-50 border-slate-100"
    },
    {
      id: "ent_dash",
      category: "Enterprise Dashboard Security",
      title: "Executive Asset Verification Dashboard",
      description: "Enterprise Control Center tracking executive biometrics safeguards, fake website mirrors, and brand spoofing feeds on the ledger.",
      accuracy: "99.98% Stopped",
      velocity: "Continuous Sweep",
      videoThumb: "bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-100"
    }
  ];

  const caseStudies = [
    {
      client: "Global Financial Bank Corp",
      sector: "Fintech Security",
      challenge: "Executive voice cloning attack targeted high-level wire transfers with $12M exposure risk.",
      outcome: "Deployed AiVerse Shield endpoint filter. Completely isolated synthetic imposter voice call in real-time, shutting down authorization spoofing.",
      kpiLabel: "Wire Loss Prevention",
      kpiValue: "$12,000,000"
    },
    {
      client: "Sovereign Election Committee",
      sector: "Public Safety",
      challenge: "Coordinated bot network released a deepfake video claiming candidate withdraw on election eve.",
      outcome: "AiVerse Watch flagged the video as 99.2% AI-Generated, tagged C2PA ledger metrics, and push alerts to X/YouTube APIs within 3 minutes.",
      kpiLabel: "Voter Disinfo Neutralized",
      kpiValue: "8.5M Views Avoided"
    },
    {
      client: "NeoTech MedLab Industries",
      sector: "Brand Protection",
      challenge: "Automated phishing malware and fake corporate document clones targeted healthcare product blueprints.",
      outcome: "Applied AiVerse Verify to all raw image documents. External copycats flagged automatically by Sentinel trace maps.",
      kpiLabel: "IP Vault Penetrations Blocked",
      kpiValue: "0 Intrusions"
    }
  ];

  // Simulated modal execution workflow
  const triggerSimulation = (cardId: string) => {
    setActiveModalId(cardId);
    setDemoState("running");
    setDemoProgress(0);

    const interval = setInterval(() => {
      setDemoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDemoState("ready");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const currentModalDetails = demoCards.find(c => c.id === activeModalId);

  return (
    <div className="space-y-24 max-w-7xl mx-auto">
      
      {/* SECTION 16: LIVE DEMO CENTER */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-bold">
            Interactive Diagnostic Center
          </span>
          <h3 className="text-2xl md:text-3xl.5 font-display font-semibold text-zinc-900 tracking-tight">
            Live Forensic Demo Suites
          </h3>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto">
            Choose a specialized security category below and click to run a cinematic diagnostic session in the sandboxed trust engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {demoCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-zinc-100 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:shadow-lg transition-transform hover:-translate-y-1 duration-300"
            >
              <div>
                {/* Autoplay Preview Card Display (Simulated UI) */}
                <div className={`h-40 ${card.videoThumb} rounded-xl border flex flex-col items-center justify-center p-4 relative group overflow-hidden mb-5`}>
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[9px] font-bold bg-white/80 border p-1 rounded-md text-zinc-600 shadow-sm">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-ping" />
                    AUTOPLAY PLAYBACK ACTIVE
                  </div>
                  
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">{card.category}</span>
                    <strong className="text-xs text-zinc-805 block line-clamp-1">{card.title}</strong>
                  </div>

                  <button 
                    onClick={() => triggerSimulation(card.id)}
                    className="absolute inset-0 bg-white/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-blue-600 uppercase tracking-wider font-bold">{card.category}</span>
                  <h4 className="text-base font-semibold text-zinc-900 leading-snug">{card.title}</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">{card.description}</p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-zinc-50 flex items-center justify-between text-xs font-semibold">
                <div className="flex gap-2 text-[10px] font-mono font-bold text-zinc-400">
                  <span className="text-blue-600">{card.accuracy}</span>
                  <span>•</span>
                  <span>{card.velocity}</span>
                </div>
                <button
                  onClick={() => triggerSimulation(card.id)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  Inspect Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 17: CUSTOMER SUCCESS STORIES */}
      <div className="bg-zinc-50 rounded-3xl p-6 md:p-10 border border-zinc-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase font-mono font-bold text-blue-600 tracking-wider">
              SUCCESS AUDIT RECORDINGS
            </span>
            <h3 className="text-2xl md:text-3.5xl font-display font-semibold text-zinc-900 tracking-tight leading-none">
              Defending multi-million portfolios.
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Read verified corporate outcomes where AiVerse successfully disabled deepfake threats, isolated phishes, and halted viral sabotage campaigns.
            </p>

            <div className="space-y-2 pt-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseStudyIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    activeCaseStudyIdx === idx 
                      ? "bg-white text-zinc-800 border-zinc-200 shadow-mini font-semibold" 
                      : "bg-transparent text-zinc-500 border-transparent hover:bg-zinc-100"
                  }`}
                >
                  <div className="text-xs font-mono text-zinc-400">CLIENT STUDY 0{idx + 1}</div>
                  <div className="text-sm">{cs.client}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 pb-3 border-b mb-4">
              <span>SECTOR: {caseStudies[activeCaseStudyIdx].sector}</span>
              <span className="text-blue-600 font-bold uppercase">Case Verified</span>
            </div>

            <div className="space-y-4 my-auto">
              <div className="space-y-1">
                <span className="text-[10.5px] uppercase font-mono tracking-wider text-rose-500 font-bold block">
                  Initial Threat Vector Profile
                </span>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {caseStudies[activeCaseStudyIdx].challenge}
                </p>
              </div>

              <div className="space-y-1 bg-zinc-50 p-4 border rounded-xl">
                <span className="text-[10.5px] uppercase font-mono tracking-wider text-emerald-600 font-bold block">
                  AIVERSE DEPLOYED SOLUTION
                </span>
                <p className="text-zinc-800 text-sm leading-relaxed font-semibold">
                  {caseStudies[activeCaseStudyIdx].outcome}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block font-semibold">
                  {caseStudies[activeCaseStudyIdx].kpiLabel}
                </span>
                <span className="text-2xl font-bold font-display text-zinc-900">
                  {caseStudies[activeCaseStudyIdx].kpiValue}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 font-bold">
                <Award className="w-4 h-4 text-blue-500" /> Court-Stamp Verified
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 18: TRUST METRICS & SVG ANIMATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white border border-zinc-100 p-6 md:p-10 rounded-3xl">
        <div className="space-y-5">
          <span className="text-[10px] uppercase font-mono font-bold text-blue-600 tracking-wider">
            Continuous Performance Evaluation
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-zinc-900 tracking-tight leading-tight">
            Indisputable, real-time trust metrics.
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Our detection accuracy is continuously tuned against global adversarial models. All metrics are compiled transparently below.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50/50 border rounded-xl text-center space-y-1">
              <TrendingUp className="w-5 h-5 text-blue-500 mx-auto" />
              <strong className="text-lg font-bold text-zinc-800 block">98.7% Avg</strong>
              <span className="text-[10px] text-zinc-400 font-mono">Pixel Accuracy</span>
            </div>
            <div className="p-4 bg-zinc-50/50 border rounded-xl text-center space-y-1">
              <Clock className="w-5 h-5 text-blue-500 mx-auto" />
              <strong className="text-lg font-bold text-zinc-805 block">&lt; 500ms</strong>
              <span className="text-[10px] text-zinc-400 font-mono">Latent Delay</span>
            </div>
          </div>
        </div>

        {/* Dynamic SVG Graphs Area (Representing metrics) */}
        <div className="bg-zinc-50 border p-6 rounded-2xl flex flex-col justify-between h-72">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-500 border-b pb-2 mb-4">
            <span>METRIC DRIFT ANALYSIS SCHEMA</span>
            <span className="text-emerald-500 font-bold">TUNED: 24h CURRENT</span>
          </div>

          <div className="flex-1 flex items-end justify-between relative px-2">
            {/* Grid references lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-t border-dashed border-zinc-450 w-full" />
              <div className="border-t border-dashed border-zinc-450 w-full" />
              <div className="border-t border-dashed border-zinc-450 w-full" />
            </div>

            {/* Simulated bar charts with layout styling */}
            {[
              { label: "Deepfake Video", val: "99.2", size: "99%", color: "bg-blue-600" },
              { label: "Voice Cloning", val: "99.8", size: "100%", color: "bg-emerald-600" },
              { label: "Image Manipulation", val: "98.7", size: "97%", color: "bg-teal-500" },
              { label: "Spam Phishing", val: "99.9", size: "100%", color: "bg-rose-500" }
            ].map((chart, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full px-2 z-10 space-y-2">
                <span className="text-[10px] font-mono font-bold text-zinc-800">{chart.val}%</span>
                <div style={{ height: chart.size }} className={`w-6 ${chart.color} rounded-t-sm transition-all duration-1000`} />
                <span className="text-[9px] font-mono text-zinc-400 text-center truncate w-full max-w-[80px]">{chart.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Simulation Modal popup (Cinematic interface) */}
      <AnimatePresence>
        {activeModalId && (
          <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border text-zinc-805 rounded-2xl w-full max-w-2xl p-6 md:p-8 space-y-4 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveModalId(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-zinc-100 transition border"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-blue-600 font-bold uppercase">{currentModalDetails?.category}</span>
                <h4 className="text-xl font-display font-semibold">{currentModalDetails?.title}</h4>
              </div>

              {/* Forensic Sandboxed Log Terminal */}
              <div className="bg-zinc-950 rounded-xl p-5 min-h-[160px] font-mono text-xs text-white border border-zinc-800 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>FORENSIC TERMINAL DIAGNOSTIC DEPLOYING</span>
                  </div>
                  <div className="text-zinc-500 font-semibold text-[10px] mt-1 uppercase">AIVERSE REGISTER SHIELD CORE ID: {currentModalDetails?.id}</div>
                </div>

                <div className="my-4 space-y-1">
                  {demoState === "running" ? (
                    <div className="text-zinc-400 animate-pulse">
                      &gt; Computing neural matrix layers, scanning EXIF, checking mismatch envelope... ({demoProgress}%)
                    </div>
                  ) : (
                    <div className="text-emerald-400 space-y-1 animate-fadeIn">
                      <div>&gt; Analysis cycle perfect. 100% of packets audited.</div>
                      <div>&gt; Trust conclusion compiled with secure cryptographic stamps ledger block #291.</div>
                    </div>
                  )}
                </div>

                <div className="w-full bg-zinc-900 border border-zinc-850 h-2 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${demoProgress}%` }}
                    className="h-full bg-blue-600 transition-all duration-200" 
                  />
                </div>
              </div>

              {demoState === "ready" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <div>
                      <strong className="text-zinc-800">Ecosystem Safe Verified Badge Authorized</strong>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Reliably isolated. Verification score: {currentModalDetails?.accuracy}.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono bg-emerald-600 text-white rounded font-bold uppercase">
                    GENERATE REPORT
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => setActiveModalId(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50"
                >
                  Close Suite
                </button>
                <button
                  onClick={() => triggerSimulation(activeModalId!)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                  Restart Simulation
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
