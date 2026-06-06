import { useState, useRef, TouchEvent } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Cpu, ArrowRight, MousePointer, Info, Layers, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LandscapeTab {
  id: string;
  name: string;
  icon: string;
  severity: string;
  mitigation: string;
}

export default function ThreatLandscape() {
  const [activeTab, setActiveTab] = useState<string>("image");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLiveChecking, setIsLiveChecking] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Audio voice waveform state
  const audioFreqsReal = [24, 45, 12, 67, 89, 43, 21, 56, 75, 43, 90, 12, 45];
  const audioFreqsFake = [25, 43, 14, 62, 85, 48, 22, 59, 70, 39, 95, 15, 44]; // Slight synthesized robotic smoothing

  const tabs: LandscapeTab[] = [
    { id: "image", name: "AI Images", icon: "📸", severity: "High Severity Vectors", mitigation: "AiVerse Trust Pixel Analysis Engine detects generative structures automatically." },
    { id: "video", name: "Deepfake Video", icon: "🎥", severity: "Critical Fraud Vector", mitigation: "AIVERSE Trust analyzes frame-by-frame blinking, lighting, and synthetic lip-sync." },
    { id: "voice", name: "Voice Clones", icon: "🎙️", severity: "High Threat Level", mitigation: "AIVERSE Shield checks frequency anomalies and synthesiser patterns." },
    { id: "social", name: "Viral Poisoning", icon: "🌐", severity: "Democracy Risk", mitigation: "AIVERSE Watch tracks networks to isolate bot armies in real-time." },
    { id: "attack", name: "Cyber Armor", icon: "🛡️", severity: "Critical Threats", mitigation: "AIVERSE Sentinel detects automated phishing networks and ransomware." },
  ];

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const startAnalysis = () => {
    setIsLiveChecking(true);
    setScanResult(null);
    setTimeout(() => {
      setIsLiveChecking(false);
      setScanResult("SUSPICIOUS_MANIPULATION_DETECTED");
    }, 2500);
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-zinc-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Dynamic Nav/Controls */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              AIVERSE THREAT RECONNAISSANCE
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-zinc-900 tracking-tight leading-tight">
              Visualize threat vectors in the generative era.
            </h3>
            
            <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
              Cyber criminals are weaponizing AI systems. Toggle between different attack styles to see how AiVerse breaks down synthetic materials.
            </p>

            {/* Menu Selection */}
            <div className="space-y-2 mt-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setScanResult(null);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600/5 text-blue-900 border-blue-200 shadow-sm font-semibold"
                      : "bg-transparent text-slate-600 hover:bg-slate-50/50 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-sm">{tab.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {activeTab === tab.id ? (
                      <span className="text-[10px] uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full font-mono">
                        Active Inspect
                      </span>
                    ) : (
                      <ArrowRight className="w-4.5 h-4.5 text-zinc-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <div className="flex items-start gap-2.5 text-xs text-zinc-500 bg-zinc-50 p-3 rounded-lg">
              <Info className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-zinc-700 uppercase tracking-wider text-[9px] mb-1">
                  Active Mitigation Shield
                </p>
                <p className="text-[11px] leading-relaxed">
                  {tabs.find(t => t.id === activeTab)?.mitigation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Simulation Field */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              
              {/* IMAGE SLIDER TAB */}
              {activeTab === "image" && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-xs font-mono text-slate-600 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                      IMAGE DEEP NOISE MATCH: <span className="font-bold">SUSPECTED LATENT ARTIFACTS</span>
                    </div>
                    <div className="text-[11px] font-mono text-blue-605 font-semibold flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      DRAG IN PREVIEW TO INSPECT
                    </div>
                  </div>

                  {/* Canvas slider box */}
                  <div 
                    ref={containerRef}
                    onMouseMove={(e) => handleSliderMove(e.clientX)}
                    onTouchMove={handleTouchMove}
                    className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl cursor-ew-resize border border-zinc-200 shadow-sm"
                  >
                    {/* Left side / Background: AI GENERATED DEEPFAKE (Manipulated, heatmaps overlayed) */}
                    <div className="absolute inset-0 bg-zinc-100 flex flex-col justify-center items-center">
                      <div className="text-center p-6 max-w-sm">
                        <span className="text-[10px] uppercase font-mono tracking-widest bg-rose-100 text-rose-700 px-2.5 py-1 rounded-md font-bold mb-3 inline-block">
                          AI MANIPULATED STATE
                        </span>
                        <h4 className="text-lg font-bold text-zinc-800">Synthesized Pixels</h4>
                        <p className="text-xs text-zinc-500 mt-2">
                          AiVerse Scan reveals GAN noise patterns, mismatched shadow angles, and cloned details in the background.
                        </p>
                        
                        {/* Fake facial box indicator */}
                        <div className="mt-4 inline-block border-2 border-dashed border-rose-500 p-2 text-[10px] font-mono text-rose-600 font-bold bg-rose-50 animate-pulse rounded">
                          MISMATCHED REFLECTION [98% AI CRITICAL]
                        </div>
                      </div>
                    </div>

                    {/* Right side / Foreground Layer: ORIGINAL REAL IMAGE (Clean original metadata) */}
                    <div 
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                      className="absolute inset-0 bg-blue-50/50 flex flex-col justify-center items-center select-none"
                    >
                      <div className="text-center p-6 max-w-sm text-zinc-800">
                        <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md font-bold mb-3 inline-block">
                          ORIGINAL HUMAN DOCUMENT
                        </span>
                        <h4 className="text-lg font-bold">Secure RAW Exposure</h4>
                        <p className="text-xs text-zinc-500 mt-2">
                          Authentic metadata, untampered timestamp, matching lens distortion profiles, verified cryptography signature.
                        </p>

                        <div className="mt-4 inline-block border-2 border-emerald-500 p-2 text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 rounded">
                          LEDGER SIGNATURE SECURE [100% SECURE]
                        </div>
                      </div>
                    </div>

                    {/* Draggable vertical bar divider */}
                    <div 
                      style={{ left: `${sliderPosition}%` }}
                      className="absolute top-0 bottom-0 w-1 bg-blue-600 shadow-glow pointer-events-none"
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white border border-blue-100 shadow flex items-center justify-center">
                        <MousePointer className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIDEO DEEPFAKE TAB */}
              {activeTab === "video" && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-zinc-500">VIDEO ID: AX-4927</span>
                      <span className="text-xs font-mono text-rose-600 font-bold">LIP SYNC CONFIDENCE: LOW (12%)</span>
                    </div>

                    {/* Interactive Frame analysis container */}
                    <div className="bg-white rounded-xl border border-zinc-100 p-4 space-y-3">
                      <div className="h-44 w-full bg-zinc-50 rounded-lg relative overflow-hidden flex flex-col items-center justify-center border border-dashed border-zinc-200">
                        <div className="absolute top-3 left-3 bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                          LIVE ANALYSIS RENDER [FRAME #423]
                        </div>
                        
                        {/* Lip Sync Overlay Diagram */}
                        <div className="w-28 h-28 border-2 border-dashed border-indigo-400 rounded-full flex flex-col items-center justify-center text-center p-2 relative animate-pulse">
                          <span className="text-[9px] font-mono font-bold text-indigo-600 absolute bottom-1">SYNTH FACE MESH</span>
                          <span className="text-[10px] text-zinc-400">Eye Blinking: RED</span>
                          <span className="text-[10px] text-emerald-500">Angle: OK</span>
                        </div>

                        <div className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-500">
                          Blinking Sync: <strong>MISMAPPED</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                        <div className="p-2 rounded bg-emerald-50 border border-emerald-100 text-emerald-800">
                          <div className="text-[9px] text-zinc-500">Frame Frequency</div>
                          <span className="font-bold">24.1 Hz (OK)</span>
                        </div>
                        <div className="p-2 rounded bg-rose-50 border border-rose-100 text-rose-800">
                          <div className="text-[9px] text-zinc-500">Skin Lighting</div>
                          <span className="font-bold">Divergent Noise</span>
                        </div>
                        <div className="p-2 rounded bg-rose-50 border border-rose-100 text-rose-800">
                          <div className="text-[9px] text-zinc-500">Frame Incoherence</div>
                          <span className="font-bold">Synthetic Jitter</span>
                        </div>
                        <div className="p-2 rounded bg-zinc-50 border border-zinc-200 text-zinc-800">
                          <div className="text-[9px] text-zinc-500">Encoding Speed</div>
                          <span className="font-bold">120 FPS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VOICE CLONING COMPONENT */}
              {activeTab === "voice" && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-zinc-50 border border-zinc-200/60 p-5 rounded-2xl flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <div className="text-xs font-mono text-zinc-700">AUDIO SPECTRUM COMPARATIVE SPEECHPROFILES</div>
                      <span className="text-rose-500 font-mono text-xs font-extrabold animate-pulse">ANOMALY DETECTED [99% AI CLONED]</span>
                    </div>

                    <div className="space-y-4 my-auto">
                      {/* Real Waveform */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                          <span>AUTHENTIC EXECUTIVE RECORDED VOICE</span>
                          <span className="text-emerald-600 font-bold">100% GROUND TRUTH</span>
                        </div>
                        <div className="h-10 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-around px-3 py-1">
                          {audioFreqsReal.map((f, i) => (
                            <span 
                              key={i} 
                              style={{ height: `${f}%` }} 
                              className="w-1.5 bg-emerald-500 rounded-full transition-all duration-300 hover:bg-emerald-600"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Fake Waveform */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                          <span>AI GENERATED VOICE CLONE (DEEP VOICE OVERLAY)</span>
                          <span className="text-rose-600 font-bold">SYNTHESIZED HARMONIC MATCH</span>
                        </div>
                        <div className="h-10 bg-rose-50 border border-rose-200 rounded flex items-center justify-around px-3 py-1">
                          {audioFreqsFake.map((f, i) => (
                            <span 
                              key={i} 
                              style={{ height: `${f}%` }} 
                              className="w-1.5 bg-rose-400 rounded-full transition-all duration-0 animate-pulse"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-500 bg-white p-3 rounded-lg border border-zinc-100 leading-relaxed font-mono mt-4">
                      <strong>AI Impersonator Fingerprint:</strong> Found pitch envelope duplication anomalies and zero ambient room acoustic reverberation. Matches known synthetic ElevenLabs/V02 voice synthesizers.
                    </div>
                  </div>
                </div>
              )}

              {/* SOCIAL MEDIA DISINFORMATION TAB */}
              {activeTab === "social" && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-zinc-50 border border-zinc-200/60 p-6 rounded-2xl flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-zinc-800">Viral Disinformation Network Tracking</h4>
                      <p className="text-xs text-zinc-500 mt-1">
                        Tracks coordination spikes on TikTok, YouTube, and X where fake news accounts launch automated narrative cascades.
                      </p>
                    </div>

                    <div className="bg-white rounded-xl border border-zinc-100 p-4 space-y-3.5 my-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-zinc-600">
                          <span>COORDINATED NETWORK SPIKE IN MANUFACTURED NEWS</span>
                          <span className="text-rose-600 font-bold">CRITICAL RISK</span>
                        </div>
                        <div className="w-full bg-zinc-100 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-indigo-500 to-rose-500 h-2.5 rounded-full" style={{ width: "88%" }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5 text-xs">
                        <div className="bg-zinc-50 p-2.5 rounded border border-zinc-200/60">
                          <div className="font-mono text-zinc-400 text-[10px]">MISINFO AMPLITUDE</div>
                          <span className="font-bold text-zinc-800">12.5M Users reached</span>
                        </div>
                        <div className="bg-zinc-50 p-2.5 rounded border border-zinc-200/60">
                          <div className="font-mono text-zinc-400 text-[10px]">BOT LEVEL SPIKE</div>
                          <span className="font-bold text-rose-600">92% Bots confirmed</span>
                        </div>
                        <div className="bg-zinc-50 p-2.5 rounded border border-zinc-200/60">
                          <div className="font-mono text-zinc-400 text-[10px]">ACTION TAKEN</div>
                          <span className="font-bold text-emerald-600">Flagged API metadata</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-[11px] font-mono text-zinc-500">AiVerse Live Sentinel feed synchronized.</span>
                      <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline">
                        Trace Source Network <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CYBER ATTACKS TAB */}
              {activeTab === "attack" && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-zinc-500">CYBER SECURITY THREAT VECTOR LOGS</span>
                      <span className="text-emerald-500 font-mono text-xs font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> SECURE INTEGRITY
                      </span>
                    </div>

                    <div className="space-y-2.5 my-3">
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-zinc-100 hover:border-indigo-100 transition">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          <span className="text-xs font-semibold text-zinc-700">Ransomware Autopilot Agent</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">BLOCKED IN REALTIME</span>
                      </div>

                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-zinc-100 hover:border-indigo-100 transition">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          <span className="text-xs font-semibold text-zinc-700">Mass Automated phishing generator</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">ISOLATED ENHANCED FILTER</span>
                      </div>

                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-zinc-100 hover:border-indigo-100 transition">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span className="text-xs font-semibold text-zinc-700">Credential Stuffing Proxy Mesh</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">RE-ROUTING SANDBOX</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-200">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Threat Mitigation Rate</div>
                        <div className="text-lg font-bold text-zinc-800">99.98% Stopped at Boundary</div>
                      </div>
                      <button 
                        onClick={startAnalysis}
                        disabled={isLiveChecking}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {isLiveChecking ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing Boundary...
                          </>
                        ) : (
                          <>Launch Boundary Scan</>
                        )}
                      </button>
                    </div>

                    {scanResult && (
                      <div className="mt-2.5 bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-lg text-xs font-mono text-center">
                        🚨 SECURITY CRITIC: Potential synthetic spearphish email payload isolated in sandbox!
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
